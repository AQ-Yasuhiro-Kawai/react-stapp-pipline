import type { IconType } from "@/components/ui/Icons";

/**
 * Project型
 * プロジェクト一覧の型
 */
export type Project = {
  id: string;
  name: string;
  importSource?: string;
  description?: string;
};
/**
 * ProjectView型
 * テーブル表示専用、idを除外 + iconカラムを含める
 */
export type ProjectView = Omit<Project, "id"> & {
  icon: React.ReactNode;
};

/**
 * ProjectItemIconType型
 * 自作アイコンとlucideが混在する型
 */
export type ProjectItemLucideIconType =
  | "file"
  | "fileText"
  | "fileQuestion"
  | "folder"
  | "image";
export type ProjectItemIconType = IconType | ProjectItemLucideIconType;

/**
 * ProjectItem型
 * プロジェクトアイテム一覧の型
 */
export type ProjectItem = {
  id: string;
  name: React.ReactNode;
  updatedBy: string;
  updatedAt: string;
  size: string;
  type: ProjectItemIconType;
  isArchived?: boolean;
};

export type ProjectItemView = Omit<ProjectItem, "id" | "type" | "size"> & {
  icon: React.ReactNode;
  actionIcons: React.ReactNode;
  size: React.ReactNode;
};

/**
 * ProjectItemTray型
 * 正文書登録トレイの型
 */

export type ProcessingStatus = "processing" | "uploaded";
export type FileType = "pdf"; // MEMO:ファイル種別に合わせて調整
export type TrayItem = {
  id: string;
  name: string;
  path: string;
  type: FileType;
  status: ProcessingStatus;
};
