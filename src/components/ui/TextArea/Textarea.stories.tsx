import { Textarea } from "@components/ui/TextArea";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof Textarea> = {
  args: {
    disabled: false,
    heightSize: "lg",
    placeholder: "テキストを入力してください",
    widthSize: "lg",
  },
  argTypes: {
    className: { control: "text" },
    disabled: { control: "boolean" },
    heightSize: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "half", "full"],
    },
    placeholder: { control: "text" },
    widthSize: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "half", "full"],
    },
  },
  component: Textarea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  title: "Atoms/Textarea",
};

export default meta;

type Story = StoryObj<typeof Textarea>;

/**
 * Default: 入力・操作可能
 */
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <Textarea
        {...args}
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
    );
  },
};

/**
 * Disabled: 入力不可の状態
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "入力不可の状態",
  },
};

/**
 * SizeVariants: 各 widthSize / heightSize バリエーション表示
 */
export const SizeVariants: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div className="flex flex-col gap-4 w-full max-w-full">
        <Textarea
          {...args}
          heightSize="sm"
          onChange={(event) => setValue(event.target.value)}
          placeholder="width: sm, height: sm"
          value={value}
          widthSize="sm"
        />
        <Textarea
          {...args}
          heightSize="md"
          onChange={(event) => setValue(event.target.value)}
          placeholder="width: md, height: md"
          value={value}
          widthSize="md"
        />
        <Textarea
          {...args}
          heightSize="lg"
          onChange={(event) => setValue(event.target.value)}
          placeholder="width: lg, height: lg"
          value={value}
          widthSize="lg"
        />
        <Textarea
          {...args}
          heightSize="half"
          onChange={(event) => setValue(event.target.value)}
          placeholder="width: half, height: half"
          value={value}
          widthSize="half"
        />
        <Textarea
          {...args}
          heightSize="full"
          onChange={(event) => setValue(event.target.value)}
          placeholder="width: full, height: full"
          value={value}
          widthSize="full"
        />
      </div>
    );
  },
};
