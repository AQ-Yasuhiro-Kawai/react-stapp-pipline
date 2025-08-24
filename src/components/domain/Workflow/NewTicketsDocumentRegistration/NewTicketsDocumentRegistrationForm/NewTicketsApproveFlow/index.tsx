import {
  ArrowLeft,
  ArrowRight,
  MoveDown,
  Pencil,
  TicketCheck,
} from "lucide-react";
import React from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import { Button, VARIANT } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/Title";
import { ApproveStep } from "./ApproveStep";
import { ApproveStepButton } from "./ApproveStepButton";
import { approveStepStore } from "./store/approveStepStore";

type Props = {
  onBack: () => void;
  onNext: () => void;
};

export function NewTicketsApproveFlow({ onBack, onNext }: Props) {
  const { steps, addStep, hasApprovers } = useStore(
    approveStepStore,
    useShallow((state) => ({
      steps: state.steps,
      addStep: state.addStep,
      hasApprovers: state.hasApprovers,
    })),
  );

  const stepButtonDisabled = steps.length >= 10;

  return (
    <>
      <SectionTitle>承認フロー</SectionTitle>
      <div className="w-full flex items-center gap-x-2 bg-main-blue/20 rounded-[10px] p-4">
        <Pencil className="size-6" />
        <span className="font-bold">申請</span>
      </div>
      <div className="flex items-center my-1">
        <div className="ml-2.5">
          <MoveDown className="size-9" />
        </div>
        <ApproveStepButton
          onClick={() => addStep(0)}
          stepButtonDisabled={stepButtonDisabled}
        />
      </div>
      {steps.map((approveStep, index) => (
        <React.Fragment key={approveStep.id}>
          <ApproveStep
            approvalStep={approveStep}
            label={`ステップ ${index + 1}`}
          />
          <div className="flex items-center my-1">
            <div className="ml-2.5">
              <MoveDown className="size-9" />
            </div>
            <ApproveStepButton
              onClick={() => addStep(index + 1)}
              stepButtonDisabled={stepButtonDisabled}
            />
          </div>
        </React.Fragment>
      ))}
      <div className="w-full flex items-center gap-x-2 bg-main-blue/20 rounded-[10px] p-4">
        <TicketCheck className="size-6" />
        <span className="font-bold">完了</span>
      </div>

      <div className="flex justify-between mt-4 mb-10">
        <Button
          onClick={onBack}
          prefixElement={<ArrowLeft />}
          variant={VARIANT.OUTLINED}
        >
          戻る
        </Button>
        <Button
          disabled={!hasApprovers()}
          onClick={onNext}
          suffixElement={<ArrowRight />}
          variant={VARIANT.PRIMARY}
        >
          次へ
        </Button>
      </div>
    </>
  );
}
