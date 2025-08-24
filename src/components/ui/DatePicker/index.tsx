import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@lib/shadcn/ui/popover";
import { ja } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Button, VARIANT } from "@/components/ui/Button";
import { Calendar } from "./Calendar";
import { useDatePicker } from "./useDatePicker";

/**
 * 日付選択コンポーネント
 * @param placeholder プレースホルダーの文字列
 * @param selectedDate 選択された日付
 * @param setSelectedDate 日付をsetする関数
 * @param canReset 未選択状態にすることが許容するかどうか
 * @returns
 */
function DatePicker({
  placeholder,
  selectedDate,
  setSelectedDate,
  canReset = false,
  id,
}: {
  placeholder: string;
  selectedDate: Date | undefined;
  setSelectedDate:
    | Dispatch<SetStateAction<Date | undefined>>
    | ((date: Date | undefined) => void);
  canReset?: boolean;
  id?: string;
}) {
  const {
    isCalendarOpen,
    formattedDate,
    setIsCalendarOpen,
    onCalendarSelect,
    onCalendarReset,
  } = useDatePicker({
    selectedDate,
    setSelectedDate,
  });

  return (
    <div className="w-full rounded-md">
      <Popover onOpenChange={setIsCalendarOpen} open={isCalendarOpen}>
        <PopoverTrigger asChild id={id}>
          <button
            className="w-full h-9 text-sm border cursor-pointer border-main-border rounded-md py-2 px-4 flex items-center justify-between bg-white font-normal text-sub-text hover:bg-white"
            type="button"
          >
            {selectedDate ? (
              <span className="text-main-text">{formattedDate}</span>
            ) : (
              placeholder
            )}
            <CalendarIcon className="size-4 cursor-pointer" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-fit">
          <Calendar
            className="border-none p-0"
            defaultMonth={selectedDate}
            footer={
              canReset ? (
                <div className="place-content-center-safe place-items-center-safe mt-4 flex w-full flex-col flex-wrap gap-1">
                  <Button onClick={onCalendarReset} variant={VARIANT.OUTLINED}>
                    選択をクリア
                  </Button>
                </div>
              ) : undefined
            }
            locale={ja}
            onSelect={onCalendarSelect}
            selected={selectedDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { DatePicker };
