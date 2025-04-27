import * as React from "react"
import {
  Toolbar,
  ToolbarDivider,
  MenuTrigger,
  MenuButtonProps,
  SplitButton,
  MenuPopover,
  MenuList,
  MenuItem,
  makeStyles,
  Menu,
} from "@fluentui/react-components"
import { ImageUploader } from "./ImageUploader"
import { useAlertDialog } from "../../hooks/useAlertDialog"
import { SparkleBundle } from "../../constants/icons"
import { Alert } from "./Alert"

const useStyles = makeStyles({
  toolbar: {
    paddingRight: "0",
    paddingLeft: "0.25rem",
  },
  rewriteBtn: {
    marginLeft: "auto",
  },
})

interface IAdvancedTextAreaToolbarProps {
  images: { imageUrls: File[] }
  maxFileLimit: number
  addImages: (files: File[]) => void
  handleGrammarFix: () => void
  fluentStyles: any
  primaryActionButtonProps: any
}

export const AdvancedTextAreaToolbar = (
  props: IAdvancedTextAreaToolbarProps
) => {
  const fluentStyles = useStyles()
  const {
    images,
    maxFileLimit,
    addImages,
    handleGrammarFix,
    primaryActionButtonProps,
  } = props

  const alertDialog = useAlertDialog()

  return (
    <>
      <Toolbar aria-label='Default' className={fluentStyles.toolbar}>
        <ImageUploader
          imageCount={images.imageUrls.length}
          maxFileLimit={maxFileLimit}
          setAlert={alertDialog.setIsOpen}
          addImages={addImages}
        />
        <ToolbarDivider vertical />
        <Menu positioning='below-end'>
          <MenuTrigger disableButtonEnhancement>
            {(triggerProps: MenuButtonProps) => (
              <SplitButton
                className={fluentStyles.rewriteBtn}
                appearance='subtle'
                menuButton={triggerProps}
                primaryActionButton={primaryActionButtonProps}
                icon={<SparkleBundle />}
              >
                AI Rewrite
              </SplitButton>
            )}
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem onClick={handleGrammarFix}>Grammar fix</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </Toolbar>
      <Alert
        isDialogOpen={alertDialog.isOpen}
        setIsDialogOpen={alertDialog.setIsOpen}
        title='Image Upload Limit'
        description={`You can only upload ${maxFileLimit} images at a time.`}
      />
    </>
  )
}
