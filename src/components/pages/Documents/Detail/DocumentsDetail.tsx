import { History, SquarePen, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { DocumentsDetailTable } from "@/components/domain/Documents/DocumentsIDetailTable";
import { Button } from "@/components/ui/Button";
import { MainContent } from "@/components/ui/Layout";
import { SpinnerOverlay } from "@/components/ui/Spinner";
import { SectionTitle } from "@/components/ui/Title";
import { usePdfPreview } from "@/hooks/usePdfPreview";
import { useBoundStore } from "@/store/store";
import { useGetDocumentDetailQuery } from "@/usecases/document/reader";
import { formatDateTimeFromString } from "@/utils/dateFormatter";

export const DocumentsDetailPage = () => {
  const { document_id: documentId } = useParams<{ document_id: string }>();
  const { data: documentDetail } = useGetDocumentDetailQuery(documentId);
  const navigate = useNavigate();
  const isLoading = useBoundStore((state) => state.isLoading);
  const { openPreview } = usePdfPreview();

  const handleUpdateClick = () => {
    // TODO: 正文書更新申請画面に遷移する
    console.log("Update document clicked");
  };
  const handleDeleteClick = () => {
    // TODO: 正文書削除申請画面に遷移する
    console.log("Delete document clicked");
  };
  const handleHistoryClick = () => {
    navigate(`/documents/${documentId}/versions`);
  };

  const handleItemClick = (id: string) => {
    openPreview(id);
  };
  const handleRowDoubleClick = (id: string) => {
    openPreview(id);
  };

  return (
    <MainContent pageTitle="正文書詳細">
      <SectionTitle>{documentDetail.officialDocumentName}</SectionTitle>

      <p className="font-bold">
        {documentDetail?.publicationSourceOrganizationCode.name}
      </p>

      <div className="flex flex-wrap space-x-10 pt-4">
        <p className="space-x-2 flex">
          <span className="text-sub-text shrink-0">文書種類</span>
          <span>{documentDetail.fileType}</span>
        </p>

        <p className="space-x-2 flex">
          <span className="text-sub-text shrink-0">公開範囲</span>
          <span>{documentDetail.publicationScopeCode.name}</span>
        </p>

        <p className="space-x-2 flex">
          <span className="text-sub-text shrink-0">作成者</span>
          <span>{documentDetail.applicant.name}</span>
        </p>

        <p className="space-x-2 flex">
          <span className="text-sub-text shrink-0">作成日時</span>
          <span>{formatDateTimeFromString(documentDetail.approvedAt)}</span>
        </p>
      </div>

      <div className="flex pt-4 space-x-4">
        <Button
          onClick={handleUpdateClick}
          prefixElement={<SquarePen />}
          variant="outlined"
        >
          正文書更新申請
        </Button>
        <Button
          onClick={handleDeleteClick}
          prefixElement={<Trash2 />}
          variant="outlined"
        >
          正文書削除申請
        </Button>
        <Button
          className="ml-auto"
          onClick={handleHistoryClick}
          prefixElement={<History />}
          variant="outlined"
        >
          過去バージョン
        </Button>
      </div>

      <DocumentsDetailTable
        documentDetail={documentDetail}
        onItemClick={handleItemClick}
        onRowDoubleClick={handleRowDoubleClick}
      />

      {isLoading && <SpinnerOverlay />}
    </MainContent>
  );
};
