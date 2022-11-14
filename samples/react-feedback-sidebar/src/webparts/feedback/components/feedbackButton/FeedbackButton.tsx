import * as React from "react";
import * as strings from "FeedbackWebPartStrings";
import { FeedbackButtonProps } from "../../utils/Types";
import { FeedbackButtonStyles } from "./FeedbackButton.styles";
import { Button } from "../button/Button";

export const FeedbackButton = ({
  onClick,
}: FeedbackButtonProps): JSX.Element => {
  const style = FeedbackButtonStyles();

  return (
    <Button
      className={style.feedbackButton}
      position="right"
      styleType="secondary"
      onClick={onClick}
    >
      {strings.ButtonLabel}
    </Button>
  );
};
