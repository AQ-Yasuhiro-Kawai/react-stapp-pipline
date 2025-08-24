type NotificationsResult = {
  id: string;
  registeredUserid: string;
  registeredUsername: string;
  title: string;
  body: string;
  displayStartAt: string;
  displayEndAt: string;
  createdAt: string;
};

type Notifications = {
  results: NotificationsResult[];
};

export type { Notifications, NotificationsResult };
