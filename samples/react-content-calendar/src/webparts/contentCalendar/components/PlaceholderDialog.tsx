import * as React from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Field,
  Input,
  Textarea,
  Text,
} from "@fluentui/react-components"
import * as strings from "ContentCalendarWebPartStrings"

export interface IPlaceholderDialogProps {
  open: boolean
  dateLabel?: string
  onDismiss: () => void
  onSubmit: (title: string, notes?: string) => void
}

// Captures the details for a new placeholder. Controlled by the parent, which
// owns the target date and persists the result.
export const PlaceholderDialog: React.FC<IPlaceholderDialogProps> = ({
  open,
  dateLabel,
  onDismiss,
  onSubmit,
}) => {
  const [title, setTitle] = React.useState("")
  const [notes, setNotes] = React.useState("")

  // Reset the fields each time the dialog opens.
  React.useEffect(() => {
    if (open) {
      setTitle("")
      setNotes("")
    }
  }, [open])

  const canSubmit = title.trim().length > 0
  const submit = (): void => {
    if (!canSubmit) return
    onSubmit(title.trim(), notes.trim() || undefined)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(_, data) => {
        if (!data.open) onDismiss()
      }}
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{strings.PlaceholderDialogTitle}</DialogTitle>
          <DialogContent>
            {dateLabel && (
              <Text block>{`${strings.PlaceholderDialogFor} ${dateLabel}`}</Text>
            )}
            <Field label={strings.PlaceholderTitleLabel} required>
              <Input
                value={title}
                onChange={(_, data) => setTitle(data.value)}
                // Submit on Enter for a quicker reservation flow.
                onKeyDown={(e) => {
                  if (e.key === "Enter") submit()
                }}
              />
            </Field>
            <Field label={strings.PlaceholderNotesLabel}>
              <Textarea
                value={notes}
                onChange={(_, data) => setNotes(data.value)}
                resize="vertical"
              />
            </Field>
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" shape="circular" onClick={onDismiss}>
              {strings.DialogCancel}
            </Button>
            <Button
              appearance="primary"
              shape="circular"
              disabled={!canSubmit}
              onClick={submit}
            >
              {strings.DialogCreate}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}
