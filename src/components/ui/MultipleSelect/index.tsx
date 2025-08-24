import { Button } from "@lib/shadcn/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@lib/shadcn/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@lib/shadcn/ui/popover";
import { cn } from "@utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { ScrollBar } from "@/components/ui/ScrollBar";

const multipleSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default:
          "border-foreground/10 text-foreground bg-card hover:bg-card/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        inverted: "inverted",
        secondary:
          "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
    },
  },
);

interface MultipleSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multipleSelectVariants> {
  options: {
    label: string;
    value: string;
  }[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  enableSelectAll?: boolean; // 全選択表示有無（デフォルトfalse）
  enableSearch?: boolean; // 検索表示有無（デフォルトfalse）
}

export const MultipleSelect = React.forwardRef<
  HTMLButtonElement,
  MultipleSelectProps
>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      placeholder = "選択",
      className,
      enableSelectAll = false,
      enableSearch = false,
      ...props
    },
    ref,
  ) => {
    const [selectedValues, setSelectedValues] =
      React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (option: string) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((v) => v !== option)
        : [...selectedValues, option];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((o) => o.value);
        setSelectedValues(allValues);
        onValueChange(allValues);
      }
    };

    return (
      <Popover
        modal={false}
        onOpenChange={setIsPopoverOpen}
        open={isPopoverOpen}
      >
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "flex w-full p-1 rounded-md border min-h-9 h-auto items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto",
              className,
            )}
            onClick={() => setIsPopoverOpen((prev) => !prev)}
            ref={ref}
            {...props}
          >
            {selectedValues.length > 0 ? (
              <div className="flex items-center w-full justify-between px-2">
                <span className="text-sm truncate whitespace-nowrap overflow-hidden max-w-[calc(100%-24px)] text-left text-[var(--color-main-text)]">
                  {selectedValues
                    .map(
                      (value) => options.find((o) => o.value === value)?.label,
                    )
                    .filter(Boolean)
                    .join(", ")}
                </span>
                <ChevronDownIcon className="h-4 text-muted-foreground flex-shrink-0" />
              </div>
            ) : (
              <div className="flex items-center w-full justify-between px-2">
                <span className="text-sm text-muted-foreground">
                  {placeholder}
                </span>
                <ChevronDownIcon className="h-4 text-muted-foreground" />
              </div>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="p-0 w-[var(--radix-popover-trigger-width)]"
        >
          <Command>
            {enableSearch && (
              <CommandInput onKeyDown={handleInputKeyDown} placeholder="検索" />
            )}
            <ScrollBar className="max-h-[300px]">
              <CommandList>
                <CommandEmpty className="p-2 text-center text-sub-text text-sm">
                  該当する項目がありません
                </CommandEmpty>
                <CommandGroup>
                  {enableSelectAll && (
                    <CommandItem
                      className="cursor-pointer"
                      onSelect={toggleAll}
                    >
                      <span>全選択</span>
                    </CommandItem>
                  )}
                  {options.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return (
                      <CommandItem
                        className="cursor-pointer flex justify-between items-center"
                        key={option.value}
                        onSelect={() => toggleOption(option.value)}
                      >
                        <span>{option.label}</span>
                        {isSelected && (
                          <CheckIcon className="h-4 w-4 text-primary" />
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </ScrollBar>
            <div className="border-t p-1">
              <Button
                className="w-full text-sm bg-transparent cursor-pointer shadow-none hover:bg-transparent hover:opacity-70"
                onClick={handleClear}
                variant="secondary"
              >
                選択をクリア
              </Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

MultipleSelect.displayName = "MultipleSelect";
