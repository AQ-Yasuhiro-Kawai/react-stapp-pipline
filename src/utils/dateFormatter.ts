import { DateTime } from "luxon";

function dateFormatter(date: Date | DateTime, timeZone = "local"): string {
  const _dt = date instanceof DateTime ? date : DateTime.fromJSDate(date);
  return _dt.setZone(timeZone).toFormat("yyyy/M/d");
}

function formatDateTimeFromString(date: string, timeZone = "local"): string {
  const _dt: DateTime = DateTime.fromISO(date);

  return _dt.setZone(timeZone).toFormat("yyyy/MM/dd HH:mm");
}

function formatToISOString(date: Date | DateTime, timeZone = "local"): string {
  const _dt = date instanceof DateTime ? date : DateTime.fromJSDate(date);
  // YYYY-MM-DDThh:mm:ssZ形式
  return (
    _dt.setZone(timeZone).toUTC().toISO({ suppressMilliseconds: true }) || ""
  );
}

export { dateFormatter, formatDateTimeFromString, formatToISOString };
