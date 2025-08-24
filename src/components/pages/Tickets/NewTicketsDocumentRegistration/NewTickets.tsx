import { NewTicketsForm } from "@/components/domain/Workflow/NewTicketsDocumentRegistration/NewTicketsDocumentRegistrationForm";
import { useWorkflowFormStep } from "@/components/domain/Workflow/useWorkflowFormStep";
import { WorkflowFormStep } from "@/components/domain/Workflow/WorkflowFormStep";
import { MainContent } from "@/components/ui/Layout";

function NewTicketsPage() {
  const { steps, currentStepId, updateSteps, toNextStep, toBackStep, toStep } =
    useWorkflowFormStep();
  return (
    <MainContent pageTitle="正文書登録ワークフロー申請">
      <WorkflowFormStep
        currentStep={currentStepId}
        items={steps}
        onClick={toStep}
      />
      <NewTicketsForm
        currentStep={currentStepId}
        onBack={toBackStep}
        onNext={toNextStep}
        onUpdateSteps={updateSteps}
      />
    </MainContent>
  );
}

export { NewTicketsPage };
