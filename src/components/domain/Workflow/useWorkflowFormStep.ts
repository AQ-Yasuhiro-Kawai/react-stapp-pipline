import { useCallback, useMemo, useReducer } from "react";
import { useShallow } from "zustand/shallow";
import { pdfFileSelector } from "@/store/projects/pdfFileSlice";
import { useBoundStore } from "@/store/store";
import {
  WORKFLOW_FORM_STEP_STATUS,
  type WorkflowFormStep,
} from "./WorkflowFormStep";

// ステップIDの定数定義（マジックナンバーを排除）
export const STEP_IDS = {
  APPLICATION_DETAILS: 1,
  APPROVER: 2,
  CONFIRM: 3,
} as const;

// 初期ステップ状態
const INITIAL_STEPS: WorkflowFormStep[] = [
  {
    id: STEP_IDS.APPLICATION_DETAILS,
    name: "申請内容入力",
    status: WORKFLOW_FORM_STEP_STATUS.CURRENT,
  },
  {
    id: STEP_IDS.APPROVER,
    name: "承認者選択",
    status: WORKFLOW_FORM_STEP_STATUS.NOT_DONE,
  },
  {
    id: STEP_IDS.CONFIRM,
    name: "内容確認",
    status: WORKFLOW_FORM_STEP_STATUS.NOT_DONE,
  },
];

// ステップ更新用の型定義（他のファイルでも使用するためexport）
export type StepUpdate = {
  id: number;
  status: (typeof WORKFLOW_FORM_STEP_STATUS)[keyof typeof WORKFLOW_FORM_STEP_STATUS];
};

// Reducer用のAction型定義
type WorkflowAction =
  | { type: "NEXT_STEP" }
  | { type: "BACK_STEP" }
  | { type: "JUMP_TO_STEP"; payload: { stepId: number } }
  | { type: "UPDATE_STEPS"; payload: { updates: StepUpdate[] } };

// 現在のステップIDを取得するPure関数
const findCurrentStepId = (steps: WorkflowFormStep[]): number =>
  steps.find((step) => step.status === WORKFLOW_FORM_STEP_STATUS.CURRENT)?.id ??
  STEP_IDS.APPLICATION_DETAILS;

// 次のステップに進めるかを判定するPure関数
const canMoveToNextStep = (currentStepId: number): boolean =>
  currentStepId < STEP_IDS.CONFIRM;

// 前のステップに戻れるかを判定するPure関数
const canMoveToPrevStep = (currentStepId: number): boolean =>
  currentStepId > STEP_IDS.APPLICATION_DETAILS;

// 指定ステップにジャンプできるかを判定するPure関数
const canJumpToStep = (targetStepId: number, currentStepId: number): boolean =>
  targetStepId < currentStepId && targetStepId >= STEP_IDS.APPLICATION_DETAILS;

// ステップ配列に更新を適用するPure関数
const applyStepUpdates = (
  steps: WorkflowFormStep[],
  updates: StepUpdate[],
): WorkflowFormStep[] => {
  return steps.map((step) => {
    const update = updates.find((u) => u.id === step.id);
    return update ? { ...step, status: update.status } : step;
  });
};

// ファイルタイプ定義（pdfFileSliceから取得）
type FileWithStatus = {
  projectId: string;
  originalItemInfo: {
    url: string;
    folderName: string;
    fileName: string;
    fileId: string;
    lastUpdatedAt: string;
    version: string;
  };
  requestId?: string;
  originalFileBlobUrl?: string;
  generatedFileBlobUrl?: string;
  fileContentHash?: string;
  status: "idle" | "converting" | "converted" | "failed";
};

// ファイル変換状態に基づいて動的にLoading状態を計算するPure関数
const calculateDynamicStepStatus = (
  steps: WorkflowFormStep[],
  files: FileWithStatus[],
): WorkflowFormStep[] => {
  // 変換中のファイルがあるかチェック
  const hasConvertingFiles = files.some((file) => file.status === "converting");

  // 変換中ファイルがない場合はそのまま返す
  if (!hasConvertingFiles) return steps;

  // APPLICATION_DETAILSステップのみでLoading状態制御
  // （Step2, 3ではファイル変換は発生しないため）
  return steps.map((step) => {
    if (
      step.id === STEP_IDS.APPLICATION_DETAILS &&
      step.status === WORKFLOW_FORM_STEP_STATUS.DONE
    ) {
      return { ...step, status: WORKFLOW_FORM_STEP_STATUS.LOADING };
    }
    return step;
  });
};

// Workflow状態管理のReducer（Pure関数）
const workflowReducer = (
  state: WorkflowFormStep[],
  action: WorkflowAction,
): WorkflowFormStep[] => {
  const currentStepId = findCurrentStepId(state);

  switch (action.type) {
    case "NEXT_STEP": {
      // ガード句：最後のステップでは進めない
      if (!canMoveToNextStep(currentStepId)) return state;

      // 現在のステップを完了し、次のステップを開始
      return applyStepUpdates(state, [
        { id: currentStepId, status: WORKFLOW_FORM_STEP_STATUS.DONE },
        { id: currentStepId + 1, status: WORKFLOW_FORM_STEP_STATUS.CURRENT },
      ]);
    }

    case "BACK_STEP": {
      // ガード句：最初のステップでは戻れない
      if (!canMoveToPrevStep(currentStepId)) return state;

      // 現在のステップを未完了にし、前のステップを開始
      return applyStepUpdates(state, [
        { id: currentStepId, status: WORKFLOW_FORM_STEP_STATUS.NOT_DONE },
        { id: currentStepId - 1, status: WORKFLOW_FORM_STEP_STATUS.CURRENT },
      ]);
    }

    case "JUMP_TO_STEP": {
      const { stepId } = action.payload;
      // ガード句：不正なジャンプは許可しない
      if (!canJumpToStep(stepId, currentStepId)) return state;

      // 対象ステップ以降を適切な状態にリセット
      const updates = state
        .filter((step) => step.id >= stepId)
        .map((step) => ({
          id: step.id,
          status:
            step.id === stepId
              ? WORKFLOW_FORM_STEP_STATUS.CURRENT
              : WORKFLOW_FORM_STEP_STATUS.NOT_DONE,
        }));

      return applyStepUpdates(state, updates);
    }

    case "UPDATE_STEPS": {
      // 直接的なステップ更新（既存API互換性のため）
      return applyStepUpdates(state, action.payload.updates);
    }

    default:
      return state;
  }
};

/**
 * ワークフローのフォームステップを管理するカスタムフック
 *
 * useReducerベースで状態管理を行い、Pure関数でロジックを分離。
 * PDFファイルの変換状態と連携してLoading状態も動的に管理する。
 */
export function useWorkflowFormStep() {
  // useReducerで状態管理
  const [steps, dispatch] = useReducer(workflowReducer, INITIAL_STEPS);

  // Zustandから現在のファイル状態を取得
  const { files } = useBoundStore(useShallow(pdfFileSelector));

  // ファイル変換状態を考慮した動的なステップ状態を計算
  const stepsWithDynamicStatus = useMemo(
    () => calculateDynamicStepStatus(steps, files),
    [steps, files],
  );

  // 現在のステップIDを取得
  const currentStepId = useMemo(
    () => findCurrentStepId(stepsWithDynamicStatus),
    [stepsWithDynamicStatus],
  );

  // 次のステップに進むAction creator
  const toNextStep = useCallback(() => {
    dispatch({ type: "NEXT_STEP" });
  }, []);

  // 前のステップに戻るAction creator
  const toBackStep = useCallback(() => {
    dispatch({ type: "BACK_STEP" });
  }, []);

  // 指定ステップにジャンプするAction creator
  const toStep = useCallback((stepId: number) => {
    dispatch({ type: "JUMP_TO_STEP", payload: { stepId } });
  }, []);

  // 直接的なステップ更新（既存API互換性のため）
  const updateSteps = useCallback((updates: StepUpdate[]) => {
    dispatch({ type: "UPDATE_STEPS", payload: { updates } });
  }, []);

  return {
    steps: stepsWithDynamicStatus,
    currentStepId,
    updateSteps,
    toNextStep,
    toBackStep,
    toStep,
  };
}
