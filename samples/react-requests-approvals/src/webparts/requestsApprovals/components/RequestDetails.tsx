import * as React from "react";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Field,
  Text,
  Textarea,
  makeStyles
} from "@fluentui/react-components";

import type { IRequestItem } from "../models/IRequestItem";
import type { IRequestDetailsProps } from "./IRequestsApprovalsProps";

const useStyles = makeStyles({
  card: { display: "grid", gap: "16px" },
  heading: { margin: 0 },
  fields: {
    display: "grid",
    gap: "10px",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    margin: 0
  },
  field: { display: "grid", gap: "2px" },
  description: { whiteSpace: "pre-wrap", margin: 0 },
  actions: { display: "flex", gap: "8px", flexWrap: "wrap" }
});

function personName(person: IRequestItem["requester"]): string {
  return person?.title || person?.email || "Not provided";
}

function formatDate(value: string | undefined): string {
  if (!value) {
    return "Not provided";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

export const RequestDetails: React.FC<IRequestDetailsProps> = ({
  request,
  isSaving,
  onApprove,
  onReject
}) => {
  const styles = useStyles();
  const [isRejectDialogOpen, setIsRejectDialogOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [validationError, setValidationError] = React.useState<string | undefined>(undefined);
  const commentRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (isRejectDialogOpen) {
      commentRef.current?.focus();
    }
  }, [isRejectDialogOpen]);

  React.useEffect(() => {
    setIsRejectDialogOpen(false);
    setComment("");
    setValidationError(undefined);
  }, [request?.id]);

  if (!request) {
    return (
      <Card>
        <Text>Select a pending request to view its details.</Text>
      </Card>
    );
  }

  const requestLabel = request.title || `Request ${request.id}`;

  const approve = async (): Promise<void> => {
    try {
      await onApprove();
    } catch {
      // The parent owns the live error announcement; keep the component mounted.
    }
  };

  const reject = async (): Promise<void> => {
    if (!comment.trim()) {
      setValidationError("A rejection comment is required.");
      return;
    }

    setValidationError(undefined);
    try {
      await onReject(comment.trim());
      setComment("");
      setIsRejectDialogOpen(false);
    } catch {
      // Keep the dialog open so the user can retry after the parent announces the error.
    }
  };

  return (
    <Card className={styles.card} aria-label={`Details for ${requestLabel}`}>
      <Text as="h2" weight="semibold" className={styles.heading}>
        {requestLabel}
      </Text>

      <dl className={styles.fields}>
        <div className={styles.field}>
          <Text weight="semibold">Requester</Text>
          <Text>{personName(request.requester)}</Text>
        </div>
        <div className={styles.field}>
          <Text weight="semibold">Submitted</Text>
          <Text>{formatDate(request.submitted)}</Text>
        </div>
        {request.requestType && (
          <div className={styles.field}>
            <Text weight="semibold">Request type</Text>
            <Text>{request.requestType}</Text>
          </div>
        )}
        {request.amount !== undefined && (
          <div className={styles.field}>
            <Text weight="semibold">Amount</Text>
            <Text>{request.amount.toLocaleString()}</Text>
          </div>
        )}
      </dl>

      {request.description && <Text className={styles.description}>{request.description}</Text>}

      <div className={styles.actions} aria-label="Decision actions">
        <Button
          appearance="primary"
          onClick={() => {
            approve().catch(() => undefined);
          }}
          disabled={isSaving}
          aria-label={`Approve ${requestLabel}`}
        >
          Approve
        </Button>
        <Button
          onClick={() => {
            setValidationError(undefined);
            setIsRejectDialogOpen(true);
          }}
          disabled={isSaving}
          aria-label={`Reject ${requestLabel}`}
        >
          Reject
        </Button>
      </div>

      <Dialog
        open={isRejectDialogOpen}
        onOpenChange={(_, data) => {
          if (!data.open && !isSaving) {
            setIsRejectDialogOpen(false);
          }
        }}
      >
        <DialogSurface aria-describedby={`reject-description-${request.id}`}>
          <DialogBody>
            <DialogTitle>Reject {requestLabel}</DialogTitle>
            <DialogContent>
              <Text id={`reject-description-${request.id}`}>
                Add a comment explaining why this request is being rejected.
              </Text>
              <Field
                label="Rejection comment"
                validationMessage={validationError || undefined}
                validationState={validationError ? "error" : "none"}
              >
                <Textarea
                  ref={commentRef}
                  value={comment}
                  onChange={event => setComment(event.target.value)}
                  autoFocus
                  disabled={isSaving}
                  aria-label="Rejection comment"
                />
              </Field>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setIsRejectDialogOpen(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                appearance="primary"
                onClick={() => {
                  reject().catch(() => undefined);
                }}
                disabled={isSaving}
              >
                Reject request
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </Card>
  );
};

export default RequestDetails;
