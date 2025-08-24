import { useState } from "react";
import { dateFormatter } from "@/utils/dateFormatter";

export function useMyTicketsSearch() {
  const [ticketName, setTicketName] = useState<string>("");
  const [type, setType] = useState<string[]>([]);
  const [officialDocumentId, setOfficialDocumentId] = useState<string>("");
  const [status, setStatus] = useState<string[]>([]);
  const [applicationDateFrom, setApplicationDateFrom] = useState<string>("");
  const [applicationDateTo, setApplicationDateTo] = useState<string>("");
  const [completedDateFrom, setCompletedDateFrom] = useState<string>("");
  const [completedDateTo, setCompletedDateTo] = useState<string>("");

  const handleChangeTicketName = (value: string) => setTicketName(value);
  const handleChangeType = (value: string[]) => setType(value);
  const handleChangeStatus = (value: string[]) => setStatus(value);
  const handleChangeOfficialDocumentId = (value: string) =>
    setOfficialDocumentId(value);
  const handleChangeApplicationDateFrom = (date: Date | undefined) =>
    setApplicationDateFrom(date ? dateFormatter(date) : "");
  const handleChangeApplicationDateTo = (date: Date | undefined) =>
    setApplicationDateTo(date ? dateFormatter(date) : "");
  const handleChangeCompletedDateFrom = (date: Date | undefined) =>
    setCompletedDateFrom(date ? dateFormatter(date) : "");
  const handleChangeCompletedDateTo = (date: Date | undefined) =>
    setCompletedDateTo(date ? dateFormatter(date) : "");

  return {
    applicationDateFrom,
    applicationDateTo,
    completedDateFrom,
    completedDateTo,
    handleChangeApplicationDateFrom,
    handleChangeApplicationDateTo,
    handleChangeCompletedDateFrom,
    handleChangeCompletedDateTo,
    handleChangeOfficialDocumentId,
    handleChangeStatus,
    handleChangeTicketName,
    handleChangeType,
    officialDocumentId,
    status,
    ticketName,
    type,
  };
}
