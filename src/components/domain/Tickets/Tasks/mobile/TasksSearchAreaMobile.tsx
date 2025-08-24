import { ChevronDownIcon, ChevronUpIcon, Filter } from "lucide-react";
import { useCallback, useState } from "react";
import { TextInput } from "@/components/ui/Input";
import { MultipleSelect } from "@/components/ui/MultipleSelect";
import { SearchableSelect } from "@/components/ui/SearchableSelect";
import { Select } from "@/components/ui/Select";
import { USER_RESOLVED_ITEMS } from "@/shared/constants/tickets";
import { DateRangeInputMobile } from "./DateRangeInputMobile";

/**
 * 依頼承認一覧検索エリア(モバイル用)のprops
 * 検索条件の入力値と変更ハンドラをまとめて管理
 */
type Props = {
  /** チケット名の検索値 */
  ticketName: string;
  /** 申請種類の検索値（APPLICATION_TYPE_ITEMSのvalue） */
  type: string[];
  /** ステータスの検索値（STATUS_ITEMSのvalue） */
  status: string[];
  /** 正文書IDの検索値 */
  displayTicketId: string;
  /** 申請日（開始） */
  applicationDateFrom: string;
  /** 申請日（終了） */
  applicationDateTo: string;
  /** 対応状況 */
  userResolved: string;
  /** 申請者 */
  applicantUserId: string;
  /** 申請者検索クエリ */
  applicantSearchQuery: string;
  /** 申請者の選択オプション一覧 */
  applicantSelectOptions: { label: string; value: string }[];
  /** ステータスの選択オプション一覧 */
  ticketStatusOptions: { label: string; value: string }[];
  /** 申請種類の選択オプション一覧 */
  applicationTypeOptions: { label: string; value: string }[];
  /** チケット名変更時のハンドラ */
  onChangeTicketName: (value: string) => void;
  /** 申請種類変更時のハンドラ */
  onChangeType: (value: string[]) => void;
  /** ステータス変更時のハンドラ */
  onChangeStatus: (value: string[]) => void;
  /** 正文書ID変更時のハンドラ */
  onChangeDisplayTicketId: (value: string) => void;
  /** 申請日（開始）変更時のハンドラ */
  onChangeApplicationDateFrom: (date: Date | undefined) => void;
  /** 申請日（終了）変更時のハンドラ */
  onChangeApplicationDateTo: (date: Date | undefined) => void;
  /** 申請種類変更時のハンドラ */
  onChangeUserResolved: (value: string) => void;
  /** 申請者変更時のハンドラ */
  onChangeApplicantUserId: (value?: string) => void;
  /** 申請者検索クエリ変更時のハンドラ */
  onChangeApplicantSearchQuery: (value: string) => void;
};

export const TasksSearchAreaMobile = ({
  ticketName,
  type,
  status,
  displayTicketId,
  applicationDateFrom,
  applicationDateTo,
  userResolved,
  applicantUserId,
  applicantSearchQuery,
  applicantSelectOptions,
  ticketStatusOptions,
  applicationTypeOptions,
  onChangeTicketName,
  onChangeType,
  onChangeStatus,
  onChangeDisplayTicketId,
  onChangeApplicationDateFrom,
  onChangeApplicationDateTo,
  onChangeUserResolved,
  onChangeApplicantUserId,
  onChangeApplicantSearchQuery,
}: Props) => {
  const [isSearchAreaOpen, setIsSearchAreaOpen] = useState(false);

  const handleFilterOpen = useCallback(
    () => setIsSearchAreaOpen(!isSearchAreaOpen),
    [isSearchAreaOpen],
  );

  return isSearchAreaOpen ? (
    <div className="flex flex-col w-full px-4 py-2 pb-4 bg-main-bg rounded-md outline-1 outline-offset-[-1px] outline-main-blue justify-start items-start">
      <div className="self-stretch flex justify-between items-center">
        <div className="flex items-center">
          <Filter className="w-[18px] h-[18px] mr-2" />
          <div className="flex justify-center items-center gap-2.5">
            <span className="text-base font-bold">検索条件</span>
          </div>
        </div>
        <button
          className="flex flex-col w-6 h-6 rounded-md justify-center items-center  gap-2.5 hover:bg-sub-bg hover:cursor-pointer"
          onClick={handleFilterOpen}
          type="button"
        >
          <ChevronUpIcon className="w-[18px] h-[18px] shrink-0" />
        </button>
      </div>

      <div className="flex pt-4 flex-col items-start self-stretch">
        <TextInput
          className="w-full"
          maxLength={256}
          onChange={(e) => onChangeTicketName(e.target.value)}
          placeholder="検索"
          title="チケット名"
          value={ticketName}
        />
      </div>

      <div className="flex pt-4 flex-col items-start self-stretch">
        <label htmlFor="type">申請種類</label>
        <MultipleSelect
          className="mt-2"
          defaultValue={type}
          id="type"
          onValueChange={(value) => onChangeType(value)}
          options={applicationTypeOptions}
          placeholder="選択"
        />
      </div>

      <div className="flex pt-4 flex-col items-start self-stretch">
        <label htmlFor="status">ステータス</label>
        <MultipleSelect
          className="mt-2"
          defaultValue={status}
          id="status"
          onValueChange={(value) => onChangeStatus(value)}
          options={ticketStatusOptions}
          placeholder="選択"
        />
      </div>

      <div className="flex pt-4 flex-col items-start self-stretch">
        <TextInput
          className="w-full"
          maxLength={50}
          onChange={(e) => onChangeDisplayTicketId(e.target.value)}
          placeholder="検索"
          title="ID"
          value={displayTicketId}
        />
      </div>

      <div className="flex pt-4 flex-col items-start self-stretch">
        <label htmlFor="status">申請者</label>
        <SearchableSelect
          className="mt-2"
          onValueChange={(value) => onChangeApplicantUserId(value)}
          options={applicantSelectOptions}
          resetOptionLabel="選択をクリア"
          searchQuery={applicantSearchQuery}
          setSearchQuery={onChangeApplicantSearchQuery}
          value={applicantUserId}
        />
      </div>

      <div className="flex pt-4 flex-col items-start self-stretch">
        <label htmlFor="type">対応状況</label>
        <Select
          className="mt-2"
          id="userResolved"
          name=""
          onReset={{
            label: "選択をクリア",
            function: () => onChangeUserResolved(""),
          }}
          onValueChange={(value) => onChangeUserResolved(value)}
          placeholder="選択"
          selectItems={USER_RESOLVED_ITEMS}
          value={userResolved}
        />
      </div>

      <div className="flex pt-4 flex-col items-start self-stretch">
        <DateRangeInputMobile
          dateFrom={applicationDateFrom}
          dateTo={applicationDateTo}
          id="applicationDate"
          label="申請日"
          onChangeDateFrom={onChangeApplicationDateFrom}
          onChangeDateTo={onChangeApplicationDateTo}
        />
      </div>
    </div>
  ) : (
    <button
      className="flex w-full px-4 py-2 mb-4 justify-between items-center shrink-0 bg-main-blue/20 rounded-[6px] hover:cursor-pointer hover:bg-main-blue/10"
      onClick={handleFilterOpen}
      type="button"
    >
      <div className="flex items-center">
        <Filter className="w-[18px] h-[18px] mr-2" />
        <span className="text-base font-bold">検索条件</span>
      </div>
      <div className="flex w-6 h-6 px-2 py-2 justify-center items-center gap-2.5">
        <ChevronDownIcon className="w-[18px] h-[18px] shrink-0" />
      </div>
    </button>
  );
};
