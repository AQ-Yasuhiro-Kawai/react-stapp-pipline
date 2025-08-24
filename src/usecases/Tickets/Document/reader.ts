import {
  useQuery,
  useSuspenseQueries,
  useSuspenseQuery,
} from "@tanstack/react-query";
import camelcaseKeys from "camelcase-keys";
import {
  ApprovalGroupIdSchema,
  ApprovalStepIdSchema,
  type ApprovalTemplateDetail,
  ApprovalTemplateDetailIdSchema,
  ApprovalTemplateIdSchema,
  type ApprovalTemplates,
  ApproverIdSchema,
  type ChildOrganizations,
  type FileType,
  type TargetOrganizations,
} from "@/domain/tickets/Document/type";
import { useOfficialDocumentRepository } from "@/repositories/Tickets/officialDocument/repository";
import type {
  ApprovalTemplatesDetailResponse,
  ApprovalTemplatesResponse,
  ChildOrganizationsResponse,
  FileTypesResponse,
  TargetOrganizationsResponse,
} from "@/repositories/Tickets/officialDocument/type";
import { ticketsDocumentKeys } from "./cache";

// 承認テンプレート一覧取得のクエリ
export const useApprovalTemplatesQuery = (searchWord: string) => {
  const repository = useOfficialDocumentRepository();

  return useSuspenseQuery<ApprovalTemplatesResponse, Error, ApprovalTemplates>({
    queryKey: ticketsDocumentKeys.approvalTemplates(searchWord),
    queryFn: () =>
      repository.getApprovalTemplates({ template_name_contains: searchWord }),
    select: (data: ApprovalTemplatesResponse): ApprovalTemplates =>
      data.map((template) => ({
        id: ApprovalTemplateIdSchema.parse(template.id),
        templateName: template.template_name,
      })),
    staleTime: 0,
    gcTime: 0,
  });
};

// 承認テンプレート詳細取得クエリ（条件付き）
export const useApprovalTemplatesDetailQuery = (templateId: string | null) => {
  const repository = useOfficialDocumentRepository();

  return useQuery<
    ApprovalTemplatesDetailResponse,
    Error,
    ApprovalTemplateDetail
  >({
    queryKey: ticketsDocumentKeys.approvalTemplatesDetail(templateId || ""),
    queryFn: () => {
      if (!templateId) throw new Error("Template ID is required");
      return repository.getApprovalTemplateDetail(templateId);
    },
    enabled: !!templateId,
    select: (data: ApprovalTemplatesDetailResponse): ApprovalTemplateDetail => {
      return {
        id: ApprovalTemplateDetailIdSchema.parse(data.id),
        templateName: data.template_name,
        approvalStepTemplates: data.approval_step_templates.map((step) => ({
          id: ApprovalStepIdSchema.parse(step.id),
          stepNumber: step.step_number,
          approvalGroupTemplates: step.approval_group_templates.map(
            (group) => ({
              id: ApprovalGroupIdSchema.parse(group.id),
              requiredApprovalCount: group.required_approval_count,
              approverTemplates: group.approver_templates.map((approver) => ({
                id: ApproverIdSchema.parse(approver.id),
                userId: approver.user_id,
                name: approver.name,
                userPrincipalName: approver.user_principal_name,
                organizationName: approver.organization_name,
                positionName: approver.position_name,
              })),
            }),
          ),
        })),
      };
    },
  });
};

// ワークフロー申請_登録で使用するクエリをまとめて取得
export const useNewTicketsQueries = () => {
  const repository = useOfficialDocumentRepository();

  return useSuspenseQueries({
    queries: [
      {
        queryKey: ticketsDocumentKeys.fileType,
        queryFn: () => repository.getFileTypes(),
        select: (data: FileTypesResponse): FileType =>
          camelcaseKeys(data, { deep: true }),
      },
      {
        queryKey: ticketsDocumentKeys.sourceOrganizations,
        queryFn: () => repository.getSourceOrganizations(),
        select: (data: ChildOrganizationsResponse): ChildOrganizations =>
          camelcaseKeys(data, { deep: true }),
      },
      {
        queryKey: ticketsDocumentKeys.targetOrganizations,
        queryFn: () => repository.getTargetOrganizations(),
        select: (data: TargetOrganizationsResponse): TargetOrganizations =>
          camelcaseKeys(data),
      },
    ],
    combine: (results) => {
      return {
        fileType: results[0],
        sourceOrganizations: results[1],
        targetOrganizations: results[2],
        isPending: results.some((result) => result.isPending),
        isError: results.some((result) => result.isError),
      };
    },
  });
};
