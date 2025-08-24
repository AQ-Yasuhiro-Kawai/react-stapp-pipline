import { TextInput } from "@/components/ui/Input";
import { MultipleSelect } from "@/components/ui/MultipleSelect";
import {
  APPLICATION_TYPE_ITEMS,
  STATUS_ITEMS,
} from "@/shared/constants/tickets";
import { DateRangeInput } from "../components/DateRangeInput";

/**
 * マイチケット検索エリアのprops
 * 検索条件の入力値と変更ハンドラをまとめて管理
 */
type Props = {
  /** チケット名の検索値 */
  ticketName: string;
  /** 申請種類の検索値（APPLICATION_TYPE_ITEMSのname） */
  type: string[];
  /** ステータスの検索値（STATUS_ITEMSのname） */
  status: string[];
  /** 正文書IDの検索値 */
  officialDocumentId: string;
  /** 申請日（開始） */
  applicationDateFrom: string;
  /** 申請日（終了） */
  applicationDateTo: string;
  /** 完了日（開始） */
  completedDateFrom: string;
  /** 完了日（終了） */
  completedDateTo: string;
  /** チケット名変更時のハンドラ */
  onChangeTicketName: (value: string) => void;
  /** 申請種類変更時のハンドラ */
  onChangeType: (value: string[]) => void;
  /** ステータス変更時のハンドラ */
  onChangeStatus: (value: string[]) => void;
  /** 正文書ID変更時のハンドラ */
  onChangeOfficialDocumentId: (value: string) => void;
  /** 申請日（開始）変更時のハンドラ */
  onChangeApplicationDateFrom: (date: Date | undefined) => void;
  /** 申請日（終了）変更時のハンドラ */
  onChangeApplicationDateTo: (date: Date | undefined) => void;
  /** 完了日（開始）変更時のハンドラ */
  onChangeCompletedDateFrom: (date: Date | undefined) => void;
  /** 完了日（終了）変更時のハンドラ */
  onChangeCompletedDateTo: (date: Date | undefined) => void;
};

export const MyticketsSearchArea = ({
  ticketName,
  type,
  status,
  officialDocumentId,
  applicationDateFrom,
  applicationDateTo,
  completedDateFrom,
  completedDateTo,
  onChangeTicketName,
  onChangeType,
  onChangeStatus,
  onChangeOfficialDocumentId,
  onChangeApplicationDateFrom,
  onChangeApplicationDateTo,
  onChangeCompletedDateFrom,
  onChangeCompletedDateTo,
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
            options={APPLICATION_TYPE_ITEMS}
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
            options={STATUS_ITEMS}
            placeholder="選択"
            value={status}
          />
        </div>
        <TextInput
          className="w-69 shrink-0"
          maxLength={50}
          onChange={(e) => onChangeOfficialDocumentId(e.target.value)}
          placeholder="検索"
          title="ID"
          value={officialDocumentId}
        />
      </div>

      <div className="flex gap-6 mt-4 *:flex-1">
        <DateRangeInput
          dateFrom={applicationDateFrom}
          dateTo={applicationDateTo}
          id="applicationDateFrom"
          label="申請日"
          onChangeDateFrom={onChangeApplicationDateFrom}
          onChangeDateTo={onChangeApplicationDateTo}
        />
        <DateRangeInput
          dateFrom={completedDateFrom}
          dateTo={completedDateTo}
          id="completedDateFrom"
          label="完了日"
          onChangeDateFrom={onChangeCompletedDateFrom}
          onChangeDateTo={onChangeCompletedDateTo}
        />
      </div>
    </div>
  );
};
