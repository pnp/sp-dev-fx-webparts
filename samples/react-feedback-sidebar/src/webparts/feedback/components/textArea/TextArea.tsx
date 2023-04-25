import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { TextAreaStyle } from "./TextArea.styles";
import clsx from "clsx";
import { TextareaProps } from "../../utils/Types";

export const TextArea = ({
  className,
  onChange: onChangeProp,
  value: valueProp,
  placeholder,
}: TextareaProps): JSX.Element => {
  const style = TextAreaStyle();

  const [value, setValue] = useState(valueProp);

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  const onChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(
    (event) => {
      onChangeProp(event);
      setValue(event.target.value);
    },
    [onChangeProp]
  );
  return (
    <textarea
      className={clsx(style.textarea, className)}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    ></textarea>
  );
};
