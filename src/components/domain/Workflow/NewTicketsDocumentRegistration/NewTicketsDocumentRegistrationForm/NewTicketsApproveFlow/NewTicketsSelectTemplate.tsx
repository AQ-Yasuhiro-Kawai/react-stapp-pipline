import { MAX_SEARCH_WORD_LENGTH } from "@shared/constants/index";
import {
  ChevronRight,
  CircleCheckBig,
  MoveDown,
  Pencil,
  ScanSearch,
  TicketCheck,
} from "lucide-react";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useShallow } from "zustand/shallow";
import { Button, SIZE, VARIANT } from "@/components/ui/Button";
import { Modal, useModal } from "@/components/ui/Modal";
import { ScrollBar } from "@/components/ui/ScrollBar";
import { SearchableInput } from "@/components/ui/SearchableInput";
import { SpinnerOverlay } from "@/components/ui/Spinner";
import { type HeaderColumn, Table } from "@/components/ui/Table";
import { SectionTitle } from "@/components/ui/Title";
import type {
  ApprovalGroupTemplates,
  ApprovalTemplateDetail,
} from "@/domain/tickets/Document/type";
import useDebounce from "@/hooks/useDebounce";
import { ERROR_MESSAGE } from "@/shared/error";
import { errorModalSelector } from "@/store/errorModal/errorModalSlice";
import { closeErrorModal, openErrorModal, useBoundStore } from "@/store/store";
import {
  useApprovalTemplatesDetailQuery,
  useApprovalTemplatesQuery,
} from "@/usecases/Tickets/Document/reader";
import { approveStepStore } from "./store/approveStepStore";

type TemplateRow = {
  templateName: string;
  button: React.ReactNode;
};

type NewTicketsSelectTemplateProps = {
  onTemplateSelect?: (template: ApprovalTemplateDetail) => void;
};

type ApprovalStepTemplates = {
  id: string;
  stepNumber: number;
  approvalGroupTemplates: ApprovalGroupTemplates[];
};

/**
 * テンプレートの承認フロー全体を表示するコンポーネント
 */
function NewTicketsTemplateApproval({
  template,
}: {
  template: ApprovalTemplateDetail;
}) {
  return (
    <div className="pb-14">
      {/* 申請開始 */}
      <div className="w-full flex items-center gap-x-2 bg-main-blue/20 rounded-[10px] p-4">
        <Pencil className="size-6" />
        <span className="font-bold">申請</span>
      </div>

      {/* ステップの表示 */}
      {template.approvalStepTemplates.map((step) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center my-2">
            <div className="ml-2.5">
              <MoveDown className="size-9" />
            </div>
          </div>
          <NewTicketsTemplateApprovalStep step={step} />
        </React.Fragment>
      ))}

      {/* 完了 */}
      <div className="flex items-center my-2">
        <div className="ml-2.5">
          <MoveDown className="size-9" />
        </div>
      </div>
      <div className="w-full flex items-center gap-x-2 bg-main-blue/20 rounded-[10px] p-4">
        <TicketCheck className="size-6" />
        <span className="font-bold">完了</span>
      </div>
    </div>
  );
}

/**
 * 承認ステップを表示するコンポーネント
 */
function NewTicketsTemplateApprovalStep({
  step,
}: {
  step: ApprovalStepTemplates;
}) {
  return (
    <div className="p-4 bg-sub-bg rounded-[10px]">
      <div className="flex items-center gap-x-2">
        <CircleCheckBig className="size-6" />
        <span className="font-bold">ステップ {step.stepNumber}</span>
      </div>
      <ScrollBar>
        <div className="flex items-start gap-x-4 mt-4">
          {step.approvalGroupTemplates.map((group) => (
            <NewTicketsTemplateApprovalGroup group={group} key={group.id} />
          ))}
        </div>
      </ScrollBar>
    </div>
  );
}

/**
 * 承認グループを表示するコンポーネント
 */
function NewTicketsTemplateApprovalGroup({
  group,
}: {
  group: ApprovalGroupTemplates;
}) {
  const requiredApprovalCount = useMemo(() => {
    if (
      group.approverTemplates.length === 1 &&
      group.requiredApprovalCount === 1
    ) {
      return <p>必須</p>;
    }

    return (
      <>
        <p>必要承認人数</p>
        <p>{group.requiredApprovalCount}人</p>
      </>
    );
  }, [group]);

  return (
    <div className="px-2 bg-main-bg rounded-lg min-w-[300px]">
      <div className="flex items-center justify-center flex-col font-bold h-[62px] py-2">
        {requiredApprovalCount}
      </div>
      <div className="mt-2">
        {group.approverTemplates.map((approver) => (
          <div
            className="py-2 px-4 space-y-1 border-b border-main-border last:border-b-0"
            key={approver.id}
          >
            <div>{approver.name}</div>
            <div>
              {approver.organizationName} {approver.positionName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * テンプレート詳細表示コンポーネント
 */
function TemplateDetailView({
  templateDetail,
  isPending,
  isError,
  closeModal,
}: {
  templateDetail?: ApprovalTemplateDetail;
  isPending: boolean;
  isError: boolean;
  closeModal: () => void;
}) {
  if (isError) {
    closeModal();
    openErrorModal(ERROR_MESSAGE);
    return null;
  }

  if (isPending || !templateDetail) {
    return <SpinnerOverlay />;
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 mt-2 relative overflow-hidden mb-1">
      <div className="mb-4">
        <SectionTitle className="pb-0">
          {templateDetail.templateName}
        </SectionTitle>
      </div>

      <div className="absolute bottom-0 w-full h-4 bg-gradient-to-t from-main-bg to-transparent z-50 pointer-events-none" />
      <div className="h-full relative">
        <div className="absolute top-0 w-full h-4 bg-gradient-to-b from-main-bg to-transparent z-50 pointer-events-none" />
        <ScrollBar className="h-full relative z-0 py-4">
          <NewTicketsTemplateApproval template={templateDetail} />
        </ScrollBar>
      </div>
    </div>
  );
}

// テンプレート一覧テーブルヘッダ
const headerColumns: HeaderColumn<TemplateRow, keyof TemplateRow>[] = [
  { children: "", key: "templateName" },
  {
    children: "",
    className: "w-[46px]",
    key: "button",
  },
];

/**
 * テンプレート一覧のコンテンツ部分
 */
function TemplateSelectContent({
  onTemplateSelect,
}: {
  onTemplateSelect: (templateId: string) => void;
}) {
  const [searchWord, setSearchWord] = useState("");
  const [debouncedSearchWord, setDebouncedSearchWord] = useState("");

  const updateDebouncedSearchWord = (value: string) => {
    setDebouncedSearchWord((prev) => {
      if (value.length > MAX_SEARCH_WORD_LENGTH) {
        return prev;
      }
      return value;
    });
  };

  useDebounce(updateDebouncedSearchWord, searchWord, 500);
  // テンプレート一覧の取得 検索クエリに基づいて毎回APIから取得する
  const { data: filteredTemplates, isPending } =
    useApprovalTemplatesQuery(debouncedSearchWord);

  // ローディング状態の処理
  if (isPending) {
    return <SpinnerOverlay />;
  }

  // データが取得できない場合の処理
  if (!filteredTemplates) {
    return <div>データがありません</div>;
  }

  /**
   * テーブル用データの生成
   */
  const bodyRows = filteredTemplates.map((template) => ({
    cells: {
      templateName: template.templateName,
      button: (
        <Button
          prefixElement={<ChevronRight />}
          size={SIZE.ICON}
          variant={VARIANT.GHOST}
        />
      ),
    },
    id: template.id,
  }));

  /**
   * テンプレート行がクリックされた時の処理
   */
  const handleRowClick = (id: string) => {
    onTemplateSelect(id);
  };

  /**
   * 検索入力値の変更処理
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  return (
    <>
      {/* ヘッダー部分 */}
      <div className="mt-6">
        <SearchableInput
          className="max-w-[320px]"
          onChange={handleSearchChange}
          placeholder="テンプレートを検索"
          value={searchWord}
        />
      </div>

      {/* コンテンツエリア */}
      <div className="flex-1 min-h-0 mt-2 relative overflow-hidden mb-1">
        <div className="absolute top-0 w-full h-4 bg-gradient-to-b from-main-bg to-transparent z-50 pointer-events-none" />
        <div className="absolute bottom-0 w-full h-4 bg-gradient-to-t from-main-bg to-transparent z-50 pointer-events-none" />
        <ScrollBar className="h-full relative z-0 py-4">
          <Table
            bodyRows={bodyRows}
            className="border-t border-main-border"
            headerColumns={headerColumns}
            headerInvisible
            onRowClick={handleRowClick}
          />
        </ScrollBar>
      </div>
    </>
  );
}

/**
 * エラーフォールバックコンポーネント
 */
const ErrorFallback = () => {
  useEffect(() => {
    openErrorModal(ERROR_MESSAGE);
  }, []);

  return null;
};

/**
 * メインのテンプレート選択コンポーネント
 */
export function NewTicketsSelectTemplate({
  onTemplateSelect,
}: NewTicketsSelectTemplateProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  );

  // approveStepStoreのアクションを取得
  const { setFromTemplate } = approveStepStore(
    useShallow((state) => ({
      setFromTemplate: state.setFromTemplate,
    })),
  );

  const { open: IsOpenErrorModal, content } = useBoundStore(
    useShallow(errorModalSelector),
  );

  // 条件付きクエリで詳細取得
  const {
    data: templateDetail,
    isPending,
    isError,
  } = useApprovalTemplatesDetailQuery(selectedTemplateId);

  /**
   * モーダルを開く
   */
  const handleOpenModal = () => {
    openModal();
  };

  /**
   * モーダルを閉じる
   */
  const handleCloseModal = () => {
    closeModal();
    setSelectedTemplateId(null);
  };

  /**
   * テンプレート詳細から一覧に戻る処理
   */
  const handleBackToList = () => {
    setSelectedTemplateId(null);
  };

  /**
   * テンプレート選択を確定する処理
   */
  const handleConfirmTemplate = () => {
    if (templateDetail) {
      // approveStepStoreに状態を設定
      setFromTemplate(templateDetail);
      // 既存のコールバックも呼ぶ（必要に応じて）
      onTemplateSelect?.(templateDetail);
      handleCloseModal();
    }
  };

  return (
    <>
      <SectionTitle>テンプレート選択</SectionTitle>
      <Button
        onClick={handleOpenModal}
        prefixElement={<ScanSearch />}
        variant={VARIANT.OUTLINED}
      >
        テンプレート選択
      </Button>
      <Modal
        className="max-w-[800px] h-[800px] gap-0"
        closeModalHandler={handleCloseModal}
        isCloseOutsideModal
        isHiddenSecondaryButton={isPending}
        isOpen={isOpen}
        primaryButton={
          selectedTemplateId && !isPending ? (
            <Button disabled={isPending} onClick={handleConfirmTemplate}>
              決定
            </Button>
          ) : undefined
        }
        secondaryButton={
          selectedTemplateId ? (
            <Button onClick={handleBackToList} variant={VARIANT.OUTLINED}>
              戻る
            </Button>
          ) : undefined
        }
        title="テンプレートを選択"
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<SpinnerOverlay />}>
            {selectedTemplateId ? (
              <TemplateDetailView
                closeModal={closeModal}
                isError={isError}
                isPending={isPending}
                templateDetail={templateDetail}
              />
            ) : (
              <TemplateSelectContent onTemplateSelect={setSelectedTemplateId} />
            )}
          </Suspense>
        </ErrorBoundary>
      </Modal>

      {/* Error Modal */}
      <Modal
        closeModalHandler={closeErrorModal}
        isCloseOutsideModal
        isHiddenSecondaryButton={true}
        isOpen={IsOpenErrorModal}
        primaryButton={
          <Button
            onClick={closeErrorModal}
            type="button"
            variant={VARIANT.OUTLINED}
          >
            閉じる
          </Button>
        }
        secondaryButton={undefined}
        title={content?.title ?? "エラー"}
      >
        <p className="py-4">{content?.message}</p>
      </Modal>
    </>
  );
}
