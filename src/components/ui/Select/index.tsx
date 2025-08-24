import {
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Select as ShadcnSelect,
} from "@lib/shadcn/ui/select";
import { cn } from "@utils/cn";
import { useState } from "react";

export type SelectProps = React.ComponentProps<typeof ShadcnSelect> & {
  placeholder?: string;
  selectItems: { id: string; name: string }[];
  className?: string;
  onReset?: { label: string; function: () => void };
  id?: string;
  name: string;
};

/**
 * セレクトボックス
 * @param placeholder プレースホルダー
 * @param selectItems 選択肢のリスト
 * @param className クラス（主に幅の調整に使用）
 * @param onReset 選択をリセットしたい場合にこの項目を利用する。リセット用の項目の表示名と、実行する関数のペア
 * @returns
 */
function Select({
  placeholder,
  selectItems,
  className,
  onReset = undefined,
  id,
  name,
  ...args
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ShadcnSelect
      onOpenChange={setIsOpen}
      onValueChange={(value) => {
        if (args.onValueChange) {
          args.onValueChange(value);
        }
      }}
      open={isOpen}
      {...args}
    >
      <SelectTrigger
        className={cn("w-full cursor-pointer text-main-dark-blue", className)}
        id={id}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {onReset !== undefined ? (
          <>
            <button
              className="relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 "
              onClick={() => {
                onReset.function();
                setIsOpen(false);
              }}
              type="button"
            >
              {onReset.label}
            </button>
            <SelectSeparator />
          </>
        ) : undefined}
        {selectItems.map((item) => (
          <SelectItem
            className="text-main-dark-blue"
            key={item.id}
            value={item.id}
          >
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </ShadcnSelect>
  );
}

export { Select };
