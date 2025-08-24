import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import snakecaseKeys from "snakecase-keys";
import { useShallow } from "zustand/shallow";
import type { TicketApplicationRequest } from "@/domain/tickets/Document/type";
import { useOfficialDocumentRepository } from "@/repositories/Tickets/officialDocument/repository";
import type { OfficialDocumentTicketPostRequest } from "@/repositories/Tickets/officialDocument/type";
import { pdfFileSelector } from "@/store/projects/pdfFileSlice";
import { useBoundStore } from "@/store/store";

/**
 * 正文書 ワークフローチケット作成API
 */
export const usePostOfficialDocumentTicket = (closeModal: () => void) => {
  const repository = useOfficialDocumentRepository();
  const navigate = useNavigate();
  const { reset } = useBoundStore(useShallow(pdfFileSelector));

  return useMutation<
    OfficialDocumentTicketPostRequest,
    Error,
    TicketApplicationRequest
  >({
    mutationFn: (payload) => {
      const snakePayload = snakecaseKeys(payload, { deep: true });
      return repository.postOfficialDocumentTickets(snakePayload);
    },
    onSuccess: () => {
      reset();
      closeModal();
      navigate("/tickets/mytickets", { replace: true });
    },
    onError: (error) => {
      console.error("ワークフローチケット作成に失敗しました。", error);
      closeModal();
    },
  });
};
