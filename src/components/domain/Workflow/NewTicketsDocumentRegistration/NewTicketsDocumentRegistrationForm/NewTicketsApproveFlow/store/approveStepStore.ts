import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { ApprovalTemplateDetail } from "@/domain/tickets/Document/type";
import type { User } from "@/domain/User/type";

/**
 * 承認者の情報
 */
type Approver = User;

/**
 * 承認者グループ
 * - 複数の承認者をまとめる単位
 * - グループ内で何人の承認が必要かを定義する
 */
export type ApproverGroupType = {
  id: string; // グループの一意なID
  approvers: Approver[];
  requiredApprovals: number; // 必要承認者数
};

/**
 * 承認ステップ
 * - 承認フローの各段階
 */
export type ApprovalStep = {
  id: string; // ステップの一意なID
  groups: ApproverGroupType[];
};

type State = {
  steps: ApprovalStep[]; // 承認ステップのリスト
};

/**
 * ApprovalTemplateDetailをApprovalStep[]に変換するヘルパー関数
 */
const convertTemplateToSteps = (
  template: ApprovalTemplateDetail,
): ApprovalStep[] => {
  return template.approvalStepTemplates.map((stepTemplate) => ({
    id: crypto.randomUUID(),
    groups: stepTemplate.approvalGroupTemplates.map((groupTemplate) => ({
      id: crypto.randomUUID(),
      approvers: groupTemplate.approverTemplates.map((approverTemplate) => ({
        userId: approverTemplate.userId,
        name: approverTemplate.name,
        userPrincipalName: approverTemplate.userPrincipalName,
        organizationName: approverTemplate.organizationName,
        positionName: approverTemplate.positionName,
      })),
      requiredApprovals: groupTemplate.requiredApprovalCount,
    })),
  }));
};

type Actions = {
  /**
   * 指定した位置に新しい承認ステップを追加。
   * @param index - ステップを追加する位置 (0から始まるインデックス)
   */
  addStep: (index: number) => void;
  /**
   * 指定したIDの承認ステップを削除。
   * @param stepId - 削除するステップのID
   */
  removeStep: (stepId: string) => void;
  /**
   * 指定したステップに新しい承認者グループを追加。
   * @param stepId - グループを追加するステップのID
   */
  addGroup: (stepId: string) => void;
  /**
   * 指定したステップから承認者グループを削除。
   * @param stepId - 対象のステップID
   * @param groupId - 削除するグループのID
   */
  removeGroup: (stepId: string, groupId: string) => void;
  /**
   * 指定したグループに新しい承認者を追加。
   * @param stepId - 対象のステップID
   * @param groupId - 対象のグループID
   * @param approver - 追加する承認者の情報
   */
  addApprover: (stepId: string, groupId: string, approver: Approver) => void;
  /**
   * 指定したグループから承認者を削除。
   * @param stepId - 対象のステップID
   * @param groupId - 対象のグループID
   * @param userId - 削除する承認者のuserId
   */
  removeApprover: (stepId: string, groupId: string, userId: string) => void;
  /**
   * グループの必要承認者数を設定。
   * @param stepId - 対象のステップID
   * @param groupId - 対象のグループID
   * @param count - 設定する承認者数
   */
  setRequiredApprovals: (
    stepId: string,
    groupId: string,
    count: number,
  ) => void;
  /**
   * ストアの状態を初期状態にリセットします。
   */
  reset: () => void;
  /**
   * テンプレートから承認フローの状態を設定
   * @param template - 承認テンプレートの詳細情報
   */
  setFromTemplate: (template: ApprovalTemplateDetail) => void;
};

type Selectors = {
  // 承認者が最低1人以上いるかどうかを確認するセレクター
  hasApprovers: () => boolean;
};

const initialState: State = { steps: [] };

export const approveStepStore = create<State & Actions & Selectors>()(
  devtools(
    immer((set, get) => ({
      ...initialState,

      // --- アクションの実装 (Actions Implementation) ---

      addStep: (index) =>
        set((state) => {
          const newStep: ApprovalStep = {
            id: crypto.randomUUID(),
            groups: [],
          };
          // 指定された位置に新しいステップを挿入
          state.steps.splice(index, 0, newStep);
        }),

      removeStep: (stepId) =>
        set((state) => {
          state.steps = state.steps.filter((step) => step.id !== stepId);
        }),

      addGroup: (stepId) =>
        set((state) => {
          const step = state.steps.find((s) => s.id === stepId);
          if (step) {
            const newGroup: ApproverGroupType = {
              id: crypto.randomUUID(),
              approvers: [],
              requiredApprovals: 0, // 最初は0人。ユーザーが追加されたら更新
            };
            step.groups.push(newGroup);
          }
        }),

      removeGroup: (stepId, groupId) =>
        set((state) => {
          const step = state.steps.find((s) => s.id === stepId);
          if (step) {
            step.groups = step.groups.filter((group) => group.id !== groupId);
          }
        }),

      addApprover: (stepId, groupId, approver) =>
        set((state) => {
          const group = state.steps
            .find((s) => s.id === stepId)
            ?.groups.find((g) => g.id === groupId);

          if (group) {
            // 重複を避ける
            if (!group.approvers.some((a) => a.userId === approver.userId)) {
              group.approvers.push(approver);
              // 承認者が1人になった場合は、必要承認者数を自動的に1に設定
              if (group.approvers.length === 1) {
                group.requiredApprovals = 1;
              }
            }
          }
        }),

      removeApprover: (stepId, groupId, userId) =>
        set((state) => {
          const group = state.steps
            .find((s) => s.id === stepId)
            ?.groups.find((g) => g.id === groupId);

          if (group) {
            const initialLength = group.approvers.length;
            group.approvers = group.approvers.filter(
              (a) => a.userId !== userId,
            );
            const newLength = group.approvers.length;

            // ユーザーが削除された場合
            if (initialLength > newLength) {
              // 必要承認者数が現在の承認者数を超えていたら、現在の承認者数に合わせる
              if (group.requiredApprovals > newLength) {
                group.requiredApprovals = newLength;
              }
              // 承認者が0になったら、必要承認者数も0にする
              if (newLength === 0) {
                group.requiredApprovals = 0;
              }
            }
          }
        }),

      setRequiredApprovals: (stepId, groupId, count) =>
        set((state) => {
          const group = state.steps
            .find((s) => s.id === stepId)
            ?.groups.find((g) => g.id === groupId);

          if (group) {
            // 1以上、かつ現在の承認者数以下の範囲でのみ設定可能
            const approverCount = group.approvers.length;
            if (count >= 1 && count <= approverCount) {
              group.requiredApprovals = count;
            }
          }
        }),

      reset: () => set(initialState),

      setFromTemplate: (template) =>
        set((state) => {
          const steps = convertTemplateToSteps(template);
          state.steps = steps;
        }),

      // --- セレクターの実装 (Selectors Implementation) ---
      hasApprovers: () => {
        // すべてのステップとグループをチェックして、少なくとも1人の承認者がいるかどうかを確認
        return get().steps.some((step) =>
          step.groups.some((group) => group.approvers.length > 0),
        );
      },
    })),
  ),
);
