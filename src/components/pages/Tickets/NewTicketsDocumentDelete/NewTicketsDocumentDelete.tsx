import { WorkflowFormStepContent } from "@/components/domain/Workflow/NewTicketsDocumentDelete/WorkflowFormStepContent";
import { useWorkflowFormStep } from "@/components/domain/Workflow/useWorkflowFormStep";
import { WorkflowFormStep } from "@/components/domain/Workflow/WorkflowFormStep";
import { MainContent } from "@/components/ui/Layout";

export function NewTicketsDocumentDeletePage() {
  const { steps, currentStepId, updateSteps, toNextStep, toBackStep, toStep } =
    useWorkflowFormStep();

  return (
    <MainContent pageTitle="正文書削除ワークフロー申請">
      <WorkflowFormStep
        currentStep={currentStepId}
        items={steps}
        onClick={toStep}
      />
      <WorkflowFormStepContent
        currentStep={currentStepId}
        onBack={toBackStep}
        onNext={toNextStep}
        onUpdateSteps={updateSteps}
      />
    </MainContent>
  );
}
