import type { SearchType } from "@/components/domain/Documents/types";
import { Button } from "@/components/ui/Button";
import { SearchableInput } from "@/components/ui/SearchableInput";

type Props = {
  searchWord: string;
  onSearchWordChange: (value: string) => void;
  searchType: SearchType;
  onSearchTypeChange: (value: SearchType) => void;
};

export const DocumentsSearchArea = ({
  searchWord,
  onSearchWordChange,
  searchType,
  onSearchTypeChange,
}: Props) => {
  return (
    <div className="space-x-2 flex mb-4">
      <SearchableInput
        className="w-100 shrink-0"
        maxLength={256}
        onChange={(value) => onSearchWordChange(value.target.value)}
        placeholder="正文書を検索"
        value={searchWord}
      />
      <div className="w-62 h-9 p-1 flex bg-sub-bg rounded-md">
        <Button
          className="w-30 h-auto rounded-sm text-sm font-normal"
          onClick={() => onSearchTypeChange("document")}
          variant={searchType === "document" ? "white" : "ghost"}
        >
          正文書検索
        </Button>
        <Button
          className="w-30 h-auto rounded-sm text-sm font-normal"
          onClick={() => onSearchTypeChange("file")}
          variant={searchType === "file" ? "white" : "ghost"}
        >
          ファイル検索
        </Button>
      </div>
    </div>
  );
};
