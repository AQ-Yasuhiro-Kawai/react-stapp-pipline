import type { NewTicketsFormState } from "@/components/domain/Workflow/NewTicketsDocumentRegistration/NewTicketsDocumentRegistrationForm";
import { Textarea } from "@/components/ui/TextArea";
import { SectionTitle } from "@/components/ui/Title";

type Props = {
  errors: NewTicketsFormState["errors"];
  register: NewTicketsFormState["register"];
};

export function NewTicketsComment({ errors, register }: Props) {
  return (
    <>
      <SectionTitle>備考</SectionTitle>
      <Textarea
        heightSize="lg"
        placeholder="必須ではない。300文字まで。"
        widthSize="full"
        {...register("notes")}
      />
      {errors.notes && (
        <p className="text-main-red text-sm mt-2">{errors.notes.message}</p>
      )}
    </>
  );
}
