import { SearchableSelect } from "@components/ui/SearchableSelect";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

// dummy
const allOptions = [
  { label: "仮文字列A", value: "a" },
  { label: "仮文字列B", value: "b" },
  { label: "仮文字列C", value: "c" },
  { label: "仮文字列D", value: "d" },
  { label: "仮文字列E", value: "e" },
];

// dummy disabled
const optionsWithDisabled = [
  { label: "仮文字列A", value: "a" },
  { disabled: true, label: "仮文字列B (選択不可)", value: "b" },
  { label: "仮文字列C", value: "c" },
  { disabled: true, label: "仮文字列D (選択不可)", value: "d" },
  { label: "仮文字列E", value: "e" },
];

const meta: Meta<typeof SearchableSelect> = {
  component: SearchableSelect,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  title: "Atoms/SearchableSelect",
};

export default meta;

type Story = StoryObj<typeof SearchableSelect>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>("");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredOptions =
      searchQuery.trim() === ""
        ? []
        : allOptions.filter((option) =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase()),
          );

    const isValueInFiltered =
      value && filteredOptions.some((option) => option.value === value);

    if (searchQuery.trim() === "" && value !== "") {
      setValue("");
    } else if (searchQuery.trim() !== "" && value && !isValueInFiltered) {
      setValue("");
    }

    return (
      <div className="w-[300px]">
        <SearchableSelect
          {...args}
          onValueChange={setValue}
          options={filteredOptions}
          placeholder="選択"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          value={value}
        />
        <div className="text-xs text-sub-text whitespace-pre-wrap mt-8 w-[400px]">
          使用中のダミーデータ : allOptions
          {allOptions.map(
            (option) =>
              `\n { label : ${option.label}  ,  value : ${option.value} }`,
          )}
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>("");
    const [searchQuery, setSearchQuery] = useState("");

    return (
      <div className="w-[300px]">
        <SearchableSelect
          {...args}
          disabled
          onValueChange={setValue}
          options={allOptions}
          placeholder="選択"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          value={value}
        />
      </div>
    );
  },
};

export const WithDisabledOptions: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>("");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredOptions =
      searchQuery.trim() === ""
        ? []
        : optionsWithDisabled.filter((option) =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase()),
          );

    const isValueInFiltered =
      value && filteredOptions.some((option) => option.value === value);

    if (searchQuery.trim() === "" && value !== "") {
      setValue("");
    } else if (searchQuery.trim() !== "" && value && !isValueInFiltered) {
      setValue("");
    }

    return (
      <div className="w-[300px]">
        <SearchableSelect
          {...args}
          onValueChange={setValue}
          options={filteredOptions}
          placeholder="選択"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          value={value}
        />

        <div className="text-xs text-sub-text whitespace-pre-wrap mt-8 w-[400px]">
          使用中のダミーデータ : optionsWithDisabled
          {optionsWithDisabled.map(
            (option) =>
              `\n { label : ${option.label}  ,  value : ${option.value} ${option.disabled ? " ,  disabled : true" : ""} }`,
          )}
        </div>
      </div>
    );
  },
};
