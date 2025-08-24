type TicketNotificationsResult = {
  workflow_notification_id: string;
  ticket_id: string;
  ticket_name: string;
  workflow_notification_type_code: string;
  sent_at: string;
  is_read: boolean;
};

type TicketNotificationsResponse = {
  total_count: number;
  total_page: number;
  current_page: number;
  result: TicketNotificationsResult[];
};

type TicketNotificationsRequestParams = {
  page_size: number;
  page: number;
};

export type {
  TicketNotificationsResult,
  TicketNotificationsResponse,
  TicketNotificationsRequestParams,
};
