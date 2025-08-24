import { HttpResponse, http } from "msw";
import type {
  ConvertedPdfRequest,
  ConvertedPdfResponse,
  ProjectGetResponse,
  ProjectListQueryParams,
  RawProjectSitesResponse,
} from "@/repositories/Projects/type";

const BASE_URL = import.meta.env.VITE_API_URL;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const projectsResolvers = [
  // Mock for GET api/projects/{project_id}
  http.get<{ project_id: string }, never, ProjectGetResponse>(
    `${BASE_URL}/api/projects/:project_id`,
    async ({ params, request }) => {
      const { project_id } = params;

      // 2. クエリパラメータの取得
      const url = new URL(request.url);
      const providerItemId = url.searchParams.get("provider_item_id");
      const driveId = url.searchParams.get("drive_id");

      if (providerItemId === "3" && driveId === "1") {
        return HttpResponse.json<ProjectGetResponse>({
          project_id: project_id,
          provider_name: "MockProvider",
          project_name: "Mock Project",
          created_at: "2025-08-05T00:00:00Z",
          description: "This is a mock project description.",
          items: [
            {
              site_id: "mockSiteId",
              drive_id: "2",
              item_name: "フォルダB",
              provider_item_id: "4",
              parent_reference_path: "/mock/フォルダA",
              url: "http://mockurl.com",
              last_modified_by: "Mock User",
              last_modified_at: "2025-08-05T00:00:00Z",
              version: "1.0",
              size: 0,
              extension: "",
              is_folder: true,
            },
            {
              site_id: "mockSiteId",
              drive_id: "2",
              item_name: "ファイルA",
              provider_item_id: "5",
              parent_reference_path: "/mock/path",
              url: "http://mockurl.com",
              last_modified_by: "Mock User",
              last_modified_at: "2025-08-05T00:00:00Z",
              version: "1.0",
              size: 200000,
              extension: "",
              is_folder: false,
            },
          ],
        });
      }

      return HttpResponse.json<ProjectGetResponse>({
        project_id: project_id,
        provider_name: "MockProvider",
        project_name: "Mock Project",
        created_at: "2025-08-05T00:00:00Z",
        description: "This is a mock project description.",
        items: [
          {
            site_id: "mockSiteId",
            drive_id: "1",
            item_name: "MockFileA",
            provider_item_id: "1",
            parent_reference_path: "/mock/path",
            url: "http://mockurl.com",
            last_modified_by: "Mock User",
            last_modified_at: "2025-08-05T00:00:00Z",
            version: "1.0",
            size: 12345,
            extension: "",
            is_folder: false,
          },
          {
            site_id: "mockSiteId",
            drive_id: "1",
            item_name: "MockFileB",
            provider_item_id: "2",
            parent_reference_path: "/mock/path",
            url: "http://mockurl.com",
            last_modified_by: "Mock User",
            last_modified_at: "2025-08-05T00:00:00Z",
            version: "1.0",
            size: 6234512345,
            extension: "xlsx",
            is_folder: false,
          },
          {
            site_id: "mockSiteId",
            drive_id: "1",
            item_name: "フォルダA",
            provider_item_id: "3",
            parent_reference_path: "/mock/path",
            url: "http://mockurl.com",
            last_modified_by: "Mock User",
            last_modified_at: "2025-08-05T00:00:00Z",
            version: "1.0",
            size: 0,
            extension: "",
            is_folder: true,
          },
        ],
      });
    },
  ),

  // Mock for POST /api/pdf
  http.post<never, ConvertedPdfRequest>(
    `${BASE_URL}/api/pdf`,
    async ({ request }) => {
      const body = await request.json();

      await sleep(10000);
      return HttpResponse.json<ConvertedPdfResponse>({
        request_id: "ABC123",
        provider_item_id: body.provider_item_id,
        original_file_blob_url: "http://mockurl.com/original.pdf",
        generated_file_blob_url: "http://mockurl.com/generated.pdf",
        file_content_hash: "mockFileContentHash",
      });
    },
  ),

  // Mock for GET api/projects
  http.get<ProjectListQueryParams, never, RawProjectSitesResponse>(
    `${BASE_URL}/api/projects`,
    async () => {
      return HttpResponse.json<RawProjectSitesResponse>({
        total_count: 12,
        total_page: 2,
        current_page: 1,
        results: [
          {
            project_id: "PROJ-PHX-001",
            storage_location_code: "share_point",
            project_name: "次世代製品開発（Phoenix）",
            created_at: "2025-04-01T10:00:00.000Z",
            description:
              "2025年度リリース予定の次世代製品開発に関するドキュメント一式を格納します。",
          },
          {
            project_id: "PROJ-CORP-SITE-25",
            storage_location_code: "teams",
            project_name: "コーポレートサイトリニューアル",
            created_at: "2025-06-15T14:30:00.000Z",
            description:
              "公式サイトのデザイン改修およびCMS移行プロジェクトです。",
          },
          {
            project_id: "PROJ-MKT-SHARE",
            storage_location_code: "share_point",
            project_name: "マーケティング部共有",
            created_at: "2025-01-10T09:00:00.000Z",
            description:
              "マーケティング部で使用する各種資料やテンプレートの保管場所です。",
          },
          {
            project_id: "PROJ-HR-EVAL-25",
            storage_location_code: "share_point",
            project_name: "人事評価システム導入",
            created_at: "2025-02-20T11:00:00.000Z",
            description:
              "新しい人事評価制度導入に伴う、システム関連の資料をまとめます。",
          },
          {
            project_id: "PROJ-SEC-TRAIN",
            storage_location_code: "teams",
            project_name: "全社セキュリティ研修",
            created_at: "2025-07-01T16:00:00.000Z",
            description:
              "全従業員向けの年次セキュリティ研修の資料と動画を格納します。",
          },
          {
            project_id: "PROJ-BUDGET-26",
            storage_location_code: "share_point",
            project_name: "2026年度 予算策定",
            created_at: "2025-08-05T09:30:00.000Z",
            description:
              "来年度の予算策定に関する各部署からの提出資料をまとめます。",
          },
          {
            project_id: "PROJ-CS-QUALITY",
            storage_location_code: "teams",
            project_name: "カスタマーサポート品質向上",
            created_at: "2025-03-18T13:00:00.000Z",
            description:
              "CSチームの応対品質向上を目的とした研修資料やマニュアル。",
          },
          {
            project_id: "PROJ-REMOTE-POLICY",
            storage_location_code: "share_point",
            project_name: "リモートワーク規定改定",
            created_at: "2025-05-22T18:00:00.000Z",
            description:
              "新しい働き方に対応するためのリモートワーク規定の改定案と関連資料。",
          },
          {
            project_id: "PROJ-SUSTAIN-25",
            storage_location_code: "share_point",
            project_name: "サステナビリティレポート発行",
            created_at: "2025-04-10T10:20:00.000Z",
            description:
              "2025年度版サステナビリティレポート作成のためのデータや原稿。",
          },
          {
            project_id: "PROJ-SALES-KB",
            storage_location_code: "teams",
            project_name: "営業部ナレッジベース構築",
            created_at: "2025-07-28T15:00:00.000Z",
            description: "営業活動の効率化を目指したナレッジ共有プロジェクト。",
          },
          {
            project_id: "PROJ-ATS-MIG",
            storage_location_code: "share_point",
            project_name: "採用管理システム（ATS）移行",
            created_at: "2025-06-01T12:00:00.000Z",
            description:
              "新しい採用管理システムへのデータ移行と導入に関する資料。",
          },
          {
            project_id: "PROJ-COMPLIANCE",
            storage_location_code: "share_point",
            project_name: "コンプライアンス研修資料",
            created_at: "2025-02-01T17:00:00.000Z",
            description: "全社向けのコンプライアンス研修で使用する資料一式。",
          },
        ],
      });
    },
  ),
];
