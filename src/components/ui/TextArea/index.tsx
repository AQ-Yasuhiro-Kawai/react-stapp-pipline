import { cn } from "@utils/cn";
import * as React from "react";
import { Textarea as ShadcnTextarea } from "@/lib/shadcn/ui/textarea";

type TextareaProps = React.ComponentProps<typeof ShadcnTextarea> & {
  widthSize?: "sm" | "md" | "lg" | "half" | "full";
  heightSize?: "sm" | "md" | "lg" | "half" | "full";
};

// 基本は親要素に合わせる想定 figmaのpxベースでsm/md/lgを設定
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, widthSize = "full", heightSize = "full", ...props }, ref) => {
    const widthClass = {
      full: "w-full",
      half: "w-1/2",
      lg: "w-[725px]",
      md: "w-[508px]",
      sm: "w-[362px]",
    }[widthSize];

    const heightClass = {
      full: "h-full",
      half: "h-1/2",
      lg: "h-[160px]",
      md: "h-[120px]",
      sm: "h-[80px]",
    }[heightSize];

    return (
      <ShadcnTextarea
        className={cn(
          "px-3 py-2",
          "rounded-md",
          "border border-main-border",
          "bg-white",
          widthClass,
          heightClass,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
