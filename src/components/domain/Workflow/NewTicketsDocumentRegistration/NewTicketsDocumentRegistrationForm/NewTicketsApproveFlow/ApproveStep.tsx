import { CircleCheckBig, Plus, Users, X } from "lucide-react";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import { Button, SIZE, VARIANT } from "@/components/ui/Button";
import { ScrollBar } from "@/components/ui/ScrollBar";
import { cn } from "@/utils/cn";
import { ApproverGroup } from "./ApproverGroup";
import { type ApprovalStep, approveStepStore } from "./store/approveStepStore";

// Propsを定義 ApproverGroupType[]を受け取る
type ApproveStepProps = {
  label: string;
  approvalStep: ApprovalStep;
};

export function ApproveStep({ label, approvalStep }: ApproveStepProps) {
  const { steps, removeStep, addGroup } = useStore(
    approveStepStore,
    useShallow((state) => ({
      steps: state.steps,
      removeStep: state.removeStep,
      addGroup: state.addGroup,
    })),
  );

  const addGroupButtonDisabled = approvalStep.groups.length >= 20;
  const removeStepButtonHidden = steps.length <= 1;

  return (
    <div className="p-4 bg-sub-bg rounded-[10px]">
      <div className="flex items-center gap-x-2 justify-between">
        <div className="flex items-center gap-x-2">
          <CircleCheckBig className="size-6" />
          <span className="font-bold">{label}</span>
        </div>
        {!removeStepButtonHidden && (
          <Button
            onClick={() => removeStep(approvalStep.id)}
            prefixElement={<X />}
            size={SIZE.ICON}
            variant={VARIANT.OUTLINED_RED}
          />
        )}
      </div>
      <ScrollBar>
        <div className="flex gap-x-4 mt-4">
          {approvalStep.groups.map((approverGroup) => (
            <ApproverGroup
              approverGroup={approverGroup}
              key={approverGroup.id}
              stepId={approvalStep.id}
            />
          ))}
          <div className="min-h-[120px]">
            <Button
              className={cn(
                "h-full  py-2 px-4 rounded-lg text-main-text [background:var(--bg-overlay-blue)] hover:[background:var(--bg-overlay-blue-hover)]",
                addGroupButtonDisabled &&
                  "cursor-default text-main-border hover:[background:var(--bg-overlay-blue)]",
              )}
              disabled={addGroupButtonDisabled}
              onClick={() => addGroup(approvalStep.id)}
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
        </div>
      </ScrollBar>
    </div>
  );
}
