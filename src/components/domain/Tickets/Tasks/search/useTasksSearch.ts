import snakeCase from "lodash.snakecase";
import { useReducer } from "react";
import { SORTED_STATE } from "@/components/ui/Table/components/Table";
import useDebounce from "@/hooks/useDebounce";
import { useGetUsersQuery } from "@/usecases/users/reader";
import type { ColumnKeys } from "../TasksTable";
import { initialState, tasksSearchReducer } from "./reducer";
import { TasksSearchActionType } from "./types";

export function useTasksSearch() {
  const [state, dispatch] = useReducer(tasksSearchReducer, initialState);

  useDebounce(
    () =>
      dispatch({
        type: TasksSearchActionType.SET_DEBOUNCED_TICKET_NAME,
        payload: state.ticketName,
      }),
    state.ticketName,
    500,
  );
  useDebounce(
    () =>
      dispatch({
        type: TasksSearchActionType.SET_DEBOUNCED_DISPLAY_TICKET_ID,
        payload: state.displayTicketId,
      }),
    state.displayTicketId,
    500,
  );
  useDebounce(
    () =>
      dispatch({
        type: TasksSearchActionType.SET_DEBOUNCED_APPLICANT_SEARCH_QUERY,
        payload: state.applicantSearchQuery,
      }),
    state.applicantSearchQuery,
    500,
  );

  const { data: users } = useGetUsersQuery(
    state.debouncedApplicantSearchQuery,
    10,
  );

  const handleChangeTicketName = (value: string) =>
    dispatch({ type: TasksSearchActionType.SET_TICKET_NAME, payload: value });

  const handleChangeApplicationTypeCodes = (codes: string[]) =>
    dispatch({
      type: TasksSearchActionType.SET_APPLICATION_TYPE_CODES,
      payload: codes,
    });

  const handleChangeStatusTypeCodes = (codes: string[]) =>
    dispatch({
      type: TasksSearchActionType.SET_STATUS_TYPE_CODES,
      payload: codes,
    });

  const handleChangeDisplayTicketId = (value: string) =>
    dispatch({
      type: TasksSearchActionType.SET_DISPLAY_TICKET_ID,
      payload: value,
    });

  const handleChangeApplicationDateFrom = (date?: Date) =>
    dispatch({
      type: TasksSearchActionType.SET_APPLICATION_DATE_FROM,
      payload: date,
    });

  const handleChangeApplicationDateTo = (date?: Date) =>
    dispatch({
      type: TasksSearchActionType.SET_APPLICATION_DATE_TO,
      payload: date,
    });

  const handleChangeUserResolved = (value: string) =>
    dispatch({ type: TasksSearchActionType.SET_USER_RESOLVED, payload: value });

  const handleChangeApplicantUserId = (value?: string) =>
    dispatch({
      type: TasksSearchActionType.SET_APPLICANT_USER_ID,
      payload: value ?? "",
    });

  const handleChangeApplicantSearchQuery = (value: string) =>
    dispatch({
      type: TasksSearchActionType.SET_APPLICANT_SEARCH_QUERY,
      payload: value,
    });

  const handleChangeCurrentPage = (page: number) =>
    dispatch({ type: TasksSearchActionType.SET_CURRENT_PAGE, payload: page });

  const handleChangeSortBy = (params: {
    key: keyof ColumnKeys;
    direction: (typeof SORTED_STATE)[keyof typeof SORTED_STATE];
  }) => {
    const order = params.direction === SORTED_STATE.ASCENDING ? "asc" : "desc";
    dispatch({
      type: TasksSearchActionType.SET_SORT_BY,
      payload: `${snakeCase(params.key)}:${order}`,
    });
  };

  return {
    ...state,
    users,
    handleChangeTicketName,
    handleChangeApplicationTypeCodes,
    handleChangeDisplayTicketId,
    handleChangeStatusTypeCodes,
    handleChangeApplicationDateFrom,
    handleChangeApplicationDateTo,
    handleChangeUserResolved,
    handleChangeApplicantUserId,
    handleChangeApplicantSearchQuery,
    handleChangeCurrentPage,
    handleChangeSortBy,
  };
}
