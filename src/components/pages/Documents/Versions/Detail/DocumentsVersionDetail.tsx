import { RotateCcw } from "lucide-react";
import { useParams } from "react-router";
import { DocumentsVersionDetailTable } from "@/components/domain/Documents/DocumentsVersionDetailTable";
import { Button } from "@/components/ui/Button";
import { MainContent } from "@/components/ui/Layout";
import { SpinnerOverlay } from "@/components/ui/Spinner";
import { SectionTitle } from "@/components/ui/Title";
import { usePdfPreview } from "@/hooks/usePdfPreview";
import { useBoundStore } from "@/store/store";
import { useGetDocumentVersionDetailQuery } from "@/usecases/document/reader";
import { formatDateTimeFromString } from "@/utils/dateFormatter";

export const DocumentVersionDetailPage = () => {
  const { document_id: documentId, version_id: versionId } = useParams<{
    document_id: string;
    version_id: string;
  }>();
  const { data: documentVersionDetail } = useGetDocumentVersionDetailQuery(
    documentId,
    versionId,
  );
  const isLoading = useBoundStore((state) => state.isLoading);
  const { openPreview } = usePdfPreview();

  const handleRestoreClick = () => {
    // TODO: 正文書更新申請画面に遷移する
    console.log("Restore document version clicked");
  };

  const handleDocumentNameClick = (id: string) => {
    openPreview(id);
  };

  const handleRowDoubleClick = (id: string) => {
    openPreview(id);
  };

  return (
    <MainContent pageTitle="正文書過去バージョン詳細">
      <div className="flex space-x-4">
        <SectionTitle>
          {documentVersionDetail.officialDocumentName}
        </SectionTitle>
        <p className="text-sub-text mt-1">
          Ver. {documentVersionDetail.officialDocumentVersion.version}
        </p>
      </div>

      <p className="font-bold">
        {documentVersionDetail.publicationSourceOrganizationCode.name}
      </p>

      <div className="flex flex-wrap space-x-10 pt-4">
        <p className="space-x-2 flex">
          <span className="text-sub-text shrink-0">文書種類</span>
          <span>{documentVersionDetail.fileType}</span>
        </p>

        <p className="space-x-2 flex">
          <span className="text-sub-text shrink-0">公開範囲</span>
          <span>{documentVersionDetail.publicationScopeCode.name}</span>
        </p>

        <p className="space-x-2 flex">
          <span className="text-sub-text shrink-0">作成者</span>
          <span>
            {documentVersionDetail.officialDocumentVersion.updatedUser}
          </span>
        </p>

        <p className="space-x-2 flex">
          <span className="text-sub-text shrink-0">作成日時</span>
          <span>
            {formatDateTimeFromString(
              documentVersionDetail.officialDocumentVersion.updatedAt,
            )}
          </span>
        </p>
      </div>

      <div className="pt-4">
        <Button
          onClick={handleRestoreClick}
          prefixElement={<RotateCcw />}
          variant="outlined"
        >
          正文書更新申請
        </Button>
      </div>

      <DocumentsVersionDetailTable
        documentVersionDetail={documentVersionDetail}
        onDocumentNameClick={handleDocumentNameClick}
        onRowDoubleClick={handleRowDoubleClick}
      />

      {isLoading && <SpinnerOverlay />}
    </MainContent>
  );
};
