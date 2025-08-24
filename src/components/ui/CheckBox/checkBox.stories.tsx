import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Checkbox } from ".";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  title: "Atoms/CheckBox",
};

export default meta;
type Story = StoryObj<typeof meta>;

type CheckListItem = React.ComponentProps<typeof Checkbox>;
const checkList: CheckListItem[] = [
  {
    label: "test",
    onCheckedChange: fn(),
  },
  {
    defaultChecked: false,
    label: "テスト",
    onCheckedChange: fn(),
  },
  {
    defaultChecked: true,
    label: "壁検知AI",
    onCheckedChange: fn(),
  },
  {
    defaultChecked: true,
    label: "水濡れ検知AI",
    onCheckedChange: fn(),
  },
  {
    checked: true,
    disabled: true,
    label: "選択不可",
    onCheckedChange: fn(),
  },
  {
    checked: false,
    disabled: true,
    label: "選択不可（false）",
    onCheckedChange: fn(),
  },
];

export const CheckListItems: Story = {
  args: { checkList },
  render: ({ checkList }) => (
    <>
      {checkList.map((checkItem: CheckListItem) => (
        <Checkbox {...checkItem} key={checkItem.name} />
      ))}
    </>
  ),
};
