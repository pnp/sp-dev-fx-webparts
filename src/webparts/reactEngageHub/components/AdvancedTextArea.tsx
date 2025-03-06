import * as React from "react"
import { Button, Textarea, makeStyles } from "@fluentui/react-components"
import styles from "./ReactEngageHub.module.scss"
import { Image24Regular, Send24Color } from "@fluentui/react-icons"
import { addNewPost } from "../services/SPService"

const useStyles = makeStyles({
  text: {
    outline: "none",
    border: "none",
    position: "absolute",
    width: "98%",
    height: "120px",
    marginTop: "4rem",
  },
  button: {
    position: "absolute",
    right: "0",
    bottom: "0",
    marginRight: "1rem",
    marginBottom: "1rem",
  },
})

export type AdvancedTextAreaType = {
  postTitle: string
  postDescription: string
  imageUrl: File
}

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
    <>
      <div className={styles.advancedTextArea}>
        <input
          type='file'
          accept='image/*'
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
        <Button icon={<Image24Regular />} onClick={handleImageClick} />
        <Textarea
          className={fluentStyles.text}
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
          icon={<Send24Color />}
          className={fluentStyles.button}
          onClick={handlePostSubmit}
          disabled={!post.postDescription}
        />
      </div>
    </>
  )
}
