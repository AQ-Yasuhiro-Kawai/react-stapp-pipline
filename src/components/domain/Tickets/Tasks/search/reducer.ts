import {
  type TasksSearchAction,
  TasksSearchActionType,
  type TasksSearchState,
} from "./types";

export const initialState: TasksSearchState = {
  ticketName: "",
  debouncedTicketName: "",
  applicationTypeCodes: [],
  statusTypeCodes: [],
  displayTicketId: "",
  debouncedDisplayTicketId: "",
  applicationDateFrom: undefined,
  applicationDateTo: undefined,
  userResolved: "",
  applicantUserId: "",
  applicantSearchQuery: "",
  debouncedApplicantSearchQuery: "",
  currentPage: 1,
  sortBy: "created_at:desc",
};

export function tasksSearchReducer(
  state: TasksSearchState,
  action: TasksSearchAction,
): TasksSearchState {
  switch (action.type) {
    case TasksSearchActionType.SET_TICKET_NAME:
      return { ...state, ticketName: action.payload };
    case TasksSearchActionType.SET_DEBOUNCED_TICKET_NAME:
      return { ...state, debouncedTicketName: action.payload, currentPage: 1 };
    case TasksSearchActionType.SET_APPLICATION_TYPE_CODES:
      return { ...state, applicationTypeCodes: action.payload, currentPage: 1 };
    case TasksSearchActionType.SET_STATUS_TYPE_CODES:
      return { ...state, statusTypeCodes: action.payload, currentPage: 1 };
    case TasksSearchActionType.SET_DISPLAY_TICKET_ID:
      return { ...state, displayTicketId: action.payload };
    case TasksSearchActionType.SET_DEBOUNCED_DISPLAY_TICKET_ID:
      return {
        ...state,
        debouncedDisplayTicketId: action.payload,
        currentPage: 1,
      };
    case TasksSearchActionType.SET_APPLICATION_DATE_FROM:
      return { ...state, applicationDateFrom: action.payload, currentPage: 1 };
    case TasksSearchActionType.SET_APPLICATION_DATE_TO:
      return { ...state, applicationDateTo: action.payload, currentPage: 1 };
    case TasksSearchActionType.SET_USER_RESOLVED:
      return { ...state, userResolved: action.payload, currentPage: 1 };
    case TasksSearchActionType.SET_APPLICANT_USER_ID:
      return { ...state, applicantUserId: action.payload, currentPage: 1 };
    case TasksSearchActionType.SET_APPLICANT_SEARCH_QUERY:
      return { ...state, applicantSearchQuery: action.payload };
    case TasksSearchActionType.SET_DEBOUNCED_APPLICANT_SEARCH_QUERY:
      return {
        ...state,
        debouncedApplicantSearchQuery: action.payload,
        currentPage: 1,
      };
    case TasksSearchActionType.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case TasksSearchActionType.SET_SORT_BY:
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
}
