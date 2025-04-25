import * as React from "react"
import {
  Button,
  Card,
  Textarea,
  ToolbarButton,
  ToolbarDivider,
  makeStyles,
  Toolbar,
  Menu,
  MenuButtonProps,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton,
  Spinner,
  tokens,
  buttonClassNames,
  Link,
} from "@fluentui/react-components"
import {
  bundleIcon,
  Image24Regular,
  PenSparkle20Filled,
  PenSparkle20Regular,
  Send20Color,
  Send24Regular,
} from "@fluentui/react-icons"
import { AzureOpenAI } from "openai"
import { CollapseRelaxed } from "@fluentui/react-motion-components-preview"

import { addNewPost } from "../services/SPService"
import { ImagePreview } from "./ImagePreview"
import styles from "../ReactEngageHub.module.scss"
import { grammarFix, reWritePostContents } from "../services/AOAIService"
import { ADVANCEDTEXTAREAPLACEHOLDER } from "../../constants/constants"
import { AdvancedTextAreaCompact } from "./AdvancedTextAreaCompact"
import { WEBPARTCONTEXT } from "../../context/webPartContext"
import { useContext } from "react"
import { IReactEngageHubProps } from "../IReactEngageHubProps"
import { Alert } from "./Alert"

const SparkleBundle = bundleIcon(PenSparkle20Filled, PenSparkle20Regular)

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
  rewriteBtn: {
    marginLeft: "auto",
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
  toolbar: {
    paddingRight: "0",
    paddingLeft: "0.25rem",
  },
  textAreaSpan: {
    padding: "0 0 0 0.25rem",
  },
})

export type AdvancedTextAreaType = {
  postDescription: string
  imageUrls: File[]
  previewUrls: string[]
}

const SendIcon = bundleIcon(Send20Color, Send24Regular)

type LoadingState = "initial" | "loading" | "loaded"

export const AdvancedTextArea = ({ onPostSubmitted }: any) => {
  const [post, setPost] = React.useState<AdvancedTextAreaType>({
    postDescription: "",
    imageUrls: [],
    previewUrls: [],
  })
  const [loadingState, setLoadingState] =
    React.useState<LoadingState>("initial")

  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const [selectedText, setSelectedText] = React.useState("")
  const [exitCompactView, setExitCompactView] = React.useState(true)
  const [alert, setAlert] = React.useState(false)

  const { context, apiKey, apiEndpoint, deploymentName, maxFileLimit } =
    useContext<IReactEngageHubProps>(WEBPARTCONTEXT)

  const fluentStyles = useStyles()

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files

  if (files && files.length > 0) {
    const remainingSlots = maxFileLimit - post.imageUrls.length
    if (remainingSlots <= 0) {
      setAlert(true)
      return
    }
    // Only take as many files as will fit
    const fileArray = Array.from(files).slice(0, remainingSlots)
    const newPreviewUrls = fileArray.map((file) => URL.createObjectURL(file))

    setPost({
      ...post,
      imageUrls: [...post.imageUrls, ...fileArray],
      previewUrls: [...post.previewUrls, ...newPreviewUrls],
    })

    if (files.length > remainingSlots) {
      setAlert(true)
      return
    }
  }
}

  const handlePostSubmit = async () => {
    setLoadingState("loading")
    // Call addNewPost with the updated post inside the state update
    await addNewPost(post, context.pageContext)

    setPost({ postDescription: "", imageUrls: [], previewUrls: [] })
    if (onPostSubmitted) {
      onPostSubmitted()
    }
    setLoadingState("loaded")
  }

  const removeImageFromPreview = (index: number) => {
    setPost((prevPost) => {
      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(prevPost.previewUrls[index])

      // Remove the file and its preview URL
      const newImageUrls = [...prevPost.imageUrls]
      const newPreviewUrls = [...prevPost.previewUrls]
      newImageUrls.splice(index, 1)
      newPreviewUrls.splice(index, 1)

      return {
        ...prevPost,
        imageUrls: newImageUrls,
        previewUrls: newPreviewUrls,
      }
    })
  }

  // Clean up URLs when component unmounts
  React.useEffect(() => {
    return () => {
      post.previewUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

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

  const onClick = async () => {
    const key = apiKey
    const endpoint = apiEndpoint
    const apiVersion = "2024-10-21"
    const deployment = deploymentName

    const client = new AzureOpenAI({
      apiKey: key,
      endpoint,
      apiVersion,
      deployment,
      dangerouslyAllowBrowser: true,
    })

    if (selectedText.length === 0) {
      let response = await reWritePostContents(client, post.postDescription)
      setPost({ ...post, postDescription: response.choices[0].message.content })
    } else {
      let response = await reWritePostContents(client, selectedText)
      const updatedText = response.choices[0].message.content

      const textarea = inputRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      const newContent =
        post.postDescription.substring(0, start) +
        updatedText +
        post.postDescription.substring(end)

      setPost({ ...post, postDescription: newContent })
    }
  }

  const primaryActionButtonProps = {
    onClick,
  }

  const onClickGrammarFix = async () => {
    const key = apiKey
    const endpoint = apiEndpoint
    const apiVersion = "2024-10-21"
    const deployment = deploymentName

    const client = new AzureOpenAI({
      apiKey: key,
      endpoint,
      apiVersion,
      deployment,
      dangerouslyAllowBrowser: true,
    })

    if (selectedText.length === 0) {
      let response = await grammarFix(client, post.postDescription)
      setPost({ ...post, postDescription: response.choices[0].message.content })
    } else {
      let response = await grammarFix(client, selectedText)
      const updatedText = response.choices[0].message.content

      const textarea = inputRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      const newContent =
        post.postDescription.substring(0, start) +
        updatedText +
        post.postDescription.substring(end)

      setPost({ ...post, postDescription: newContent })
    }
  }

  const buttonIcon =
    loadingState === "loading" ? <Spinner size='tiny' /> : <SendIcon />

  const buttonClassName =
    loadingState === "initial" || loadingState === "loaded"
      ? fluentStyles.postBtn
      : fluentStyles.buttonNonInteractive

  const postButtonLabel = loadingState === "loading" ? "Posting..." : "Post"

  return (
    <>
      <AdvancedTextAreaCompact
        exitCompactView={exitCompactView}
        setExitCompactView={setExitCompactView}
      />
      <CollapseRelaxed visible={exitCompactView === false ? true : false}>
        {!exitCompactView ? (
          <Card className={fluentStyles.advancedTextAreaCard}>
            <Toolbar aria-label='Default' className={fluentStyles.toolbar}>
              <input
                type='file'
                accept='image/*'
                multiple
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
              <ToolbarButton
                icon={<Image24Regular />}
                onClick={handleImageClick}
              />
              <ToolbarDivider vertical />

              <Menu positioning='below-end'>
                <MenuTrigger disableButtonEnhancement>
                  {(triggerProps: MenuButtonProps) => (
                    <SplitButton
                      className={fluentStyles.rewriteBtn}
                      appearance='transparent'
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
                    <MenuItem onClick={onClickGrammarFix}>Grammar fix</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            </Toolbar>
            {post.imageUrls.length > 0 && (
              <div className={styles.previewImageWrapper}>
                {post.previewUrls.map((url, index) => (
                  <ImagePreview
                    preview={url}
                    index={index}
                    handleRemoveImageFromPreview={() =>
                      removeImageFromPreview(index)
                    }
                  />
                ))}
              </div>
            )}
            <Textarea
              ref={inputRef}
              className={fluentStyles.textArea}
              textarea={{ className: fluentStyles.textAreaSpan }}
              value={post.postDescription}
              onChange={(e) =>
                setPost({
                  ...post,
                  postDescription: e.target.value,
                })
              }
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
                onClick={handlePostSubmit}
                disabled={!post.postDescription}
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
        isDialogOpen={alert}
        setIsDialogOpen={setAlert}
        title='Image Upload Limit'
        description={`You can only upload ${maxFileLimit} images at a time.`}
      />
    </>
  )
}
