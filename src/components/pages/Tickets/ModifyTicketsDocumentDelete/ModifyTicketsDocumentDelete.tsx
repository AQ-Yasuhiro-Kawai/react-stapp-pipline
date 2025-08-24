import { ModifyTicketsDocumentDeleteForm } from "@/components/domain/Workflow/ModifyTicketsDocumentDelete/ModifyTicketsDocumentDeleteForm";
import { useWorkflowFormStep } from "@/components/domain/Workflow/useWorkflowFormStep";
import { WorkflowFormStep } from "@/components/domain/Workflow/WorkflowFormStep";
import { MainContent } from "@/components/ui/Layout";

export const ModifyTicketsDocumentDeletePage = () => {
  const { steps, currentStepId, updateSteps, toNextStep, toBackStep, toStep } =
    useWorkflowFormStep();

  return (
    <MainContent pageTitle="正文書削除ワークフロー修正">
      <WorkflowFormStep
        currentStep={currentStepId}
        items={steps}
        onClick={toStep}
      />
      <ModifyTicketsDocumentDeleteForm
        currentStep={currentStepId}
        onBack={toBackStep}
        onNext={toNextStep}
        onUpdateSteps={updateSteps}
      />
    </MainContent>
  );
};
