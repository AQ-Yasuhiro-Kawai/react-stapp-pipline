import { DepartmentColumn } from "@/components/domain/Documents/DocumentsDepartmentColumn";
import type { Department } from "@/components/domain/Documents/types";
import { Button } from "@/components/ui/Button";
import { ScrollBar } from "@/components/ui/ScrollBar";

type Props = {
  selectedIds: string[];
  onClear: () => void;
  onSelect: (dept: Department, level: number) => void;
};

export const DocumentsDepartmentList = ({
  selectedIds,
  onClear,
  onSelect,
}: Props) => {
  const parentIds: (string | null)[] = [null, ...selectedIds];

  return (
    <div>
      <ScrollBar className="border-x border-t rounded-t-md ">
        <div className="flex p-2">
          {parentIds.map((parentId, index) => (
            <div className="flex" key={parentId}>
              <DepartmentColumn
                onSelect={(dept) => onSelect(dept, index)}
                parentId={parentId}
                selectedId={selectedIds[index]}
              />
              {index < parentIds.length - 1 && (
                <div className="w-px bg-main-border mx-2" />
              )}
            </div>
          ))}
        </div>
      </ScrollBar>
      <Button
        className="h-9 w-full py-2 px-4 font-normal border rounded-t-none"
        onClick={onClear}
        variant="ghost"
      >
        部署選択をクリア
      </Button>
    </div>
  );
};
