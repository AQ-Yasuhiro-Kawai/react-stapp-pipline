import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button, VARIANT } from "@/components/ui/Button/index.tsx";
import useModal from "@/components/ui/Modal/hooks/useModal";
import Modal from "./index";

const meta = {
  argTypes: {
    closeModalHandler: { control: false },
    description: { control: "text" },
    isCloseOutsideModal: { control: "boolean" },
    isOpen: { control: "boolean" },
    primaryButton: { control: false },
    secondaryLabelName: { control: "text" },
    title: { control: "text" },
  },
  component: Modal,
  parameters: {
    docs: {
      story: {
        inline: false,
        parameters: {
          args: {
            isOpen: false,
          },
        },
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "shared/Modal",
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// インタラクティブストーリー（ボタンクリックでモーダルを開く）
export const Interactive: Story = {
  args: {
    children: <div className="py-4">モーダルの内容をこちらに表示します</div>,
    closeModalHandler: fn(),
    description: "モーダルの説明文をこちらに表示します",
    isCloseOutsideModal: false,
    isOpen: false,
    primaryButton: <Button>確定</Button>,
    secondaryLabelName: undefined,
    title: "インタラクティブモーダル",
  },
  render: ({ title, isCloseOutsideModal, description, secondaryLabelName }) => {
    const { isOpen, openModal, closeModal } = useModal();

    return (
      <div className="flex flex-col items-center gap-4">
        <Button onClick={openModal}>モーダルを開く</Button>
        <Modal
          closeModalHandler={closeModal}
          description={description}
          isCloseOutsideModal={isCloseOutsideModal}
          isOpen={isOpen}
          primaryButton={
            <Button
              onClick={() => {
                closeModal();
              }}
            >
              確定
            </Button>
          }
          secondaryLabelName={secondaryLabelName}
          title={title}
        >
          <div className="py-4">こちらはモーダルの内容です</div>
        </Modal>
      </div>
    );
  },
};

// 通常のモーダル
export const Default: Story = {
  args: {
    children: <div className="py-4">モーダルの内容をこちらに表示します</div>,
    closeModalHandler: fn(),
    description: "モーダルの説明文をこちらに表示します",
    isOpen: true,
    primaryButton: <Button>確定</Button>,
    title: "サンプルモーダル",
  },
};

// 警告モーダル
export const DangerModal: Story = {
  args: {
    children: (
      <div className="py-4">この操作は取り消せません。本当に続行しますか？</div>
    ),
    closeModalHandler: fn(),
    isOpen: true,
    primaryButton: <Button variant={VARIANT.DESTRUCTIVE}>削除する</Button>,
    title: "警告",
  },
};

// モーダル外クリックで閉じるモーダル
export const CloseOnOutsideClick: Story = {
  args: {
    children: (
      <div className="py-4">
        モーダルの外側をクリックすると閉じます
        <br />
        (ここではActionsが発火します)
      </div>
    ),
    closeModalHandler: fn(),
    isCloseOutsideModal: true,
    isOpen: true,
    primaryButton: <Button>確定</Button>,
    title: "外部クリックで閉じるモーダル",
  },
};
