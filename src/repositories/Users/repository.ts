import { useMemo } from "react";
import { type ApiClient, api } from "@/lib/api";
import type { UsersResponse } from "@/repositories/Users/type";

const createUsersRepository = (api: ApiClient) => {
  return {
    getUsers: async (searchWord: string, count: number) => {
      const params = new URLSearchParams({
        q: searchWord,
        ...(count && { limit: String(count) }),
      });
      return await api.get<UsersResponse>(`/api/users/?${params.toString()}`);
    },
    addUsersToRole: async (roleCode: string, userIds: string[]) => {
      const body = {
        users: userIds.map((id) => ({ user_id: id })),
      };
      return await api.post<void>(`/api/roles/${roleCode}/users`, body);
    },
  };
};

export const useUsersRepository = () => {
  return useMemo(() => createUsersRepository(api), []);
};

export type UsersRepository = ReturnType<typeof createUsersRepository>;
