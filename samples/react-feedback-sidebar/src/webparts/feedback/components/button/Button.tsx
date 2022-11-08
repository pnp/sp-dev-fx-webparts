import * as React from "react";
import clsx from "clsx";
import { ButtonProps } from "../../utils/Types";
import { ButtonStyles } from "./Button.styles";

export const Button = ({
  children,
  type = "button",
  onClick,
  styleType,
  className,
  position = "left",
  disabled = false,
}: ButtonProps): JSX.Element => {
  const style = ButtonStyles();

  return (
    <button
      className={clsx(style.button, styleType, className || "")}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {position === "left"}
      <span className={style.buttonContent}>{children}</span>
      {position === "right"}
    </button>
  );
};
