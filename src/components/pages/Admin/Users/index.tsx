import { Suspense, useMemo, useState } from "react";
import { Link } from "react-router";
import { UserListTable } from "@/components/domain/Users/List/";
import type { UserItem } from "@/components/domain/Users/type";
import { Button } from "@/components/ui/Button";
import { AppErrorBoundary } from "@/components/ui/Error/components/AppErrorBoundary";
import { AppLayout, MainContent } from "@/components/ui/Layout";
import { SpinnerOverlay } from "@/components/ui/Spinner";

// UI実装確認用テストデータ
const testTableItems: UserItem[] = Array.from({ length: 100 }, (_, i) => {
  const num = `${i + 1}`;
  return {
    id: `user_${num}`,
    name: `田中 太郎 ${num}`,
    position: `〇〇部 部長 ${num}`,
    email: "tanaka@example.com",
    registeredAt: "2028/12/12 12:30",
  };
});

const PAGE_SIZE = 10 as const;

const AdminUsersList = () => {
  // ユーザー一覧の状態管理
  const users = useMemo(() => testTableItems, []);
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(users.length / PAGE_SIZE);
  const UserItems = users.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <>
      <Link to={"/admin/users/register"}>
        <Button variant="outlined">管理者登録</Button>
      </Link>
      <div className="pt-4 pb-10">
        <UserListTable
          isLoading={false}
          items={UserItems}
          pagination={{
            currentPage: currentPage,
            maxPage: maxPage,
            onClick: setCurrentPage,
          }}
        />
      </div>
    </>
  );
};

export const AdminUsers = () => {
  return (
    <AppLayout>
      <MainContent pageTitle="管理者ユーザー一覧">
        <AdminUsersList />
      </MainContent>
      <Suspense fallback={<SpinnerOverlay />}>
        <AppErrorBoundary>管理者ユーザー一覧</AppErrorBoundary>
      </Suspense>
    </AppLayout>
  );
};
