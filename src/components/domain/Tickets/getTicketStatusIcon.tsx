import { Ticket, TicketCheck, TicketX } from "lucide-react";
import type { TicketStatusTypeCode } from "@/domain/tickets/types";

export const getTicketStatusIcon = (status: TicketStatusTypeCode) => {
  if (status === "draft" || status === "on_approval" || status === "withdraw") {
    return <Ticket />;
  } else if (status === "completed") {
    return <TicketCheck />;
  } else if (status === "reject") {
    return <TicketX />;
  }
  return null;
};
