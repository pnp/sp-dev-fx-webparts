import * as React from "react";
import { useState, useCallback, useMemo } from "react";
import clsx from "clsx";
import { EState, FeedbackFormProps } from "../../utils/Types";
import { FeedbackFormStyles } from "./FeedbackForm.style";
import FeedbackWebPart from "../../FeedbackWebPart";
import { Button } from "../button/Button";
import * as strings from "FeedbackWebPartStrings";
import { Loader } from "../loader/Loader";
import { Image, ImageEnum } from "../image/Image";
import { sendFeedback } from "../../utils/ApiHelper";
import { Rate } from "../rate/Rate";
import { TextArea } from "../textArea/TextArea";

export const FeedbackForm = ({
  sectionTitle: componentName,
  title,
  template = "section",
}: FeedbackFormProps): JSX.Element => {
  const style = FeedbackFormStyles();

  const [value, setValue] = useState<string>("");
  const [rate, setRate] = useState<string>("0");
  const [state, setState] = useState<keyof typeof EState>("initial");

  const onClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    setState("initial");
    setValue("");
    setRate("0");
  }, []);

  const onSubmit = useCallback(
    async (event) => {
      setState("loading");
      sendFeedback({
        section: componentName,
        rating: Number(rate),
        comment: value as string,
        upn: FeedbackWebPart.user,
      })
        .then((result) => {
          setState("success");
        })
        .catch((error) => {
          console.error(error);
          setState("failure");
        });
    },
    [componentName, value, rate, name, title]
  );

  const onChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(
    (event) => {
      setValue(event.target.value);
    },
    []
  );

  const onRate = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setRate(event.target.value);
    },
    []
  );

  const Component = useMemo<JSX.Element | null>(() => {
    switch (state) {
      case "initial": {
        return (
          <>
            <div className={style.feedbackSectionRow}>
              <p className={style.feedbackSectionTitle}>{title}</p>
            </div>
            <div className={style.feedbackSectionRow}>
              <TextArea
                className={style.feedbackSectionTextarea}
                onChange={onChange}
                value=""
                placeholder={strings.PlaceholderTextarea}
              />
            </div>
            <div className={style.feedbackSectionRow}>
              <Rate
                className={style.feedbackSectionRate}
                onRate={onRate}
                rateLenght={5}
                rate={0}
                name={componentName}
              />
            </div>
            <div className={clsx(style.feedbackSectionRow, "feedbackButton")}>
              <Button
                className={style.feedbackSectionButton}
                styleType={
                  !(value.length || rate !== "0") ? "disabled" : "secondary"
                }
                onClick={onSubmit}
                disabled={!(value.length || rate !== "0")}
              >
                {strings.Send}
              </Button>
            </div>
          </>
        );
      }
      case "loading": {
        return (
          <>
            <div className={clsx(style.feedbackSectionRow, "feedbackLoader")}>
              <Loader />
            </div>
          </>
        );
      }
      case "success": {
        return (
          <>
            <div className={clsx(style.feedbackSectionRow, "feedbackSent")}>
              <Image imageId={ImageEnum.success} />
            </div>
            <div className={clsx(style.feedbackSectionRow, "feedbackSent")}>
              <p className={style.feedbackTitle}>{strings.FeedbackSent}</p>
            </div>
            <div className={clsx(style.feedbackSectionRow, "feedbackButton")}>
              <Button
                className={style.feedbackSectionButton}
                styleType="secondary"
                onClick={onClick}
              >
                {strings.NewFeedback}
              </Button>
            </div>
          </>
        );
      }
      case "failure": {
        return (
          <>
            <div className={clsx(style.feedbackSectionRow, "feedbackSent")}>
              <Image imageId={ImageEnum.error} />
            </div>
            <div className={clsx(style.feedbackSectionRow, "feedbackSent")}>
              <p className={style.feedbackTitle}>{strings.Error}</p>
            </div>
            <div className={clsx(style.feedbackSectionRow, "feedbackButton")}>
              <Button
                className={style.feedbackSectionButton}
                styleType="secondary"
                onClick={onClick}
              >
                {strings.TryAgain}
              </Button>
            </div>
          </>
        );
      }
      default: {
        return null;
      }
    }
  }, [state, onChange, onRate, onClick, name, title, onSubmit]);

  return (
    <div className={clsx(style.feedbackSection, template)}>{Component}</div>
  );
};
