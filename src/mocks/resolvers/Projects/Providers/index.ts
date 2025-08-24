import { HttpResponse, http } from "msw";
import type { RawImportableSharePointProjectResponse } from "@/repositories/Projects/Providers/type";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5147" : "";

const getImportableProjects = () =>
  http.get(`${BASE_URL}/api/providers/sharepoint/projects`, ({ request }) => {
    const url = new URL(request.url);
    const pageParam = url.searchParams.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : 1;

    const mockData_1: RawImportableSharePointProjectResponse = {
      total_count: 15,
      total_page: 2,
      current_page: 1,
      results: [
        {
          site_id: "site_id_1",
          project_name: "プロジェクト名1",
          description: "説明1",
        },
        {
          site_id: "site_id_2",
          project_name: "プロジェクト名2",
          description: "説明2",
        },
        {
          site_id: "site_id_3",
          project_name: "プロジェクト名3",
          description: "説明3",
        },
        {
          site_id: "site_id_4",
          project_name: "プロジェクト名4",
          description: "説明4",
        },
        {
          site_id: "site_id_5",
          project_name: "プロジェクト名5",
          description: "説明5",
        },
        {
          site_id: "site_id_6",
          project_name: "プロジェクト名6",
          description: "説明6",
        },
        {
          site_id: "site_id_7",
          project_name: "プロジェクト名7",
          description: "説明7",
        },
        {
          site_id: "site_id_8",
          project_name: "プロジェクト名8",
          description: "説明8",
        },
        {
          site_id: "site_id_9",
          project_name: "プロジェクト名9",
          description: "説明9",
        },
        {
          site_id: "site_id_10",
          project_name: "プロジェクト名10",
          description: "説明10",
        },
      ],
    };

    const mockData_2: RawImportableSharePointProjectResponse = {
      total_count: 15,
      total_page: 2,
      current_page: 2,
      results: [
        {
          site_id: "site_id_11",
          project_name: "プロジェクト名11",
          description: "説明11",
        },
        {
          site_id: "site_id_12",
          project_name: "プロジェクト名12",
          description: "説明12",
        },
        {
          site_id: "site_id_13",
          project_name: "プロジェクト名13",
          description: "説明13",
        },
        {
          site_id: "site_id_14",
          project_name: "プロジェクト名14",
          description: "説明14",
        },
        {
          site_id: "site_id_15",
          project_name: "プロジェクト名15",
          description: "説明15",
        },
      ],
    };

    const responseData = page === 1 ? mockData_1 : mockData_2;
    return HttpResponse.json<RawImportableSharePointProjectResponse>(
      responseData,
    );
  });

const postImportProjects = () =>
  http.post(`${BASE_URL}/api/providers/sharepoint/projects`, () => {
    return HttpResponse.json(undefined, { status: 201 });
  });

export const projectsProvidersResolvers = [
  getImportableProjects(),
  postImportProjects(),
];
