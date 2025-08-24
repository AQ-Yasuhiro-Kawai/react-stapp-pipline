import { HttpResponse, http } from "msw";
import type {
  TicketApplicationTypeCode,
  TicketStatusTypeCode,
} from "@/domain/tickets/types";
import type {
  RawApprovalTicket,
  RawApprovalTicketsResponse,
} from "@/repositories/approvalRequests/converter";
import type { UsersResponse } from "@/repositories/Users/type";
import {
  APPLICATION_TYPE_ITEMS,
  STATUS_ITEMS,
} from "@/shared/constants/tickets";

const BASE_URL = import.meta.env.VITE_API_URL;

const MOCK_USERS: UsersResponse = [
  {
    user_id: "user-001",
    name: "佐藤 太郎",
    user_principal_name: "taro.sato@example.com",
    organization_name: "営業本部",
    position_name: "部長",
  },
  {
    user_id: "user-002",
    name: "鈴木 一郎",
    user_principal_name: "ichiro.suzuki@example.com",
    organization_name: "開発部",
    position_name: "リードエンジニア",
  },
  {
    user_id: "user-003",
    name: "高橋 花子",
    user_principal_name: "hanako.takahashi@example.com",
    organization_name: "マーケティング部",
    position_name: "マネージャー",
  },
  {
    user_id: "user-004",
    name: "田中 次郎",
    user_principal_name: "jiro.tanaka@example.com",
    organization_name: "人事部",
    position_name: "採用担当",
  },
  {
    user_id: "user-005",
    name: "渡辺 三郎",
    user_principal_name: "saburo.watanabe@example.com",
    organization_name: "経理部",
    position_name: "課長",
  },
  {
    user_id: "user-006",
    name: "伊藤 さくら",
    user_principal_name: "sakura.ito@example.com",
    organization_name: "開発部",
    position_name: "ソフトウェアエンジニア",
  },
  {
    user_id: "user-007",
    name: "山本 四郎",
    user_principal_name: "shiro.yamamoto@example.com",
    organization_name: "営業本部",
    position_name: "営業担当",
  },
  {
    user_id: "user-008",
    name: "中村 美咲",
    user_principal_name: "misaki.nakamura@example.com",
    organization_name: "広報部",
    position_name: "スペシャリスト",
  },
  {
    user_id: "user-009",
    name: "小林 五郎",
    user_principal_name: "goro.kobayashi@example.com",
    organization_name: "総務部",
    position_name: "スタッフ",
  },
  {
    user_id: "user-010",
    name: "加藤 久美子",
    user_principal_name: "kumiko.kato@example.com",
    organization_name: "法務部",
    position_name: "法務担当",
  },
];

const startDate = new Date(Date.UTC(2025, 7, 1, 15, 0, 0));

const MOCK_TICKETS: RawApprovalTicket[] = Array.from(
  { length: 100 },
  (_, i) => {
    const ticket_id = `${i + 1}`;
    const ticket_name =
      i % 3 === 0
        ? `チケット${ticket_id}`
        : `チケット名${ticket_id}チケットチケットチケットチケットチケットチケットチケットチケットチケットチケットチケットチケット`;
    const ticket_application_type_code = APPLICATION_TYPE_ITEMS[
      i % APPLICATION_TYPE_ITEMS.length
    ].value as TicketApplicationTypeCode;
    const ticket_status_type_code = STATUS_ITEMS[i % STATUS_ITEMS.length]
      .value as TicketStatusTypeCode;
    const user_resolved = i % 2 === 0;
    const date = new Date(startDate);
    date.setUTCDate(startDate.getUTCDate() + i);
    const created_at = date.toISOString().replace(/\.\d{3}Z$/, "Z");
    const display_ticket_id = `正文書登録-2025-10-${String((i % 30) + 1).padStart(2, "0")}-${ticket_id}`;
    const applicant = MOCK_USERS[i % MOCK_USERS.length];

    return {
      ticket_id,
      ticket_name,
      ticket_application_type_code,
      created_at,
      ticket_status_type_code,
      applicant,
      completed_at: created_at,
      display_ticket_id,
      user_resolved,
    };
  },
);

const getTasks = () =>
  http.get(`${BASE_URL}/api/tickets/tasks`, ({ request }) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const ticketNameContains = searchParams.get("ticket_name_contains") ?? "";
    const applicantUserId = searchParams.get("applicant_user_id");
    const displayTicketId = searchParams.get("display_ticket_id") ?? "";
    const userResolvedParam = searchParams.get("user_resolved");
    const createdAtStart = searchParams.get("created_at_start");
    const createdAtEnd = searchParams.get("created_at_end");

    const applicationTypeCodes = searchParams.getAll(
      "ticket_application_type_code",
    );
    const statusTypeCodes = searchParams.getAll("ticket_status_type_code");

    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const pageSize = parseInt(searchParams.get("page_size") ?? "10", 10);

    const sortBy = searchParams.get("sort_by");

    let results = MOCK_TICKETS.filter((t) => {
      if (ticketNameContains && !t.ticket_name.includes(ticketNameContains))
        return false;
      if (displayTicketId && !t.display_ticket_id.includes(displayTicketId))
        return false;
      if (applicantUserId && t.applicant.user_id !== applicantUserId)
        return false;
      if (
        applicationTypeCodes.length > 0 &&
        !applicationTypeCodes.includes(t.ticket_application_type_code)
      )
        return false;
      if (
        statusTypeCodes.length > 0 &&
        !statusTypeCodes.includes(t.ticket_status_type_code)
      )
        return false;
      if (
        userResolvedParam !== null &&
        String(t.user_resolved) !== userResolvedParam
      )
        return false;
      if (createdAtStart && t.created_at < createdAtStart) return false;
      if (createdAtEnd && t.created_at > createdAtEnd) return false;
      return true;
    });

    if (sortBy) {
      const compare = (a: string | undefined, b: string | undefined) => {
        if (a == null && b == null) return 0;
        if (a == null) return 1;
        if (b == null) return -1;
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      };

      const [rawKey, direction] = sortBy.split(":");
      const isDescending = direction === "desc";
      if (rawKey === "applicant_name") {
        results = results.sort((a, b) => {
          const aValue = a.applicant.name;
          const bValue = b.applicant.name;

          const compareResult = compare(aValue, bValue);
          return isDescending ? -compareResult : compareResult;
        });
      } else {
        const key = rawKey as keyof RawApprovalTicket;
        results = results.sort((a, b) => {
          const aValue = a[key];
          const bValue = b[key];

          const compareResult = compare(aValue?.toString(), bValue?.toString());
          return isDescending ? -compareResult : compareResult;
        });
      }
    }
    const mockData: RawApprovalTicketsResponse = {
      total_count: results.length,
      total_page: results.length > 0 ? Math.ceil(results.length / pageSize) : 1,
      current_page: page,
      results: results.slice((page - 1) * pageSize, page * pageSize),
    };
    return HttpResponse.json<RawApprovalTicketsResponse>(mockData);
  });

export const tasksResolvers = [getTasks()];
