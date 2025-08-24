import { ModifyTicketsDocumentUpdateForm } from "@/components/domain/Workflow/ModifyTicketsDocumentUpdate/ModifyTicketsDocumentUpdateForm";
import { useWorkflowFormStep } from "@/components/domain/Workflow/useWorkflowFormStep";
import { WorkflowFormStep } from "@/components/domain/Workflow/WorkflowFormStep";
import { MainContent } from "@/components/ui/Layout";

export const ModifyTicketsDocumentUpdatePage = () => {
  const { steps, currentStepId, updateSteps, toNextStep, toBackStep, toStep } =
    useWorkflowFormStep();

  return (
    <MainContent pageTitle="正文書更新ワークフロー修正">
      <WorkflowFormStep
        currentStep={currentStepId}
        items={steps}
        onClick={toStep}
      />
      <ModifyTicketsDocumentUpdateForm
        currentStep={currentStepId}
        onBack={toBackStep}
        onNext={toNextStep}
        onUpdateSteps={updateSteps}
      />
    </MainContent>
  );
};
