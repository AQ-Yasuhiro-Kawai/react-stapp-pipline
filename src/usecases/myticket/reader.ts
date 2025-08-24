import { useSuspenseQuery } from "@tanstack/react-query";
import type { TicketListParams } from "@/domain/tickets/MyTicket/types";
import { useMyTicketRepository } from "@/repositories/myticket/repository";
import { myTicketsKeys } from "./cache";

export const useMyTicketsQuery = (params: TicketListParams) => {
  const repository = useMyTicketRepository();

  return useSuspenseQuery({
    queryKey: myTicketsKeys.list(params),
    queryFn: () => repository.getMyTickets(params),
  });
};
