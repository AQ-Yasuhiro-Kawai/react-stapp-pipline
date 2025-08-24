/**
 * APIから帰ってくる生のインポート可能なプロジェクトの型
 * （API-001-01 サイト取得一覧API result要素部）
 */
export type RawImportableSharePointProject = {
  site_id: string;
  project_name: string;
  description: string;
};

/**
 * APIから帰ってくる生のインポート可能なプロジェクトリストの全体
 * （API-001-01 サイト取得一覧API）
 */
export type RawImportableSharePointProjectResponse = {
  total_count: number;
  total_page: number;
  current_page: number;
  results: RawImportableSharePointProject[];
};
