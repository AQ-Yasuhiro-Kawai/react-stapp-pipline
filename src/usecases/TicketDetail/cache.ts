export const ticketDetailKeys = {
  all: ["ticketDetail"] as const,
  details: () => [...ticketDetailKeys.all, "detail"] as const,
  detail: (ticketId: string) =>
    [...ticketDetailKeys.details(), ticketId] as const,
};
