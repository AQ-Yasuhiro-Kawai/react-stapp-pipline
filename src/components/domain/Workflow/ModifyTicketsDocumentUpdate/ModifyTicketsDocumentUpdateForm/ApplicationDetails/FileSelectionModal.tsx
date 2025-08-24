import { getIconForFileName } from "@components/ui/Icons/icon";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/shallow";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ScrollBar } from "@/components/ui/ScrollBar";
import { SpinnerOverlay } from "@/components/ui/Spinner";
import { type HeaderColumn, Table } from "@/components/ui/Table";
import { breadCrumbsSelector } from "@/store/projects/breadCrumbSlice";
import { pdfFileSelector } from "@/store/projects/pdfFileSlice";
import { useBoundStore } from "@/store/store";
import {
  type ProjectQueryParams,
  useGetProjectDetailsQuery,
} from "@/usecases/Projects/reader";
import { usePdfConversionUsecase } from "@/usecases/Projects/usecase";
import { cn } from "@/utils/cn";
import { formatDateTimeFromString } from "@/utils/dateFormatter";
import { formatBytes, isSizeUnder5GB } from "@/utils/file";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

type SelectFileColumnKeys = {
  officialDocument: React.ReactNode;
  updater: string;
  updateTime: string;
  icon: React.ReactNode;
  size: string;
};

// 選択時ファイル一覧テーブルヘッダ
const SelectFileHeaderColumns: HeaderColumn<
  SelectFileColumnKeys,
  keyof SelectFileColumnKeys
>[] = [
  { children: "", className: "w-[46px]", key: "icon" },
  { children: "正文書", key: "officialDocument" },
  {
    children: "更新者",
    className: "w-[160px]",
    key: "updater",
  },
  {
    children: "更新日時",
    className: "w-[160px]",
    key: "updateTime",
  },
  {
    children: "サイズ",
    className: "w-[120px]",
    key: "size",
  },
];

// ファイル選択モーダル
export const FileSelectionModal = memo(({ isOpen, closeModal }: Props) => {
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  const [params, setParams] = useState<ProjectQueryParams & { label: string }>({
    providerItemId: undefined,
    siteId: undefined,
    driveId: undefined,
    label: "",
  });
  const { data, isPending } = useGetProjectDetailsQuery("1", params);
  const { mutateAsync } = usePdfConversionUsecase();

  const { breadCrumbs, setBreadCrumbs, clearBreadCrumbs } = useBoundStore(
    useShallow(breadCrumbsSelector),
  );
  const { selectFile, selectedFiles, startConversion } = useBoundStore(
    useShallow(pdfFileSelector),
  );

  useEffect(() => {
    if (!params.providerItemId || !params.driveId) {
      clearBreadCrumbs();
      return;
    }

    setBreadCrumbs({
      id: params.providerItemId,
      driveId: params.driveId,
      label: params.label,
    });
  }, [setBreadCrumbs, params, clearBreadCrumbs]);

  const onCloseModal = useCallback(() => {
    setSelectedRowIds([]);
    setParams({
      providerItemId: undefined,
      siteId: undefined,
      driveId: undefined,
      label: "",
    });
    clearBreadCrumbs();
    closeModal();
  }, [closeModal, clearBreadCrumbs]);

  const handleOnLink = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const providerItemId = e.currentTarget.dataset.providerItemId;
      const crumbData = data?.items.find(
        (item) => item.providerItemId === providerItemId,
      );

      if (!providerItemId || !crumbData) {
        return;
      }

      setParams({
        providerItemId: crumbData.providerItemId,
        driveId: crumbData.driveId,
        label: crumbData.itemName,
      });
    },
    [data],
  );

  // ファイル選択モーダル: ファイル一覧テーブルボディ
  const SelectFileBodyRows = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.items.map((item) => {
      const icon = item.isFolder
        ? getIconForFileName("folder")
        : getIconForFileName(item.extension);

      return {
        cells: {
          icon,
          officialDocument: (
            <button
              className={cn(
                isSizeUnder5GB({ size: item.size })
                  ? "text-main-text"
                  : "text-main-border",
                item.isFolder && "underline",
              )}
              data-provider-item-id={item.providerItemId}
              onClick={
                item.isFolder
                  ? handleOnLink
                  : () => {
                      // noop
                    }
              }
              type="button"
            >
              {item.itemName}
            </button>
          ),
          updater: item.lastModifiedBy,
          updateTime: formatDateTimeFromString(item.lastModifiedAt),
          size: item.isFolder ? "" : formatBytes({ size: item.size }),
        },
        id: item.providerItemId,
        isColorChangeWhenHover: isSizeUnder5GB({ size: item.size }),
      };
    });
  }, [data, handleOnLink]);

  const handleOnCrumbClick = useCallback(
    ({ id }: { id: string }) => {
      if (id === "") {
        setParams({
          providerItemId: undefined,
          driveId: undefined,
          label: "トップ",
        });
      }
      // パンクズリストのフォルダがクリックされたらリストを更新する
      // id:providerItemIdとdriveIdを組み合わせてファイル一覧を取得する
      const path = data?.items.find((item) => item.providerItemId === id);
      if (!path) {
        return;
      }

      setParams({
        providerItemId: path.providerItemId,
        driveId: path.driveId,
        label: path.itemName,
      });
    },
    [data],
  );

  // 行クリックのイベントハンドラ
  const handleRowClick = useCallback(
    (id: string) => {
      setSelectedRowIds((prev) => {
        // クリックされた行がフォルダならreturn
        const item = data?.items.find((item) => item.providerItemId === id);
        if (!item) return prev;

        if (item.isFolder || !isSizeUnder5GB({ size: item.size })) {
          return prev;
        }

        if (prev.includes(id)) {
          return prev.filter((rowId) => rowId !== id);
        }
        return [...prev, id];
      });

      const item = data?.items.find((item) => item.providerItemId === id);
      if (!item) return;
      if (item.isFolder || !isSizeUnder5GB({ size: item.size })) return;

      selectFile({
        projectId: data?.projectId || "",
        originalItemInfo: {
          url: item.url,
          folderName: item.parentReferencePath,
          fileName: item.itemName,
          fileId: item.providerItemId,
          lastUpdatedAt: item.lastModifiedAt,
          version: item.version,
        },
        status: "idle",
      });
    },
    [data, selectFile],
  );

  const handleOnClick = useCallback(async () => {
    // selectedFilesに追加されたファイルのproviderItemIdとdriveIdを使ってpromisesを生成
    if (selectedFiles.length === 0) {
      return;
    }

    // 選択された行のIDを使ってPDF変換リクエストを送信
    const promises = selectedFiles.map((file) => {
      return mutateAsync({
        driveId: file.originalItemInfo.folderName,
        providerItemId: file.originalItemInfo.fileId,
      });
    });

    Promise.all(promises);
    startConversion();
    onCloseModal();
  }, [onCloseModal, mutateAsync, startConversion, selectedFiles]);

  return (
    <Modal
      className="max-w-[800px] h-[800px] gap-0"
      closeModalHandler={onCloseModal}
      isCloseOutsideModal
      isOpen={isOpen}
      primaryButton={<Button onClick={handleOnClick}>決定</Button>}
      title="ファイルを追加"
    >
      {!data && isPending && <SpinnerOverlay />}

      {data && (
        <>
          <div className="mt-6">
            <Breadcrumb
              crumbs={breadCrumbs}
              isModal={true}
              onCrumbClick={handleOnCrumbClick}
            />
          </div>
          <div className="flex-1 min-h-0 relative overflow-hidden mb-1">
            <div className="absolute top-0 w-full h-4 bg-gradient-to-b from-main-bg to-transparent z-50 pointer-events-none" />
            <div className="absolute bottom-0 w-full h-4 bg-gradient-to-t from-main-bg to-transparent z-50 pointer-events-none" />
            <ScrollBar className="h-full relative z-0 py-4">
              <Table
                bodyRows={SelectFileBodyRows}
                headerColumns={SelectFileHeaderColumns}
                onRowClick={handleRowClick}
                selectedRowIds={selectedRowIds}
              />
            </ScrollBar>
          </div>
        </>
      )}
    </Modal>
  );
});
