import { useSuspenseQuery } from "@tanstack/react-query";
import type {
  TicketApplicationTypeList,
  TicketStatusTypeList,
} from "@/domain/tickets/types";
import { useTicketRepository } from "@/repositories/Tickets/repository";
import type {
  TicketApplicationTypesResponse,
  TicketStatusesResponse,
} from "@/repositories/Tickets/type";
import { ticketKeys } from "./cache";

// チケットのステータス一覧取得のクエリ
export const useTicketStatusesQuery = () => {
  const repository = useTicketRepository();

  return useSuspenseQuery<TicketStatusesResponse, Error, TicketStatusTypeList>({
    queryKey: ticketKeys.ticketStatuses,
    queryFn: () => repository.getTicketStatuses(),
    select: (data: TicketStatusesResponse): TicketStatusTypeList =>
      data.ticket_statuses.map((statusCode) => statusCode.code),
  });
};

// チケットの申請種類一覧取得のクエリ
export const useTicketTypesQuery = () => {
  const repository = useTicketRepository();

  return useSuspenseQuery<
    TicketApplicationTypesResponse,
    Error,
    TicketApplicationTypeList
  >({
    queryKey: ticketKeys.ticketTypes,
    queryFn: () => repository.getTicketTypes(),
    select: (data: TicketApplicationTypesResponse): TicketApplicationTypeList =>
      data.ticket_types.map((typeCode) => typeCode.code),
  });
};
