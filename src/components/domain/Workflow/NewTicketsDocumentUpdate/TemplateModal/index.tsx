import {
  ChevronRight,
  CircleCheckBig,
  MoveDown,
  Pencil,
  TicketCheck,
} from "lucide-react";
import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import { Button, SIZE, VARIANT } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { SearchableInput } from "@/components/ui/SearchableInput";
import { type HeaderColumn, Table } from "@/components/ui/Table";
import { SectionTitle } from "@/components/ui/Title";

type TemplateRow = {
  templateName: string;
  button: React.ReactNode;
};

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

type TemplateSelectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (template: Template) => void;
};

type TemplateApprovalProps = {
  template: Template;
};

type TemplateApprovalStepProps = {
  step: TemplateStep;
};

type TemplateApprovalGroupProps = {
  group: TemplateStepGroup;
};

const sampleUsers = [
  { id: 1, name: "田中太郎", role: "A部 部長" },
  { id: 2, name: "佐藤花子", role: "B部 課長" },
  { id: 3, name: "鈴木一郎", role: "C部 主任" },
  { id: 4, name: "山田次郎", role: "D部 副主任" },
];

const sampleTemplates: Template[] = [
  {
    id: "1",
    name: "〇〇の申請テンプレート",
    steps: [
      {
        stepNum: 1,
        groups: [
          {
            id: "1",
            userIds: [1, 2, 3],
            requireNum: 2,
          },
          {
            id: "2",
            userIds: [1],
            requireNum: 1,
          },
          {
            id: "3",
            userIds: [1, 2, 3, 4],
            requireNum: 2,
          },
        ],
      },
      {
        stepNum: 2,
        groups: [
          {
            id: "2",
            userIds: [1, 2],
            requireNum: 2,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "△△の申請テンプレート",
    steps: [
      {
        stepNum: 1,
        groups: [
          {
            id: "2",
            userIds: [1, 2],
            requireNum: 1,
          },
        ],
      },
    ],
  },
];

// テンプレート一覧テーブルヘッダ
const headerColumns: HeaderColumn<TemplateRow, keyof TemplateRow>[] = [
  { children: "", key: "templateName" },
  {
    children: "",
    className: "w-[46px]",
    key: "button",
  },
];

// テンプレート一覧テーブルボディ
const bodyRows = sampleTemplates.map((template) => ({
  cells: {
    templateName: template.name,
    button: (
      <Button
        prefixElement={<ChevronRight />}
        size={SIZE.ICON}
        variant={VARIANT.GHOST}
      />
    ),
  },
  id: String(template.id),
}));

export function TemplateSelectModal({
  isOpen,
  onClose,
  onConfirm,
}: TemplateSelectModalProps) {
  const [currentViewTemplate, setCurrentViewTemplate] =
    useState<Template | null>(); // 詳細表示中のテンプレート

  const handleConfirmTemplate = () => {
    onClose();
    setCurrentViewTemplate(null);
    if (currentViewTemplate) {
      onConfirm(currentViewTemplate);
    }
  };

  const handleCloseModal = () => {
    onClose();
    setCurrentViewTemplate(null);
  };

  const handleRowClick = (id: string) => {
    setCurrentViewTemplate(
      sampleTemplates.find((template) => template.id === id),
    );
  };

  return (
    <Modal
      className="max-w-[800px] h-[800px] gap-0"
      closeModalHandler={handleCloseModal}
      isCloseOutsideModal
      isOpen={isOpen}
      primaryButton={
        currentViewTemplate ? (
          <Button onClick={handleConfirmTemplate}>決定</Button>
        ) : undefined
      }
      secondaryButton={
        currentViewTemplate ? (
          <Button
            onClick={() => setCurrentViewTemplate(null)}
            variant={VARIANT.OUTLINED}
          >
            戻る
          </Button>
        ) : undefined
      }
      title="テンプレートを選択"
    >
      {currentViewTemplate ? (
        <div className="mt-4">
          <SectionTitle className="pb-0">
            {currentViewTemplate.name}
          </SectionTitle>
        </div>
      ) : (
        <div className="mt-6">
          <SearchableInput placeholder="テンプレートを検索" />
        </div>
      )}
      <div className="flex-1 min-h-0 mt-2 relative overflow-hidden mb-1">
        <div className="absolute top-0 w-full h-4 bg-gradient-to-b from-main-bg to-transparent z-50 pointer-events-none" />
        <div className="absolute bottom-0 w-full h-4 bg-gradient-to-t from-main-bg to-transparent z-50 pointer-events-none" />
        <SimpleBar className="h-full relative z-0 py-4">
          {currentViewTemplate ? (
            <TemplateApproval template={currentViewTemplate} />
          ) : (
            <Table
              bodyRows={bodyRows}
              className="border-t border-main-border"
              headerColumns={headerColumns}
              headerInvisible
              onRowClick={handleRowClick}
            />
          )}
        </SimpleBar>
      </div>
    </Modal>
  );
}

function TemplateApproval({ template }: TemplateApprovalProps) {
  return (
    <div>
      <div className="w-full flex items-center gap-x-2 bg-main-blue/20 rounded-[10px] p-4">
        <Pencil className="size-6" />
        <span className="font-bold">申請</span>
      </div>
      <div className="flex items-center my-2">
        <div className="ml-2.5">
          <MoveDown className="size-9" />
        </div>
      </div>
      {template.steps.map((step) => (
        <React.Fragment key={step.stepNum}>
          <TemplateApprovalStep step={step} />
          <div className="flex items-center my-2">
            <div className="ml-2.5">
              <MoveDown className="size-9" />
            </div>
          </div>
        </React.Fragment>
      ))}
      <div className="w-full flex items-center gap-x-2 bg-main-blue/20 rounded-[10px] p-4">
        <TicketCheck className="size-6" />
        <span className="font-bold">完了</span>
      </div>
    </div>
  );
}

function TemplateApprovalStep({ step }: TemplateApprovalStepProps) {
  return (
    <div className="p-4 bg-sub-bg rounded-[10px]">
      <div className="">
        <div className="flex items-center gap-x-2">
          <CircleCheckBig className="size-6" />
          <span className="font-bold">ステップ {step.stepNum}</span>
        </div>
      </div>
      <SimpleBar>
        <div className="flex items-start gap-x-4 mt-4">
          {step.groups.map((group) => (
            <TemplateApprovalGroup group={group} key={group.id} />
          ))}
        </div>
      </SimpleBar>
    </div>
  );
}

function TemplateApprovalGroup({ group }: TemplateApprovalGroupProps) {
  return (
    <div className="px-2 bg-main-bg rounded-lg min-w-[300px]">
      <div className="flex items-center justify-center flex-col font-bold h-[62px] py-2">
        {group.requireNum > 1 ? (
          <>
            <div>必要承認人数</div>
            <div>{group.requireNum}人</div>
          </>
        ) : (
          <div>必須</div>
        )}
      </div>
      <div className="mt-2">
        {group.userIds.map((userId) => {
          const user = sampleUsers.find((u) => u.id === userId);
          return (
            <div
              className="py-2 px-4 space-y-1 border-b border-main-border last:border-b-0"
              key={userId}
            >
              <div>{user?.name}</div>
              <div>{user?.role}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
