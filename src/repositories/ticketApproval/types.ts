/**
 * チケット承認アクションでAPIに送信するリクエストボディの型
 */
export type TicketApprovalPayload = {
  approvalActionCode: "approve" | "reject";
  comment: string;
};
