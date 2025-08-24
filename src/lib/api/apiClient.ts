type ApiRequest = { [key: string]: unknown } | unknown[];

const BASE_URL = import.meta.env.VITE_API_URL;

const createApi = () => {
  return {
    delete: async <T>(path: string, options?: RequestInit): Promise<T> => {
      const response = await fetch(`${BASE_URL}${path}`, {
        headers: {
          ...options?.headers,
        },
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || response.statusText, {
          cause: { status: response.status, errorData },
        });
      }

      const result = await response.json();
      return result;
    },
    get: async <T>(path: string, options?: RequestInit): Promise<T> => {
      const response = await fetch(`${BASE_URL}${path}`, {
        headers: {
          ...options?.headers,
        },
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || response.statusText, {
          cause: { status: response.status, errorData },
        });
      }

      const result: T = await response.json();
      return result;
    },
    getBlob: async (path: string, options?: RequestInit): Promise<Blob> => {
      const response = await fetch(`${BASE_URL}${path}`, {
        headers: {
          ...options?.headers,
        },
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || response.statusText, {
          cause: { status: response.status, errorData },
        });
      }

      const result = await response.blob();
      return result;
    },
    patch: async <T, U = ApiRequest>(
      path: string,
      data?: U,
      options?: RequestInit,
    ): Promise<T> => {
      const response = await fetch(`${BASE_URL}${path}`, {
        body: data ? JSON.stringify(data) : undefined,
        headers: {
          ...options?.headers,
          "Content-Type": "application/json",
        },
        method: "PATCH",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || response.statusText, {
          cause: { status: response.status, errorData },
        });
      }

      const result = await response.json();
      return result;
    },
    post: async <T, U = ApiRequest>(
      path: string,
      data?: U,
      options?: RequestInit,
    ): Promise<T> => {
      const response = await fetch(`${BASE_URL}${path}`, {
        body: data ? JSON.stringify(data) : undefined,
        headers: {
          ...options?.headers,
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || response.statusText, {
          cause: { status: response.status, errorData },
        });
      }

      if (response.status === 204) {
        return undefined as T;
      }

      const result = await response.json();
      return result;
    },
  };
};

export const api = createApi();
export type ApiClient = ReturnType<typeof createApi>;
