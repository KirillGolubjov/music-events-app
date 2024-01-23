import { CSSProperties, ReactNode } from "react";

interface Props {
  onClick: () => void;
  type: string;
  children: ReactNode;
  style?: CSSProperties;
}

export const Button = ({ onClick, type, children, style }: Props): JSX.Element => {
  return (
    <button style={style} onClick={onClick} className={type}>
      {children}
    </button>
  );
};
