import {
  Avatar,
  Button,
  Card,
  Divider,
  Image,
  makeStyles,
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
  Send16Color,
} from "@fluentui/react-icons"

export interface IPostsProps {}

const ThumbLike = bundleIcon(Heart20Color, Heart20Regular)
const Delete = bundleIcon(DeleteFilled, DeleteRegular)

const useStyles = makeStyles({
  newCommentBtn: {
    position: "absolute",
    right: "0",
    bottom: "0",
    marginRight: "0.5rem",
    marginBottom: "0.5rem",
  },
  newcommentTextarea: {
    width: "100%",
    position: "relative",
  },
})

export const Posts: React.FunctionComponent<IPostsProps> = (
  props: React.PropsWithChildren<IPostsProps>
) => {
  const [posts, setPosts] = React.useState<any[]>([])
  const [likeDislike, setLikeDislike] = React.useState<boolean>(false)
  const [newComments, setNewComments] = React.useState<{
    [key: number]: string
  }>({})

  const fluentStyles = useStyles()

  useEffect(() => {
    fetchPosts()
  }, [likeDislike, newComments])

  const fetchPosts = async () => {
    let results = await getPosts()
    console.log(results)
    setPosts(results)
  }

  const onClickLikeBtn = async (postId: number, commentId: string) => {
    setLikeDislike(!likeDislike)
    await updateLikeDislike(postId, commentId, likeDislike)
  }

  const onClickNewCommentBtn = async (postId: number) => {
    await addNewComment(postId, newComments[postId])
    setNewComments({ ...newComments, [postId]: "" })
  }

  const handleNewCommentChange = (postId: number, value: string) => {
    setNewComments({ ...newComments, [postId]: value })
  }

  const onClickDeleteCommentBtn = async (postID: number, commentID: string) => {
    await deleteComment(postID, commentID)
  }

  return (
    <>
      <Text size={300} weight='semibold'>
        Recent Posts
      </Text>
      {posts.map((post) => (
        <Card>
          <article key={post.ID} className={styles.article}>
            <div className={styles.avatar}>
              <Avatar name={post.AuthorName} size={36} />
              <div className={styles.author}>
                <Text>{post.AuthorName}</Text>
                <Text size={100}>
                  {new Date(post.Created).toLocaleString("en-IN")}
                </Text>
              </div>
            </div>
            {post.Image && (
              <div className={styles.imageWrapper}>
                <Image
                  src={`https://spl7c.sharepoint.com${
                    JSON.parse(post.Image).serverRelativeUrl
                  }`}
                  fit='cover'
                  block
                />
              </div>
            )}
            <div
              dangerouslySetInnerHTML={{
                __html: post.Description,
              }}
            ></div>
            <Divider style={{ paddingTop: "1rem" }} />
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
                      <Text size={100}>
                        {new Date(comment.createdDate).toLocaleString("en-IN")}
                      </Text>
                    </div>
                  </div>
                  <Text>{comment.text}</Text>
                  <div className={styles.reactions}>
                    <div className={styles.likeContainer}>
                      <Button
                        appearance='transparent'
                        icon={
                          <ThumbLike
                            filled={comment.isLikedByUser}
                            style={
                              comment.isLikedByUser ? { color: "red" } : {}
                            }
                          />
                        }
                        onClick={() => onClickLikeBtn(post.ID, comment.id)}
                      />
                      <Text>{comment.likeCount}</Text>
                    </div>
                    <Button
                      appearance='transparent'
                      icon={<Delete />}
                      onClick={() =>
                        onClickDeleteCommentBtn(post.ID, comment.id)
                      }
                    />
                  </div>
                </div>
              </section>
            ))}
            <div className={styles.newCommentContainer}>
              <Textarea
                className={fluentStyles.newcommentTextarea}
                onChange={(e) =>
                  handleNewCommentChange(post.ID, e.target.value)
                }
                value={newComments[post.ID] || ""}
                size='small'
                placeholder='Add a comment'
              />
              <Button
                appearance='transparent'
                icon={<Send16Color />}
                onClick={() => onClickNewCommentBtn(post.ID)}
                className={fluentStyles.newCommentBtn}
              />
            </div>
          </article>
        </Card>
      ))}
    </>
  )
}
