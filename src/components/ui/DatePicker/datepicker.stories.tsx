import type { Meta, StoryObj } from "@storybook/react";
import { type Component, useState } from "react";
import { DatePicker as DatePickerComponent } from ".";

const meta: Meta<typeof Component<"div">> = {
  component: DatePickerComponent,
  parameters: {
    layout: "centered",
  },
  title: "UI/DatePicker",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DatePicker: Story = {
  args: { canReset: true },
  render: ({ canReset }) => {
    const [selected, setSelected] = useState<Date | undefined>();
    return (
      <div className="h-[360px] w-[240px]">
        <DatePickerComponent
          canReset={canReset}
          placeholder="日付選択"
          selectedDate={selected}
          setSelectedDate={setSelected}
        />
      </div>
    );
  },
};
