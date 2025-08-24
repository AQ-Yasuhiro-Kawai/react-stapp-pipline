import { HttpResponse, http } from "msw";
import type {
  TicketNotificationsResponse,
  TicketNotificationsResult,
} from "@/repositories/Tickets/Notifications/type";

const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * 50件のモックデータを生成するヘルパー関数
 */
const generateMockData = (): TicketNotificationsResult[] => {
  const notificationTypes = [
    "approval_request", // 承認依頼
    "reject", // 差し戻し
    "approval", // 承認
    "completed", // 完了
  ];
  const documentNames = [
    "契約文書",
    "稟議書",
    "技術仕様書",
    "請求書",
    "発注書",
    "納品書",
  ];
  const actionTypes = ["正文書登録", "正文書更新", "正文書削除"];

  return Array.from({ length: 50 }, (_, i) => {
    const reversedIndex = 49 - i;
    const id = reversedIndex + 1;
    const isRead = i >= 5; // 最初の5件だけ未読に設定
    return {
      workflow_notification_id: `${id}`,
      ticket_id: `${1000 + id}`,
      ticket_name: `${documentNames[i % documentNames.length]} ${actionTypes[i % 3]}`,
      workflow_notification_type_code: notificationTypes[i % 4],
      sent_at: `2025-08-0${Math.floor(reversedIndex / 10) + 1}T10:${String(reversedIndex % 60).padStart(2, "0")}:00Z`,
      is_read: isRead,
    };
  });
};

let mockDatabase: TicketNotificationsResult[] = generateMockData();
const TOTAL_COUNT = mockDatabase.length;

/**
 * API-004-08 ワークフロー関連通知一覧取得のモックハンドラ
 */
const getNotifications = () => {
  return http.get(`${BASE_URL}/api/tickets/notifications/`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const pageSize = Number(url.searchParams.get("page_size")) || 10;

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedData = mockDatabase.slice(start, end);

    return HttpResponse.json<TicketNotificationsResponse>({
      result: paginatedData,
      total_count: TOTAL_COUNT,
      total_page: Math.ceil(TOTAL_COUNT / pageSize),
      current_page: page,
    });
  });
};

/**
 * API-004-09 ワークフロー関連通知既読状態更新のモックハンドラ
 */
const markAllRead = () => {
  return http.post(
    `${BASE_URL}/api/tickets/notifications/mark-all-read`,
    () => {
      mockDatabase = mockDatabase.map((notification) => ({
        ...notification,
        is_read: true,
      }));

      return HttpResponse.json(null, { status: 204 });
    },
  );
};

export const ticketsNotificationsResolvers = [
  getNotifications(),
  markAllRead(),
];
