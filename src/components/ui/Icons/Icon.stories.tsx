import { Icon } from "@components/ui/Icons";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Icon> = {
  title: "Atoms/Icons",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["circleStop", "excel", "powerpoint", "sharePoint", "word"],
    },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    type: "circleStop",
    className: "w-6 h-6",
  },
};

export const AllIcons: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-6 p-4">
      {(
        ["circleStop", "excel", "powerpoint", "sharePoint", "word"] as const
      ).map((type) => (
        <div className="flex flex-col items-center space-y-2" key={type}>
          <Icon {...args} type={type} />
          <span className="text-xs text-gray-600">{type}</span>
        </div>
      ))}
    </div>
  ),
  args: {
    className: "w-12 h-12",
  },
};
