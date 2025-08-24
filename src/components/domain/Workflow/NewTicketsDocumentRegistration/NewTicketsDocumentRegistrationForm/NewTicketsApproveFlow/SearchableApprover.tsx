import { UserPlus } from "lucide-react";
import { useState } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";
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
import { cn } from "@/utils/cn";
import { approveStepStore } from "./store/approveStepStore";

type Props = {
  groupId: string;
  stepId: string;
  addApproverButtonDisabled: boolean;
};
const MAX_SEARCH_LENGTH = 256;

function NewTicketsSearchableApprover({
  groupId,
  stepId,
  addApproverButtonDisabled,
}: Props) {
  const [open, setOpen] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [debouncedSearchWord, setDebouncedSearchWord] = useState("");

  const updateDebouncedSearchWord = (value: string) => {
    setDebouncedSearchWord((prev) => {
      if (value.length > MAX_SEARCH_LENGTH) {
        return prev;
      }
      return value;
    });
  };

  useDebounce(updateDebouncedSearchWord, searchWord, 500);

  const { data: userOptions } = useGetUsersQuery(debouncedSearchWord, 10);
  const { addApprover } = useStore(
    approveStepStore,
    useShallow((state) => ({
      addApprover: state.addApprover,
    })),
  );

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) setSearchWord("");
  };

  return (
    <Popover onOpenChange={handleOpenChange} open={open}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "text-sub-text font-normal w-full justify-start h-11 my-1",
            addApproverButtonDisabled && "cursor-default text-main-border ",
          )}
          disabled={addApproverButtonDisabled}
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
            maxLength={MAX_SEARCH_LENGTH}
            onValueChange={setSearchWord}
            placeholder="検索"
            value={searchWord}
          />
          <CommandList>
            {userOptions?.length ? (
              <CommandGroup>
                {userOptions?.map((option) => (
                  <CommandItem
                    className="flex justify-between"
                    key={option.userId}
                    onSelect={() => {
                      if (addApproverButtonDisabled) return;
                      addApprover(stepId, groupId, option);
                    }}
                    value={`${option.name} ${option.positionName}`}
                  >
                    <span>{option.name}</span>
                    <span>{option.positionName}</span>
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
}

export { NewTicketsSearchableApprover };
