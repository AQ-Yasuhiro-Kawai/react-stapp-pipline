import { X } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import { Button, SIZE, VARIANT } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { type HeaderColumn, Table } from "@/components/ui/Table";
import { NewTicketsSearchableApprover } from "./SearchableApprover";
import {
  type ApproverGroupType,
  approveStepStore,
} from "./store/approveStepStore";

type ApproversRow = {
  name: string;
  role: React.ReactNode;
};
type ColumnKeys = ApproversRow & { button: React.ReactNode };
// 承認者一覧テーブルヘッダ
const headerColumns: HeaderColumn<ColumnKeys, keyof ColumnKeys>[] = [
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

const APPROVER_MIN_LENGTH = 1;

type Props = {
  stepId: string;
  approverGroup: ApproverGroupType;
};

export function ApproverGroup({ stepId, approverGroup }: Props) {
  const { removeGroup, removeApprover, setRequiredApprovals } = useStore(
    approveStepStore,
    useShallow((state) => ({
      removeGroup: state.removeGroup,
      removeApprover: state.removeApprover,
      setRequiredApprovals: state.setRequiredApprovals,
    })),
  );

  // 承認者グループの承認者数をメモ化
  const approverCount = useMemo(
    () => approverGroup.approvers.length,
    [approverGroup],
  );

  // 承認者グループの必要承認人数を選択肢として定義
  const approverCountOptions = useMemo(() => {
    return Array.from({ length: approverCount }, (_, i) => ({
      id: (i + 1).toString(),
      name: (i + 1).toString(),
    }));
  }, [approverCount]);

  // 必須承認者の数を変更するハンドラー
  const onRequiredApprovalsChange = useCallback(
    (value: string) => {
      setRequiredApprovals(stepId, approverGroup.id, Number(value));
    },
    [setRequiredApprovals, stepId, approverGroup.id],
  );

  const approverBodyRows = useMemo(() => {
    return approverGroup.approvers.map((approver) => {
      return {
        id: approver.userId,
        cells: {
          name: approver.name,
          role: approver.positionName,
          button: (
            <Button
              onClick={() =>
                removeApprover(stepId, approverGroup.id, approver.userId)
              }
              prefixElement={<X />}
              size={SIZE.ICON}
              variant={VARIANT.GHOST}
            />
          ),
        },
      };
    });
  }, [approverGroup, removeApprover, stepId]);

  const addApproverButtonDisabled = approverGroup.approvers.length >= 20;

  return (
    <div className="pt-4 px-4 pb-2 bg-main-bg rounded-lg min-h-[120px] min-w-[400px]">
      <div className="flex items-center justify-center relative">
        <div className="flex items-center gap-x-2 min-h-9">
          {approverCount > APPROVER_MIN_LENGTH && (
            <>
              <span className="font-bold">必要承認人数</span>
              <Select
                className="w-25"
                name="approverCount"
                onValueChange={onRequiredApprovalsChange}
                selectItems={approverCountOptions}
                value={approverGroup.requiredApprovals.toString()}
              />
            </>
          )}
        </div>
        <Button
          className="absolute top-0 right-0"
          onClick={() => removeGroup(stepId, approverGroup.id)}
          prefixElement={<X />}
          size={SIZE.ICON}
          variant={VARIANT.OUTLINED_RED}
        />
      </div>

      <div className="mt-2">
        <Table
          bodyRows={approverBodyRows}
          headerColumns={headerColumns}
          headerInvisible
          isHideText
        />
      </div>
      <NewTicketsSearchableApprover
        addApproverButtonDisabled={addApproverButtonDisabled}
        groupId={approverGroup.id}
        stepId={stepId}
      />
    </div>
  );
}
