import type { Meta, StoryObj } from "@storybook/react";
import NotFoundError from ".";

const meta: Meta<typeof NotFoundError> = {
  component: NotFoundError,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  title: "Pages/NotFoundError",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
