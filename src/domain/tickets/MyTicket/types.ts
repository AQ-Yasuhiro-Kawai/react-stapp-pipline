import type { TicketApplicationTypeCode, TicketStatusTypeCode } from "../types";

/**
 * 日付範囲の型
 */
export type DateRange = {
  start?: string;
  end?: string;
};

/**
 * チケットの申請者の型
 */
export type Applicant = {
  userId: string;
  name: string;
  userPrincipalName: string;
  organizationName: string;
  positionName: string;
};

/**
 * チケット単体のドメインモデル
 */
export type Ticket = {
  ticketId: string;
  ticketName: string;
  ticketApplicationTypeCode: TicketApplicationTypeCode;
  createdAt: string;
  ticketStatusTypeCode: TicketStatusTypeCode;
  applicant: Applicant;
  completedAt: string | null;
  displayTicketId: string;
};

/**
 * チケット一覧を取得するためのパラメーターの型
 */
export type TicketListParams = {
  ticketNameContains?: string;
  applicationTypeCodes?: string[];
  statusTypeCodes?: string[];
  displayTicketId?: string;
  createdAtRange?: DateRange;
  completedAtRange?: DateRange;
  sortBy?: string; // 例: 'ticket_name:asc,completed_at:desc'
  pageSize?: number;
  page?: number;
};
