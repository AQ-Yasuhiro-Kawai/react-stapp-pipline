import { cn } from "@utils/cn";
import { Search } from "lucide-react";
import { useMemo } from "react";
import { Input } from "@/lib/shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/shadcn/ui/select";

type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

type SearchableSelectProps = {
  options: Option[];
  placeholder?: string;
  className?: string;
  value?: string;
  onValueChange?: (value: string | undefined) => void;
  disabled?: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resetOptionLabel?: string;
};

// MEMO: Select は空文字("")を「プレースホルダー表示」に予約しているため、リセット用の値に空文字を設定するとエラーになります。
// そのため、衝突しなさそうな値の定数を設定しています。
const RESET_VALUE = "__RESET__";

export function SearchableSelect({
  options,
  placeholder = "選択",
  className,
  value,
  onValueChange,
  disabled,
  searchQuery,
  setSearchQuery,
  resetOptionLabel,
  ...props
}: SearchableSelectProps) {
  const filteredOptions =
    searchQuery.trim() === ""
      ? []
      : options.filter((option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  const displayedOptions = useMemo(() => {
    if (!resetOptionLabel) return filteredOptions;

    const resetOption = {
      label: resetOptionLabel,
      value: RESET_VALUE,
      disabled: false,
    };

    return [resetOption, ...filteredOptions];
  }, [resetOptionLabel, filteredOptions]);

  return (
    <Select
      onValueChange={(val) => {
        onValueChange?.(val === "" || val === RESET_VALUE ? undefined : val);
      }}
      value={value}
      {...props}
      disabled={disabled}
    >
      <SelectTrigger
        className={cn(
          "w-full px-3 py-2 rounded-md border border-main-border bg-white",
          className,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-sub-text pointer-events-none opacity-50" />
          <Input
            autoFocus
            className={cn(
              "h-8 pl-8 border-0 text-sm shadow-none rounded-[2px]",
              "placeholder:text-sub-text/50",
            )}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="検索"
            value={searchQuery}
          />
        </div>
        <div
          className={cn(
            "relative pt-1 mt-1",
            "before:absolute before:top-0 before:left-[-4px] before:right-[-4px]",
            "before:h-[1px] before:bg-main-border",
          )}
        >
          {displayedOptions.length > 0 ? (
            displayedOptions.map((option) => (
              <SelectItem
                className={cn(
                  "hover:bg-[var(--color-thin-bg)] focus:bg-[var(--color-thin-bg)]",
                  "data-[state=checked]:bg-[var(--color-sub-bg)]",
                  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                )}
                disabled={option.disabled}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))
          ) : (
            <div className="p-2 text-center text-sub-text text-sm">
              該当する項目がありません
            </div>
          )}
        </div>
      </SelectContent>
    </Select>
  );
}
