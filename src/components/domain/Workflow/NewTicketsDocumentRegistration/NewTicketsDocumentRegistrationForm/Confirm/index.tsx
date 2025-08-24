import { ArrowLeft, Zap } from "lucide-react";
import { useCallback } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import { Button, VARIANT } from "@/components/ui/Button";
import { Modal, useModal } from "@/components/ui/Modal";
import type { TicketApplicationRequest } from "@/domain/tickets/Document/type";
import { errorModalSelector } from "@/store/errorModal/errorModalSlice";
import { pdfFileSelector } from "@/store/projects/pdfFileSlice";
import { closeErrorModal, useBoundStore } from "@/store/store";
import { usePostOfficialDocumentTicket } from "@/usecases/Tickets/Document/usecases";
import type { NewTicketsFormSchema } from "../../schema/formSchema";
import type { NewTicketsFormState } from "..";
import {
  type ApprovalStep,
  approveStepStore,
} from "../NewTicketsApproveFlow/store/approveStepStore";
import { NewTicketsComment } from "./NewTicketsComment";
import { NewTicketsConfirm } from "./NewTicketsConfirmItem";

const generatePayload = ({
  data,
  files,
  approvalRoute,
}: {
  data: NewTicketsFormSchema;
  files: ReturnType<typeof pdfFileSelector>["files"];
  approvalRoute: ApprovalStep[];
}): TicketApplicationRequest => {
  const {
    ticketName,
    documentName,
    targetOrganizationCode,
    sourceOrganizationCode,
    fileTypeCode,
    publicationScopeCode,
  } = data;

  const applicationFiles = files.flatMap((file) => {
    if (
      file.status !== "converted" ||
      !file.requestId ||
      !file.fileContentHash
    ) {
      // ファイルが変換中、または必要な情報がない場合は除外
      return [];
    }
    // 不要なkeyを除外したpayloadを作成
    const {
      generatedFileBlobUrl: _,
      originalFileBlobUrl: __,
      status: ___,
      ...filePayload
    } = file;
    return [
      {
        ...filePayload,
        requestId: file.requestId,
        fileContentHash: file.fileContentHash,
      },
    ];
  });

  // ApprovalStep[] → ApprovalRoute[] 変換
  const approvalRoutePayload = approvalRoute.map((step, index) => ({
    approvalGroups: step.groups.map((group) => ({
      approvers: group.approvers.map((approver) => ({
        userId: approver.userId,
      })),
      requiredApprovalCount: group.requiredApprovals,
    })),
    stepNumber: index + 1,
  }));

  return {
    ticketName,
    ticketApplicationTypeCode: "register",
    applicationOfficialDocumentInfo: {
      officialDocumentName: documentName || "",
      publicationTargetOrganizationCode: {
        code: targetOrganizationCode.id,
        name: targetOrganizationCode.name,
      },
      publicationSourceOrganizationCode: {
        code: sourceOrganizationCode.id,
        name: sourceOrganizationCode.name,
      },
      publicationScopeCode: {
        code: publicationScopeCode.id,
        name: publicationScopeCode.name,
      },
      fileType: fileTypeCode.name,
      deleteOfficialDocumentItemIds: [],
      remainOfficialDocumentItemIds: [],
      replaceOfficialDocumentItemIds: [],
    },
    applicationFiles,
    approvalRoute: approvalRoutePayload,
    notes: data.notes || "",
  };
};

type Props = {
  formState: NewTicketsFormState;
  onBack: () => void;
  handleSubmit: UseFormHandleSubmit<NewTicketsFormSchema>;
};

export function Confirm({ formState, onBack, handleSubmit }: Props) {
  const { isOpen, openModal, closeModal } = useModal(); // 最終確認モーダル
  const { steps } = useStore(
    approveStepStore,
    useShallow((state) => ({
      steps: state.steps,
    })),
  );
  const { mutate, isPending } = usePostOfficialDocumentTicket(closeModal);
  const { getValues } = formState;
  const {
    ticketName,
    documentName,
    targetOrganizationCode,
    sourceOrganizationCode,
    fileTypeCode,
    publicationScopeCode,
  } = getValues();
  const { files, isConverting } = useBoundStore(useShallow(pdfFileSelector));
  const { open: IsOpenErrorModal, content } = useBoundStore(
    useShallow(errorModalSelector),
  );

  const handleOnSubmit = useCallback(async () => {
    await handleSubmit((data) => {
      const payload = generatePayload({
        data,
        files,
        approvalRoute: steps,
      });

      mutate(payload);
    })();
  }, [handleSubmit, mutate, files, steps]);

  return (
    <>
      <div className="mt-10">
        <NewTicketsConfirm
          documentName={documentName}
          fileTypeCode={fileTypeCode}
          publicationScopeCode={publicationScopeCode}
          sourceOrganizationCode={sourceOrganizationCode}
          targetOrganizationCode={targetOrganizationCode}
          ticketName={ticketName}
        />
      </div>
      <div className="mt-10">
        <NewTicketsComment
          errors={formState.errors}
          register={formState.register}
        />
      </div>

      <div className="flex justify-between mt-4 mb-10">
        <Button
          onClick={onBack}
          prefixElement={<ArrowLeft />}
          variant={VARIANT.OUTLINED}
        >
          戻る
        </Button>
        <Button
          disabled={isConverting() || files.length === 0}
          onClick={openModal}
          prefixElement={<Zap />}
          variant={VARIANT.PRIMARY}
        >
          申請
        </Button>
      </div>

      <Modal
        closeModalHandler={closeModal}
        isCloseOutsideModal={!isPending}
        isOpen={isOpen}
        isSecondaryDisabled={isPending}
        primaryButton={
          <Button isLoading={isPending} onClick={handleOnSubmit} type="button">
            はい
          </Button>
        }
        title="最終確認"
      >
        <p className="py-4">申請してよろしいですか？</p>
      </Modal>

      {/* Error Modal */}
      <Modal
        closeModalHandler={closeErrorModal}
        isCloseOutsideModal
        isHiddenSecondaryButton={true}
        isOpen={IsOpenErrorModal}
        primaryButton={
          <Button
            onClick={closeErrorModal}
            type="button"
            variant={VARIANT.OUTLINED}
          >
            閉じる
          </Button>
        }
        secondaryButton={undefined}
        title={content?.title ?? "エラー"}
      >
        <p className="py-4">{content?.message}</p>
      </Modal>
    </>
  );
}
