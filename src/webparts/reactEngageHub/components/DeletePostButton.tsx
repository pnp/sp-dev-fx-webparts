import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components"

import {
  DeleteRegular,
  DeleteFilled,
  bundleIcon,
  MoreVertical24Regular,
} from "@fluentui/react-icons"
import * as React from "react"
import { deletePost } from "../services/SPService"
import { Alert } from "./Alert"

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
      <Alert
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        title='Delete post'
        description='Are you sure you want to delete this post?'
        handlePostDelete={handlePostDelete}
        postId={postId}
      />
    </>
  )
}
