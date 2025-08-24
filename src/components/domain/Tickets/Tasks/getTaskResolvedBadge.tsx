import { USER_RESOLVED_MAP } from "@/shared/constants/tickets";
import { cn } from "@/utils/cn";

export const getTaskResolvedBadge = (userResolved: boolean) => {
  return (
    <span
      className={cn(
        "inline-flex px-2 py-1 h-[25px] justify-center items-center rounded-md text-sm font-bold border",
        userResolved && "text-main-blue border-main-blue",
        !userResolved && "text-main-red border-main-red",
      )}
    >
      {userResolved ? USER_RESOLVED_MAP.resolved : USER_RESOLVED_MAP.unresolved}
    </span>
  );
};
