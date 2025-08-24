import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const ScrollBar = ({ className, children }: Props) => {
  return <SimpleBar className={className}>{children}</SimpleBar>;
};
