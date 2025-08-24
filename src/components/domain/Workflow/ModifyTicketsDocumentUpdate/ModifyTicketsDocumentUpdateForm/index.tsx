import { useEffect, useState } from "react";
import {
  WORKFLOW_FORM_STEP,
  WORKFLOW_FORM_STEP_STATUS,
  type WorkflowFormStepStatus,
} from "../../WorkflowFormStep";
import { ApplicationConfirm } from "./ApplicationConfirm";
import { ApplicationDetails } from "./ApplicationDetails";
import { ApproverSelection } from "./ApproverSelection";

type WorkflowFormStepContentProps = {
  currentStep: number;
  onBack: () => void;
  onNext: () => void;
  onUpdateSteps: (
    updates: { id: number; status: WorkflowFormStepStatus }[],
  ) => void;
};

export const ModifyTicketsDocumentUpdateForm = ({
  currentStep,
  onBack,
  onNext,
  onUpdateSteps,
}: WorkflowFormStepContentProps) => {
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
    <form onSubmit={() => console.log(1)}>
      {currentStep === WORKFLOW_FORM_STEP.APPLICATION_DETAILS && (
        <ApplicationDetails onNext={handleNextStep} />
      )}
      {currentStep === WORKFLOW_FORM_STEP.APPROVER_SELECTION && (
        <ApproverSelection onBack={onBack} onNext={onNext} />
      )}
      {currentStep === WORKFLOW_FORM_STEP.APPLICATION_CONFIRM && (
        <ApplicationConfirm onBack={onBack} />
      )}
    </form>
  );
};
