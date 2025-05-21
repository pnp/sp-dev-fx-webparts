import * as React from "react"
import { useEffect, useState } from "react"
import {
  Button,
  buttonClassNames,
  Card,
  makeStyles,
  Spinner,
  tokens,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Textarea,
} from "@fluentui/react-components"
import {
  CollapseRelaxed,
  Fade,
} from "@fluentui/react-motion-components-preview"
import { ImagePreview } from "./ImagePreview"
import { EditorToolbar } from "./Toolbar/EditorToolbar"

import { usePostSubmission } from "../hooks/usePostSubmission"
import { useImageUpload } from "../hooks/useImageUpload"
import { useRoosterEditor } from "../hooks/useRoosterEditor"
import { useAITextActions } from "../hooks/useAITextActions"
import { useCommentSubmission } from "../hooks/useCommentSubmission"

import { addNewPost } from "../services/SPService"
import { WEBPARTCONTEXT } from "../context/webPartContext"

import {
  SendIcon,
  SparkleBundle,
  ChevronCircleUpIcon,
} from "../constants/icons"
import { AI_OPTIONS } from "../constants/ai"

import { IReactEngageHubProps } from "../IReactEngageHubProps"
import styles from "../ReactEngageHub.module.scss"

const useStyles = makeStyles({
  textEditor: {
    minHeight: "140px",
    overflow: "hidden scroll",
    caretColor: tokens.colorBrandBackground,
    color: "white",
    outline: "none",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    padding: "0.5rem",
  },
  wrapper: {
    padding: "1rem !important",
    flexShrink: " 0",
    overflow: "unset",
    position: "relative",
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
  actionBtnWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  collapseBtn: {
    position: "absolute",
    bottom: "-16px",
    left: "50%",
    transition: "opacity 0.2s",
    zIndex: 2,
  },
  textAreaSpan: {
    padding: "0 0 0 0.25rem",
  },
  textArea: {
    width: "inherit",
    height: "120px",
    border: "none",
    "&::after": {
      borderBottom: "none",
    },
    ":hover": {
      border: "none",
      outline: "none",
    },
    ":focus": {
      border: "none",
      outline: "none",
    },
    ":focus-within": {
      border: "none",
      outline: "none",
    },
    ":active": {
      border: "none",
      outline: "none",
    },
    "&:focus-visible": {
      outline: "none",
    },
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
  const [isHovered, setIsHovered] = useState(false)

  const {
    isCompactView,
    setIsCompactView,
    onPostSubmit,
    mode,
    postId,
    fetchPosts,
  } = props

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

  const handleLink = (anchor: HTMLAnchorElement, mouseEvent: MouseEvent) => {
    window.open(anchor.href, "_blank")
  }

  const { editor, editorDivRef } = useRoosterEditor({
    isDarkTheme,
    setContent,
    handleLink,
  })

  const { submitPost, loadingState } = usePostSubmission({
    addNewPost,
    onPostSubmit,
    clearImages,
    setContent,
    setIsCompactView,
    context,
    editorDivRef,
  })

  const { handleAIAction, isLoading } = useAITextActions({
    apiKey,
    apiEndpoint,
    deploymentName,
    content,
    setContent,
    editorDivRef,
  })

  const { submitComment, commentLoadingState } = useCommentSubmission({
    comment: content,
    postId: postId ?? 0,
    fetchPosts: fetchPosts ?? (async () => {}),
  })

  useEffect(() => {
    if (editorDivRef.current) {
      editorDivRef.current.style.background = tokens.colorNeutralBackground1
      editorDivRef.current.style.color = tokens.colorNeutralForeground1
    }
  }, [isDarkTheme])

  const buttonIcon =
    loadingState === "loading" ? <Spinner size='tiny' /> : <SendIcon />

  const buttonClassName =
    loadingState === "initial" || loadingState === "loaded"
      ? fluentStyles.postBtn
      : fluentStyles.buttonNonInteractive

  const postButtonLabel = loadingState === "loading" ? "Posting..." : "Post"

  if (mode === "Comment") {
    return (
      <CollapseRelaxed visible={isCompactView === false}>
        {!isCompactView ? (
          <Card
            className={fluentStyles.wrapper}
            style={{
              display: isCompactView ? "none" : "block",
              pointerEvents: isLoading ? "none" : "auto",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Textarea
              className={fluentStyles.textArea}
              textarea={{ className: fluentStyles.textAreaSpan }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder='Write a comment...'
            />
            <div className={fluentStyles.actionBtnWrapper}>
              <Button
                icon={
                  commentLoadingState === "loading" ? (
                    <Spinner size='tiny' />
                  ) : (
                    <SendIcon />
                  )
                }
                appearance='primary'
                onClick={async () => {
                  await submitComment()
                  setIsCompactView(!isCompactView)
                }}
                disabled={!content}
                disabledFocusable={commentLoadingState === "loading"}
                className={buttonClassName}
              >
                {commentLoadingState === "loading" ? "Posting..." : "Post"}
              </Button>
            </div>
          </Card>
        ) : (
          <div></div>
        )}
      </CollapseRelaxed>
    )
  }

  return (
    <>
      <CollapseRelaxed visible={isCompactView === false ? true : false}>
        <Card
          className={fluentStyles.wrapper}
          style={{
            display: isCompactView ? "none" : "block",
            pointerEvents: isLoading ? "none" : "auto",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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
            className={
              isLoading
                ? `${fluentStyles.textEditor} ${styles.textEditorLoading}`
                : fluentStyles.textEditor
            }
            contentEditable={!isLoading}
            aria-disabled={isLoading}
            suppressContentEditableWarning
          />
          <div className={fluentStyles.actionBtnWrapper}>
            <Menu positioning='below-end'>
              <MenuTrigger disableButtonEnhancement>
                <Button appearance='subtle' icon={<SparkleBundle />}>
                  AI Rewrite
                </Button>
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  {AI_OPTIONS.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        onClick={() => {
                          handleAIAction(item)
                        }}
                      >
                        {item}
                      </MenuItem>
                    )
                  })}
                </MenuList>
              </MenuPopover>
            </Menu>
            <Fade visible={!isCompactView && isHovered}>
              <Button
                onClick={() => setIsCompactView(!isCompactView)}
                icon={<ChevronCircleUpIcon />}
                shape='circular'
                className={fluentStyles.collapseBtn}
              />
            </Fade>
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
