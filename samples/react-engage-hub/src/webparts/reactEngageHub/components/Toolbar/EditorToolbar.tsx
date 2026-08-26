import * as React from "react"
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  Overflow,
  OverflowItem,
  useOverflowMenu,
  Button,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuDivider,
  useIsOverflowItemVisible,
} from "@fluentui/react-components"
import { MoreHorizontal20Filled } from "@fluentui/react-icons"

import { toolbarItems } from "./ToolbarItems"
import { ImageUploader } from "../ImageUploader"

import { useAlertDialog } from "../../hooks/useAlertDialog"

const ToolbarOverflowMenuItem = ({
  id,
  label,
  icon,
  onClick,
  disabled,
}: any) => {
  const isVisible = useIsOverflowItemVisible(id)
  if (isVisible) return null
  return (
    <MenuItem icon={icon} onClick={onClick} disabled={disabled}>
      {label}
    </MenuItem>
  )
}

const OverflowMenu = ({ itemIds, items, editor, isDisabled }: any) => {
  const { ref, isOverflowing } = useOverflowMenu<HTMLButtonElement>()
  if (!isOverflowing) return null

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button
          ref={ref}
          icon={<MoreHorizontal20Filled />}
          aria-label='More items'
          appearance='subtle'
        />
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          {itemIds.map((group: string[], groupIndx: number) => {
            const isLast = groupIndx === itemIds.length - 1
            return (
              <React.Fragment key={group.join()}>
                {group.map((id) => {
                  const item = items.find((i: any) => i.overflowId === id)
                  if (!item) return null
                  if (item.type === "button") {
                    return (
                      <ToolbarOverflowMenuItem
                        key={id}
                        id={id}
                        label={item.label}
                        icon={item.icon}
                        onClick={() => item.handler(editor!)}
                        disabled={isDisabled}
                      />
                    )
                  }
                  // For custom controls, you may want to render a MenuItem or skip
                  return null
                })}
                {!isLast && <MenuDivider />}
              </React.Fragment>
            )
          })}
        </MenuList>
      </MenuPopover>
    </Menu>
  )
}

export const EditorToolbar = (props: any) => {
  const { editor, images, maxFileLimit, addImages } = props

  const isDisabled = !editor

  const alertDialog = useAlertDialog()

  // Assign unique overflowIds to your toolbarItems
  // Example: [{type: 'button', overflowId: 'bold', ...}, ...]
  // Group your itemIds as needed for the OverflowMenu
  const itemIds = [
    ["bold", "italic", "underline", "strikethrough"],
    ["bullet", "number", "code", "alignLeft"],
    ["alignCenter", "alignRight", "fontIncrease", "fontDecrease"],
  ]

  return (
    <Overflow padding={90}>
      <Toolbar aria-label='Editor Toolbar' size='small'>
        <ImageUploader
          imageCount={images.imageUrls.length}
          maxFileLimit={maxFileLimit}
          setAlert={alertDialog.setIsOpen}
          addImages={addImages}
        />
        <ToolbarDivider vertical />
        {toolbarItems.map((item: any) => (
          <OverflowItem key={item.overflowId} id={item.overflowId}>
            <ToolbarButton
              icon={item.icon}
              onClick={() => item.handler(editor!)}
              aria-label={item.label}
              disabled={isDisabled}
            />
          </OverflowItem>
        ))}
        <OverflowMenu
          itemIds={itemIds}
          items={toolbarItems}
          editor={editor}
          isDisabled={isDisabled}
        />
      </Toolbar>
    </Overflow>
  )
}
