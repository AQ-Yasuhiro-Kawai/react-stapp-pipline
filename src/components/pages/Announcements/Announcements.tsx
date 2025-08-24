import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/shallow";
import { MainContent } from "@/components/ui/Layout";
import { notificationsSelector } from "@/store/notifications/notificationsLastVisitedAtSlice";
import { useBoundStore } from "@/store/store";
import { useNotificationsQuery } from "@/usecases/Notifications/reader";
import { cn } from "@/utils/cn";
import { formatDateTimeFromString } from "@/utils/dateFormatter";

type Notification = {
  id: string;
  createdAt: string;
  title: string;
  body: string;
};

type ProcessedNotification = Notification & {
  isUnread: boolean;
};

export const AnnouncementsPage = () => {
  const { data } = useNotificationsQuery();
  const results = data?.results;

  const { notificationsLastVisitedAt, setNotificationsLastVisitedAt } =
    useBoundStore(useShallow(notificationsSelector));

  // 未読既読の判定結果を含んだリスト;
  const processedResults: ProcessedNotification[] = useMemo(() => {
    if (!results) return [];

    return results.map((result: Notification) => {
      const isUnread = notificationsLastVisitedAt
        ? new Date(result.createdAt) > new Date(notificationsLastVisitedAt)
        : true;

      return {
        ...result,
        isUnread,
      };
    });
  }, [results, notificationsLastVisitedAt]);

  // ローカルストレージに最終訪問日を保存する（描画後）
  useEffect(() => {
    if (results && results.length > 0) {
      setNotificationsLastVisitedAt(new Date().toISOString());
    }
  }, [results, setNotificationsLastVisitedAt]);

  return (
    <MainContent pageTitle="お知らせ一覧">
      <ul className="space-y-10">
        {processedResults.map((result) => (
          <li key={result.id}>
            <div className="flex gap-4">
              <div className="flex items-start shrink-0">
                <div className="flex items-center">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full bg-main-red",
                      !result.isUnread && "invisible",
                    )}
                  />
                  <p className="font-bold text-lg ml-1">
                    {formatDateTimeFromString(result.createdAt)}
                  </p>
                </div>
              </div>
              <p className="font-bold text-lg">{result.title}</p>
            </div>
            <div className="mx-4">
              <p>{result.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </MainContent>
  );
};
