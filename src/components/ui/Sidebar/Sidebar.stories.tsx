import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from ".";

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  decorators: [
    (Story) => (
      <div style={{ display: "flex", height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "UI/Sidebar",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isCollapsed: false,
    onToggle: () => console.log("Toggled!"),
  },
};

export const Collapsed: Story = {
  args: {
    isCollapsed: true,
    onToggle: () => console.log("Toggled!"),
  },
};
