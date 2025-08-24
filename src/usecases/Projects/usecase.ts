import { useMutation } from "@tanstack/react-query";
import snakecaseKeys from "snakecase-keys";
import { useShallow } from "zustand/shallow";
import type { PdfConversionRequest } from "@/domain/Projects/type";
import { useProjectsRepository } from "@/repositories/Projects/repository";
import type { ConvertedPdfResponse } from "@/repositories/Projects/type";
import { pdfFileSelector } from "@/store/projects/pdfFileSlice";
import { useBoundStore } from "@/store/store";

export const usePdfConversionUsecase = () => {
  const repository = useProjectsRepository();
  const { completeFileConversion } = useBoundStore(useShallow(pdfFileSelector));

  return useMutation<ConvertedPdfResponse, Error, PdfConversionRequest>({
    mutationFn: async (payload: PdfConversionRequest) => {
      const snakePayload = snakecaseKeys(payload, { deep: true });
      const response = repository.requestPdfConversion(snakePayload);
      return response;
    },
    onSuccess: (data) => {
      console.log("PDF conversion request successful:", data);
      // storeに保存する
      completeFileConversion({
        providerItemId: data.provider_item_id,
        requestId: data.request_id,
        originalFileBlobUrl: data.original_file_blob_url,
        generatedFileBlobUrl: data.generated_file_blob_url,
        fileContentHash: data.file_content_hash,
      });
    },
    onError: (error) => {
      console.error("PDF conversion request failed:", error);
      throw error;
    },
  });
};
