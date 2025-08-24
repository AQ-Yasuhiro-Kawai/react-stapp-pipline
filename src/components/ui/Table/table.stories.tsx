import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { Files } from "lucide-react";
import type React from "react";
import { SORTED_STATE } from "./components/Table";
import type { FilterParams } from "./hook/useTable";
import { type BodyRow, type HeaderColumn, Table } from "./index";

const meta: Meta<typeof Table> = {
  component: Table,
  parameters: {
    layout: "centered",
  },
  title: "UI/Table",
};

export default meta;
type Story = StoryObj<typeof meta>;

// APIで想定されるresponseのtype
type API_RESPONSE_TYPE = {
  officialDocument: string;
  publicationSourceOrganizationName: string;
  fileType: string;
  publicationTargetOrganizationName: string;
};

type SortParams = {
  key: string;
  direction: (typeof SORTED_STATE)[keyof typeof SORTED_STATE];
};

// 詳細ボタンなどを付け加える際の型
type COLUMN_KEYS = API_RESPONSE_TYPE & { icon: React.ReactNode };

// デフォルトヘッダー
const defaultHeaderList: HeaderColumn<COLUMN_KEYS, keyof COLUMN_KEYS>[] = [
  { children: "", key: "icon", sorted: SORTED_STATE.NON },
  {
    children: "正文書",
    className: "w-40",
    key: "officialDocument",
    sorted: SORTED_STATE.NON,
  },
  {
    children: "管理元組織",
    className: "w-40",
    key: "publicationSourceOrganizationName",
    sorted: SORTED_STATE.NON,
  },
  {
    children: "文書種類",
    className: "w-40",
    key: "fileType",
    sorted: SORTED_STATE.NON,
  },
  {
    children: "公開範囲",
    className: "w-40",
    key: "publicationTargetOrganizationName",
    sorted: SORTED_STATE.NON,
  },
];

// ソート用ヘッダ
const sortableHeaderList: HeaderColumn<COLUMN_KEYS, keyof COLUMN_KEYS>[] = [
  { children: "", key: "icon", sorted: SORTED_STATE.NON },
  {
    children: "正文書",
    className: "w-40",
    key: "officialDocument",
    sorted: SORTED_STATE.NON,
  },
  {
    children: "管理元組織",
    className: "w-40",
    key: "publicationSourceOrganizationName",
    sorted: SORTED_STATE.ASCENDING,
  },
  {
    children: "文書種類",
    className: "w-40",
    key: "fileType",
    sorted: SORTED_STATE.UNSORTED,
  },
  {
    children: "公開範囲",
    className: "w-40",
    key: "publicationTargetOrganizationName",
    sorted: SORTED_STATE.UNSORTED,
  },
];

// フィルタ用ヘッダー
const filterableHeaderList: HeaderColumn<COLUMN_KEYS, keyof COLUMN_KEYS>[] = [
  { children: "", key: "icon", sorted: SORTED_STATE.NON },
  {
    children: "正文書",
    className: "w-40",
    key: "officialDocument",
    sorted: SORTED_STATE.NON,
  },
  {
    children: "管理元組織",
    className: "w-40",
    key: "publicationSourceOrganizationName",
    sorted: SORTED_STATE.NON,
  },
  {
    children: "文書種類",
    className: "w-40",
    filterOptions: [
      { label: "稟議書", value: "稟議書" },
      { label: "計画書", value: "計画書" },
    ],
    key: "fileType",
    sorted: SORTED_STATE.NON,
  },
  {
    children: "公開範囲",
    className: "w-40",
    filterOptions: [
      { label: "社員のみ", value: "社員のみ" },
      { label: "派遣公開可", value: "派遣公開可" },
    ],
    key: "publicationTargetOrganizationName",
    sorted: SORTED_STATE.NON,
  },
];

const dataList: BodyRow<COLUMN_KEYS>[] = Array.from({ length: 7 }, (_, i) => {
  const id = `${i + 1}`;
  return {
    cells: {
      icon: <Files />,
      officialDocument: `稟議書00${id}`,
      publicationSourceOrganizationName: `本部/${id}部`,
      fileType: i % 2 === 0 ? "稟議書" : "計画書",
      publicationTargetOrganizationName:
        i % 2 === 0 ? "社員のみ" : "派遣公開可",
    },
    id,
  };
});

export const Default: Story = {
  args: {
    bodyRows: dataList,
    headerColumns: defaultHeaderList,
  },
  render: ({ headerColumns, bodyRows }) => {
    return (
      <div className="space-y-10">
        <Table bodyRows={bodyRows} headerColumns={headerColumns} />
        <Table bodyRows={bodyRows} headerColumns={headerColumns} isLoading />
        <Table bodyRows={[]} headerColumns={headerColumns} />
      </div>
    );
  },
};

export const OnSort: Story = {
  args: {
    bodyRows: dataList,
    headerColumns: sortableHeaderList,
    onSort: (params: SortParams) => action("onSort triggered")(params),
  },
  render: ({ headerColumns, bodyRows, onSort }) => {
    return (
      <div className="space-y-20">
        <Table
          bodyRows={bodyRows}
          headerColumns={headerColumns}
          onSort={onSort}
        />
        <Table
          bodyRows={bodyRows}
          headerColumns={headerColumns}
          isLoading
          onSort={onSort}
        />
      </div>
    );
  },
};

export const OnFilter: Story = {
  args: {
    bodyRows: dataList,
    headerColumns: filterableHeaderList,
    onFilter: (params: FilterParams) => action("onFilter triggered")(params),
  },
  render: ({ headerColumns, bodyRows, onFilter }) => {
    return (
      <div className="space-y-20">
        <Table
          bodyRows={bodyRows}
          headerColumns={headerColumns}
          onFilter={onFilter}
        />
        <Table
          bodyRows={bodyRows}
          headerColumns={headerColumns}
          isLoading
          onFilter={onFilter}
        />
      </div>
    );
  },
};

export const Pagination: Story = {
  args: {
    bodyRows: dataList,
    headerColumns: defaultHeaderList,
    pagination: {
      currentPage: 2,
      maxPage: 10,
      onClick: (page: number) => action("onClick")(page),
    },
  },
  render: ({ headerColumns, bodyRows, pagination }) => {
    return (
      <div className="space-y-20">
        <Table
          bodyRows={bodyRows}
          headerColumns={headerColumns}
          pagination={pagination}
        />
        <Table
          bodyRows={bodyRows}
          headerColumns={headerColumns}
          isLoading
          pagination={pagination}
        />
      </div>
    );
  },
};
