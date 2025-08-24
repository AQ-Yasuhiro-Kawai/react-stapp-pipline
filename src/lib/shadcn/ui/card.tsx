import { cn } from "@utils/cn";

const Card = ({ className, ref, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className,
    )}
    ref={ref}
    {...props}
  />
);
Card.displayName = "Card";

const CardHeader = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    className={cn("flex flex-col space-y-1.5", className)}
    ref={ref}
    {...props}
  />
);
CardHeader.displayName = "CardHeader";

const CardTitle = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    className={cn("font-semibold leading-none tracking-tight", className)}
    ref={ref}
    {...props}
  />
);
CardTitle.displayName = "CardTitle";

const CardDescription = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    className={cn("text-muted-foreground text-sm", className)}
    ref={ref}
    {...props}
  />
);
CardDescription.displayName = "CardDescription";

const CardContent = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) => (
  <div className={className} ref={ref} {...props} />
);
CardContent.displayName = "CardContent";

const CardFooter = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    className={cn("mt- mt- mt- mt- mt- m", className)}
    ref={ref}
    {...props}
  />
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
