type TicketNotificationsResult = {
  workflowNotificationId: string;
  ticketId: string;
  ticketName: string;
  workflowNotificationTypeCode: string;
  sentAt: string;
  isRead: boolean;
};

type TicketNotifications = {
  totalCount: number;
  totalPage: number;
  currentPage: number;
  result: TicketNotificationsResult[];
};

type TicketNotificationsParams = {
  pageSize: number;
  page: number;
};

export type {
  TicketNotificationsResult,
  TicketNotifications,
  TicketNotificationsParams,
};
