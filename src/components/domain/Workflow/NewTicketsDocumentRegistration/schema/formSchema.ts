import { z } from "zod";

export const newTicketsFormSchema = z.object({
  ticketName: z
    .string()
    .min(1, "1文字以上で入力してください")
    .max(30, "30文字以下で入力してください"),
  documentName: z.string().optional(),
  // 管理元組織
  sourceOrganizationCode: z.object({
    id: z.string(), // Selectコンポーネントに合わせてcodeをidにしている
    name: z.string(),
  }),
  // 公開先組織
  targetOrganizationCode: z.object({
    id: z.string(), // Selectコンポーネントに合わせてcodeをidにしている
    name: z.string(),
  }),
  // 公開範囲
  publicationScopeCode: z.object({
    id: z.string(), // Selectコンポーネントに合わせてcodeをidにしている
    name: z.string(),
  }),
  // 文書種類
  fileTypeCode: z.object({
    id: z.string(), // Selectコンポーネントに合わせてcodeをidにしている
    name: z.string(),
  }),
  notes: z.string().max(300, "300文字以下で入力してください").optional(),
});

export type NewTicketsFormSchema = z.infer<typeof newTicketsFormSchema>;
