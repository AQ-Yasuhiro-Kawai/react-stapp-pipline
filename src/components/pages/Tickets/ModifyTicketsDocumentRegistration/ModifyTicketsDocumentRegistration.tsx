import { ModifyTicketsDocumentRegistrationForm } from "@/components/domain/Workflow/ModifyTicketsDocumentRegistration/ModifyTicketsDocumentRegistrationForm";
import { useWorkflowFormStep } from "@/components/domain/Workflow/useWorkflowFormStep";
import { WorkflowFormStep } from "@/components/domain/Workflow/WorkflowFormStep";
import { MainContent } from "@/components/ui/Layout";

export const ModifyTicketsDocumentRegistrationPage = () => {
  const { steps, currentStepId, updateSteps, toNextStep, toBackStep, toStep } =
    useWorkflowFormStep();

  return (
    <MainContent pageTitle="正文書登録ワークフロー修正">
      <WorkflowFormStep
        currentStep={currentStepId}
        items={steps}
        onClick={toStep}
      />
      <ModifyTicketsDocumentRegistrationForm
        currentStep={currentStepId}
        onBack={toBackStep}
        onNext={toNextStep}
        onUpdateSteps={updateSteps}
      />
    </MainContent>
  );
};
