import type {
  TicketApplicationTypeCode,
  TicketStatusTypeCode,
} from "@/domain/tickets/types";

export type TicketStatusesResponse = {
  ticket_statuses: Array<{ code: TicketStatusTypeCode }>;
};

export type TicketApplicationTypesResponse = {
  ticket_types: Array<{ code: TicketApplicationTypeCode }>;
};
