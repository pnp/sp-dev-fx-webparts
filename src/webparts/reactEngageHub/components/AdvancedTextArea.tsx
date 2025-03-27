import * as React from "react"
import {
  Button,
  Card,
  Textarea,
  ToolbarButton,
  ToolbarDivider,
  makeStyles,
  Toolbar,
} from "@fluentui/react-components"
import {
  bundleIcon,
  Image24Regular,
  Send20Color,
  Send24Regular,
} from "@fluentui/react-icons"
import { addNewPost } from "../services/SPService"
import { ImagePreview } from "./ImagePreview"
import styles from "./ReactEngageHub.module.scss"

const useStyles = makeStyles({
  textArea: {
    width: "inherit",
    height: "120px",
  },
  postBtn: {
    width: "fit-content",
    alignSelf: "flex-end",
  },
})

export type AdvancedTextAreaType = {
  postDescription: string
  imageUrls: File[]
  previewUrls: string[]
}

const SendIcon = bundleIcon(Send20Color, Send24Regular)

export const AdvancedTextArea = ({ props }: any) => {
  const [post, setPost] = React.useState<AdvancedTextAreaType>({
    postDescription: "",
    imageUrls: [],
    previewUrls: [],
  })
  const fileInputRef = React.useRef<HTMLInputElement>(null)

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
    await addNewPost(post, props.context.pageContext)

    setPost({ postDescription: "", imageUrls: [], previewUrls: [] })
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

  return (
    <Card>
      <Toolbar aria-label='Default' {...props}>
        <input
          type='file'
          accept='image/*'
          multiple
          max={props.maxFileLimit}
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
        <ToolbarButton icon={<Image24Regular />} onClick={handleImageClick} />
        <ToolbarDivider vertical />
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
        className={fluentStyles.textArea}
        value={post.postDescription}
        onChange={(e) =>
          setPost({
            ...post,
            postDescription: e.target.value,
          })
        }
        placeholder="What's on your mind?"
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
