import { MultipleSelect } from "@components/ui/MultipleSelect";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const allOptions = Array.from({ length: 26 }, (_, i) => {
  const letter = String.fromCharCode(65 + i);
  return {
    label: `仮文字列${letter}`,
    value: letter.toLowerCase(),
  };
});

const meta: Meta<typeof MultipleSelect> = {
  component: MultipleSelect,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  title: "Atoms/MultipleSelect",
};

export default meta;
type Story = StoryObj<typeof MultipleSelect>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>([]);

    return (
      <div className="w-[300px]">
        <MultipleSelect
          {...args}
          defaultValue={value}
          onValueChange={setValue}
          options={allOptions}
          placeholder="選択してください"
        />
      </div>
    );
  },
};

export const WithSelectAll: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>([]);

    return (
      <div className="w-[300px]">
        <MultipleSelect
          {...args}
          defaultValue={value}
          enableSelectAll
          onValueChange={setValue}
          options={allOptions}
          placeholder="全選択可能"
        />
      </div>
    );
  },
};

export const WithSearch: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>([]);

    return (
      <div className="w-[300px]">
        <MultipleSelect
          {...args}
          defaultValue={value}
          enableSearch
          onValueChange={setValue}
          options={allOptions}
          placeholder="検索可能"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>(["a", "b"]);

    return (
      <div className="w-[300px]">
        <MultipleSelect
          {...args}
          defaultValue={value}
          disabled
          onValueChange={setValue}
          options={allOptions}
          placeholder="選択不可状態"
        />
      </div>
    );
  },
};
