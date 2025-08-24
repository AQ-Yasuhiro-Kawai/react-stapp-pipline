import { ArrowLeft, ArrowRight, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, VARIANT } from "@/components/ui/Button";
import { Modal, useModal } from "@/components/ui/Modal";
import {
  WORKFLOW_FORM_STEP,
  WORKFLOW_FORM_STEP_STATUS,
  type WorkflowFormStepStatus,
} from "../../WorkflowFormStep";
import { ApplicationDetailsContent } from "../ApplicationDetailsContent";
import { ApproverContent } from "../ApproverContent";
import { ConfirmContent } from "../ConfirmContent";

type WorkflowFormStepContentProps = {
  currentStep: number;
  onBack: () => void;
  onNext: () => void;
  onUpdateSteps: (
    updates: { id: number; status: WorkflowFormStepStatus }[],
  ) => void;
};

export function WorkflowFormStepContent({
  currentStep,
  onBack,
  onNext,
  onUpdateSteps,
}: WorkflowFormStepContentProps) {
  const [converted, setConverted] = useState(false);

  // loading動作確認用のサンプル処理
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("pdf変換完了");
      setConverted(true);
      if (currentStep !== WORKFLOW_FORM_STEP.APPLICATION_DETAILS) {
        onUpdateSteps([
          {
            id: WORKFLOW_FORM_STEP.APPLICATION_DETAILS,
            status: WORKFLOW_FORM_STEP_STATUS.DONE,
          },
        ]);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentStep, onUpdateSteps]);

  // onNextによるステータスの更新を上書き
  const handleNextStep = () => {
    if (!converted) {
      onUpdateSteps([
        {
          id: WORKFLOW_FORM_STEP.APPLICATION_DETAILS,
          status: WORKFLOW_FORM_STEP_STATUS.LOADING,
        },
        {
          id: WORKFLOW_FORM_STEP.APPROVER_SELECTION,
          status: WORKFLOW_FORM_STEP_STATUS.CURRENT,
        },
      ]);
    } else {
      onUpdateSteps([
        {
          id: WORKFLOW_FORM_STEP.APPLICATION_DETAILS,
          status: WORKFLOW_FORM_STEP_STATUS.DONE,
        },
        {
          id: WORKFLOW_FORM_STEP.APPROVER_SELECTION,
          status: WORKFLOW_FORM_STEP_STATUS.CURRENT,
        },
      ]);
    }
  };

  return (
    <>
      {currentStep === WORKFLOW_FORM_STEP.APPLICATION_DETAILS && (
        <ApplicationDetails onNext={handleNextStep} />
      )}
      {currentStep === WORKFLOW_FORM_STEP.APPROVER_SELECTION && (
        <Approver onBack={onBack} onNext={onNext} />
      )}
      {currentStep === WORKFLOW_FORM_STEP.APPLICATION_CONFIRM && (
        <Confirm onBack={onBack} />
      )}
    </>
  );
}

function ApplicationDetails({ onNext }: { onNext: () => void }) {
  return (
    <>
      <ApplicationDetailsContent />
      <div className="flex justify-end mt-4 mb-10">
        <Button
          onClick={onNext}
          suffixElement={<ArrowRight />}
          variant={VARIANT.PRIMARY}
        >
          次へ
        </Button>
      </div>
    </>
  );
}

function Approver({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <>
      <ApproverContent />
      <div className="flex justify-between mt-4 mb-10">
        <Button
          onClick={onBack}
          prefixElement={<ArrowLeft />}
          variant={VARIANT.OUTLINED}
        >
          戻る
        </Button>
        <Button
          onClick={onNext}
          suffixElement={<ArrowRight />}
          variant={VARIANT.PRIMARY}
        >
          次へ
        </Button>
      </div>
    </>
  );
}

function Confirm({ onBack }: { onBack: () => void }) {
  const { isOpen, openModal, closeModal } = useModal(); // 最終確認モーダル

  return (
    <>
      <ConfirmContent />
      <div className="flex justify-between mt-4 mb-10">
        <Button
          onClick={onBack}
          prefixElement={<ArrowLeft />}
          variant={VARIANT.OUTLINED}
        >
          戻る
        </Button>
        <Button
          onClick={openModal}
          prefixElement={<Zap />}
          variant={VARIANT.PRIMARY}
        >
          申請
        </Button>
      </div>
      <Modal
        closeModalHandler={closeModal}
        isCloseOutsideModal
        isOpen={isOpen}
        primaryButton={<Button onClick={closeModal}>はい</Button>}
        title="最終確認"
      >
        <div className="py-4">申請してよいですか？</div>
      </Modal>
    </>
  );
}
