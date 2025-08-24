ワークフローのディレクトリ構造

```
Workflow/
├── NewTicketsDocumentRegistration/  // 正文書登録ワークフロー申請
│   └── NewTicketsDocumentRegistrationForm/
│       ├── ApplicationDetails/      // 申請内容入力
│       │   ├── FileSelectionModal.tsx // ファイル選択モーダル
│       │   └── index.tsx            // 申請内容入力の実態
│       ├── ApproverSelection/              // 承認者選択
│       │   ├── hooks/               // 承認者選択で使用するカスタムフック
│       │   │   └── useApproveStep.ts  // 承認ステップのカスタムフック
│       │   ├── store/
│       │   │   └── approveStepStore.ts // 承認ステップのストア
│       │   ├── TemplateSelectionModal.tsx // テンプレート選択モーダル
│       │   └── index.tsx            // 承認者選択の実態
│       ├── ApplicationConfirm/               // 内容確認
│       │   ├── ConfirmModal.tsx     // 申請確認モーダル
│       │   └── index.tsx            // 内容確認の実態
│       └── index.tsx
├── ModifyTicketsDocumentRegistration/
│   └── ModifyTicketsDocumentRegistration/
│       ├── ApplicationDetails/
│       │   ├── FileSelectionModal.tsx
│       │   └── index.tsx
│       ├── ApproverSelection/
│       │   └── index.tsx
│       ├── ApplicationConfirm/
│       │   ├── ConfirmModal.tsx
│       │   └── index.tsx
│       └── index.tsx
├── useWorkflowFormStep.ts           // ワークフローステップのカスタムフック
└── WorkflowFormStep.tsx             // ワークフローステップ
```