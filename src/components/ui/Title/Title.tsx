import { cn } from "@/utils/cn";

type PageTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export const PageTitle = ({ children, className }: PageTitleProps) => {
  return (
    <h1
      className={cn(
        "pb-10 text-2xl font-bold text-main-text max-md:pb-6 max-md:text-xl",
        className,
      )}
    >
      {children}
    </h1>
  );
};

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export const SectionTitle = ({ children, className }: SectionTitleProps) => {
  return (
    <h2
      className={cn(
        "pb-6 text-xl font-bold text-main-text max-md:pb-4 max-md:text-lg",
        className,
      )}
    >
      {children}
    </h2>
  );
};
