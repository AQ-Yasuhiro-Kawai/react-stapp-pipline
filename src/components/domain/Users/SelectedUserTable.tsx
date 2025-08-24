import { X } from "lucide-react";
import { useMemo } from "react";
import type { Users } from "@/components/domain/Users/type";
import { Button } from "@/components/ui/Button";
import { type BodyRow, type HeaderColumn, Table } from "@/components/ui/Table";

type TicketRow = {
  userName: string;
  position: string;
};

export type ColumnKeys = TicketRow & { icon: React.ReactNode };

type Props = {
  onDelete: (id: string) => void;
  selectedUsers: Users;
};

export const SelectedUserTable = ({ onDelete, selectedUsers }: Props) => {
  const rows: BodyRow<ColumnKeys>[] = selectedUsers.map((user) => ({
    id: user.userId,
    cells: {
      userName: user.name,
      position: `${user.organizationName} ${user.positionName}`,
      icon: (
        <div className="flex justify-end">
          <Button prefixElement={<X />} size="icon" variant="ghost" />
        </div>
      ),
    },
  }));
  const headerColumns: HeaderColumn<ColumnKeys, keyof ColumnKeys>[] = useMemo(
    () => [
      { children: "", className: "w-40", key: "userName" },
      { children: "", key: "position" },
      {
        children: "",
        className: "w-9",
        key: "icon",
        onCellClick: (row) => onDelete(row.id),
      },
    ],
    [onDelete],
  );

  return (
    <div className="border-t">
      <Table
        bodyRows={rows}
        headerColumns={headerColumns}
        headerInvisible={true}
      />
    </div>
  );
};
