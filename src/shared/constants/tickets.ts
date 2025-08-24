import type {
  TicketApplicationTypeCode,
  TicketStatusTypeCode,
} from "@/domain/tickets/types";
import type { ApplicationType, Status } from "../types/tickets";

export const STATUS_LIST = [
  "編集中",
  "承認中",
  "差し戻し",
  "取り下げ",
  "完了",
] as const;

export const STATUS_MAP = {
  draft: "編集中",
  on_approval: "承認中",
  reject: "差し戻し",
  withdraw: "取り下げ",
  completed: "完了",
} as const satisfies Record<TicketStatusTypeCode, Status>;

// セレクトボックス用
export const STATUS_ITEMS = [
  { label: "編集中", value: "draft" },
  { label: "承認中", value: "on_approval" },
  { label: "差し戻し", value: "reject" },
  { label: "取り下げ", value: "withdraw" },
  { label: "完了", value: "completed" },
];

export const APPLICATION_TYPE_LIST = [
  "正文書登録",
  "正文書更新",
  "正文書削除",
] as const;

export const APPLICATION_TYPE_MAP = {
  register: "正文書登録",
  update: "正文書更新",
  delete: "正文書削除",
} as const satisfies Record<TicketApplicationTypeCode, ApplicationType>;

export const APPLICATION_TYPE_ITEMS = [
  { label: "正文書登録", value: "register" },
  { label: "正文書更新", value: "update" },
  { label: "正文書削除", value: "delete" },
];

export const USER_RESOLVED_LIST = ["未対応", "対応済み"] as const;

export const USER_RESOLVED_MAP = {
  resolved: "対応済み",
  unresolved: "未対応",
} as const;

// セレクトボックス用
export const USER_RESOLVED_ITEMS = [
  { id: "resolved", name: "対応済み" },
  { id: "unresolved", name: "未対応" },
];
