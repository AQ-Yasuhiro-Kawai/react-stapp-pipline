import { useState } from "react";
import type {
  Project,
  ProjectView,
} from "@/components/domain/Projects/types/project";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { Modal } from "@/components/ui/Modal";
import type { BodyRow, HeaderColumn } from "@/components/ui/Table";
import { Table } from "@/components/ui/Table";

interface ProjectImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectImportModal({
  isOpen,
  onClose,
}: ProjectImportModalProps) {
  const mockProjects: Project[] = Array.from({ length: 100 }, (_, i) => {
    const num = `${i + 1}`;
    return {
      id: num,
      name: `テストプロジェクト${num}`,
      description: "プロジェクトの説明",
    };
  });

  const [projects] = useState<Project[]>(mockProjects);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const maxPage = Math.ceil(projects.length / pageSize);
  const pagedProjects = projects.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const renderIcon = () => <Icon type="sharePoint" />;

  const headerColumns: HeaderColumn<ProjectView, keyof ProjectView>[] = [
    { children: "", className: "w-24", key: "icon" },
    {
      buttonClassName: "",
      children: "",
      className: "w-160",
      key: "name",
    },
    { children: "", className: "w-216", key: "description" },
  ];

  const bodyRows: BodyRow<ProjectView>[] = pagedProjects.map((project) => {
    const { id, name, description } = project;
    return {
      cells: {
        icon: renderIcon(),
        name,
        description,
      },
      id,
    };
  });

  return (
    <Modal
      className="max-w-2xl "
      closeModalHandler={onClose}
      isOpen={isOpen}
      primaryButton={<Button onClick={() => {}}>インポート</Button>}
      //Todo: インポート処理を実装
      title="プロジェクトインポート"
    >
      <Table<ProjectView, keyof ProjectView>
        bodyRows={bodyRows}
        className="border-t border-main-border mt-4"
        headerColumns={headerColumns}
        headerInvisible
        isLoading={false}
        pagination={{
          currentPage: currentPage,
          maxPage: maxPage,
          onClick: setCurrentPage,
        }}
      />
    </Modal>
  );
}
