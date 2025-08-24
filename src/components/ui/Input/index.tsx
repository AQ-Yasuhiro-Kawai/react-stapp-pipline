import { Input as ShadcnInput } from "@lib/shadcn/ui/input";
import { cn } from "@utils/cn";
import { cva } from "class-variance-authority";
import { useId, useState } from "react";

const VARIANT = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
} as const;

const inputVariants = cva("w-fit text-main-dark-blue", {
  variants: {
    variant: {
      [VARIANT.PRIMARY]: "*:not-first:last:mt-2",
      [VARIANT.SECONDARY]: cn(
        "flex gap-4",
        "*:first:items-center-safe *:first:justify-end-safe *:first:flex *:first:h-9 *:first:w-20", // タイトルのスタイル
        "*:last:flex-1", // 本体のスタイル
      ),
    },
  },
});

/**
 * テキスト入力コンポーネント
 * @param title タイトル
 * @param isValid バリデーションが通っているか
 * @param variant コンポーネントのバリアント
 * @param description 説明文
 * @param isShowValidationText バリデーションエラー文の表示部分を作成するかどうか
 * @param validationText バリデーションエラーで表示する文
 */
function TextInput({
  title = "",
  isValid = true,
  variant = VARIANT.PRIMARY,
  description,
  isShowValidationText = true,
  validationText = "",
  className,
  ...props
}: React.ComponentProps<typeof ShadcnInput> & {
  title?: string;
  isValid?: boolean;
  variant?: (typeof VARIANT)[keyof typeof VARIANT];
  description?: string;
  isShowValidationText?: boolean;
  validationText?: string;
}) {
  const [isValidationTextOpen, setIsValidationTextOpen] = useState(false);
  const [isValidationTextOneLine, setIsValidationTextOneLine] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const inputId = useId();

  return (
    <div className={cn(inputVariants({ variant }), className)}>
      <label htmlFor={inputId}>{title}</label>
      <div>
        <ShadcnInput
          aria-invalid={!isValid}
          {...props}
          className=" transition-colors invalid:border-main-red "
          id={inputId}
        />
        {isShowValidationText && (
          <div
            className=" @container my-0.5 min-h-6 overflow-hidden text-sm transition-all "
            style={{ height: containerHeight }}
          >
            <div
              className=" w-[100cqw] "
              ref={(element) => {
                setContainerHeight(element?.offsetHeight ?? 0);
              }}
            >
              <div aria-live="polite">
                {isValid || (
                  <button
                    aria-expanded={isValidationTextOpen}
                    className={cn(
                      " wrap-anywhere w-full cursor-default overflow-hidden rounded-sm bg-main-bg/80 text-left text-main-red ",
                      " not-aria-expanded:text-ellipsis not-aria-expanded:whitespace-nowrap ", // バリデーション文が閉じている場合は3点リーダで省略
                      isValidationTextOneLine
                        ? undefined
                        : " cursor-pointer underline underline-offset-2 ", // 一行に収まっていない場合のみクリック可能
                    )}
                    onClick={() =>
                      setIsValidationTextOpen(
                        (prev) => !isValidationTextOneLine && !prev,
                      )
                    } // 一行に収まっている場合は常に閉じる
                    ref={(element) => {
                      if (!element) return;
                      setIsValidationTextOneLine(
                        element.scrollWidth <= element.offsetWidth &&
                          !isValidationTextOpen,
                      );
                    }}
                    type="button"
                  >
                    {validationText}
                  </button>
                )}
              </div>
              {description && (
                <p className=" wrap-anywhere w-full text-sub-text ">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { TextInput };
