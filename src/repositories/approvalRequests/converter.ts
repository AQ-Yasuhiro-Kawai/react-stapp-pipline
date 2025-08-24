import camelcaseKeys from "camelcase-keys";
import type { ApprovalTicket } from "@/domain/approvalRequests/types";
import type {
  TicketApplicationTypeCode,
  TicketStatusTypeCode,
} from "@/domain/tickets/types";

/**
 * APIから返ってくるレスポンス全体の型
 */
export type RawApprovalTicketsResponse = {
  total_count: number;
  total_page: number;
  current_page: number;
  results: RawApprovalTicket[];
};

// APIから返ってくる生の申請者の型
type RawApplicant = {
  user_id: string;
  name: string;
  user_principal_name: string;
  organization_name: string;
  position_name: string;
};

// APIから返ってくる生のチケットの型
export type RawApprovalTicket = {
  ticket_id: string;
  ticket_name: string;
  ticket_application_type_code: TicketApplicationTypeCode;
  created_at: string;
  ticket_status_type_code: TicketStatusTypeCode;
  applicant: RawApplicant;
  completed_at: string | null;
  display_ticket_id: string;
  user_resolved: boolean;
};

/**
 * APIのレスポンスをドメインモデルに変換
 * @param rawTicket APIから受け取った生のチケットデータ
 * @returns フロントエンドで扱うApprovalTicket型のデータ
 */
export const convertToApprovalTicket = (
  rawTicket: RawApprovalTicket,
): ApprovalTicket => {
  return camelcaseKeys(rawTicket, { deep: true });
};
