import { HttpResponse, http } from "msw";
import type {
  ApprovalTemplatesDetailResponse,
  ApprovalTemplatesResponse,
  ApprovalTemplatesSearchQueryParam,
  ChildOrganizationsResponse,
  FileTypesResponse,
  OfficialDocumentTicketPostRequest,
  TargetOrganizationsResponse,
} from "@/repositories/Tickets/officialDocument/type";

const BASE_URL = import.meta.env.VITE_API_URL;

const getFileTypes = () => {
  return http.get(`${BASE_URL}/api/file-types`, () => {
    return HttpResponse.json<FileTypesResponse>({
      organization_file_types: [
        {
          organization: {
            code: "org-123",
            name: "Test Organization 1",
          },
          supported_document_types: ["見積り", "稟議書", "契約書"],
        },
        {
          organization: {
            code: "org-456",
            name: "Test Organization 2",
          },
          supported_document_types: ["AAAA", "BBBB", "CCCC"],
        },
      ],
    });
  });
};

const getSourceOrganizations = () => {
  return http.get(`${BASE_URL}/api/source-organizations`, () => {
    return HttpResponse.json<ChildOrganizationsResponse>({
      child_organizations: [
        { code: "org-123", name: "Child Org 1", is_bottom: true },
        { code: "org-456", name: "Child Org 2", is_bottom: false },
      ],
    });
  });
};

const getTargetOrganizations = () => {
  return http.get(`${BASE_URL}/api/target-organizations`, () => {
    return HttpResponse.json<TargetOrganizationsResponse>({
      organizations: [
        { code: "org-789", name: "Target Org 1" },
        { code: "org-101", name: "Target Org 2" },
      ],
    });
  });
};

// API-004-03 承認ルートテンプレート一覧取得API
const getApprovalTemplates = () => {
  return http.get<
    ApprovalTemplatesSearchQueryParam,
    never,
    ApprovalTemplatesResponse
  >(`${BASE_URL}/api/approval-templates`, ({ request }) => {
    const url = new URL(request.url);
    const templateNameContains = url.searchParams.get("template_name_contains");

    const mockData = [
      { id: "template-001", template_name: "稟議書申請テンプレート" },
      { id: "template-002", template_name: "契約書申請テンプレート" },
    ];

    const filteredTemplate = templateNameContains
      ? mockData.filter((template) =>
          template.template_name.includes(templateNameContains),
        )
      : mockData;

    return HttpResponse.json<ApprovalTemplatesResponse>(filteredTemplate);
  });
};

// API-004-12 承認ルートテンプレート詳細取得API
const getApprovalTemplatesDetail = () =>
  http.get<{ templateId: string }>(
    `${BASE_URL}/api/approval-templates/:templateId`,
    ({ params }) => {
      const { templateId } = params;
      let mockData: ApprovalTemplatesDetailResponse;

      const mockData1: ApprovalTemplatesDetailResponse = {
        id: "template-001",
        template_name: "稟議書申請テンプレート",
        approval_step_templates: [
          {
            id: "step-001",
            approval_group_templates: [
              {
                id: "group-001",
                approver_templates: [
                  {
                    user_id: "user-001",
                    name: "田中 太郎",
                    user_principal_name: "田中",
                    organization_name: "営業部",
                    position_name: "部長",
                    id: "approver-001",
                  },
                  {
                    user_id: "user-002",
                    name: "佐藤 花子",
                    user_principal_name: "佐藤",
                    organization_name: "営業部",
                    position_name: "課長",
                    id: "approver-002",
                  },
                ],
                required_approval_count: 1,
              },
            ],
            step_number: 1,
          },
          {
            id: "step-002",
            approval_group_templates: [
              {
                id: "group-002",
                approver_templates: [
                  {
                    user_id: "user-003",
                    name: "鈴木 一郎",
                    user_principal_name: "鈴木",
                    organization_name: "経営企画部",
                    position_name: "本部長",
                    id: "approver-003",
                  },
                ],
                required_approval_count: 1,
              },
            ],
            step_number: 2,
          },
        ],
      };
      // mockData1の内容をtemplateId-002に合わせて変更
      const mockData2: ApprovalTemplatesDetailResponse = {
        id: "template-002",
        template_name: "契約書申請テンプレート",
        approval_step_templates: [
          {
            id: "step-001",
            approval_group_templates: [
              {
                id: "group-001",
                approver_templates: [
                  {
                    user_id: "user-004",
                    name: "山田 太郎",
                    user_principal_name: "山田",
                    organization_name: "法務部",
                    position_name: "部長",
                    id: "approver-004",
                  },
                ],
                required_approval_count: 1,
              },
              {
                id: "group-002",
                approver_templates: [
                  {
                    user_id: "user-005",
                    name: "中村 花子",
                    user_principal_name: "中村",
                    organization_name: "法務部",
                    position_name: "課長",
                    id: "approver-005",
                  },
                  {
                    user_id: "user-006",
                    name: "高橋 一郎",
                    user_principal_name: "高橋",
                    organization_name: "法務部",
                    position_name: "主任",
                    id: "approver-006",
                  },
                  {
                    user_id: "user-007",
                    name: "佐々木 次郎",
                    user_principal_name: "佐々木",
                    organization_name: "法務部",
                    position_name: "担当",
                    id: "approver-007",
                  },
                  {
                    user_id: "user-008",
                    name: "伊藤 三郎",
                    user_principal_name: "伊藤",
                    organization_name: "法務部",
                    position_name: "アシスタント",
                    id: "approver-008",
                  },
                ],
                required_approval_count: 2,
              },
              {
                id: "group-003",
                approver_templates: [
                  {
                    user_id: "user-009",
                    name: "渡辺 四郎",
                    user_principal_name: "渡辺",
                    organization_name: "法務部",
                    position_name: "部長代理",
                    id: "approver-009",
                  },
                ],
                required_approval_count: 1,
              },
              {
                id: "group-004",
                approver_templates: [
                  {
                    user_id: "user-010",
                    name: "山本 五郎",
                    user_principal_name: "山本",
                    organization_name: "法務部",
                    position_name: "アシスタントマネージャー",
                    id: "approver-010",
                  },
                ],
                required_approval_count: 1,
              },
            ],
            step_number: 1,
          },
        ],
      };

      if (templateId === "template-001") {
        mockData = mockData1;
      } else {
        mockData = mockData2;
      }

      return HttpResponse.json<ApprovalTemplatesDetailResponse>(mockData);
    },
  );

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// API-004-01 ワークフローチケット作成API
const postOfficialDocumentTickets = () => {
  return http.post<never, OfficialDocumentTicketPostRequest>(
    `${BASE_URL}/api/tickets`,
    async ({ request }) => {
      console.log("Request body:", request.body);
      await sleep(10000);
      return HttpResponse.json({ undefined }, { status: 201 });
    },
  );
};

export const documentResolvers = [
  getFileTypes(),
  getSourceOrganizations(),
  getTargetOrganizations(),
  getApprovalTemplates(),
  getApprovalTemplatesDetail(),
  postOfficialDocumentTickets(),
];
