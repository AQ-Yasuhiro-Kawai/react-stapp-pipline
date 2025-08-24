import type { RequestHandler } from "msw";
import { officialDocumentResolvers } from "@/mocks/resolvers/OfficialDocuments";
import { usersResolvers } from "@/mocks/resolvers/Users";
import { notificationsResolvers } from "./resolvers/Notifications";
import { projectsResolvers } from "./resolvers/Projects";
import { projectsProvidersResolvers } from "./resolvers/Projects/Providers";
import { ticketResolvers } from "./resolvers/Tickets";
import { documentResolvers } from "./resolvers/Tickets/Document";
import { ticketsNotificationsResolvers } from "./resolvers/Tickets/Notifications";
import { tasksResolvers } from "./resolvers/Tickets/Tasks";

export const handlers: RequestHandler[] = [
  ...ticketResolvers,
  ...documentResolvers,
  ...officialDocumentResolvers,
  ...ticketsNotificationsResolvers,
  ...usersResolvers,
  ...projectsResolvers,
  ...notificationsResolvers,
  ...tasksResolvers,
  ...projectsProvidersResolvers,
];
