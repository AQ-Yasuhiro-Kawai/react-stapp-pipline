import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@lib/shadcn/ui/dialog.tsx";
import type { DismissableLayerProps } from "@radix-ui/react-dismissable-layer";
import { cn } from "@utils/cn";
import {
  isValidElement,
  memo,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
  useCallback,
} from "react";
import { Button, type ButtonProps, VARIANT } from "@/components/ui/Button";

export const COLORS = {
  WARN: "warn",
} as const;

const TITLE_COLOR = {
  [COLORS.WARN]: "text-main-red",
} as const;

type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  title: string;
  titleColor?: (typeof COLORS)[keyof typeof COLORS];
  description?: ReactNode;
  closeModalHandler: () => void;
  primaryButton?: ReactElement<ButtonProps>;
  secondaryButton?: ReactElement<ButtonProps>;
  secondaryLabelName?: string;
  isCloseOutsideModal?: boolean;
  className?: string;
  isSecondaryDisabled?: boolean;
  isHiddenSecondaryButton?: boolean;
}>;

/**
 * 共通モーダルコンポーネント
 * @param isOpen モーダルの表示状態
 * @param title モーダルのタイトル
 * @param titleColor モーダルのタイトルのカラー
 * @param description モーダルの説明
 * @param closeModalHandler モーダルを閉じる関数
 * @param primaryButton プライマリボタン
 * @param isCloseOutsideModal モーダル外をクリックしたときにモーダルを閉じるかどうか
 * @param secondaryLabelName セカンダリラベル名
 * @param isSecondaryDisabled セカンダリボタンを無効にするかどうか 申請画面で申請中はキャンセルボタンを無効にするために使用
 * @param isHiddenSecondaryButton セカンダリボタンを非表示にするかどうか
 * @param children モーダルの内容
 */
function Modal({
  isOpen,
  title,
  titleColor,
  description,
  closeModalHandler,
  primaryButton,
  secondaryButton,
  isCloseOutsideModal = false,
  secondaryLabelName,
  className,
  isSecondaryDisabled = false,
  isHiddenSecondaryButton = false,
  children,
}: ModalProps) {
  const isDescriptionElement = isValidElement(description);

  const interactOutsideHandler: DismissableLayerProps["onInteractOutside"] =
    useCallback(
      (
        e: Parameters<Required<DismissableLayerProps>["onInteractOutside"]>[0],
      ) => {
        if (isCloseOutsideModal) {
          closeModalHandler();
          return;
        }

        // モーダル外をクリックしたときの処理を無効にする
        e.preventDefault();
      },
      [closeModalHandler, isCloseOutsideModal],
    );

  const secondaryButtonElement =
    isHiddenSecondaryButton ? null : secondaryButton ? (
      secondaryButton
    ) : (
      <Button
        disabled={isSecondaryDisabled}
        onClick={closeModalHandler}
        variant={VARIANT.OUTLINED}
      >
        {secondaryLabelName ?? "キャンセル"}
      </Button>
    );

  return (
    <Dialog open={isOpen}>
      <DialogOverlay className={cn("m-0 bg-black/25")} />
      <DialogContent
        aria-describedby={undefined}
        className={cn("border-none max-w-[420px] flex flex-col", className)}
        onClose={closeModalHandler}
        onInteractOutside={interactOutsideHandler}
      >
        <DialogHeader className="flex-0">
          <DialogTitle className={titleColor ? TITLE_COLOR[titleColor] : ""}>
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription
              asChild={isDescriptionElement}
              className="text-sub-text"
            >
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
        <ul className="flex flex-0 justify-center space-x-12 sm:justify-end sm:space-x-4">
          <li>{secondaryButtonElement}</li>
          {primaryButton && <li>{primaryButton}</li>}
        </ul>
      </DialogContent>
    </Dialog>
  );
}

export default memo(Modal);
