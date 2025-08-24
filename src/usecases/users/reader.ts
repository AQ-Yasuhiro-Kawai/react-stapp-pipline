import { useQuery } from "@tanstack/react-query";
import camelcaseKeys from "camelcase-keys";
import type { Users } from "@/components/domain/Users/type";
import { useUsersRepository } from "@/repositories/Users/repository";
import type { UsersResponse } from "@/repositories/Users/type";
import { usersKeys } from "@/usecases/users/cache";

/**
 * ユーザー一覧を取得する
 */
export const useGetUsersQuery = (searchWord: string, count: number) => {
  const repository = useUsersRepository();

  return useQuery<UsersResponse, Error, Users>({
    queryKey: [...usersKeys.users, searchWord, count],
    queryFn: () => repository.getUsers(searchWord, count),
    select: (data: UsersResponse) => camelcaseKeys(data, { deep: true }),
    enabled: searchWord.trim().length > 0,
  });
};
