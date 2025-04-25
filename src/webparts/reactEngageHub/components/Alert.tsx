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
  postId?: string
  handlePostDelete?: (postId: string) => Promise<void>
}

export const Alert = (props: IAlertProps) => {
  const {
    postId,
    isDialogOpen,
    setIsDialogOpen,
    handlePostDelete,
    title,
    description,
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
            {postId && (
              <Button
                appearance='primary'
                onClick={() => {
                  if (handlePostDelete) {
                    if (postId) {
                      handlePostDelete(postId)
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
