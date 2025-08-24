import {
  createBrowserRouter,
  type RouteObject,
  RouterProvider,
  redirect,
} from "react-router";
import { Callback } from "@/components/functional/Auth";
import { AdminAnnouncements } from "@/components/pages/Admin/Announcements";
import { AdminUsers } from "@/components/pages/Admin/Users";
import { AdminUsersRegister } from "@/components/pages/Admin/Users/Register";
import { Announcements } from "@/components/pages/Announcements";
import { Documents } from "@/components/pages/Documents";
import { DocumentsDetail } from "@/components/pages/Documents/Detail";
import { DocumentVersions } from "@/components/pages/Documents/Versions";
import { DocumentVersionDetail } from "@/components/pages/Documents/Versions/Detail";
import { MaintenancePage } from "@/components/pages/Maintenance";
import { ProjectsPage } from "@/components/pages/Projects";
import { ProjectDetailPage } from "@/components/pages/Projects/ProjectDetail";
import { ModifyTicketsDocumentDelete } from "@/components/pages/Tickets/ModifyTicketsDocumentDelete";
import { ModifyTicketsDocumentRegistration } from "@/components/pages/Tickets/ModifyTicketsDocumentRegistration";
import { ModifyTicketsDocumentUpdate } from "@/components/pages/Tickets/ModifyTicketsDocumentUpdate";
import { Mytickets } from "@/components/pages/Tickets/MyTickets";
import { NewTicketsDocumentDelete } from "@/components/pages/Tickets/NewTicketsDocumentDelete";
import { NewTicketsDocumentRegistration } from "@/components/pages/Tickets/NewTicketsDocumentRegistration";
import { NewTicketsDocumentUpdate } from "@/components/pages/Tickets/NewTicketsDocumentUpdate";
import { Notifications } from "@/components/pages/Tickets/Notifications";
import { Tasks } from "@/components/pages/Tickets/Tasks";
import { guardLoader } from "./loaders/guardLoader";

async function navigateLoader() {
  return redirect("/projects");
}

const router: RouteObject[] = [
  {
    element: <MaintenancePage />,
    path: "/maintenance",
  },
  {
    element: <Callback />,
    path: "/callback",
  },
  {
    children: [
      {
        path: "/",
        loader: navigateLoader,
      },
      {
        element: <Announcements />,
        path: "/Announcements",
      },
      {
        element: <ProjectsPage />,
        path: "/projects",
      },
      {
        children: [
          {
            element: <Documents />,
            path: "/documents",
          },
          {
            element: <DocumentsDetail />,
            path: "/documents/:document_id",
          },
          {
            element: <DocumentVersions />,
            path: "/documents/:document_id/versions",
          },
          {
            element: <DocumentVersionDetail />,
            path: "/documents/:document_id/versions/:version_id",
          },
        ],
      },
      {
        children: [
          {
            element: <Notifications />,
            path: "notifications",
          },
          {
            element: <Tasks />,
            path: "tasks",
          },
          {
            element: <Mytickets />,
            path: "mytickets",
          },
          {
            element: <NewTicketsDocumentRegistration />,
            path: "mytickets/new/document-registration",
          },
          {
            element: <NewTicketsDocumentUpdate />,
            path: "mytickets/new/:document_id/document-update",
          },
          {
            element: <NewTicketsDocumentDelete />,
            path: "mytickets/new/:document_id/document-delete",
          },
          {
            element: <ModifyTicketsDocumentRegistration />,
            path: "mytickets/:ticket_id/document-registration",
          },
          {
            element: <ModifyTicketsDocumentUpdate />,
            path: "mytickets/:ticket_id/document-update",
          },
          {
            element: <ModifyTicketsDocumentDelete />,
            path: "mytickets/:ticket_id/document-delete",
          },
        ],
        path: "/tickets",
      },
      {
        children: [
          {
            element: <AdminAnnouncements />,
            path: "announcements",
          },
          {
            element: <AdminUsers />,
            path: "users",
          },
          {
            element: <AdminUsersRegister />,
            path: "users/register",
          },
        ],
        path: "/admin",
      },
      {
        element: <ProjectDetailPage />,
        path: "/projects/:projectId",
      },
      {
        element: <ProjectDetailPage />,
        path: "/projects/:projectId/:folderId",
      },
    ],
    loader: guardLoader,
  },
];

export const createRouter = () => {
  return createBrowserRouter(router);
};

type Router = ReturnType<typeof createBrowserRouter>;

export const AppRouter = ({ router }: { router: Router }) => {
  return <RouterProvider router={router} />;
};
