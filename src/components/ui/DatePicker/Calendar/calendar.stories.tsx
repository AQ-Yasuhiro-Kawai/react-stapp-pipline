import type { Meta, StoryObj } from "@storybook/react";
import { ja } from "date-fns/locale";
import { type Component, useState } from "react";
import { Calendar as CalendarComponent } from ".";

const meta: Meta<typeof Component<"div">> = {
  component: CalendarComponent,
  parameters: {
    layout: "centered",
  },
  title: "UI/DatePicker/Calendar",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Calendar: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>();
    return (
      <div>
        <CalendarComponent
          locale={ja}
          mode="single"
          onSelect={setSelected}
          selected={selected}
        />
      </div>
    );
  },
};
