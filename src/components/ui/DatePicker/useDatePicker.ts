import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { dateFormatter } from "@/utils/dateFormatter";

/**
 * DatePickerコンポーネントに必要な機能をまとめた関数
 * @param selectedDate 現在選択されている日付
 * @param setSelectedDate 日付をsetする関数
 * @returns `formattedDate` フォーマット済みの日付（例: "2025/07/10"）
 * @returns `isCalendarOpen` カレンダーを開くかどうかの真偽値
 * @returns `setIsCalendarOpen` カレンダーの開閉をsetする関数
 * @returns `onCalendarSelect` カレンダーで日付を選択した時に、日付をsetし、カレンダーを閉じる関数
 * @returns `onCalendarReset` カレンダーの選択をリセットするボタンを押下した際に、日付をresetし、カレンダーを閉じる関数
 */
export const useDatePicker = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date | undefined;
  setSelectedDate:
    | Dispatch<SetStateAction<Date | undefined>>
    | ((date: Date | undefined) => void);
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const formattedDate = useMemo(() => {
    if (selectedDate) {
      return dateFormatter(selectedDate);
    }
    return undefined;
  }, [selectedDate]);

  const onCalendarSelect = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      setIsCalendarOpen(false);
    },
    [setSelectedDate],
  );

  const onCalendarReset = useCallback(() => {
    setSelectedDate(undefined);
    setIsCalendarOpen(false);
  }, [setSelectedDate]);

  return {
    formattedDate,
    isCalendarOpen,
    onCalendarReset,
    onCalendarSelect,
    setIsCalendarOpen,
  };
};
