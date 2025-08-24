import { zodResolver } from "@hookform/resolvers/zod";
import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormReturn,
} from "react-hook-form";
import type { StepUpdate } from "@/components/domain/Workflow/useWorkflowFormStep";
import { STEP_IDS } from "@/components/domain/Workflow/useWorkflowFormStep";
import { useAppForm } from "@/lib/reactHookForm/useAppForm";
import {
  type NewTicketsFormSchema,
  newTicketsFormSchema,
} from "../schema/formSchema";
import { NewTicketsFormSettings } from "./ApplicationDetails/NewTicketsFormSettings";
import { Confirm } from "./Confirm";
import { NewTicketsApproveFlow } from "./NewTicketsApproveFlow";
import { NewTicketsSelectTemplate } from "./NewTicketsApproveFlow/NewTicketsSelectTemplate";
import { useFetch } from "./useFetch";

export type WorkflowFormStepContentProps = {
  currentStep: number;
  onBack: () => void;
  onNext: () => void;
  onUpdateSteps: (updates: StepUpdate[]) => void;
};

export type NewTicketsFormState = {
  register: UseFormRegister<NewTicketsFormSchema>;
  errors: FieldErrors<NewTicketsFormSchema>;
  control: Control<NewTicketsFormSchema>;
  dirtyFields: UseFormReturn<NewTicketsFormSchema>["formState"]["dirtyFields"];
  getValues: UseFormReturn<NewTicketsFormSchema>["getValues"];
};

const ApplicationDetails = ({
  formState,
  values,
  onUpdateSteps,
}: {
  formState: NewTicketsFormState;
  values: ReturnType<typeof useFetch>["values"];
  onUpdateSteps: WorkflowFormStepContentProps["onUpdateSteps"];
}) => {
  return (
    <NewTicketsFormSettings
      formState={formState}
      onNext={onUpdateSteps}
      values={values}
    />
  );
};

const ApproverSelection = ({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) => {
  return (
    <>
      <div className="mt-10">
        <NewTicketsSelectTemplate />
      </div>
      <div className="mt-10">
        <NewTicketsApproveFlow onBack={onBack} onNext={onNext} />
      </div>
    </>
  );
};

export const NewTicketsForm = ({
  currentStep,
  onBack,
  onNext,
  onUpdateSteps,
}: WorkflowFormStepContentProps) => {
  const { values } = useFetch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
    getValues,
  } = useAppForm<NewTicketsFormSchema>({
    defaultValues: {
      ticketName: "",
      documentName: "",
      sourceOrganizationCode: { id: "", name: "" },
      targetOrganizationCode: { id: "", name: "" },
      fileTypeCode: { id: "", name: "" },
      publicationScopeCode: { id: "", name: "" },
      notes: "",
    },
    resolver: zodResolver(newTicketsFormSchema), // zodResolverでスキーマを適用
    mode: "onBlur", // フォームのバリデーションをblur時に実行
  });

  const formState = {
    register,
    errors,
    control,
    dirtyFields,
    getValues,
  };

  return (
    <form>
      {currentStep === STEP_IDS.APPLICATION_DETAILS && (
        <ApplicationDetails
          formState={formState}
          onUpdateSteps={onUpdateSteps}
          values={values}
        />
      )}
      {currentStep === STEP_IDS.APPROVER && (
        <ApproverSelection onBack={onBack} onNext={onNext} />
      )}
      {currentStep === STEP_IDS.CONFIRM && (
        <Confirm
          formState={formState}
          handleSubmit={handleSubmit}
          onBack={onBack}
        />
      )}
    </form>
  );
};
