import type { ApprovalGroup } from ".";

type ApproverGroupProps = {
  group: ApprovalGroup;
};

export const ApproverGroup = ({ group }: ApproverGroupProps) => {
  return (
    <div className="px-2 bg-main-bg rounded-lg min-w-[300px]">
      <div className="flex items-center justify-center flex-col font-bold h-[62px] py-2">
        {group.requiredApprovalCount > 1 ? (
          <>
            <div>必要承認人数</div>
            <div>{group.requiredApprovalCount}人</div>
          </>
        ) : (
          <div>必須</div>
        )}
      </div>
      <div className="mt-2">
        {group.approvers.map((approver) => (
          <div
            className="py-2 px-4 space-y-1 border-b border-main-border last:border-b-0"
            key={approver.userId}
          >
            <div>{approver.name}</div>
            <div>
              {approver.organizationName} {approver.positionName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
