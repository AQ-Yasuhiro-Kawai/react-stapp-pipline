import { Import } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useModal } from "@/components/ui/Modal";
import { ProjectImportModal } from "./ProjectImportModal";

export function ProjectImportButton() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <Button onClick={openModal} prefixElement={<Import />} variant="outlined">
        外部サイトからインポート
      </Button>
      <ProjectImportModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
}
