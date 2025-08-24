import type { Meta, StoryObj } from "@storybook/react";
import { TextInput as Input } from ".";

const meta: Meta<typeof Input> = {
  component: Input,
  parameters: {
    layout: "centered",
  },
  title: "Atoms/TextInput",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TextInputWithDescription: Story = {
  args: {
    description:
      "TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest",
    isPrimary: true,
    isValid: true,
    placeholder: "プレースホルダー",
    title: "タイトル",
    validationText:
      "数値を入力してください。30文字以内にしてください。8文字以上にしてください。",
  },
  render: ({
    title,
    placeholder,
    description,
    isPrimary,
    isValid,
    validationText,
  }) => {
    return (
      <div className="w-full">
        <Input
          className="w-[360px]"
          description={description}
          isValid={isValid}
          placeholder={placeholder}
          title={title}
          validationText={validationText}
          variant={isPrimary ? "primary" : "secondary"}
        />
        <div className="bg-sub-bg/50">下のコンポーネント</div>
      </div>
    );
  },
};

export const TextInput: Story = {
  args: {
    description: "",
    isPrimary: true,
    isValid: true,
    placeholder: "プレースホルダー",
    title: "タイトル",
    validationText:
      "数値を入力してください。30文字以内にしてください。8文字以上にしてください。",
  },
  render: ({
    title,
    placeholder,
    description,
    isPrimary,
    isValid,
    validationText,
  }) => {
    return (
      <div className="w-full">
        <Input
          className="w-[360px]"
          description={description}
          isValid={isValid}
          placeholder={placeholder}
          title={title}
          validationText={validationText}
          variant={isPrimary ? "primary" : "secondary"}
        />
        <div className="bg-sub-bg/50">下のコンポーネント</div>
      </div>
    );
  },
};
