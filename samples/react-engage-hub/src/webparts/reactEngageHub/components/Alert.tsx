import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
} from "@fluentui/react-components"
import * as React from "react"

interface IAlertProps {
  isDialogOpen: boolean
  setIsDialogOpen: (isOpen: boolean) => void
  title: string
  description: string
  id?: string
  handleDelete?: (postId: string) => Promise<void>
}

export const Alert = (props: IAlertProps) => {
  const {
    isDialogOpen,
    setIsDialogOpen,
    handleDelete,
    title,
    description,
    id,
  } = props

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={() => setIsDialogOpen(false)}
      modalType='alert'
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>{description}</DialogContent>
          <DialogActions>
            {id && (
              <Button
                appearance='primary'
                onClick={() => {
                  if (handleDelete) {
                    if (id) {
                      handleDelete(id)
                    }
                  }
                  setIsDialogOpen(false)
                }}
              >
                Delete
              </Button>
            )}
            <Button
              appearance='secondary'
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}
