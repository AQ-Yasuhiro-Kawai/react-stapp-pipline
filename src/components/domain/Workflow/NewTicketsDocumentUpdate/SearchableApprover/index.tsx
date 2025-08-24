import { UserPlus } from "lucide-react";
import { useState } from "react";
import { Button, VARIANT } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/lib/shadcn/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/lib/shadcn/ui/popover";

type SelectOption = { id: number; name: string; role: string; value: string };

type Props = {
  selectOptions: SelectOption[];
  onSelect: (value: string) => void;
};

export function SearchableApprover({ selectOptions, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredOptions = selectOptions.filter((option) =>
    option.name.toLowerCase().includes(query.toLowerCase()),
  );

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) setQuery("");
  };

  return (
    <Popover onOpenChange={handleOpenChange} open={open}>
      <PopoverTrigger asChild>
        <Button
          className="text-sub-text font-normal w-full justify-start h-11 my-1"
          onClick={() => setOpen(true)}
          prefixElement={<UserPlus />}
          variant={VARIANT.GHOST}
        >
          ユーザーを追加
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[368px] p-0">
        <Command>
          <CommandInput
            className="placeholder:text-sub-text/50"
            onValueChange={(value) => setQuery(value)}
            placeholder="検索"
            value={query}
          />
          {query.trim() !== "" && (
            <CommandList>
              {filteredOptions.length > 0 ? (
                <CommandGroup>
                  {filteredOptions.map((option) => (
                    <CommandItem
                      className="flex justify-between"
                      key={option.id}
                      onSelect={() => {
                        setOpen(false);
                        setQuery("");
                        onSelect(option.value);
                      }}
                      value={option.value}
                    >
                      <span>{option.name}</span>
                      <span>{option.role}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : (
                <CommandEmpty className="p-2 text-center text-sub-text text-sm">
                  該当する項目がありません
                </CommandEmpty>
              )}
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
