import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: () => void;
};

export const ConfirmModal = ({ isOpen, closeModal, onSubmit }: Props) => {
  return (
    <Modal
      closeModalHandler={closeModal}
      isCloseOutsideModal
      isOpen={isOpen}
      primaryButton={<Button onClick={onSubmit}>はい</Button>}
      title="最終確認"
    >
      <div className="py-4">申請してよろしいですか？</div>
    </Modal>
  );
};
