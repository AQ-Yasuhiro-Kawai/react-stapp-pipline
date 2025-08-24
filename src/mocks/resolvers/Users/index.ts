import { HttpResponse, http } from "msw";
import type { UsersResponse } from "@/repositories/Users/type";

const BASE_URL = import.meta.env.VITE_API_URL;

const getUsers = () =>
  http.get(`${BASE_URL}/api/users`, ({ request }) => {
    const url = new URL(request.url);
    const searchWord = url.searchParams.get("q") as string;
    const mockData: UsersResponse = [
      {
        user_id: "user-001",
        name: "佐藤 太郎",
        user_principal_name: "taro.sato@example.com",
        organization_name: "営業本部",
        position_name: "部長",
      },
      {
        user_id: "user-002",
        name: "鈴木 一郎",
        user_principal_name: "ichiro.suzuki@example.com",
        organization_name: "開発部",
        position_name: "リードエンジニア",
      },
      {
        user_id: "user-003",
        name: "高橋 花子",
        user_principal_name: "hanako.takahashi@example.com",
        organization_name: "マーケティング部",
        position_name: "マネージャー",
      },
      {
        user_id: "user-004",
        name: "田中 次郎",
        user_principal_name: "jiro.tanaka@example.com",
        organization_name: "人事部",
        position_name: "採用担当",
      },
      {
        user_id: "user-005",
        name: "渡辺 三郎",
        user_principal_name: "saburo.watanabe@example.com",
        organization_name: "経理部",
        position_name: "課長",
      },
      {
        user_id: "user-006",
        name: "伊藤 さくら",
        user_principal_name: "sakura.ito@example.com",
        organization_name: "開発部",
        position_name: "ソフトウェアエンジニア",
      },
      {
        user_id: "user-007",
        name: "山本 四郎",
        user_principal_name: "shiro.yamamoto@example.com",
        organization_name: "営業本部",
        position_name: "営業担当",
      },
      {
        user_id: "user-008",
        name: "中村 美咲",
        user_principal_name: "misaki.nakamura@example.com",
        organization_name: "広報部",
        position_name: "スペシャリスト",
      },
      {
        user_id: "user-009",
        name: "小林 五郎",
        user_principal_name: "goro.kobayashi@example.com",
        organization_name: "総務部",
        position_name: "スタッフ",
      },
      {
        user_id: "user-010",
        name: "加藤 久美子",
        user_principal_name: "kumiko.kato@example.com",
        organization_name: "法務部",
        position_name: "法務担当",
      },
      {
        user_id: "user-011",
        name: "アジア 大輝",
        user_principal_name: "daiki.asia@example.com",
        organization_name: "ITインフラ部",
        position_name: "シニアエンジニア",
      },
      {
        user_id: "user-012",
        name: "アジア 美玲",
        user_principal_name: "meiling.asia@example.com",
        organization_name: "データサイエンス部",
        position_name: "データアナリスト",
      },
      {
        user_id: "user-013",
        name: "アジア 翔太",
        user_principal_name: "shota.asia@example.com",
        organization_name: "カスタマーサポート部",
        position_name: "チームリーダー",
      },
      {
        user_id: "user-014",
        name: "アジア 健一",
        user_principal_name: "kenichi.asia@example.com",
        organization_name: "品質保証部",
        position_name: "QAエンジニア",
      },
      {
        user_id: "user-015",
        name: "アジア 智賢",
        user_principal_name: "jihyun.asia@example.com",
        organization_name: "経営企画室",
        position_name: "ジュニアスタッフ",
      },
      {
        user_id: "user-016",
        name: "アジア 亮",
        user_principal_name: "liang.asia@example.com",
        organization_name: "海外事業部",
        position_name: "エリアマネージャー",
      },
      {
        user_id: "user-017",
        name: "アジア 健司",
        user_principal_name: "kenji.asia@example.com",
        organization_name: "開発部",
        position_name: "プロダクトマネージャー",
      },
      {
        user_id: "user-018",
        name: "アジア 秀彬",
        user_principal_name: "soobin.asia@example.com",
        organization_name: "マーケティング部",
        position_name: "デジタルマーケター",
      },
      {
        user_id: "user-019",
        name: "アジア 恵子",
        user_principal_name: "keiko.asia@example.com",
        organization_name: "人事部",
        position_name: "労務担当",
      },
      {
        user_id: "user-020",
        name: "アジア 偉",
        user_principal_name: "wei.asia@example.com",
        organization_name: "営業本部",
        position_name: "アカウントエグゼクティブ",
      },
      {
        user_id: "user-021",
        name: "アジア 優衣",
        user_principal_name: "yui.asia@example.com",
        organization_name: "デザイン部",
        position_name: "UI/UXデザイナー",
      },
      {
        user_id: "user-022",
        name: "アジア 裕太",
        user_principal_name: "yuta.asia@example.com",
        organization_name: "開発部",
        position_name: "バックエンドエンジニア",
      },
      {
        user_id: "user-023",
        name: "アジア 麻衣",
        user_principal_name: "mai.asia@example.com",
        organization_name: "経理部",
        position_name: "経理スタッフ",
      },
      {
        user_id: "user-024",
        name: "アジア 龍",
        user_principal_name: "long.asia@example.com",
        organization_name: "ITインフラ部",
        position_name: "ネットワークエンジニア",
      },
      {
        user_id: "user-025",
        name: "アジア あゆみ",
        user_principal_name: "ayumi.asia@example.com",
        organization_name: "広報部",
        position_name: "PR担当",
      },
      {
        user_id: "user-026",
        name: "アジア 徳",
        user_principal_name: "duc.asia@example.com",
        organization_name: "研究開発部",
        position_name: "研究員",
      },
      {
        user_id: "user-027",
        name: "アジア 直樹",
        user_principal_name: "naoki.asia@example.com",
        organization_name: "総務部",
        position_name: "ファシリティマネージャー",
      },
      {
        user_id: "user-028",
        name: "アジア 静",
        user_principal_name: "jing.asia@example.com",
        organization_name: "法務部",
        position_name: "リーガルカウンセル",
      },
      {
        user_id: "user-029",
        name: "アジア 大成",
        user_principal_name: "daesung.asia@example.com",
        organization_name: "データサイエンス部",
        position_name: "データサイエンティスト",
      },
      {
        user_id: "user-030",
        name: "アジア 沙織",
        user_principal_name: "saori.asia@example.com",
        organization_name: "カスタマーサポート部",
        position_name: "サポートスペシャリスト",
      },
    ];

    return HttpResponse.json<UsersResponse>(
      mockData.filter((user) => user.name.includes(searchWord)),
    );
  });

const addUsersToRole = () =>
  http.post(
    `${BASE_URL}/api/roles/:roleCode/users`,
    async ({ request, params }) => {
      const roleCode = params.roleCode as string;
      const body = await request.json();
      return HttpResponse.json({
        success: true,
        received: body,
        message: `ロール（${roleCode}）へユーザー登録成功`,
      });
    },
  );

export const usersResolvers = [getUsers(), addUsersToRole()];
