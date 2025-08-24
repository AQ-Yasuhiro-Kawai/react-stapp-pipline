import { User, UserMinus } from "lucide-react";
import { memo, useCallback, useMemo, useState } from "react";
import { UserReleaseConfirmModal } from "@/components/domain/Users/List/";
import type { UserItem, UserItemView } from "@/components/domain/Users/type";
import { Button } from "@/components/ui/Button";
import type { BodyRow, HeaderColumn } from "@/components/ui/Table";
import { Table } from "@/components/ui/Table";
import type { PaginationProps } from "@/components/ui/Table/components/Pagination";

type UserListTableProps = {
  items: UserItem[];
  pagination?: PaginationProps;
  isLoading?: boolean;
  onRowClick?: (item: UserItem) => void;
};

const headerColumns: HeaderColumn<UserItemView, keyof UserItemView>[] = [
  { children: "", className: "w-12", key: "icon" },
  { children: "名前", className: "w-40", key: "name" },
  { children: "職位", className: "", key: "position" },
  { children: "メールアドレス", className: "w-80", key: "email" },
  { children: "登録日時", className: "w-40", key: "registeredAt" },
  { children: "", className: "w-23", key: "releaseButton" },
];

function UserListTableComponent({
  items,
  pagination,
  isLoading,
  onRowClick,
}: UserListTableProps) {
  // モーダルの状態管理
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);

  const handleClickRelease = useCallback((user: UserItem) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedUser(null);
  }, []);

  const bodyRows = useMemo<BodyRow<UserItemView>[]>(
    () =>
      items.map((item) => ({
        id: item.id,
        onClick: () => onRowClick?.(item),
        cells: {
          icon: <User />,
          name: item.name,
          position: item.position,
          email: item.email,
          registeredAt: item.registeredAt,
          releaseButton: (
            <Button
              onClick={(e) => {
                e.stopPropagation(); // 行クリックとの干渉を防ぐ
                handleClickRelease(item);
              }}
              variant="outlined-red"
            >
              <UserMinus />
              解除
            </Button>
          ),
        },
      })),
    [items, onRowClick, handleClickRelease],
  );

  return (
    <>
      <Table<UserItemView, keyof UserItemView>
        bodyRows={bodyRows}
        headerColumns={headerColumns}
        isLoading={isLoading}
        pagination={pagination}
      />
      <UserReleaseConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
      />
    </>
  );
}

export const UserListTable = memo(UserListTableComponent);
