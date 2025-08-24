import type { Department } from "@/components/domain/Documents/types";

export const dummyDepartments: Department[] = [
  // --- Level 1 (最上位階層) ---
  { id: "org-123", name: "土木総本部", hasChildren: true, parentId: null },
  { id: "org-456", name: "建築総本部", hasChildren: true, parentId: null },
  { id: "3", name: "経営総本部", hasChildren: true, parentId: null },
  { id: "4", name: "営業総本部", hasChildren: true, parentId: null },
  { id: "5", name: "管理総本部", hasChildren: true, parentId: null },
  { id: "6", name: "IT戦略総本部", hasChildren: true, parentId: null },
  { id: "7", name: "研究開発本部", hasChildren: false, parentId: null },

  // --- Level 2 (各本部の配下) ---

  // Children of "土木総本部" (parentId: 1)
  { id: "101", name: "土木本部", hasChildren: true, parentId: "org-123" },
  { id: "102", name: "都市開発本部", hasChildren: false, parentId: "org-123" },
  { id: "103", name: "海外事業部", hasChildren: false, parentId: "org-123" },

  // Children of "建築総本部" (parentId: 2)
  { id: "201", name: "設計本部", hasChildren: true, parentId: "org-456" },
  { id: "202", name: "施工本部", hasChildren: true, parentId: "org-456" },
  { id: "203", name: "積算部", hasChildren: false, parentId: "org-456" },

  // Children of "経営総本部" (parentId: 3)
  { id: "301", name: "経営企画部", hasChildren: false, parentId: "3" },
  { id: "302", name: "広報・IR部", hasChildren: false, parentId: "3" },

  // Children of "営業総本部" (parentId: 4)
  { id: "401", name: "国内営業本部", hasChildren: true, parentId: "4" },
  { id: "402", name: "海外営業本部", hasChildren: false, parentId: "4" },
  { id: "403", name: "マーケティング部", hasChildren: false, parentId: "4" },

  // Children of "管理総本部" (parentId: 5)
  { id: "501", name: "人事本部", hasChildren: true, parentId: "5" },
  { id: "502", name: "経理本部", hasChildren: true, parentId: "5" },
  { id: "503", name: "総務部", hasChildren: false, parentId: "5" },
  { id: "504", name: "法務部", hasChildren: false, parentId: "5" },

  // Children of "IT戦略総本部" (parentId: 6)
  { id: "601", name: "システム開発本部", hasChildren: true, parentId: "6" },
  {
    id: "602",
    name: "インフラ運用本部インフラ運用本部",
    hasChildren: false,
    parentId: "6",
  },
  { id: "603", name: "情報セキュリティ部", hasChildren: false, parentId: "6" },
  { id: "604", name: "データ分析部", hasChildren: false, parentId: "6" },
  { id: "605", name: "AI戦略部", hasChildren: false, parentId: "6" },
  { id: "606", name: "DX推進部", hasChildren: false, parentId: "6" },
  { id: "607", name: "IT戦略企画部", hasChildren: false, parentId: "6" },
  { id: "608", name: "クラウド推進部", hasChildren: false, parentId: "6" },

  // --- Level 3 (各部の配下) ---

  // Children of "土木本部" (parentId: 101)
  { id: "1001", name: "土木第一部", hasChildren: false, parentId: "101" },
  { id: "1002", name: "土木第二部", hasChildren: false, parentId: "101" },
  { id: "1003", name: "インフラ部", hasChildren: false, parentId: "101" },

  // Children of "設計本部" (parentId: 201)
  { id: "2001", name: "意匠設計部", hasChildren: false, parentId: "201" },
  { id: "2002", name: "構造設計部", hasChildren: false, parentId: "201" },
  { id: "2003", name: "設備設計部", hasChildren: false, parentId: "201" },

  // Children of "施工本部" (parentId: 202)
  { id: "2101", name: "施工管理第一部", hasChildren: false, parentId: "202" },
  { id: "2102", name: "施工管理第二部", hasChildren: false, parentId: "202" },

  // Children of "国内営業本部" (parentId: 401)
  { id: "4001", name: "首都圏営業部", hasChildren: false, parentId: "401" },
  { id: "4002", name: "関西営業部", hasChildren: false, parentId: "401" },
  { id: "4003", name: "中部営業部", hasChildren: false, parentId: "401" },

  // Children of "人事本部" (parentId: 501)
  { id: "5001", name: "採用育成部", hasChildren: true, parentId: "501" },
  { id: "5002", name: "労務厚生部", hasChildren: false, parentId: "501" },

  // Children of "経理本部" (parentId: 502)
  { id: "5101", name: "財務部", hasChildren: false, parentId: "502" },
  { id: "5102", name: "管理会計部", hasChildren: false, parentId: "502" },

  // Children of "システム開発本部" (parentId: 601)
  {
    id: "6001",
    name: "業務システム部業務システム部",
    hasChildren: true,
    parentId: "601",
  },
  {
    id: "6002",
    name: "Webサービス開発部",
    hasChildren: false,
    parentId: "601",
  },

  // --- Level 4 (各課の配下) ---

  // Children of "採用育成部" (parentId: 5001)
  { id: "50001", name: "新卒採用課", hasChildren: true, parentId: "5001" },
  { id: "50002", name: "中途採用課", hasChildren: false, parentId: "5001" },
  { id: "50003", name: "人材開発課", hasChildren: false, parentId: "5001" },

  // Children of "業務システム部" (parentId: 6001)
  { id: "60001", name: "会計システム課", hasChildren: true, parentId: "6001" },
  { id: "60002", name: "人事システム課", hasChildren: false, parentId: "6001" },

  // --- Level 5 (各チームの配下) ---

  // Children of "新卒採用課" (parentId: 50001)
  { id: "500011", name: "Aチーム", hasChildren: false, parentId: "50001" },
  { id: "500012", name: "Bチーム", hasChildren: false, parentId: "50001" },
  {
    id: "500013",
    name: "キャンパスリクルーティングチーム",
    hasChildren: false,
    parentId: "50001",
  },

  // Children of "会計システム課" (parentId: 60001)
  {
    id: "600011",
    name: "要件定義チーム要件定義チーム要件定義チーム",
    hasChildren: false,
    parentId: "60001",
  },
  { id: "600012", name: "開発チーム", hasChildren: false, parentId: "60001" },
  {
    id: "600013",
    name: "保守運用チーム",
    hasChildren: false,
    parentId: "60001",
  },
];
