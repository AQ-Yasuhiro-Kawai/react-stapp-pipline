import {
  CircleCheckBig,
  MoveDown,
  Pencil,
  Plus,
  ScanSearch,
  TicketCheck,
  Users,
  X,
} from "lucide-react";
import React from "react";
import SimpleBar from "simplebar-react";
import { Button, SIZE, VARIANT } from "@/components/ui/Button";
import { useModal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { type HeaderColumn, Table } from "@/components/ui/Table";
import { SectionTitle } from "@/components/ui/Title";
import { SearchableApprover } from "../SearchableApprover";
import { TemplateSelectModal } from "../TemplateModal";

type Template = {
  id: string;
  name: string;
  steps: TemplateStep[];
};

type TemplateStep = {
  stepNum: number;
  groups: TemplateStepGroup[];
};

type TemplateStepGroup = {
  id: string;
  userIds: number[];
  requireNum: number;
};

// 承認者グループ
type ApproversGroup = {
  id: number;
  approversId: number;
};

type ApproversRow = {
  name: string;
  role: React.ReactNode;
};

type ColumnKeys = ApproversRow & { button: React.ReactNode };

// 承認者一覧テーブルヘッダ
const approverHeaderColumns: HeaderColumn<ColumnKeys, keyof ColumnKeys>[] = [
  { children: "", key: "name" },
  {
    children: "",
    className: "w-[152px]",
    key: "role",
  },
  {
    children: "",
    className: "w-[36px]",
    key: "button",
  },
];

// 承認者一覧テーブルボディ
const approverBodyRows = [
  {
    cells: {
      name: "田中太郎",
      role: "〇〇部 部長",
      button: (
        <Button
          prefixElement={<X />}
          size={SIZE.ICON}
          variant={VARIANT.GHOST}
        ></Button>
      ),
    },
    id: "1",
  },
  {
    cells: {
      name: "田中太郎",
      role: "〇〇部 部長",
      button: (
        <Button
          prefixElement={<X />}
          size={SIZE.ICON}
          variant={VARIANT.GHOST}
        ></Button>
      ),
    },
    id: "2",
  },
  {
    cells: {
      name: "田中太郎",
      role: "〇〇部 部長",
      button: (
        <Button
          prefixElement={<X />}
          size={SIZE.ICON}
          variant={VARIANT.GHOST}
        ></Button>
      ),
    },
    id: "3",
  },
];

const approverGroups: ApproversGroup[] = [
  { approversId: 1, id: 1 },
  { approversId: 2, id: 2 },
];

const approveSteps = [
  { id: 1, label: "ステップ 1" },
  { id: 2, label: "ステップ 2" },
];

const approverNum = [
  { id: "1", name: "1" },
  { id: "2", name: "2" },
];

const approverCandidates = [
  { id: 1, name: "田中A太郎", role: "A部 部長", value: "田中A太郎 A部 部長" },
  { id: 2, name: "田中A太郎", role: "B部 部長", value: "田中A太郎 B部 部長" },
  { id: 3, name: "田中C太郎", role: "C部 部長", value: "田中C太郎 C部 部長" },
  { id: 4, name: "田中D太郎", role: "D部 部長", value: "田中D太郎 D部 部長" },
  { id: 5, name: "田中E太郎", role: "E部 部長", value: "田中E太郎 E部 部長" },
];

export function ApproverContent() {
  const { isOpen, openModal, closeModal } = useModal(); // テンプレート選択モーダル

  // 承認ステップ追加
  const handleAddApprovalStep = () => {
    console.log(1);
  };

  // テンプレート決定
  const handleConfirmTemplate = (template: Template) => {
    console.log("selected", template);
  };

  return (
    <>
      <div className="mt-10">
        <SectionTitle>テンプレート選択</SectionTitle>
        <Button
          onClick={openModal}
          prefixElement={<ScanSearch />}
          variant={VARIANT.OUTLINED}
        >
          テンプレート選択
        </Button>
        <TemplateSelectModal
          isOpen={isOpen}
          onClose={closeModal}
          onConfirm={handleConfirmTemplate}
        />
      </div>
      <div className="mt-10">
        <SectionTitle>承認フロー</SectionTitle>
        <ApprovalLabel icon={<Pencil className="size-6" />} label="申請" />
        <ApprovalStepDivider onClick={handleAddApprovalStep} />
        {approveSteps.map((approveStep) => (
          <React.Fragment key={approveStep.id}>
            <ApprovalStep label={approveStep.label} />
            <ApprovalStepDivider onClick={handleAddApprovalStep} />
          </React.Fragment>
        ))}
        <ApprovalLabel icon={<TicketCheck className="size-6" />} label="完了" />
      </div>
    </>
  );
}

function ApprovalLabel({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="w-full flex items-center gap-x-2 bg-main-blue/20 rounded-[10px] p-4">
      {icon}
      <span className="font-bold">{label}</span>
    </div>
  );
}

function ApprovalStepDivider({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex items-center my-1">
      <div className="ml-2.5">
        <MoveDown className="size-9" />
      </div>
      <AddApproveStepButton onClick={onClick} />
    </div>
  );
}

function ApprovalStep({ label }: { label: string }) {
  return (
    <div className="p-4 bg-sub-bg rounded-[10px]">
      <div className="flex items-center gap-x-2 justify-between">
        <div className="flex items-center gap-x-2">
          <CircleCheckBig className="size-6" />
          <span className="font-bold">{label}</span>
        </div>
        <Button
          prefixElement={<X />}
          size={SIZE.ICON}
          variant={VARIANT.OUTLINED_RED}
        ></Button>
      </div>
      <SimpleBar>
        <div className="flex items-stretch gap-x-4 mt-4">
          {approverGroups.map((approverGroup) => (
            <ApproverGroup key={approverGroup.id} />
          ))}
          <Button
            className="h-[inherit] text-main-text [background:var(--bg-overlay-blue)] hover:[background:var(--bg-overlay-blue-hover)]"
            prefixElement={
              <div className="flex items-center">
                <Plus />
                <Users />
              </div>
            }
          >
            承認グループを追加
          </Button>
        </div>
      </SimpleBar>
    </div>
  );
}

function ApproverGroup() {
  const handleSelect = (value: string) => {
    console.log(value);
  };

  return (
    <div className="p-4 bg-main-bg rounded-lg min-w-[400px]">
      <div className="flex items-center justify-center relative">
        <div className="flex items-center gap-x-2">
          <span className="font-bold">必要承認人数</span>
          <Select className="w-25" name="" selectItems={approverNum} />
        </div>
        <Button
          className="absolute top-0 right-0"
          prefixElement={<X />}
          size={SIZE.ICON}
          variant={VARIANT.OUTLINED_RED}
        ></Button>
      </div>
      <div className="mt-2">
        <Table
          bodyRows={approverBodyRows}
          headerColumns={approverHeaderColumns}
          headerInvisible
        />
      </div>
      <SearchableApprover
        onSelect={handleSelect}
        selectOptions={approverCandidates}
      />
    </div>
  );
}

function AddApproveStepButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="cursor-pointer flex items-center gap-x-4 w-full h-9 rounded-[10px] hover:bg-thin-bg"
      onClick={onClick}
      type="button"
    >
      <div className="flex-1 border-dashed border-t-2"></div>
      <div className="flex items-center gap-x-2">
        <Plus className="size-4.5" />
        <span className="font-bold">承認ステップを追加</span>
      </div>
      <div className="flex-1 border-dashed border-t-2"></div>
    </button>
  );
}
