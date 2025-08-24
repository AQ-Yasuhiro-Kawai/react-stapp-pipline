import { SearchableInput } from "@/components/ui/SearchableInput";

type Props = {
  searchWord: string;
  onSearchWordChange: (value: string) => void;
};

export function ProjectSearchInput({ searchWord, onSearchWordChange }: Props) {
  return (
    <div className="pt-4 w-[400px]">
      <SearchableInput
        maxLength={256}
        onChange={(e) => onSearchWordChange(e.target.value)}
        placeholder="プロジェクトを検索"
        value={searchWord}
      />
    </div>
  );
}
