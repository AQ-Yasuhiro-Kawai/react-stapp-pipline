import { HttpResponse, http } from "msw";
import type {
  DocumentDetailResponse,
  DocumentFileResponse,
  DocumentResponse,
  DocumentVersionDetailResponse,
  DocumentVersionResponse,
} from "@/repositories/Documents/type";

const BASE_URL = import.meta.env.VITE_API_URL;

const getDocumentVersions = () =>
  http.get(`${BASE_URL}/api/document-versions/:id`, ({ params }) => {
    const id = params.id as string;

    const mockData: DocumentVersionResponse = {
      official_document_id: id,
      official_document_name: "【重要】2025年度下期事業計画書.pdf",
      publication_target_organization_code: {
        code: "D001",
        name: "営業本部",
      },
      publication_source_organization_code: {
        code: "D002",
        name: "経営企画部",
      },
      publication_scope_code: {
        code: "S01",
        name: "全社公開",
      },
      file_type: "pdf",
      official_document_versions: [
        {
          id: "1",
          version: 1,
          updated_user: "高橋 一郎",
          updated_at: "2025-07-20T09:05:45.000Z",
        },
        {
          id: "2",
          version: 2,
          updated_user: "鈴木 花子",
          updated_at: "2025-07-25T11:20:15.000Z",
        },
        {
          id: "3",
          version: 3,
          updated_user: "佐藤 太郎",
          updated_at: "2025-07-30T17:30:00.000Z",
        },
        {
          id: "4",
          version: 4,
          updated_user: "山田 次郎",
          updated_at: "2025-08-05T14:15:30.000Z",
        },
        {
          id: "5",
          version: 5,
          updated_user: "田中 三郎",
          updated_at: "2025-08-10T08:45:00.000Z",
        },
        {
          id: "6",
          version: 6,
          updated_user: "中村 四郎",
          updated_at: "2025-08-15T12:00:00.000Z",
        },
        {
          id: "7",
          version: 7,
          updated_user: "小林 五郎",
          updated_at: "2025-08-20T10:30:00.000Z",
        },
        {
          id: "8",
          version: 8,
          updated_user: "加藤 六美",
          updated_at: "2025-08-25T16:45:00.000Z",
        },
        {
          id: "9",
          version: 9,
          updated_user: "斎藤 七子",
          updated_at: "2025-08-30T13:15:00.000Z",
        },
        {
          id: "10",
          version: 10,
          updated_user: "伊藤 八郎",
          updated_at: "2025-09-05T15:00:00.000Z",
        },
        {
          id: "11",
          version: 11,
          updated_user: "渡辺 九美",
          updated_at: "2025-09-10T11:30:00.000Z",
        },
        {
          id: "12",
          version: 12,
          updated_user: "山本 十郎",
          updated_at: "2025-09-15T09:00:00.000Z",
        },
      ],
    };

    return HttpResponse.json<DocumentVersionResponse>(mockData);
  });

const getDocumentVersionDetail = () =>
  http.get(
    `${BASE_URL}/api/document-versions/:documentId/:versionId`,
    ({ params }) => {
      const documentId = params.documentId as string;
      const versionId = params.versionId as string;

      const mockData: DocumentVersionDetailResponse = {
        official_document_id: documentId,
        official_document_name: "2025年度 第2四半期 業績報告書",
        publication_target_organization_code: {
          code: "DPT-003",
          name: "経理部",
        },
        publication_source_organization_code: {
          code: "DPT-007",
          name: "事業推進部",
        },
        publication_scope_code: {
          code: "SCOPE-DEPT",
          name: "部内限定",
        },
        file_type: "報告書",
        official_document_version: {
          id: versionId,
          version: 2,
          updated_user: "佐藤 美咲",
          updated_at: "2025-07-30T10:00:00.000Z",
        },
        official_document_items: [
          {
            project_id: "PROJ-FY25-Q2",
            original_system_url:
              "https://example.sharepoint.com/sites/sales/Shared%20Documents/",
            original_system_folder_name: "FY2025/業績報告",
            original_system_file_name: "業績報告書_v2_draft.docx",
            original_system_file_id: "fileid_98765",
            original_system_last_updated_at: "2025-07-30T09:45:15.000Z",
            original_system_version: "2.0",
            id: "item_v2-abcd-ef",
            before_conversion_item: {
              storage_item_id: "sid_pre_v2_1",
              storage_location_url:
                "https://storage.example.com/drafts/gyouseki_v2.docx",
              file_name: "業績報告書_v2_draft.docx",
            },
            official_document_item: {
              storage_item_id: "sid_post_v2_1",
              storage_location_url:
                "https://storage.example.com/official/doc_1a2b3c_v2.pdf",
              file_name: "2025年度_第2四半期_業績報告書_v2.pdf",
            },
          },
          {
            project_id: "PROJ-FY25-Q2",
            original_system_url:
              "https://example.sharepoint.com/sites/sales/Shared%20Documents/",
            original_system_folder_name: "FY2025/業績報告",
            original_system_file_name: "業績報告書_v2_final.pdf",
            original_system_file_id: "fileid_54321",
            original_system_last_updated_at: "2025-07-30T09:50:00.000Z",
            original_system_version: "2.1",
            id: "item_v2-final-abc-kl",
            before_conversion_item: {
              storage_item_id: "sid_pre_v2_2",
              storage_location_url:
                "https://storage.example.com/drafts/gyouseki_v2_final.pdf",
              file_name: "業績報告書_v2_final.pdf",
            },
            official_document_item: {
              storage_item_id: "sid_post_v2_2",
              storage_location_url:
                "https://storage.example.com/official/doc_4d5e6f_v2_final.pdf",
              file_name: "2025年度_第2四半期_業績報告書_v2_final.pdf",
            },
          },
        ],
      };

      return HttpResponse.json<DocumentVersionDetailResponse>(mockData);
    },
  );

const getDocumentFile = () =>
  http.get(
    `${BASE_URL}/api/documents/files/:documentId`,
    async ({ params }) => {
      const documentId = params.documentId as string;

      const response = await fetch("/samplePDF.pdf");
      const pdfBuffer = await response.arrayBuffer();

      return new HttpResponse(pdfBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="document_${documentId}.pdf"`,
        },
      });
    },
  );

const getDocuments = () =>
  http.get(`${BASE_URL}/api/documents`, () => {
    const mockData: DocumentResponse = {
      total_count: 23,
      total_page: 3,
      current_page: 1,
      results: [
        {
          official_document_id: "doc_aaa-bbb-ccc-111",
          official_document_name: "2025年度上期_事業計画書",
          publication_target_organization_code: {
            code: "DPT-ALL",
            name: "全社",
          },
          publication_source_organization_code: {
            code: "DPT-001",
            name: "経営企画部",
          },
          publication_scope_code: {
            code: "SCOPE-01",
            name: "全社公開",
          },
          file_type: "計画書",
          project_id: "PROJ-FY25-001",
          document_created_at: "2025-07-15T10:00:00.000Z",
        },
        {
          official_document_id: "doc_ddd-eee-fff-222",
          official_document_name:
            "新製品（コード名：Phoenix）ローンチに関する稟議書",
          publication_target_organization_code: {
            code: "ORG-EXEC",
            name: "役員会",
          },
          publication_source_organization_code: {
            code: "DPT-007",
            name: "製品開発部",
          },
          publication_scope_code: {
            code: "SCOPE-03",
            name: "関係者限り",
          },
          file_type: "稟議書",
          project_id: "PROJ-PHX-001",
          document_created_at: "2025-07-28T14:20:00.000Z",
        },
        {
          official_document_id: "doc_ggg-hhh-iii-333",
          official_document_name: "第2四半期_マーケティング施策報告",
          publication_target_organization_code: {
            code: "DPT-005",
            name: "マーケティング本部",
          },
          publication_source_organization_code: {
            code: "DPT-005-01",
            name: "マーケティング第一部",
          },
          publication_scope_code: {
            code: "SCOPE-02",
            name: "部内限定",
          },
          file_type: "報告書",
          project_id: "PROJ-MKT-Q2-003",
          document_created_at: "2025-08-01T09:00:00.000Z",
        },
      ],
    };

    return HttpResponse.json<DocumentResponse>(mockData);
  });

const getDocumentFiles = () =>
  http.get(`${BASE_URL}/api/documents/files`, () => {
    const mockData: DocumentFileResponse = {
      total_count: 23,
      total_page: 3,
      current_page: 1,
      results: [
        {
          official_document_id: "doc_aaa-bbb-ccc-111",
          official_document_name: "2025年度上期_事業計画書",
          publication_target_organization_code: {
            code: "DPT-ALL",
            name: "全社",
          },
          publication_source_organization_code: {
            code: "DPT-001",
            name: "経営企画部",
          },
          publication_scope_code: {
            code: "SCOPE-01",
            name: "全社公開",
          },
          file_type: "計画書",
          project_id: "PROJ-FY25-001",
          document_created_at: "2025-07-15T10:00:00.000Z",
          document_id: "doc_aaa-bbb-ccc-111",
          official_document_file_name: "事業計画書_v3_final.pdf",
        },
        {
          official_document_id: "doc_ddd-eee-fff-222",
          official_document_name:
            "新製品（コード名：Phoenix）ローンチに関する稟議書",
          publication_target_organization_code: {
            code: "ORG-EXEC",
            name: "役員会",
          },
          publication_source_organization_code: {
            code: "DPT-007",
            name: "製品開発部",
          },
          publication_scope_code: {
            code: "SCOPE-03",
            name: "関係者限り",
          },
          file_type: "稟議書",
          project_id: "PROJ-PHX-001",
          document_created_at: "2025-07-28T14:20:00.000Z",
          document_id: "doc_ddd-eee-fff-222",
          official_document_file_name: "新製品稟議書_添付資料.xlsx",
        },
      ],
    };

    return HttpResponse.json<DocumentFileResponse>(mockData);
  });

const getDocumentDetail = () =>
  http.get(`${BASE_URL}/api/documents/:official_document_id`, ({ params }) => {
    const documentId = params.documentId as string;
    const mockData: DocumentDetailResponse = {
      official_document_id: documentId,
      official_document_name: "2025年度下期_営業戦略資料",
      publication_target_organization_code: {
        code: "DPT-001",
        name: "営業本部",
      },
      publication_source_organization_code: {
        code: "DPT-005",
        name: "マーケティング部",
      },
      publication_scope_code: {
        code: "SCOPE-03",
        name: "関係者限り",
      },
      file_type: "戦略資料",
      applicant: {
        upn: "tanaka.taro@example.com",
        name: "田中 太郎",
      },
      approved_at: "2025-07-25T10:30:00.000Z",
      official_document_items: [
        {
          id: "item_abc-456",
          before_conversion_item: {
            storage_item_id: "sid_pre_001",
            storage_location_url:
              "https://storage.example.com/drafts/sales_strategy_v2.pptx",
            file_name: "営業戦略資料_v2.pptx",
          },
          official_document_item: {
            storage_item_id: "sid_post_001",
            storage_location_url:
              "https://storage.example.com/official/doc_detail_xyz-123-abc.pdf",
            file_name: "2025年度下期_営業戦略資料.pdf",
          },
          project_id: "PROJ-SLS-25H2",
          original_system_url:
            "https://example.sharepoint.com/sites/sales/Shared%20Documents/",
          original_system_folder_name: "2025年度下期戦略",
          original_system_file_name: "営業戦略資料_v2.pptx",
          original_system_file_id: "fileid_pptx_987",
          original_system_last_updated_user: "佐藤 花子",
          original_system_last_updated_at: "2025-07-24T15:00:00.000Z",
          original_system_version: "2.1",
          document_id: "doc_detail_xyz-123-abc",
          document_blob_name: "xyz123abc.pdf",
        },
        {
          id: "item_def-789",
          before_conversion_item: {
            storage_item_id: "sid_pre_002",
            storage_location_url:
              "https://storage.example.com/drafts/sales_forecast_data.xlsx",
            file_name: "売上予測データ.xlsx",
          },
          official_document_item: {
            storage_item_id: "sid_post_002",
            storage_location_url:
              "https://storage.example.com/official/doc_detail_xyz-123-abc_ref.pdf",
            file_name: "2025年度下期_営業戦略資料_参考データ.pdf",
          },
          project_id: "PROJ-SLS-25H2",
          original_system_url:
            "https://example.sharepoint.com/sites/sales/Shared%20Documents/",
          original_system_folder_name: "2025年度下期戦略",
          original_system_file_name: "売上予測データ.xlsx",
          original_system_file_id: "fileid_xlsx_654",
          original_system_last_updated_user: "鈴木 一郎",
          original_system_last_updated_at: "2025-07-23T11:00:00.000Z",
          original_system_version: "1.5",
          document_id: "doc_detail_xyz-123-abc",
          document_blob_name: "xyz123abc_ref.pdf",
        },
      ],
    };

    return HttpResponse.json<DocumentDetailResponse>(mockData);
  });

export const officialDocumentResolvers = [
  getDocumentVersions(),
  getDocumentVersionDetail(),
  getDocumentFiles(),
  getDocumentFile(),
  getDocuments(),
  getDocumentDetail(),
];
