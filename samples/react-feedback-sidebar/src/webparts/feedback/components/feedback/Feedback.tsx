import * as React from "react";
import { useState } from "react";
import { FeedbackProps } from "../../utils/Types";
import { FeedbackButton } from "../feedbackButton/FeedbackButton";
import { FeedbackWrapper } from "../feedbackWrapper/FeedbackWrapper";

const Feedback = ({ data }: FeedbackProps): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const onOpen = React.useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    setShow(true);
    setOpen(true);
  }, []);

  const onClose = React.useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    setShow(false);
    setOpen(false);
  }, []);
  return (
    <>
      <FeedbackButton onClick={onOpen} />
      {open && <FeedbackWrapper open={show} data={data} onClose={onClose} />}
    </>
  );
};

export default Feedback;
