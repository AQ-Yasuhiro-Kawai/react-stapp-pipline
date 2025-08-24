export type TicketApplicationTypeCode = "register" | "update" | "delete";

export type TicketApplicationTypeList = Array<TicketApplicationTypeCode>;

export type TicketStatusTypeCode =
  | "draft"
  | "on_approval"
  | "reject"
  | "completed"
  | "withdraw";

export type TicketStatusTypeList = Array<TicketStatusTypeCode>;
