import type { Meta, StoryObj } from "@storybook/react";
import UnauthorizedError from ".";

const meta: Meta<typeof UnauthorizedError> = {
  component: UnauthorizedError,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  title: "Pages/UnauthorizedError",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
