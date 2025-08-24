import { ChevronRight } from "lucide-react";
import { ScrollBar } from "@/components/ui/ScrollBar";
import { useGetDepartmentsQuery } from "@/usecases/document/reader";
import type { Department } from "./types";

type Props = {
  parentId: string | null;
  selectedId?: string;
  onSelect: (department: Department) => void;
};

export const DepartmentColumn = ({ parentId, selectedId, onSelect }: Props) => {
  const { data: departments } = useGetDepartmentsQuery(parentId);

  return (
    <ScrollBar className="w-58 h-46">
      <ul>
        {departments?.map((dept) => (
          <li key={dept.id}>
            <button
              className={`w-full h-8 px-1 cursor-pointer flex items-center rounded-sm ${
                selectedId === dept.id ? "bg-main-blue/20" : "hover:bg-sub-bg"
              }`}
              onClick={() => onSelect(dept)}
              type="button"
            >
              <span className="truncate">{dept.name}</span>
              {dept.hasChildren && <ChevronRight className="ml-auto" />}
            </button>
          </li>
        ))}
      </ul>
    </ScrollBar>
  );
};
