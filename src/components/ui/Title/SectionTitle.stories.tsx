import type { Meta, StoryObj } from "@storybook/react";
import { SectionTitle } from ".";

const meta: Meta<typeof SectionTitle> = {
  argTypes: {
    children: { control: "text" },
  },
  component: SectionTitle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "UI/Title/Web/SectionTitle",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "セクションタイトル",
  },
};
