import { Suspense, useState } from "react";
import { useParams } from "react-router";
import {
  ProjectItemsTray,
  ProjectItemTable,
} from "@/components/domain/Projects/Detail";
import type {
  ProjectItem,
  TrayItem,
} from "@/components/domain/Projects/types/project";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { AppErrorBoundary } from "@/components/ui/Error/components/AppErrorBoundary";
import { AppLayout } from "@/components/ui/Layout";
import { ScrollBar } from "@/components/ui/ScrollBar";
import { SpinnerOverlay } from "@/components/ui/Spinner";
import { PageTitle } from "@/components/ui/Title";

// モックデータ（テーブル動作確認用）
const mockTableItems: ProjectItem[] = [
  {
    id: "file-1",
    name: "一般資料.pdf",
    updatedBy: "佐藤",
    updatedAt: "2025/07/23 12:34",
    size: "2 MB",
    type: "file",
    isArchived: false,
  },
  {
    id: "file-2",
    name: "設計資料.pptx",
    updatedBy: "鈴木",
    updatedAt: "2025/07/22 11:20",
    size: "4 MB",
    type: "powerpoint",
    isArchived: false,
  },
  {
    id: "file-3",
    name: "見積書.xlsx",
    updatedBy: "山田",
    updatedAt: "2025/07/20 18:00",
    size: "500 KB",
    type: "excel",
    isArchived: true,
  },
  {
    id: "folder-1",
    name: "契約書類",
    updatedBy: "田中",
    updatedAt: "2025/07/19 14:55",
    size: "",
    type: "folder",
    isArchived: false,
  },
  {
    id: "file-5",
    name: "共同作業ドキュメント",
    updatedBy: "高橋",
    updatedAt: "2025/07/17 08:45",
    size: "3.5 MB",
    type: "sharePoint",
    isArchived: false,
  },
  {
    id: "file-6",
    name: "議事録.docx",
    updatedBy: "渡辺",
    updatedAt: "2025/07/16 16:00",
    size: "850 KB",
    type: "word",
    isArchived: true,
  },
  {
    id: "file-7",
    name: "詳細説明.txt",
    updatedBy: "井上",
    updatedAt: "2025/07/15 10:30",
    size: "300 KB",
    type: "fileText",
    isArchived: false,
  },
  {
    id: "file-8",
    name: "FAQ一覧.md",
    updatedBy: "小林",
    updatedAt: "2025/07/14 09:50",
    size: "120 KB",
    type: "fileQuestion",
    isArchived: false,
  },
  {
    id: "file-9",
    name: "ファイル名長さ確認AAAAAAAAAAAAAAAAAAAAAAAファイル名長さ確認AAAAAAAAAAAAAAAAAAAAAAAファイル名長さ確認AAAAAAAAAAAAAAAAAAAAAAAファイル名長さ確認AAAAAAAAAAAAAAAAAAAAAAA.jpg",
    updatedBy: "斉藤",
    updatedAt: "2025/07/13 15:10",
    size: "6.2 MB",
    type: "image",
    isArchived: false,
  },
  {
    id: "file-10",
    name: "現場写真.jpg",
    updatedBy: "斉藤",
    updatedAt: "2025/07/13 15:10",
    size: "6.2 MB",
    type: "image",
    isArchived: false,
  },
  {
    id: "file-11",
    name: "現場写真.jpg",
    updatedBy: "斉藤",
    updatedAt: "2025/07/13 15:10",
    size: "6.2 MB",
    type: "image",
    isArchived: false,
  },
  {
    id: "file-12",
    name: "現場写真.jpg",
    updatedBy: "斉藤",
    updatedAt: "2025/07/13 15:10",
    size: "6.2 MB",
    type: "image",
    isArchived: false,
  },
  {
    id: "file-13",
    name: "現場写真.jpg",
    updatedBy: "斉藤",
    updatedAt: "2025/07/13 15:10",
    size: "6.2 MB",
    type: "image",
    isArchived: false,
  },
  {
    id: "file-14",
    name: "現場写真.jpg",
    updatedBy: "斉藤",
    updatedAt: "2025/07/13 15:10",
    size: "6.2 MB",
    type: "image",
    isArchived: false,
  },
  {
    id: "file-15",
    name: "現場写真.jpg",
    updatedBy: "斉藤",
    updatedAt: "2025/07/13 15:10",
    size: "6.2 MB",
    type: "image",
    isArchived: false,
  },
  {
    id: "file-16",
    name: "現場写真.jpg",
    updatedBy: "斉藤",
    updatedAt: "2025/07/13 15:10",
    size: "6.2 MB",
    type: "image",
    isArchived: false,
  },
  {
    id: "file-17",
    name: "現場写真.jpg",
    updatedBy: "斉藤",
    updatedAt: "2025/07/13 15:10",
    size: "6.2 MB",
    type: "image",
    isArchived: false,
  },
  {
    id: "file-18",
    name: "現場写真.jpg",
    updatedBy: "斉藤",
    updatedAt: "2025/07/13 15:10",
    size: "6.2 MB",
    type: "image",
    isArchived: false,
  },
];

// モックデータ（トレイ用）
const mockTrayItems: TrayItem[] = [
  {
    id: crypto.randomUUID(),
    name: `一般資料`,
    path: "…/フォルダ/",
    type: "pdf",
    status: "uploaded",
  },
  {
    id: crypto.randomUUID(),
    name: `書類`,
    path: "…/フォルダ/",
    type: "pdf",
    status: "uploaded",
  },
  {
    id: crypto.randomUUID(),
    name: `書類`,
    path: "…/フォルダ/",
    type: "pdf",
    status: "processing",
  },
  {
    id: crypto.randomUUID(),
    name: `一般資料`,
    path: "…/フォルダ/",
    type: "pdf",
    status: "uploaded",
  },
  {
    id: crypto.randomUUID(),
    name: `書類`,
    path: "…/フォルダ/",
    type: "pdf",
    status: "uploaded",
  },
  {
    id: crypto.randomUUID(),
    name: `書類`,
    path: "…/フォルダ/",
    type: "pdf",
    status: "processing",
  },
  {
    id: crypto.randomUUID(),
    name: `一般資料`,
    path: "…/フォルダ/",
    type: "pdf",
    status: "uploaded",
  },
  {
    id: crypto.randomUUID(),
    name: `書類`,
    path: "…/フォルダ/",
    type: "pdf",
    status: "uploaded",
  },
  {
    id: crypto.randomUUID(),
    name: `書類`,
    path: "…/フォルダ/",
    type: "pdf",
    status: "processing",
  },
  {
    id: crypto.randomUUID(),
    name: `一般資料`,
    path: "…/フォルダ/",
    type: "pdf",
    status: "uploaded",
  },
  {
    id: crypto.randomUUID(),
    name: `書類`,
    path: "…/フォルダ/",
    type: "pdf",
    status: "uploaded",
  },
  {
    id: crypto.randomUUID(),
    name: `書類`,
    path: "…/フォルダ/",
    type: "pdf",
    status: "processing",
  },
  {
    id: crypto.randomUUID(),
    name: `一般資料`,
    path: "…/フォルダ/",
    type: "pdf",
    status: "uploaded",
  },
  {
    id: crypto.randomUUID(),
    name: `書類`,
    path: "…/フォルダ/",
    type: "pdf",
    status: "uploaded",
  },
  {
    id: crypto.randomUUID(),
    name: `書類`,
    path: "…/フォルダ/",
    type: "pdf",
    status: "processing",
  },
];

const ProjectDetailContent = ({ projectId }: { projectId: string }) => {
  const { folderId } = useParams<{ folderId?: string }>();
  const [projectItems] = useState<ProjectItem[]>(mockTableItems);

  // モックデータ（パンくずリスト動作確認用）
  const mockBreadcrumbItem = folderId
    ? [
        { id: "0", label: "トップ", driveId: "1" },
        { id: "1", label: "フォルダB", driveId: "1" },
        { id: "2", label: "フォルダC", driveId: "1" },
        { id: "3", label: "フォルダD", driveId: "1" },
        { id: "4", label: "フォルダE", driveId: "1" },
        { id: "5", label: folderId, driveId: "1" },
      ]
    : [{ id: "0", label: "トップ", driveId: "1" }];

  return (
    <main
      className={
        "h-full w-full rounded-xl bg-main-bg border-1 border-main-bg flex flex-col relative p-4"
      }
    >
      <PageTitle>{`${projectId}プロジェクト`}</PageTitle>
      <div className="h-full flex justify-between gap-4 overflow-y-hidden">
        <div className="flex-1 h-full min-w-0">
          <Breadcrumb
            crumbs={mockBreadcrumbItem}
            onCrumbClick={(crumb) => console.log("Clicked:", crumb)}
          />
          <ScrollBar className="mt-6 h-full">
            <div className="pb-15 h-full">
              <ProjectItemTable
                items={projectItems}
                onRowClick={(item) => console.log("Row clicked:", item)}
              />
            </div>
          </ScrollBar>
        </div>
        <div className="flex-shrink-0">
          <ProjectItemsTray items={mockTrayItems} />
        </div>
      </div>
    </main>
  );
};

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <AppLayout>
      <Suspense fallback={<SpinnerOverlay />}>
        <AppErrorBoundary>
          {projectId ? (
            <ProjectDetailContent projectId={projectId} />
          ) : (
            <div className="p-4 text-center text-sub-text">
              URLパラメータが不足しています
            </div>
          )}
        </AppErrorBoundary>
      </Suspense>
    </AppLayout>
  );
}
