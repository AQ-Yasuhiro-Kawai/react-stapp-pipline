import camelcaseKeys from "camelcase-keys";
import type { TicketDetail } from "./types";

type RawCodeNamePair = {
  code: string;
  name: string;
};

type RawStorageItem = {
  storage_item_id: string;
  storage_location_url: string;
  file_name: string;
};

type RawApplicant = {
  user_id: string;
  name: string;
  user_principal_name: string;
  organization_name: string;
  position_name: string;
};

type RawOfficialDocumentItem = {
  id: string;
  before_conversion_item: RawStorageItem | null;
  official_document_item: RawStorageItem | null;
  project_id: string;
  original_system_url: string;
  original_system_folder_name: string;
  original_system_file_name: string;
  original_system_file_id: string;
  original_system_last_updated_user: string;
  original_system_last_updated_at: string;
  original_system_version: string;
  document_id: string;
  item_operation: "add" | "update" | "delete" | "none";
};

type RawDocumentInfoWithItems = {
  official_document_id: string;
  official_document_name: string;
  publication_target_organization_code: RawCodeNamePair;
  publication_source_organization_code: RawCodeNamePair;
  publication_scope_code: RawCodeNamePair;
  file_type: string;
  official_document_items?: RawOfficialDocumentItem[];
  adding_official_document_items?: RawOfficialDocumentItem[];
};

type RawApprover = RawApplicant & {
  approved: boolean;
};

type RawApprovalGroup = {
  approvers: RawApprover[];
  required_approval_count: number;
  approved_num: number;
};

type RawApprovalStep = {
  approval_groups: RawApprovalGroup[];
  step_number: number;
};

type RawTicketLog = {
  approval_action_code?: "approve" | "reject";
  ticket_action_type_code?: "start_application" | "withdraw" | "cancel";
  comment?: string;
  approver?: RawApplicant;
  applicant?: RawApplicant;
  operated_at: string;
};

/**
 * APIから返ってくる生のチケット詳細データの型
 */
export type RawTicketDetail = {
  ticket_id: string;
  ticket_name: string;
  ticket_application_type_code: "register" | "update" | "delete";
  ticket_application_type_name: string;
  created_at: string;
  ticket_status_type_code:
    | "draft"
    | "on_approval"
    | "reject"
    | "completed"
    | "withdraw";
  ticket_status_type_name: string;
  applicant: RawApplicant;
  completed_at: string | null;
  display_ticket_id: string;
  target_official_document_latest_info: RawDocumentInfoWithItems | null;
  application_official_document_info: RawDocumentInfoWithItems | null;
  approval_route: RawApprovalStep[];
  ticket_logs: RawTicketLog[];
  notes: string;
};

/**
 * APIのレスンスをドメインモデルに変換
 * @param rawData APIから受け取った生のチケット詳細データ
 * @returns フロントエンドで扱うTicketDetail型のデータ
 */
export const convertToTicketDetail = (
  rawData: RawTicketDetail,
): TicketDetail => {
  return camelcaseKeys(rawData, { deep: true });
};
