import { useMemo } from "react";
import { useNewTicketsQueries } from "@/usecases/Tickets/Document/reader";

/**
 * 正文書登録申請に必要なデータをフェッチし、
 * formのdefaultValuesを設定するためにデータを加工、返却するhooks
 */
export const useFetch = () => {
  const { fileType, sourceOrganizations, targetOrganizations, isPending } =
    useNewTicketsQueries();

  const values = useMemo(() => {
    const sourceOrganization = sourceOrganizations.data.childOrganizations;
    const targetOrganization = targetOrganizations.data.organizations;
    const fileTypeCode = fileType.data;

    return {
      sourceOrganization,
      targetOrganization,
      fileTypeCode,
    };
  }, [
    fileType.data,
    sourceOrganizations.data.childOrganizations,
    targetOrganizations.data.organizations,
  ]);

  return {
    isPending,
    values,
  };
};

export type UseFetch = ReturnType<typeof useFetch>;
