import { CircleCheckBig, LoaderCircle } from "lucide-react";
import React from "react";
import { cn } from "@/utils/cn";

export type WorkflowFormStepStatus =
  (typeof WORKFLOW_FORM_STEP_STATUS)[keyof typeof WORKFLOW_FORM_STEP_STATUS];

export type WorkflowFormStep = {
  id: number;
  name: string;
  status: WorkflowFormStepStatus;
};

type Props = {
  items: WorkflowFormStep[];
  currentStep: number;
  onClick: (id: number) => void;
};

export const WORKFLOW_FORM_STEP = {
  APPLICATION_DETAILS: 1, // 申請内容入力
  APPROVER_SELECTION: 2, // 承認者選択
  APPLICATION_CONFIRM: 3, // 内容確認
} as const;

export const WORKFLOW_FORM_STEP_STATUS = {
  CURRENT: "current",
  DONE: "done",
  NOT_DONE: "not-done",
  LOADING: "loading",
} as const;

export function WorkflowFormStep({ items, currentStep, onClick }: Props) {
  return (
    <div className="flex w-full items-center">
      {items.map((item, index) => {
        const disabled = item.id > currentStep; // ステップ移動の非活性制御
        const hasConnector = index > 0; // コネクターの表示制御

        return (
          <React.Fragment key={item.id}>
            {hasConnector && (
              <div
                className={cn(
                  "flex-1 h-0.5 bg-main-border",
                  item.status !== WORKFLOW_FORM_STEP_STATUS.NOT_DONE &&
                    "bg-main-green",
                )}
              />
            )}
            <WorkflowFormStepItem
              disabled={disabled}
              item={item}
              onClick={() => onClick(item.id)}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}

function WorkflowFormStepItem({
  item,
  disabled,
  onClick,
}: {
  item: WorkflowFormStep;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex-shrink-0">
      <button
        className={cn(
          "relative flex items-center justify-center h-10 w-50 border-2 rounded-full border-main-border text-sub-text font-normal bg-main-bg cursor-pointer hover:bg-thin-bg",
          item.status !== WORKFLOW_FORM_STEP_STATUS.NOT_DONE &&
            "border-main-green text-main-text hover:bg-main-green/10",
          item.status === WORKFLOW_FORM_STEP_STATUS.CURRENT &&
            "bg-main-green/10 font-bold cursor-default pointer-events-none hover:bg-main-green/10",
          disabled && "hover:bg-main-bg disabled:cursor-not-allowed",
        )}
        disabled={disabled}
        onClick={onClick}
        type="button"
      >
        <div className="absolute left-2 top-1/2 -translate-y-1/2">
          {item.status === WORKFLOW_FORM_STEP_STATUS.LOADING && (
            <LoaderCircle className="text-main-green transform animate-spin" />
          )}
          {item.status === WORKFLOW_FORM_STEP_STATUS.DONE && (
            <CircleCheckBig className="text-main-green" />
          )}
        </div>
        <span>{item.name}</span>
      </button>
    </div>
  );
}
