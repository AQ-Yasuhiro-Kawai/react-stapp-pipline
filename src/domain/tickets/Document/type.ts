import { z } from "zod";
import type { ConvertedPdf } from "@/domain/Projects/type";
import type { TicketApplicationTypeCode } from "@/domain/tickets/types";

/**
 * 正文書申請に関するtype
 */

// 公開先組織
type Organization = {
  code: string;
  name: string;
};
type TargetOrganizations = {
  organizations: Organization[];
};

// 文書種類
type FileType = {
  organizationFileTypes: {
    organization: Organization;
    supportedDocumentTypes: string[];
  }[];
};

// 管理元組織
type ChildOrganization = Organization & { isBottom: boolean };
type ChildOrganizations = {
  childOrganizations: ChildOrganization[];
};

// 承認ルートテンプレート
const ApprovalTemplateIdSchema = z.string().brand("ApprovalTemplateId");
type ApprovalTemplateId = z.infer<typeof ApprovalTemplateIdSchema>;
type ApprovalTemplate = {
  id: ApprovalTemplateId;
  templateName: string;
};
type ApprovalTemplates = ApprovalTemplate[];

// 承認ルートテンプレート詳細
const ApproverIdSchema = z.string().brand("ApproverId");
type ApproverId = z.infer<typeof ApproverIdSchema>;
type Approver = {
  id: ApproverId;
  userId: string;
  name: string;
  userPrincipalName: string;
  organizationName: string;
  positionName: string;
};

const ApprovalGroupIdSchema = z.string().brand("ApprovalGroupId");
type ApprovalGroupId = z.infer<typeof ApprovalGroupIdSchema>;
type ApprovalGroupTemplates = {
  id: ApprovalGroupId;
  requiredApprovalCount: number;
  approverTemplates: Approver[];
};

const ApprovalStepIdSchema = z.string().brand("ApprovalStepId");
type ApprovalStepId = z.infer<typeof ApprovalStepIdSchema>;
type ApprovalStepTemplates = {
  id: ApprovalStepId;
  stepNumber: number;
  approvalGroupTemplates: ApprovalGroupTemplates[];
};

const ApprovalTemplateDetailIdSchema = z
  .string()
  .brand("ApprovalTemplateDetailId");
type ApprovalTemplateDetailId = z.infer<typeof ApprovalTemplateDetailIdSchema>;
type ApprovalTemplateDetail = {
  id: ApprovalTemplateDetailId;
  templateName: string;
  approvalStepTemplates: ApprovalStepTemplates[];
};

// 申請
type PublicationTargetOrganizationCode = Organization;
type PublicationSourceOrganizationCode = Organization;
type PublicationScopeCode = Organization;
type ApplicationOfficialDocumentInfo = {
  officialDocumentId?: string;
  officialDocumentName: string;
  publicationTargetOrganizationCode: PublicationTargetOrganizationCode;
  publicationSourceOrganizationCode: PublicationSourceOrganizationCode;
  publicationScopeCode: PublicationScopeCode;
  fileType: string;
  deleteOfficialDocumentItemIds: string[];
  remainOfficialDocumentItemIds: string[];
  replaceOfficialDocumentItemIds: string[];
};
type OriginalItemInfo = {
  url: string;
  folderName: string;
  fileName: string;
  fileId: string;
  lastUpdatedAt: string;
  version: string;
};

type ApplicationFile = {
  projectId: string; // TODO: プロジェクトidの型に変更する
  originalItemInfo: OriginalItemInfo;
  fileContentHash: ConvertedPdf["fileContentHash"];
  requestId: ConvertedPdf["requestId"];
};

type ApprovalRouteApprover = {
  userId: string; //
};

type ApprovalGroup = {
  approvers: ApprovalRouteApprover[];
  requiredApprovalCount: number;
};

type ApprovalRoute = {
  approvalGroups: ApprovalGroup[];
  stepNumber: number;
};
// 正文書申請用Request Type
type TicketApplicationRequest = {
  ticketName: string;
  ticketApplicationTypeCode: TicketApplicationTypeCode;
  applicationOfficialDocumentInfo: ApplicationOfficialDocumentInfo;
  applicationFiles: ApplicationFile[];
  approvalRoute: ApprovalRoute[];
  notes: string;
};

export type {
  Organization,
  TargetOrganizations,
  FileType,
  ChildOrganization,
  ChildOrganizations,
  ApprovalTemplate,
  ApprovalTemplates,
  Approver,
  ApprovalGroupTemplates,
  ApprovalTemplateDetail,
  TicketApplicationRequest,
};
export {
  ApprovalTemplateIdSchema,
  ApprovalTemplateDetailIdSchema,
  ApprovalStepIdSchema,
  ApproverIdSchema,
  ApprovalGroupIdSchema,
};
