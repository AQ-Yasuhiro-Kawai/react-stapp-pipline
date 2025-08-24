import { SearchableInput } from "@components/ui/SearchableInput";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof SearchableInput> = {
  component: SearchableInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  title: "Atoms/SearchableInput",
};

export default meta;

type Story = StoryObj<typeof SearchableInput>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    // change event test function
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log("onChange:", e.target.value);
      setValue(e.target.value);
    };

    // click event test function
    const handleClick = () => {
      console.log("onClick");
    };

    return (
      <div className="w-[400px]">
        <SearchableInput
          {...args}
          onChange={handleChange}
          onClick={handleClick}
          placeholder="プロジェクトを検索"
          value={value}
        />
      </div>
    );
  },
};
