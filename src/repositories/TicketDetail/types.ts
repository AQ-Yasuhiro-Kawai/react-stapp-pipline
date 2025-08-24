import type {
  Applicant,
  CodeNamePair,
  StorageItem,
} from "@/domain/tickets/TicketDetail/types";

type OfficialDocumentItem = {
  id: string;
  beforeConversionItem: StorageItem | null;
  officialDocumentItem: StorageItem | null;
  projectId: string;
  originalSystemUrl: string;
  originalSystemFolderName: string;
  originalSystemFileName: string;
  originalSystemFileId: string;
  originalSystemLastUpdatedUser: string;
  originalSystemLastUpdatedAt: string;
  originalSystemVersion: string;
  documentId: string;
  itemOperation: "add" | "update" | "delete" | "none";
};

type OfficialDocumentInfo = {
  officialDocumentId: string;
  officialDocumentName: string;
  publicationTargetOrganizationCode: CodeNamePair;
  publicationSourceOrganizationCode: CodeNamePair;
  publicationScopeCode: CodeNamePair;
  fileType: string;
};

type DocumentInfoWithItems = OfficialDocumentInfo & {
  officialDocumentItems?: OfficialDocumentItem[];
  addingOfficialDocumentItems?: OfficialDocumentItem[];
};

type Approver = Applicant & {
  approved: boolean;
};

type ApprovalGroup = {
  approvers: Approver[];
  requiredApprovalCount: number;
  approvedNum: number;
};

type ApprovalStep = {
  approvalGroups: ApprovalGroup[];
  stepNumber: number;
};

type TicketLog = {
  approvalActionCode?: "approve" | "reject";
  ticketActionTypeCode?: "start_application" | "withdraw" | "cancel";
  comment?: string;
  approver?: Applicant;
  applicant?: Applicant;
  operatedAt: string;
};

export type TicketDetail = {
  ticketId: string;
  ticketName: string;
  ticketApplicationTypeCode: "register" | "update" | "delete";
  ticketApplicationTypeName: string;
  createdAt: string;
  ticketStatusTypeCode:
    | "draft"
    | "on_approval"
    | "reject"
    | "completed"
    | "withdraw";
  ticketStatusTypeName: string;
  applicant: Applicant;
  completedAt: string | null;
  displayTicketId: string;
  targetOfficialDocumentLatestInfo: DocumentInfoWithItems | null;
  applicationOfficialDocumentInfo: DocumentInfoWithItems | null;
  approvalRoute: ApprovalStep[];
  ticketLogs: TicketLog[];
  notes: string;
};
