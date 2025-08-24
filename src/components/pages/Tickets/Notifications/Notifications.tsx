import { useEffect, useRef, useState } from "react";
import { NotificationsList } from "@/components/domain/Notifications/NotificationsList";
import { useTicketNotificationsQuery } from "@/usecases/Tickets/Notifications/reader";
import { useTicketNotificationsAllMarkRead } from "@/usecases/Tickets/Notifications/usecase";

export const NotificationsPage = () => {
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });
  const {
    data: { currentPage, result, totalPage },
  } = useTicketNotificationsQuery(params);
  const { mutate: markAllRead } = useTicketNotificationsAllMarkRead();

  const hasMarkedAsRead = useRef(false);

  const handlePageChange = (page: number) => {
    setParams((prevParams) => ({ ...prevParams, page }));
  };

  useEffect(() => {
    if (
      hasMarkedAsRead.current === false &&
      result.some((item) => !item.isRead)
    ) {
      markAllRead();
      hasMarkedAsRead.current = true;
    }
  }, [result, markAllRead]);

  return (
    <NotificationsList
      currentPage={currentPage}
      items={result}
      onPageChange={handlePageChange}
      totalPage={totalPage}
    />
  );
};
