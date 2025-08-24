import { type AuthSlice, authSelector } from "@store/auth/authSlice";
import { useBoundStore } from "@store/store";
import { useMemo } from "react";
import { useShallow } from "zustand/shallow";
import {
  type AuthRepository,
  useAuthRepository,
} from "@/repositories/auth/repository";

const createAuthUsecase = ({
  repository,
  setAuthData,
}: {
  repository: AuthRepository;
  setAuthData: AuthSlice["setAuthData"];
}) => {
  return {
    getAccessToken: async (): Promise<void> => {
      const token = await repository.getAccessToken();
      if (!token) {
        await repository.login();
        return;
      }
      setAuthData(token);
      return;
    },
    login: async () => {
      await repository.login();
    },
    logout: async () => {
      await repository.logout();
    },
  };
};

export const useAuthUsecase = () => {
  const repository = useAuthRepository();
  const authState = useBoundStore(useShallow(authSelector));

  return useMemo(
    () => createAuthUsecase({ repository, setAuthData: authState.setAuthData }),
    [repository, authState.setAuthData],
  );
};
