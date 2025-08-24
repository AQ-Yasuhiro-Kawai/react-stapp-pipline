import { useCallback, useState } from "react";

/**
 * モーダルの開閉状態を管理するためのカスタムフック
 */
function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    closeModal,
    isOpen,
    openModal,
  };
}

export default useModal;
