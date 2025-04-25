import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogBody,
} from "@fluentui/react-components"

import {
  DeleteRegular,
  DeleteFilled,
  bundleIcon,
  MoreVertical24Regular,
} from "@fluentui/react-icons"
import * as React from "react"
import { deletePost } from "../services/SPService"

interface IDeletePostButtonProps {
  postId: string
  itemId: number
  fetchPosts: () => void
}

const Delete = bundleIcon(DeleteFilled, DeleteRegular)

export const DeletePostButton = ({
  postId,
  itemId,
  fetchPosts,
}: IDeletePostButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const handlePostDelete = async (postId: string) => {
    await deletePost(postId, itemId)
    fetchPosts()
  }

  const DeleteConfirmation = () => {
    return (
      <Dialog
        open={isDialogOpen}
        onOpenChange={() => setIsDialogOpen(false)}
        modalType='alert'
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Delete post</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this post?
            </DialogContent>
            <DialogActions>
              <Button
                appearance='primary'
                onClick={() => {
                  handlePostDelete(postId)
                  setIsDialogOpen(false)
                }}
              >
                Delete
              </Button>
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

  return (
    <>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <MoreVertical24Regular
            style={{ marginTop: "4px", cursor: "pointer" }}
          />
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem icon={<Delete />} onClick={() => setIsDialogOpen(true)}>
              Delete
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <DeleteConfirmation />
    </>
  )
}
