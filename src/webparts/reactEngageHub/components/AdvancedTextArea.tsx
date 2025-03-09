import * as React from "react"
import {
  Button,
  Card,
  Textarea,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  makeStyles,
} from "@fluentui/react-components"
// import styles from "./ReactEngageHub.module.scss"
import {
  bundleIcon,
  Image24Regular,
  Send20Color,
  Send24Regular,
} from "@fluentui/react-icons"
import { addNewPost } from "../services/SPService"

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
  postTitle: string
  postDescription: string
  imageUrl: File
}

const SendIcon = bundleIcon(Send20Color, Send24Regular)

export const AdvancedTextArea: React.FunctionComponent<any> = (
  props: React.PropsWithChildren<any>
) => {
  const [post, setPost] = React.useState<AdvancedTextAreaType>({
    postTitle: "",
    postDescription: "",
    imageUrl: new File([], ""),
  })
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const fluentStyles = useStyles()

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setPost({ ...post, imageUrl: file })
    }
  }

  const handlePostSubmit = async () => {
    // Call addNewPost with the updated post inside the state update
    await addNewPost(post, props.context.pageContext)

    setPost({ postTitle: "", postDescription: "", imageUrl: new File([], "") })
  }

  return (
    <Card>
      <Toolbar aria-label='Default' {...props}>
        <input
          type='file'
          accept='image/*'
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
        <ToolbarButton icon={<Image24Regular />} onClick={handleImageClick} />
        <ToolbarDivider vertical />
      </Toolbar>
      <Textarea
        className={fluentStyles.textArea}
        value={post.postDescription}
        onChange={(e) =>
          setPost({
            ...post,
            postDescription: e.target.value,
            postTitle: e.target.value,
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
