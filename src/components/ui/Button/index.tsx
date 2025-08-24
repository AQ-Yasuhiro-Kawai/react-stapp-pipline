import { Slot } from "@radix-ui/react-slot";
import { cn } from "@utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import * as React from "react";

export type Props = React.PropsWithChildren<{
  className?: string;
  variant?: (typeof VARIANT)[keyof typeof VARIANT];
  size?: (typeof SIZE)[keyof typeof SIZE];
  prefixElement?: React.ReactNode;
  suffixElement?: React.ReactNode;
  isLoading?: boolean;
}> &
  React.ComponentPropsWithRef<"button">;

const VARIANT = {
  DESTRUCTIVE: "destructive",
  GHOST: "ghost",
  GHOST_RED: "ghost-red",
  OUTLINED: "outlined",
  OUTLINED_RED: "outlined-red",
  PRIMARY: "primary",
  WHITE: "white",
} as const;

const SIZE = {
  ICON: "icon",
  LARGE: "large",
  MEDIUM: "medium",
} as const;

const buttonVariants = cva(
  "relative inline-flex h-10 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold outline-ring/50 ring-ring/10 transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-4 aria-invalid:focus-visible:ring-0 dark:outline-ring/40 dark:ring-ring/20 [&_svg:not([class*='size-'])]:size-4.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    compoundVariants: [
      // disabled時の基本設定
      {
        className: "disabled:bg-zinc-500/40 disabled:text-zinc-200",
        disabled: true,
        isLoading: false,
      },
      // loading時の基本設定
      {
        className:
          "disabled:cursor-not-allowed disabled:border-main-border disabled:bg-main-border disabled:text-main-bg",
        isLoading: true,
      },
    ],
    variants: {
      disabled: {
        true: {},
      },
      isLoading: {
        true: {},
      },
      size: {
        [SIZE.MEDIUM]: "h-9 px-4 text-base",
        [SIZE.LARGE]: "h-15 px-6 text-xl",
        [SIZE.ICON]: "size-9",
      },
      variant: {
        [VARIANT.PRIMARY]: "bg-main-blue text-main-bg hover:bg-main-blue/90",
        [VARIANT.OUTLINED]:
          "border border-main-border bg-thin-bg text-dark-blue hover:bg-sub-bg",
        [VARIANT.DESTRUCTIVE]:
          "bg-main-red text-main-bg hover:bg-main-red-hover",
        [VARIANT.GHOST]: "bg-transparent text-main-text hover:bg-sub-bg",
        [VARIANT.GHOST_RED]:
          "bg-transparent text-main-red hover:bg-thin-red-hover",
        [VARIANT.OUTLINED_RED]:
          "border border-main-red bg-thin-red text-main-red hover:bg-thin-red-hover",
        [VARIANT.WHITE]: "bg-main-bg text-black",
      },
    },
  },
);

function createChildren(
  isShowLoading: boolean,
  children: React.ReactNode,
  prefix?: React.ReactNode,
  suffix?: React.ReactNode,
) {
  const content = (
    <div className="flex items-center justify-center gap-2 [&>svg]:size-4.5">
      {prefix}
      {children}
      {suffix}
    </div>
  );

  if (isShowLoading) {
    return (
      <>
        <LoaderCircle className="absolute top-[50%] left-[50%] size-3.5 translate-x-[-50%] translate-y-[-50%] transform animate-spin" />
        <div className="invisible">{content}</div>
      </>
    );
  }

  return content;
}

type ButtonProps = Props &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant = VARIANT.PRIMARY,
  size = SIZE.MEDIUM,
  asChild = false,
  children,
  prefixElement,
  suffixElement,
  disabled = false,
  isLoading = false,
  type = "button",
  onClick,
  ...props
}: ButtonProps) {
  const isElement = React.isValidElement(children);
  const Comp = isLoading ? "button" : asChild && isElement ? Slot : "button";

  const newChildren = createChildren(
    isLoading,
    children,
    prefixElement,
    suffixElement,
  );

  return (
    <Comp
      className={cn(
        buttonVariants({ className, disabled, isLoading, size, variant }),
      )}
      data-slot="button"
      disabled={disabled || isLoading}
      onClick={asChild ? undefined : onClick}
      type={type}
      {...props}
    >
      {newChildren}
    </Comp>
  );
}

export { Button, VARIANT, SIZE };
export type { ButtonProps, buttonVariants };
