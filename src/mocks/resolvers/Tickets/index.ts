import { HttpResponse, http } from "msw";
import type {
  TicketApplicationTypesResponse,
  TicketStatusesResponse,
} from "@/repositories/Tickets/type";

const BASE_URL = import.meta.env.VITE_API_URL;

const getTicketStatuses = () => {
  return http.get(`${BASE_URL}/api/ticket-statuses`, () => {
    return HttpResponse.json<TicketStatusesResponse>({
      ticket_statuses: [
        { code: "draft" },
        { code: "on_approval" },
        { code: "reject" },
        { code: "completed" },
        { code: "withdraw" },
      ],
    });
  });
};

const getTicketTypes = () => {
  return http.get(`${BASE_URL}/api/ticket-types`, () => {
    return HttpResponse.json<TicketApplicationTypesResponse>({
      ticket_types: [
        { code: "register" },
        { code: "update" },
        { code: "delete" },
      ],
    });
  });
};

export const ticketResolvers = [getTicketStatuses(), getTicketTypes()];
