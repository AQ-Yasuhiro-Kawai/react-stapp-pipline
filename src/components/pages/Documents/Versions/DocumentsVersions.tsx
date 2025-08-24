import { useNavigate, useParams } from "react-router";
import { DocumentsVersionTable } from "@/components/domain/Documents/DocumentsVersionTable";
import { MainContent } from "@/components/ui/Layout";
import { SectionTitle } from "@/components/ui/Title";
import { useGetDocumentVersionsQuery } from "@/usecases/document/reader";

export const DocumentVersionsPage = () => {
  const { document_id: documentId } = useParams<{ document_id: string }>();
  const { data: documentVersions } = useGetDocumentVersionsQuery(documentId);
  const navigate = useNavigate();

  const navigateToDetailPage = (versionId: string) => {
    navigate(`/documents/${documentId}/versions/${versionId}`);
  };

  const handleVersionClick = (versionId: string) => {
    navigateToDetailPage(versionId);
  };
  const handleRowDoubleClick = (versionId: string) => {
    navigateToDetailPage(versionId);
  };

  return (
    <MainContent pageTitle="正文書過去バージョン一覧">
      <SectionTitle>{documentVersions.officialDocumentName}</SectionTitle>

      <p className="font-bold">
        {documentVersions.publicationSourceOrganizationCode.name}
      </p>

      <div className="flex flex-wrap space-x-10 pt-4">
        <p className="space-x-2 flex">
          <span className="text-sub-text shrink-0">文書種類</span>
          <span>{documentVersions.fileType}</span>
        </p>

        <p className="space-x-2 flex">
          <span className="text-sub-text shrink-0">公開範囲</span>
          <span>{documentVersions.publicationScopeCode.name}</span>
        </p>
      </div>

      <DocumentsVersionTable
        documentVersions={documentVersions}
        onRowDoubleClick={handleRowDoubleClick}
        onVersionClick={handleVersionClick}
      />
    </MainContent>
  );
};
