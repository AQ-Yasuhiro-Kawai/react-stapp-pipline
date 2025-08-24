import { Plus } from "lucide-react";
import { memo } from "react";
import { cn } from "@/utils/cn";

type Props = {
  onClick: () => void;
  stepButtonDisabled: boolean;
};

export const ApproveStepButton = memo(
  ({ onClick, stepButtonDisabled }: Props) => {
    return (
      <button
        className={cn(
          "cursor-pointer flex items-center gap-x-4 w-full h-9 rounded-[10px] hover:bg-thin-bg",
          stepButtonDisabled &&
            "cursor-default text-main-border hover:bg-transparent",
        )}
        disabled={stepButtonDisabled}
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
  },
);
