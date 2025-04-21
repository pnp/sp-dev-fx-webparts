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

import { addNewPost } from "../services/SPService"
import { ImagePreview } from "./ImagePreview"
import styles from "../ReactEngageHub.module.scss"
import { grammarFix, reWritePostContents } from "../services/AOAIService"

const SparkleBundle = bundleIcon(PenSparkle20Filled, PenSparkle20Regular)

const useStyles = makeStyles({
  textArea: {
    width: "inherit",
    height: "120px",
  },
  postBtn: {
    width: "fit-content",
    alignSelf: "flex-end",
  },
  rewriteBtn: {
    marginLeft: "auto",
  },
})

export type AdvancedTextAreaType = {
  postDescription: string
  imageUrls: File[]
  previewUrls: string[]
}

const SendIcon = bundleIcon(Send20Color, Send24Regular)

export const AdvancedTextArea = ({ webpartProps, onPostSubmitted }: any) => {
  const [post, setPost] = React.useState<AdvancedTextAreaType>({
    postDescription: "",
    imageUrls: [],
    previewUrls: [],
  })
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const [selectedText, setSelectedText] = React.useState("")

  const fluentStyles = useStyles()

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files && files.length > 0) {
      const fileArray = Array.from(files)
      const newPreviewUrls = fileArray.map((file) => URL.createObjectURL(file))

      setPost({
        ...post,
        imageUrls: fileArray,
        previewUrls: [...post.previewUrls, ...newPreviewUrls],
      })
    }
  }

  const handlePostSubmit = async () => {
    // Call addNewPost with the updated post inside the state update
    await addNewPost(post, webpartProps.context.pageContext)

    setPost({ postDescription: "", imageUrls: [], previewUrls: [] })
    if (onPostSubmitted) {
      onPostSubmitted()
    }
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
    const apiKey = webpartProps.apiKey
    const endpoint = webpartProps.apiEndpoint
    const apiVersion = "2024-10-21"
    const deployment = webpartProps.deploymentName

    const client = new AzureOpenAI({
      apiKey,
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
    const apiKey = webpartProps.apiKey
    const endpoint = webpartProps.apiEndpoint
    const apiVersion = "2024-10-21"
    const deployment = webpartProps.deploymentName

    const client = new AzureOpenAI({
      apiKey,
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

  return (
    <Card>
      <Toolbar aria-label='Default' {...webpartProps}>
        <input
          type='file'
          accept='image/*'
          multiple
          max={webpartProps.maxFileLimit}
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
        <ToolbarButton icon={<Image24Regular />} onClick={handleImageClick} />
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
              handleRemoveImageFromPreview={() => removeImageFromPreview(index)}
            />
          ))}
        </div>
      )}
      <Textarea
        ref={inputRef}
        className={fluentStyles.textArea}
        value={post.postDescription}
        onChange={(e) =>
          setPost({
            ...post,
            postDescription: e.target.value,
          })
        }
        placeholder="What's on your mind?"
        onSelect={handleSelection}
        onKeyUp={handleSelection}
        onMouseUp={handleSelection}
      />
      <Button
        icon={<SendIcon />}
        appearance='primary'
        onClick={handlePostSubmit}
        disabled={!post.postDescription}
        className={fluentStyles.postBtn}
      >
        Post
      </Button>
    </Card>
  )
}
