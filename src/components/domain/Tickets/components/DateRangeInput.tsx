import { DatePicker } from "@/components/ui/DatePicker";

type DateRangeInputProps = {
  label: string;
  dateFrom: string;
  dateTo: string;
  id: string;
  onChangeDateFrom: (date: Date | undefined) => void;
  onChangeDateTo: (date: Date | undefined) => void;
};

export const DateRangeInput = ({
  label,
  dateFrom,
  dateTo,
  id,
  onChangeDateFrom,
  onChangeDateTo,
}: DateRangeInputProps) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div className="flex mt-2 items-center">
        <div className="shrink-0 flex-1">
          <DatePicker
            canReset={true}
            id={id}
            placeholder="日付選択"
            selectedDate={dateFrom ? new Date(dateFrom) : undefined}
            setSelectedDate={onChangeDateFrom}
          />
        </div>
        <div className="mx-2.5">〜</div>
        <div className="shrink-0 flex-1">
          <DatePicker
            canReset={true}
            placeholder="日付選択"
            selectedDate={dateTo ? new Date(dateTo) : undefined}
            setSelectedDate={onChangeDateTo}
          />
        </div>
      </div>
    </div>
  );
};
