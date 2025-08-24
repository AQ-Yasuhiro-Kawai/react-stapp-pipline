type NotificationsResult = {
  id: string;
  registered_userid: string;
  registered_username: string;
  title: string;
  body: string;
  display_start_at: string;
  display_end_at: string;
  created_at: string;
};

export type NotificationsResponse = {
  results: NotificationsResult[];
};
