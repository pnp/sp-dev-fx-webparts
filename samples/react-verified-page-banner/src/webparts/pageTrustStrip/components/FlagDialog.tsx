import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Field,
  MessageBar,
  MessageBarBody,
  Textarea,
  useId
} from "@fluentui/react-components";
import { productName } from "../logic/productName";
import { noteMaxLength } from "../schema";

export interface IFlagDialogProps {
  open: boolean;
  busy: boolean;
  error?: string;
  note: string;
  onNoteChange: (note: string) => void;
  onDismiss: () => void;
  onSubmit: () => void;
}

export function FlagDialog(props: IFlagDialogProps): React.ReactElement {
  const descriptionId = useId("flag-description");
  const onOpenChange = (_event: unknown, data: { open: boolean }): void => {
    if (!data.open && !props.busy) {
      props.onDismiss();
    }
  };

  return (
    <Dialog open={props.open} onOpenChange={onOpenChange} modalType="modal">
      <DialogSurface aria-describedby={descriptionId}>
        <DialogBody>
          <DialogTitle>This looks out of date</DialogTitle>
          <DialogContent>
            <p id={descriptionId}>
              Send a review request for this page. A note is optional. {productName} adds the request to the
              Page Review Requests list and does not send email.
            </p>
            {props.error && (
              <MessageBar intent="error">
                <MessageBarBody>{props.error}</MessageBarBody>
              </MessageBar>
            )}
            <Field label="Note" hint={`Optional. ${props.note.length} of ${noteMaxLength} characters.`}>
              <Textarea
                value={props.note}
                maxLength={noteMaxLength}
                resize="vertical"
                aria-label="Note"
                onChange={(_event, data) => {
                  props.onNoteChange(data.value);
                }}
              />
            </Field>
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={props.onDismiss} disabled={props.busy}>
              Cancel
            </Button>
            <Button appearance="primary" onClick={props.onSubmit} disabled={props.busy}>
              {props.busy ? "Submitting" : "Submit request"}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
