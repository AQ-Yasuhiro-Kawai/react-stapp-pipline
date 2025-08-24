export type TasksSearchState = {
  ticketName: string;
  debouncedTicketName: string;
  applicationTypeCodes: string[];
  statusTypeCodes: string[];
  displayTicketId: string;
  debouncedDisplayTicketId: string;
  applicationDateFrom?: Date;
  applicationDateTo?: Date;
  userResolved: string;
  applicantUserId: string;
  applicantSearchQuery: string;
  debouncedApplicantSearchQuery: string;
  currentPage: number;
  sortBy: string;
};

export const TasksSearchActionType = {
  SET_TICKET_NAME: "SET_TICKET_NAME",
  SET_DEBOUNCED_TICKET_NAME: "SET_DEBOUNCED_TICKET_NAME",
  SET_APPLICATION_TYPE_CODES: "SET_APPLICATION_TYPE_CODES",
  SET_STATUS_TYPE_CODES: "SET_STATUS_TYPE_CODES",
  SET_DISPLAY_TICKET_ID: "SET_DISPLAY_TICKET_ID",
  SET_DEBOUNCED_DISPLAY_TICKET_ID: "SET_DEBOUNCED_DISPLAY_TICKET_ID",
  SET_APPLICATION_DATE_FROM: "SET_APPLICATION_DATE_FROM",
  SET_APPLICATION_DATE_TO: "SET_APPLICATION_DATE_TO",
  SET_USER_RESOLVED: "SET_USER_RESOLVED",
  SET_APPLICANT_USER_ID: "SET_APPLICANT_USER_ID",
  SET_APPLICANT_SEARCH_QUERY: "SET_APPLICANT_SEARCH_QUERY",
  SET_DEBOUNCED_APPLICANT_SEARCH_QUERY: "SET_DEBOUNCED_APPLICANT_SEARCH_QUERY",
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
  SET_SORT_BY: "SET_SORT_BY",
} as const;

type TasksSearchPayloadMap = {
  [TasksSearchActionType.SET_TICKET_NAME]: string;
  [TasksSearchActionType.SET_DEBOUNCED_TICKET_NAME]: string;
  [TasksSearchActionType.SET_APPLICATION_TYPE_CODES]: string[];
  [TasksSearchActionType.SET_STATUS_TYPE_CODES]: string[];
  [TasksSearchActionType.SET_DISPLAY_TICKET_ID]: string;
  [TasksSearchActionType.SET_DEBOUNCED_DISPLAY_TICKET_ID]: string;
  [TasksSearchActionType.SET_APPLICATION_DATE_FROM]: Date | undefined;
  [TasksSearchActionType.SET_APPLICATION_DATE_TO]: Date | undefined;
  [TasksSearchActionType.SET_USER_RESOLVED]: string;
  [TasksSearchActionType.SET_APPLICANT_USER_ID]: string;
  [TasksSearchActionType.SET_APPLICANT_SEARCH_QUERY]: string;
  [TasksSearchActionType.SET_DEBOUNCED_APPLICANT_SEARCH_QUERY]: string;
  [TasksSearchActionType.SET_CURRENT_PAGE]: number;
  [TasksSearchActionType.SET_SORT_BY]: string;
};

export type TasksSearchAction = {
  [T in keyof TasksSearchPayloadMap]: {
    type: T;
    payload: TasksSearchPayloadMap[T];
  };
}[keyof TasksSearchPayloadMap];
