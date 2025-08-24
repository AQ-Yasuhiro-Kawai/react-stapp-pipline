import type {
  Organization,
  TargetOrganizations,
} from "@/domain/tickets/Document/type";
import type { TicketApplicationTypeCode } from "@/domain/tickets/types";

export type FileTypesResponse = {
  organization_file_types: Array<{
    organization: Organization;
    supported_document_types: string[];
  }>;
};
export type ChildOrganizationsResponse = {
  child_organizations: Array<Organization & { is_bottom: boolean }>;
};
export type TargetOrganizationsResponse = TargetOrganizations;

// API-004-03 承認ルートテンプレート一覧取得API
export type ApprovalTemplatesResponse = {
  id: string;
  template_name: string;
}[];

export type ApprovalTemplatesSearchQueryParam = {
  template_name_contains?: string;
};

export type OfficialDocumentTicketPostRequest = {
  ticket_name: string;
  ticket_application_type_code: TicketApplicationTypeCode;
  application_official_document_info: {
    official_document_id?: string;
    official_document_name: string;
    publication_target_organization_code: Organization;
    publication_source_organization_code: Organization;
    publication_scope_code: Organization;
    file_type: string;
    delete_official_document_item_ids: string[];
    remain_official_document_item_ids: string[];
    replace_official_document_item_ids: string[];
  };
  application_files: {
    project_id: string;
    original_item_info: {
      url: string;
      folder_name: string;
      file_name: string;
      file_id: string;
      last_updated_at: string;
      version: string;
    };
    request_id: string;
    file_content_hash: string;
  }[];
  approval_route: {
    approval_groups: {
      approvers: {
        user_id: string;
      }[];
      required_approval_count: number;
    }[];
    step_number: number;
  }[];
  notes: string;
};

/**
 * API-004-12 承認ルートテンプレート詳細取得APIが返すレスポンスの型
 */
export type ApprovalTemplatesDetailResponse = {
  id: string;
  template_name: string;
  approval_step_templates: {
    id: string;
    approval_group_templates: {
      id: string;
      approver_templates: {
        user_id: string;
        name: string;
        user_principal_name: string;
        organization_name: string;
        position_name: string;
        id: string;
      }[];
      required_approval_count: number;
    }[];
    step_number: number;
  }[];
};
