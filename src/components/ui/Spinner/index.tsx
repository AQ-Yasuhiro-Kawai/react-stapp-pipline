import { LoaderCircle } from "lucide-react";

export const SpinnerOverlay = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <LoaderCircle className="h-20 w-20 animate-spin text-black" />
    </div>
  );
};
