import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components"

import { MoreVertical24Regular } from "@fluentui/react-icons"
import * as React from "react"
import { Alert } from "./Alert"
import { DeleteIcon } from "../../constants/icons"
import { useState } from "react"

interface IMoreOptionsProps {
  id: string
  dialogTitle: string
  dialogDescription: string
  onClickDelete: () => Promise<void>
}

export const MoreOptions = (props: IMoreOptionsProps) => {
  const { id, dialogTitle, dialogDescription, onClickDelete } = props
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
            <MenuItem
              icon={<DeleteIcon />}
              onClick={() => setIsDialogOpen(true)}
            >
              Delete
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Alert
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        title={dialogTitle}
        description={dialogDescription}
        id={id}
        handleDelete={onClickDelete}
      />
    </>
  )
}
