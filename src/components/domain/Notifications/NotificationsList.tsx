import { Pagination } from "@/components/ui/Table/components/Pagination";
import { cn } from "@/utils/cn";
import { formatDateTimeFromString } from "@/utils/dateFormatter";

type Props = {
  items: NotificationItem[]; // 表示するデータ（現在のページ分のみ）
  currentPage: number; // 現在のページ番号
  totalPage: number; // 総ページ数
  onPageChange: (page: number) => void; // ページが変更されたことを親に通知
};

type NotificationItem = {
  workflowNotificationId: string;
  ticketId: string;
  ticketName: string;
  workflowNotificationTypeCode: string;
  sentAt: string;
  isRead: boolean;
};

const WORKFLOW_NOTIFICATION_TYPE_NAME = {
  APPROVAL_REQUEST: "承認依頼",
  APPROVAL: "承認",
  REJECT: "差し戻し",
  COMPLETED: "完了",
};

const WORKFLOW_NOTIFICATION_TYPE_CODE = {
  APPROVAL_REQUEST: "approval_request",
  APPROVAL: "approval",
  REJECT: "reject",
  COMPLETED: "completed",
};

export function NotificationsList({
  items,
  currentPage,
  totalPage,
  onPageChange,
}: Props) {
  return (
    <>
      <ul>
        {items.map((item) => (
          <li
            className="flex items-center h-13"
            key={item.workflowNotificationId}
          >
            <div
              className={cn(
                "size-2 rounded-full bg-main-red",
                item.isRead && "invisible",
              )}
            />
            <div className="ml-1">{formatDateTimeFromString(item.sentAt)}</div>
            <div className="ml-4">
              <a
                className="underline text-main-blue"
                href={
                  item.workflowNotificationTypeCode ===
                  WORKFLOW_NOTIFICATION_TYPE_CODE.APPROVAL_REQUEST
                    ? `/tickets/tasks/${item.ticketId}`
                    : `/tickets/mytickets/${item.ticketId}`
                }
              >
                チケット［ID:{item.ticketId} チケット名:{item.ticketName}］
              </a>
              <span>
                {item.workflowNotificationTypeCode ===
                  WORKFLOW_NOTIFICATION_TYPE_CODE.APPROVAL_REQUEST &&
                  WORKFLOW_NOTIFICATION_TYPE_NAME.APPROVAL_REQUEST}
                {item.workflowNotificationTypeCode ===
                  WORKFLOW_NOTIFICATION_TYPE_CODE.APPROVAL &&
                  WORKFLOW_NOTIFICATION_TYPE_NAME.APPROVAL}
                {item.workflowNotificationTypeCode ===
                  WORKFLOW_NOTIFICATION_TYPE_CODE.REJECT &&
                  WORKFLOW_NOTIFICATION_TYPE_NAME.REJECT}
                {item.workflowNotificationTypeCode ===
                  WORKFLOW_NOTIFICATION_TYPE_CODE.COMPLETED &&
                  WORKFLOW_NOTIFICATION_TYPE_NAME.COMPLETED}
                のお知らせ
              </span>
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        maxPage={totalPage}
        onClick={onPageChange}
      />
    </>
  );
}
