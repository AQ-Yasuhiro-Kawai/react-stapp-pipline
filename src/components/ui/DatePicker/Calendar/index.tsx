import { cn } from "@utils/cn";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { Button, VARIANT } from "@/components/ui/Button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  locale,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      className={cn(
        "select-none rounded-md border p-3 text-main-dark-blue text-sm",
        className,
      )}
      classNames={{
        day: "size-9 font-normal rounded-md hover:[:not([data-selected],[data-disabled])]:bg-sub-bg",
        day_button: "w-full h-9 cursor-pointer",
        hidden: "invisible",
        month:
          "[&>table]:border-separate [&>table]:border-spacing-y-1 [&>table]:-my-1 [&>table]:border-spacing-x-0 bg-main-bg",
        month_caption: "flex justify-center -mt-6 mb-5",
        nav: "flex justify-between pt-1",
        outside: "text-sub-text/50 data-[selected]:text-main-bg",
        selected: "bg-main-blue text-main-bg hover:bg-main-blue/90",
        today: "[:not([data-selected])]:bg-sub-bg",
        weekday: "font-normal text-sub-text",
        ...classNames,
      }}
      components={{
        NextMonthButton: ({ className, ...props }) => (
          <Button
            {...props}
            className="size-7 p-0"
            prefixElement={<ChevronRight className={className} />}
            variant={VARIANT.OUTLINED}
          >
            {null}
          </Button>
        ),
        PreviousMonthButton: ({ className, ...props }) => (
          <Button
            {...props}
            className="size-7 p-0"
            prefixElement={<ChevronLeft className={className} />}
            variant={VARIANT.OUTLINED}
          >
            {null}
          </Button>
        ),
      }}
      formatters={
        locale?.code === "ja"
          ? {
              formatCaption(date, options) {
                const y = format(date, "yyyy");
                const m = format(date, "M", { locale: options?.locale });
                return `${y}年 ${m}月`;
              },
            }
          : undefined
      }
      locale={locale}
      mode="single"
      showOutsideDays={showOutsideDays}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
