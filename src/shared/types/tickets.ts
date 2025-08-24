import type {
  APPLICATION_TYPE_LIST,
  STATUS_LIST,
  USER_RESOLVED_LIST,
} from "@/shared/constants/tickets";

export type Status = (typeof STATUS_LIST)[number];
export type ApplicationType = (typeof APPLICATION_TYPE_LIST)[number];
export type UserResolved = (typeof USER_RESOLVED_LIST)[number];
