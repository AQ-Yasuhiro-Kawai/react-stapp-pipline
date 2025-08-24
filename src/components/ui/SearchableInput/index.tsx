import { cn } from "@utils/cn";
import { Search } from "lucide-react";
import type React from "react";
import { Input } from "@/lib/shadcn/ui/input";

type SearchableInputProps = {
  placeholder?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  value?: string; // 初期表示等の外部制御用
  maxLength?: number; // 最大文字数制限
};

export function SearchableInput({
  placeholder = "検索",
  onClick,
  onChange,
  className,
  value,
  maxLength,
}: SearchableInputProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px]  pointer-events-none opacity-50" />
      <Input
        className="h-9 min-h-[36px] max-h-[36px] pl-10 pr-3 py-2 text-sm placeholder:text-sub-text/50"
        maxLength={maxLength}
        onChange={onChange}
        onClick={onClick}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}
