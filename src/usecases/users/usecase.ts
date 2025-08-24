import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useUsersRepository } from "@/repositories/Users/repository";

type AddUsersToRoleVariables = {
  roleCode: string;
  userIds: string[];
};

/**
 * 対象のロールへユーザーを追加する
 */
export const useAddUsersToRoleMutation = (
  options?: UseMutationOptions<void, Error, AddUsersToRoleVariables>,
) => {
  const repository = useUsersRepository();

  return useMutation<void, Error, AddUsersToRoleVariables>({
    mutationFn: (variables: AddUsersToRoleVariables) =>
      repository.addUsersToRole(variables.roleCode, variables.userIds),
    onSuccess: (data, variables, content) => {
      // コンポーネント側からの特定の成功後処理を行う
      options?.onSuccess?.(data, variables, content);
    },
  });
};
