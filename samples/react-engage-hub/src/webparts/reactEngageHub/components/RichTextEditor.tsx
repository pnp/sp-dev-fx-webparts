import * as React from "react"
import { useState } from "react"
import {
  Button,
  buttonClassNames,
  Card,
  Link,
  makeStyles,
  Spinner,
  tokens,
  Menu,
  MenuButtonProps,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton,
} from "@fluentui/react-components"
import { CollapseRelaxed } from "@fluentui/react-motion-components-preview"
import { ImagePreview } from "./ImagePreview"
import { EditorToolbar } from "./Toolbar/EditorToolbar"

import { usePostSubmission } from "../hooks/usePostSubmission"
import { useImageUpload } from "../hooks/useImageUpload"
import { useRoosterEditor } from "../hooks/useRoosterEditor"
import { useAITextActions } from "../hooks/useAITextActions"

import { addNewPost } from "../services/SPService"
import { WEBPARTCONTEXT } from "../context/webPartContext"

import { SendIcon, SparkleBundle } from "../constants/icons"

import { IReactEngageHubProps } from "../IReactEngageHubProps"
import styles from "../ReactEngageHub.module.scss"

const useStyles = makeStyles({
  textEditor: {
    minHeight: "200px",
    overflow: "hidden scroll",
    caretColor: tokens.colorBrandBackground,
    color: "white",
    outline: "none",
  },
  wrapper: {
    padding: "1rem !important",
    flexShrink: " 0",
  },
  postBtn: {
    width: "fit-content",
    alignSelf: "flex-end",
  },

  buttonNonInteractive: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    color: tokens.colorNeutralForeground1,
    cursor: "default",
    pointerEvents: "none",

    [`& .${buttonClassNames.icon}`]: {
      color: tokens.colorStatusSuccessForeground1,
    },
    width: "fit-content",
    alignSelf: "flex-end",
  },
  collapseBtn: {
    width: "fit-content",
    marginLeft: "0.25rem",
  },
  actionBtnWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
})

interface IRichTextEditorProps {
  isCompactView: boolean
  setIsCompactView: React.Dispatch<React.SetStateAction<boolean>>
  mode?: string
  postId?: number
  onPostSubmit?: () => void
  fetchPosts?: () => Promise<void>
}

export const RichTextEditor = (props: IRichTextEditorProps) => {
  const [content, setContent] = useState<any>(null)

  const { isCompactView, setIsCompactView, onPostSubmit } = props

  const fluentStyles = useStyles()

  const {
    isDarkTheme,
    context,
    maxFileLimit,
    apiKey,
    apiEndpoint,
    deploymentName,
  } = React.useContext<IReactEngageHubProps>(WEBPARTCONTEXT)

  const { images, addImages, clearImages, removeImage } = useImageUpload()

  const { submitPost, loadingState } = usePostSubmission({
    addNewPost,
    onPostSubmit,
    clearImages,
    setContent,
    setIsCompactView,
    context,
  })

  const handleLink = (anchor: HTMLAnchorElement, mouseEvent: MouseEvent) => {
    window.open(anchor.href, "_blank")
  }

  const { editor, editorDivRef } = useRoosterEditor({
    isDarkTheme,
    setContent,
    handleLink,
  })

  const buttonIcon =
    loadingState === "loading" ? <Spinner size='tiny' /> : <SendIcon />

  const buttonClassName =
    loadingState === "initial" || loadingState === "loaded"
      ? fluentStyles.postBtn
      : fluentStyles.buttonNonInteractive

  const postButtonLabel = loadingState === "loading" ? "Posting..." : "Post"

  const { handleRewrite, handleGrammarFix } = useAITextActions({
    apiKey,
    apiEndpoint,
    deploymentName,
    content,
    setContent,
  })

  const primaryActionButtonProps = {
    onClick: handleRewrite,
  }

  return (
    <>
      <CollapseRelaxed visible={isCompactView === false ? true : false}>
        <Card
          className={fluentStyles.wrapper}
          style={{ display: isCompactView ? "none" : "block" }}
        >
          {editor && (
            <EditorToolbar
              editor={editor}
              images={images}
              maxFileLimit={maxFileLimit}
              addImages={addImages}
            />
          )}
          {images.previewUrls.length > 0 && (
            <div className={styles.previewImageWrapper}>
              {images.previewUrls.map((url, index) => (
                <ImagePreview
                  key={url + index}
                  preview={url}
                  index={index}
                  handleRemoveImageFromPreview={() => removeImage(index)}
                />
              ))}
            </div>
          )}
          <div
            ref={editorDivRef}
            className={fluentStyles.textEditor}
            contentEditable
          />
          <div className={fluentStyles.actionBtnWrapper}>
            <Menu positioning='below-end'>
              <MenuTrigger disableButtonEnhancement>
                {(triggerProps: MenuButtonProps) => (
                  <SplitButton
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
            <Link
              className={fluentStyles.collapseBtn}
              onClick={() => setIsCompactView(!isCompactView)}
            >
              Collapse
            </Link>
            <Button
              icon={buttonIcon}
              appearance='primary'
              onClick={() => submitPost(content, images.imageUrls)}
              disabled={content === null}
              disabledFocusable={loadingState === "loading" ? true : false}
              className={buttonClassName}
            >
              {postButtonLabel}
            </Button>
          </div>
        </Card>
      </CollapseRelaxed>
    </>
  )
}
