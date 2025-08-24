import { DateRangeInput } from "@/components/domain/Tickets/components/DateRangeInput";
import { TextInput } from "@/components/ui/Input";
import { MultipleSelect } from "@/components/ui/MultipleSelect";
import { SearchableSelect } from "@/components/ui/SearchableSelect";
import { Select } from "@/components/ui/Select";
import { USER_RESOLVED_ITEMS } from "@/shared/constants/tickets";

/**
 * 依頼承認一覧検索エリアのprops
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

export const TasksSearchArea = ({
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
  return (
    <div>
      <div className="flex gap-4 w-full *:flex-1">
        <TextInput
          className="w-69 shrink-0"
          maxLength={256}
          onChange={(e) => onChangeTicketName(e.target.value)}
          placeholder="検索"
          title="チケット名"
          value={ticketName}
        />
        <div className="min-w-0">
          <label htmlFor="type">申請種類</label>
          <MultipleSelect
            className="mt-2 w-full"
            id="type"
            onValueChange={(value) => onChangeType(value)}
            options={ticketStatusOptions}
            placeholder="選択"
            value={type}
          />
        </div>
        <div className="min-w-0">
          <label htmlFor="status">ステータス</label>
          <MultipleSelect
            className="mt-2 w-full"
            id="status"
            onValueChange={(value) => onChangeStatus(value)}
            options={applicationTypeOptions}
            placeholder="選択"
            value={status}
          />
        </div>
        <TextInput
          className="w-69 shrink-0"
          maxLength={50}
          onChange={(e) => onChangeDisplayTicketId(e.target.value)}
          placeholder="検索"
          title="ID"
          value={displayTicketId}
        />
      </div>

      <div className="flex gap-4 mt-4 *:flex-1">
        <div className="min-w-0">
          <DateRangeInput
            dateFrom={applicationDateFrom}
            dateTo={applicationDateTo}
            id="applicationDateFrom"
            label="申請日"
            onChangeDateFrom={onChangeApplicationDateFrom}
            onChangeDateTo={onChangeApplicationDateTo}
          />
        </div>
        <div className="min-w-0">
          <div className="flex gap-4 *:flex-1">
            <div className="min-w-0">
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
            <div className="min-w-0">
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
          </div>
        </div>
      </div>
    </div>
  );
};
