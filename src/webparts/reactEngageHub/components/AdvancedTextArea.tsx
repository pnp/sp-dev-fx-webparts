import * as React from "react"
import {
  Button,
  Card,
  Textarea,
  makeStyles,
  Spinner,
  tokens,
  buttonClassNames,
  Link,
} from "@fluentui/react-components"
import { bundleIcon, Send20Color, Send24Regular } from "@fluentui/react-icons"
import { CollapseRelaxed } from "@fluentui/react-motion-components-preview"

import { addNewPost } from "../services/SPService"
import { ImagePreview } from "./ImagePreview"
import styles from "../ReactEngageHub.module.scss"
import { ADVANCEDTEXTAREAPLACEHOLDER } from "../../constants/posts"
import { WEBPARTCONTEXT } from "../../context/webPartContext"
import { useContext } from "react"
import { IReactEngageHubProps } from "../IReactEngageHubProps"
import { Alert } from "./Alert"
import { useAITextActions } from "../../hooks/useAITextActions"
import { useImageUpload } from "../../hooks/useImageUpload"
import { useAlertDialog } from "../../hooks/useAlertDialog"
import { usePostSubmission } from "../../hooks/usePostSubmission"
import { AdvancedTextAreaToolbar } from "./AdvancedTextAreaToolbar"
import { useCommentSubmission } from "../../hooks/useCommentSubmission"

const useStyles = makeStyles({
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
  advancedTextAreaCard: {
    padding: "1rem !important",
    flexShrink: " 0",
  },
  textAreaSpan: {
    padding: "0 0 0 0.25rem",
  },
})

export type AdvancedTextAreaType = {
  postDescription: string
}

const SendIcon = bundleIcon(Send20Color, Send24Regular)

interface IAdvancedTextAreaProps {
  exitCompactView: boolean
  setExitCompactView: React.Dispatch<React.SetStateAction<boolean>>
  mode?: string
  postId?: number
  onPostSubmit?: () => void
  fetchPosts?: () => Promise<void>
}

export const AdvancedTextArea = (props: IAdvancedTextAreaProps) => {
  const [text, setText] = React.useState<string>("")

  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const [selectedText, setSelectedText] = React.useState("")

  const {
    exitCompactView,
    setExitCompactView,
    onPostSubmit,
    mode,
    postId,
    fetchPosts,
  } = props

  const { context, apiKey, apiEndpoint, deploymentName, maxFileLimit } =
    useContext<IReactEngageHubProps>(WEBPARTCONTEXT)

  const { handleRewrite, handleGrammarFix } = useAITextActions({
    apiKey,
    apiEndpoint,
    deploymentName,
    text,
    setText,
    inputRef,
    selectedText,
  })

  const { images, addImages, clearImages, removeImage } = useImageUpload()

  const alertDialog = useAlertDialog()

  const { submitPost, loadingState } = usePostSubmission({
    addNewPost,
    onPostSubmit,
    clearImages,
    setText,
    setExitCompactView,
    context,
  })

  const { submitComment, commentLoadingState } = useCommentSubmission({
    comment: text,
    postId: postId ?? 0,
    fetchPosts: fetchPosts ?? (async () => {}),
  })
  const fluentStyles = useStyles()

  const handleSelection = () => {
    const textarea = inputRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const value = textarea.value

    if (start !== end) {
      setSelectedText(value.substring(start, end))
    } else {
      setSelectedText("")
    }
  }

  const primaryActionButtonProps = {
    onClick: handleRewrite,
  }

  const buttonIcon =
    loadingState === "loading" ? <Spinner size='tiny' /> : <SendIcon />

  const buttonClassName =
    loadingState === "initial" || loadingState === "loaded"
      ? fluentStyles.postBtn
      : fluentStyles.buttonNonInteractive

  const postButtonLabel = loadingState === "loading" ? "Posting..." : "Post"

  if (mode === "Comment") {
    return (
      <CollapseRelaxed visible={exitCompactView === false}>
        {!exitCompactView ? (
          <Card className={fluentStyles.advancedTextAreaCard}>
            <Textarea
              ref={inputRef}
              className={fluentStyles.textArea}
              textarea={{ className: fluentStyles.textAreaSpan }}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Write a comment...'
              onSelect={handleSelection}
              onKeyUp={handleSelection}
              onMouseUp={handleSelection}
            />
            <div className={fluentStyles.actionBtnWrapper}>
              <Button
                icon={
                  loadingState === "loading" ? (
                    <Spinner size='tiny' />
                  ) : (
                    <SendIcon />
                  )
                }
                appearance='primary'
                onClick={async () => {
                  await submitComment()
                  setExitCompactView(!exitCompactView)
                }}
                disabled={!text}
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
      <CollapseRelaxed visible={exitCompactView === false ? true : false}>
        {!exitCompactView ? (
          <Card className={fluentStyles.advancedTextAreaCard}>
            <AdvancedTextAreaToolbar
              images={images}
              maxFileLimit={maxFileLimit}
              addImages={addImages}
              handleGrammarFix={handleGrammarFix}
              fluentStyles={fluentStyles}
              primaryActionButtonProps={primaryActionButtonProps}
            />
            {images.previewUrls.length > 0 && (
              <div className={styles.previewImageWrapper}>
                {images.previewUrls.map((url, index) => (
                  <ImagePreview
                    preview={url}
                    index={index}
                    handleRemoveImageFromPreview={() => removeImage(index)}
                  />
                ))}
              </div>
            )}
            <Textarea
              ref={inputRef}
              className={fluentStyles.textArea}
              textarea={{ className: fluentStyles.textAreaSpan }}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={ADVANCEDTEXTAREAPLACEHOLDER}
              onSelect={handleSelection}
              onKeyUp={handleSelection}
              onMouseUp={handleSelection}
            />
            <div className={fluentStyles.actionBtnWrapper}>
              <Link
                className={fluentStyles.collapseBtn}
                onClick={() => setExitCompactView(!exitCompactView)}
              >
                Collapse
              </Link>
              <Button
                icon={buttonIcon}
                appearance='primary'
                onClick={() => submitPost(text, images.imageUrls)}
                disabled={!text}
                disabledFocusable={loadingState === "loading" ? true : false}
                className={buttonClassName}
              >
                {postButtonLabel}
              </Button>
            </div>
          </Card>
        ) : (
          <div></div>
        )}
      </CollapseRelaxed>
      <Alert
        isDialogOpen={alertDialog.isOpen}
        setIsDialogOpen={alertDialog.setIsOpen}
        title='Image Upload Limit'
        description={`You can only upload ${maxFileLimit} images at a time.`}
      />
    </>
  )
}
