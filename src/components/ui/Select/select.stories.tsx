import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Select } from ".";

const meta: Meta<typeof Select> = {
  component: Select,
  parameters: {
    layout: "centered",
  },
  title: "Atoms/Select",
};

export default meta;
type Story = StoryObj<typeof meta>;

const args = { onValueChange: fn() };
const resetFunction = fn();

export const SelectComponent: Story = {
  args: {
    list: ["りんご", "みかん", "パイナップル"],
    placeholder: "プレースホルダー",
    resetFunction,
    resetOption: false,
    ...args,
  },
  render: ({ list, placeholder, resetOption, resetFunction, ...args }) => {
    return (
      <Select
        name={"test-select"}
        {...args}
        className="w-[360px]"
        onReset={
          resetOption ? { function: resetFunction, label: "test" } : undefined
        }
        placeholder={placeholder}
        selectItems={list.map((item: string, index: number) => ({
          id: String(index),
          name: item,
        }))}
      />
    );
  },
};
