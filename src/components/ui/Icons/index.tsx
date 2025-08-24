import iconCircleStop from "@assets/images/iconCircleStop.svg";
import iconExcel from "@assets/images/iconExcel.svg";
import iconPowerpoint from "@assets/images/iconPowerpoint.svg";
import iconSharePoint from "@assets/images/iconSharepoint.svg";
import iconWord from "@assets/images/iconWord.svg";
import type React from "react";

export type IconType =
  | "circleStop"
  | "excel"
  | "powerpoint"
  | "sharePoint"
  | "word";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  type: IconType;
};

const ICON_LIST: Record<
  IconType,
  {
    src: string;
    alt: string;
  }
> = {
  word: { src: iconWord, alt: "Word" },
  excel: { src: iconExcel, alt: "Excel" },
  powerpoint: { src: iconPowerpoint, alt: "PowerPoint" },
  sharePoint: { src: iconSharePoint, alt: "SharePoint" },
  circleStop: { src: iconCircleStop, alt: "CircleStop" },
};

export const Icon = ({ className = "", type, ...props }: Props) => {
  const iconType = ICON_LIST[type];
  return (
    <img
      alt={iconType.alt}
      className={`w-6 h-6 ${className}`}
      src={iconType.src}
      {...props}
    />
  );
};

/* 使用例 typeでアイコンを指定
<Icon type="word" />
<Icon type="excel" className="w-8 h-8" />
<Icon type="sharePoint" />
*/
