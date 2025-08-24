import { DatePicker } from "@/components/ui/DatePicker";

type DateRangeInputProps = {
  label: string;
  dateFrom: string;
  dateTo: string;
  id: string;
  onChangeDateFrom: (date: Date | undefined) => void;
  onChangeDateTo: (date: Date | undefined) => void;
};

export const DateRangeInputMobile = ({
  label,
  dateFrom,
  dateTo,
  id,
  onChangeDateFrom,
  onChangeDateTo,
}: DateRangeInputProps) => {
  return (
    <div className="flex pt-4 flex-col items-start self-stretch">
      <label htmlFor={id}>{label}</label>
      <div className="flex pt-2 flex-col items-start self-stretch">
        <DatePicker
          canReset={true}
          id={id}
          placeholder="日付選択"
          selectedDate={dateFrom ? new Date(dateFrom) : undefined}
          setSelectedDate={onChangeDateFrom}
        />
        <div className="flex pt-2 justify-center items-center self-stretch">
          <span className="text-sm rotate-90">〜</span>
        </div>
        <div className="flex pt-2 flex-col items-start self-stretch">
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
