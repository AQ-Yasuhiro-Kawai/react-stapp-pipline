import { useSuspenseQuery } from "@tanstack/react-query";
import {
  convertToTicketDetail,
  type RawTicketDetail,
} from "@/repositories/TicketDetail/converter";
import { useTicketDetailRepository } from "@/repositories/TicketDetail/repository";
import type { TicketDetail } from "@/repositories/TicketDetail/types";
import { ticketDetailKeys } from "./cache";

/**
 * チケット詳細情報を取得するためのSuspense対応カスタムフック
 * @param ticketId 取得するチケットのID
 */
export const useTicketDetailQuery = (ticketId: string) => {
  const repository = useTicketDetailRepository();

  return useSuspenseQuery<RawTicketDetail, Error, TicketDetail>({
    queryKey: ticketDetailKeys.detail(ticketId),
    queryFn: () => repository.getTicketDetail(ticketId),
    select: (data) => convertToTicketDetail(data),
  });
};
