import { UserPlus } from "lucide-react";
import { useState } from "react";
import type { User } from "@/components/domain/Users/type";
import { Button, VARIANT } from "@/components/ui/Button";
import useDebounce from "@/hooks/useDebounce";
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
import { useGetUsersQuery } from "@/usecases/users/reader";

type Props = {
  onSelect: (value: User) => void;
};

export const SearchableUserList = ({ onSelect }: Props) => {
  const [open, setOpen] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [debouncedSearchWord, setDebouncedSearchWord] = useState("");

  const updateDebouncedSearchWord = (value: string) => {
    setDebouncedSearchWord(value);
  };
  useDebounce(updateDebouncedSearchWord, searchWord, 500);

  const { data: selectOptions } = useGetUsersQuery(debouncedSearchWord, 10);

  return (
    <Popover onOpenChange={setOpen} open={open}>
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
      <PopoverContent align="start" className="p-0">
        <Command>
          <CommandInput
            maxLength={255}
            onValueChange={setSearchWord}
            placeholder="検索"
            value={searchWord}
          />
          <CommandList>
            {selectOptions?.length ? (
              <CommandGroup>
                {selectOptions.map((option) => (
                  <CommandItem
                    key={option.userId}
                    onSelect={() => {
                      onSelect(option);
                    }}
                  >
                    {option.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandEmpty className="p-2 text-center text-sub-text text-sm">
                該当する項目がありません
              </CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
