import type { StepUpdate } from "../../useWorkflowFormStep";
import { WORKFLOW_FORM_STEP } from "../../WorkflowFormStep";
import { ApplicationConfirm } from "./ApplicationConfirm";
import { ApplicationDetails } from "./ApplicationDetails";
import { ApproverSelection } from "./ApproverSelection";

export type WorkflowFormStepContentProps = {
  currentStep: number;
  onBack: () => void;
  onNext: () => void;
  onUpdateSteps: (updates: StepUpdate[]) => void;
};

export const ModifyTicketsDocumentDeleteForm = ({
  currentStep,
  onBack,
  onNext,
  onUpdateSteps,
}: WorkflowFormStepContentProps) => {
  return (
    <form onSubmit={() => console.log(1)}>
      {currentStep === WORKFLOW_FORM_STEP.APPLICATION_DETAILS && (
        <ApplicationDetails onNext={onUpdateSteps} />
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
