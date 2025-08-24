export const ticketsDocumentKeys = {
  fileType: ["fileType"] as const,
  sourceOrganizations: ["sourceOrganizations"] as const,
  targetOrganizations: ["targetOrganizations"] as const,
  childOrganizations: ["childOrganizations"] as const,
  approvalTemplates: (searchWord: string) =>
    ["approvalTemplates", searchWord] as const,
  approvalTemplatesDetail: (templateId: string) =>
    [ticketsDocumentKeys.approvalTemplates, templateId] as const,
};
