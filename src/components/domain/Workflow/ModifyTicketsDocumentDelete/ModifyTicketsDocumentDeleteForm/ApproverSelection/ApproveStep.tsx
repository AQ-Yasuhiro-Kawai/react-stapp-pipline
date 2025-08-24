import { CircleCheckBig } from "lucide-react";
import { ScrollBar } from "@/components/ui/ScrollBar";
import type { ApprovalStep } from ".";
import { ApproverGroup } from "./ApproverGroup";

type ApproveStepProps = {
  approval: ApprovalStep;
};

export const ApproveStep = ({ approval }: ApproveStepProps) => {
  return (
    <div className="p-4 bg-sub-bg rounded-[10px]">
      <div className="">
        <div className="flex items-center gap-x-2">
          <CircleCheckBig className="size-6" />
          <span className="font-bold">ステップ {approval.stepNumber}</span>
        </div>
      </div>
      <ScrollBar>
        <div className="flex items-start gap-x-4 mt-4">
          {approval.approvalGroups.map((group) => (
            <ApproverGroup group={group} key={group.groupId} />
          ))}
        </div>
      </ScrollBar>
    </div>
  );
};
