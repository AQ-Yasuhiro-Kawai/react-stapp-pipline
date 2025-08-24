import type { Meta, StoryObj } from "@storybook/react";
import ForbiddenError from ".";

const meta: Meta<typeof ForbiddenError> = {
  component: ForbiddenError,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  title: "Pages/ForbiddenError",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
