import * as React from "react"
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Field,
  Input,
  MessageBar,
  MessageBarBody,
  Spinner,
} from "@fluentui/react-components"
import * as strings from "ContentCalendarWebPartStrings"

export interface ICreatePageOptions {
  disableComments: boolean
}

export interface ICreatePageDialogProps {
  open: boolean
  onDismiss: () => void
  // Creates the page; resolves on success (parent then closes + opens it),
  // rejects with a message shown in the dialog.
  onCreate: (title: string, options: ICreatePageOptions) => Promise<void>
}

// Asks for a page title (and whether to disable comments), then delegates
// creation to the parent. Manages its own busy/error state, showing the busy
// state inside the Create button.
export const CreatePageDialog: React.FC<ICreatePageDialogProps> = ({
  open,
  onDismiss,
  onCreate,
}) => {
  const [title, setTitle] = React.useState("")
  const [disableComments, setDisableComments] = React.useState(false)
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | undefined>(undefined)

  React.useEffect(() => {
    if (open) {
      setTitle("")
      setDisableComments(false)
      setBusy(false)
      setError(undefined)
    }
  }, [open])

  const canSubmit = title.trim().length > 0 && !busy

  const create = (): void => {
    if (!canSubmit) return
    setBusy(true)
    setError(undefined)
    // On success the parent closes this dialog and opens the page; only the
    // failure path is handled here.
    onCreate(title.trim(), { disableComments }).catch((e: Error) => {
      setError(e.message)
      setBusy(false)
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(_, data) => {
        if (!data.open && !busy) onDismiss()
      }}
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{strings.CreatePageDialogTitle}</DialogTitle>
          <DialogContent>
            <Field label={strings.PageTitleLabel} required>
              <Input
                value={title}
                disabled={busy}
                onChange={(_, data) => setTitle(data.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") create()
                }}
              />
            </Field>
            <Checkbox
              checked={disableComments}
              disabled={busy}
              onChange={(_, data) => setDisableComments(data.checked === true)}
              label={strings.DisableCommentsLabel}
            />
            {error && (
              <MessageBar intent="error">
                <MessageBarBody>{error}</MessageBarBody>
              </MessageBar>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              appearance="secondary"
              shape="circular"
              disabled={busy}
              onClick={onDismiss}
            >
              {strings.DialogCancel}
            </Button>
            <Button
              appearance="primary"
              shape="circular"
              disabled={!canSubmit}
              icon={busy ? <Spinner size="tiny" /> : undefined}
              onClick={create}
            >
              {busy ? strings.CreatePageBusy : strings.DialogCreate}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}
