import { memo } from "react";
import type { UserItem } from "@/components/domain/Users/type";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

type UserReleaseConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: UserItem | null;
};

const UserReleaseConfirmModalComponent = ({
  isOpen,
  onClose,
  user,
}: UserReleaseConfirmModalProps) => {
  if (!user) return null;

  return (
    <Modal
      className="max-w-120"
      closeModalHandler={onClose}
      isCloseOutsideModal
      isOpen={isOpen}
      primaryButton={
        <Button
          onClick={() => {
            console.log("release", user);
            onClose();
          }}
          variant="destructive"
        >
          解除
        </Button>
      }
      title="権限削除確認"
    >
      <div className="py-4">
        <div className="text-nowrap">
          下記のユーザーから管理者権限を解除してよろしいですか？
        </div>
        <div className="p-4">
          <ul>
            <li className="flex gap-x-4">
              <span className="w-30">{user.name}</span>
              <span className="w-auto">{user.position}</span>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export const UserReleaseConfirmModal = memo(UserReleaseConfirmModalComponent);
