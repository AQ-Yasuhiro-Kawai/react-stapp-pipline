import camelcaseKeys from "camelcase-keys";
import type { Ticket } from "@/domain/tickets/MyTicket/types";
import type {
  TicketApplicationTypeCode,
  TicketStatusTypeCode,
} from "@/domain/tickets/types";

// APIから返ってくる生の申請者の型
type RawApplicant = {
  user_id: string;
  name: string;
  user_principal_name: string;
  organization_name: string;
  position_name: string;
};

// APIから返ってくる生のチケットの型
export type RawTicket = {
  ticket_id: string;
  ticket_name: string;
  ticket_application_type_code: TicketApplicationTypeCode;
  created_at: string;
  ticket_status_type_code: TicketStatusTypeCode;
  applicant: RawApplicant;
  completed_at: string | null;
  display_ticket_id: string;
};

/**
 * APIのレスポンス（snake_case）をドメインモデル（camelCase）に変換する
 * @param rawTicket APIから受け取った生のチケットデータ
 * @returns フロントエンドで扱うTicket型のデータ
 */
export const convertToTicket = (rawTicket: RawTicket): Ticket => {
  return camelcaseKeys(rawTicket, { deep: true });
};
