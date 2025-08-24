import type { Meta, StoryObj } from "@storybook/react";
import UnknownError from ".";

const meta: Meta<typeof UnknownError> = {
  component: UnknownError,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  title: "Pages/UnknownError",
};

export default meta;
type Story = StoryObj<typeof meta>;

// 標準的なErrorオブジェクトを渡した場合
export const WithErrorObject: Story = {
  args: {
    error: new Error("This is a standard Error object message."),
  },
};

// 文字列を渡した場合
export const WithString: Story = {
  args: {
    error: "A simple string error message.",
  },
};

// errorがnullやundefinedだった場合
export const WithoutError: Story = {
  args: {
    error: null,
  },
};
