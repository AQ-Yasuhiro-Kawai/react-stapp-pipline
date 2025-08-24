import { useCallback } from "react";
import { useGetDocumentFileMutation } from "@/usecases/document/reader";

export const usePdfPreview = () => {
  const { mutateAsync: getDocumentFile } = useGetDocumentFileMutation();

  const openPreview = useCallback(
    async (id: string) => {
      try {
        const blob = await getDocumentFile(id);
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      } catch (error) {
        console.error("PDFのプレビューに失敗しました:", error);
      }
    },
    [getDocumentFile],
  );

  return {
    openPreview,
  };
};
