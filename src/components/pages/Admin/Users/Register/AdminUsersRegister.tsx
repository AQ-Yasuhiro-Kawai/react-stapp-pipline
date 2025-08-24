import { UserPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { SearchableUserList } from "@/components/domain/Users/SearchableUserList";
import { SelectedUserTable } from "@/components/domain/Users/SelectedUserTable";
import type { User, Users } from "@/components/domain/Users/type";
import { Button } from "@/components/ui/Button";
import { MainContent } from "@/components/ui/Layout";
import { Modal, useModal } from "@/components/ui/Modal";
import { SpinnerOverlay } from "@/components/ui/Spinner";
import { useBoundStore } from "@/store/store";
import { useAddUsersToRoleMutation } from "@/usecases/users/usecase";

export const AdminUsersRegisterPage = () => {
  const isLoading = useBoundStore((state) => state.isLoading);
  const [selectedUsers, setSelectedUsers] = useState<Users>([]);
  const { isOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const { mutate: addUsersToRole } = useAddUsersToRoleMutation({
    onSuccess: () => {
      navigate("/admin/users");
    },
  });

  const handleUserSelect = (user: User) => {
    setSelectedUsers((prev) => {
      if (prev.some((u) => u.userId === user.userId)) {
        return prev;
      }
      return [...prev, user];
    });
  };

  const handleSelectedUserDelete = (id: string) => {
    setSelectedUsers((prev) => {
      return prev.filter((p) => p.userId !== id);
    });
  };

  const handleUserAddConfirmed = () => {
    addUsersToRole({
      roleCode: "users",
      userIds: selectedUsers.map((user) => user.userId),
    });
    closeModal();
    setSelectedUsers([]);
  };

  return (
    <MainContent pageTitle="管理者ユーザー登録">
      {selectedUsers.length > 0 && (
        <SelectedUserTable
          onDelete={handleSelectedUserDelete}
          selectedUsers={selectedUsers}
        />
      )}

      <SearchableUserList onSelect={handleUserSelect} />

      <div className="mt-4 flex">
        <Button
          className="ml-auto"
          disabled={selectedUsers.length === 0}
          onClick={openModal}
          prefixElement={<UserPlus />}
          variant="outlined"
        >
          管理者権限を適用
        </Button>
      </div>

      <Modal
        closeModalHandler={closeModal}
        isCloseOutsideModal
        isOpen={isOpen}
        primaryButton={<Button onClick={handleUserAddConfirmed}>設定</Button>}
        title="権限設定確認"
      >
        <div className="py-4">
          選択したユーザーに管理者権限を設定してよろしいですか？
        </div>
      </Modal>

      {isLoading && <SpinnerOverlay />}
    </MainContent>
  );
};
