import type {
  TicketApplicationTypeCode,
  TicketStatusTypeCode,
} from "../tickets/types";

export type DateRange = {
  start?: string;
  end?: string;
};

/**
 * 承認一覧で表示されるチケット単体の型。
 */
export type ApprovalTicket = {
  ticketId: string;
  ticketName: string;
  ticketApplicationTypeCode: TicketApplicationTypeCode;
  createdAt: string;
  ticketStatusTypeCode: TicketStatusTypeCode;
  applicant: {
    userId: string;
    name: string;
    userPrincipalName: string;
    organizationName: string;
    positionName: string;
  };
  completedAt: string | null;
  displayTicketId: string;
  userResolved: boolean;
};

/**
 * 承認一覧を取得するためのパラメーターの型
 */
export type ApprovalListParams = {
  ticketNameContains?: string;
  ticketApplicationTypeCodes?: string[];
  userResolved?: boolean;
  ticketStatusTypeCodes?: string[];
  applicantUserId?: string;
  createdAtRange?: DateRange;
  displayTicketId?: string;
  sortBy?: string;
  pageSize?: number;
  page?: number;
};
