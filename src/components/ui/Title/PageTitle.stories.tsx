import type { Meta, StoryObj } from "@storybook/react";
import { PageTitle } from ".";

const meta: Meta<typeof PageTitle> = {
  argTypes: {
    children: { control: "text" },
  },
  component: PageTitle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "UI/Title/Web/PageTitle",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "ページタイトル",
  },
};
