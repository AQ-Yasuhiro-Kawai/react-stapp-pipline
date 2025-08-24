import { Checkbox as ShadcnCheckbox } from "@lib/shadcn/ui/checkbox";
import { cn } from "@utils/cn";
import { useId } from "react";

/**
 * チェックボックス
 * @param name 表示する名前
 */
const Checkbox = ({
  label,
  className,
  ...props
}: { label: string } & React.ComponentProps<typeof ShadcnCheckbox>) => {
  const htmlId = useId();
  return (
    <label
      className={cn(
        "-top-2 -left-2 relative flex size-fit cursor-pointer select-none items-center space-x-2 p-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 has-disabled:cursor-not-allowed",
        className,
      )}
      htmlFor={htmlId}
    >
      <ShadcnCheckbox
        className={cn(
          "h-4 w-4 cursor-pointer rounded-[6px] border-main-dark-blue bg-main-bg ring-offset-main-dark-blue focus-visible:ring-main-dark-blue",
          "data-[state=checked]:border-none data-[state=checked]:bg-main-blue data-[state=checked]:text-main-bg", // 選択時
        )}
        id={htmlId}
        {...props}
      />
      <span>{label}</span>
    </label>
  );
};

export { Checkbox };
