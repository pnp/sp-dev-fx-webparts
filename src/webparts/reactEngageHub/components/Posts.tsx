import {
  Avatar,
  Button,
  Divider,
  Image,
  Text,
  Textarea,
} from "@fluentui/react-components"
import * as React from "react"
import { useEffect } from "react"
import {
  addNewComment,
  deleteComment,
  getPosts,
  updateLikeDislike,
} from "../services/SPService"
import styles from "./ReactEngageHub.module.scss"
import {
  bundleIcon,
  DeleteFilled,
  DeleteRegular,
  Heart20Color,
  Heart20Regular,
  Send20Color,
} from "@fluentui/react-icons"

export interface IPostsProps {}

const ThumbLike = bundleIcon(Heart20Color, Heart20Regular)
const Delete = bundleIcon(DeleteFilled, DeleteRegular)

export const Posts: React.FunctionComponent<IPostsProps> = (
  props: React.PropsWithChildren<IPostsProps>
) => {
  const [posts, setPosts] = React.useState<any[]>([])
  const [like, setLike] = React.useState<boolean>(false)
  const [newComment, setNewComment] = React.useState<string>("")

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    let results = await getPosts()
    console.log(results)
    setPosts(results)
  }

  const onClickLikeBtn = async (postId: number, commentId: string) => {
    setLike(!like)
    await updateLikeDislike(postId, commentId, like)
  }

  const onClickNewCommentBtn = async (postId: number) => {
    await addNewComment(postId, newComment)
    setNewComment("")
  }

  const onClickDeleteCommentBtn = async (postID: number, commentID: string) => {
    await deleteComment(postID, commentID)
  }

  console.log("posts", posts)
  return (
    <>
      <Text>Recent Posts</Text>
      {posts.map((post) => (
        <article key={post.ID} className={styles.article}>
          <div className={styles.imageWrapper}>
            <Text weight='semibold'>{post.Title}</Text>
            <Image
              src={`https://spl7c.sharepoint.com${
                JSON.parse(post.Image).serverRelativeUrl
              }`}
              fit='contain'
            />
          </div>
          <Text>{post.Description}</Text>
          <Divider />
          {post.comments.map((comment: any) => (
            <section>
              <div className={styles.commentArea}>
                <div className={styles.avatar}>
                  <Avatar
                    name={comment.author.name}
                    size={36}
                    active={comment.author.isActive ? "active" : "inactive"}
                    badge={
                      comment.author.isActive
                        ? { status: "available" }
                        : { status: "offline" }
                    }
                  />
                  <div className={styles.author}>
                    <Text>{comment.author.name}</Text>
                    <Text size={100}>{comment.author.email}</Text>
                  </div>
                </div>
                <Text>{comment.text}</Text>
                <div className={styles.reactions}>
                  <Button
                    appearance='transparent'
                    icon={<ThumbLike />}
                    onClick={() => onClickLikeBtn(post.ID, comment.id)}
                  />
                  <Button
                    appearance='transparent'
                    icon={<Delete />}
                    onClick={() => onClickDeleteCommentBtn(post.ID, comment.id)}
                  />
                </div>
              </div>
            </section>
          ))}
          <Textarea
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
          <Button
            appearance='transparent'
            icon={<Send20Color />}
            onClick={() => onClickNewCommentBtn(post.ID)}
          />
        </article>
      ))}
    </>
  )
}
