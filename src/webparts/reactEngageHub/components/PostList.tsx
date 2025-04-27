import * as React from "react"
import { Card, Avatar, Divider, Text } from "@fluentui/react-components"
import styles from "../ReactEngageHub.module.scss"
import { formatDate } from "../utils/util"
import { AdvancedTextArea } from "./AdvancedTextArea"
import { Comments } from "./Comments"
import { CompactTextArea } from "./CompactTextArea"
import { ImagePreview } from "./ImagePreview"
import { MoreOptions } from "./MoreOptions"
import { PostActions } from "./PostActions"

interface IPostListProps {
  posts: any[]
  context: any
  isDarkTheme: boolean
  fluentStyles: any
  exitCompactView: boolean
  setExitCompactView: React.Dispatch<React.SetStateAction<boolean>>
  fetchPosts: () => Promise<void>
  onClickPostLikeBtn: (postId: number, postLike: boolean) => void
  handlePostDelete: (postId: string, itemId: number) => Promise<void>
}

export const PostList = (props: IPostListProps) => {
  const {
    posts,
    context,
    isDarkTheme,
    fluentStyles,
    exitCompactView,
    setExitCompactView,
    fetchPosts,
    onClickPostLikeBtn,
    handlePostDelete,
  } = props

  return (
    <>
      {posts &&
        posts.map((post: any) => (
          <Card className={fluentStyles.card}>
            <article key={post.ID} className={styles.article}>
              <div className={styles.topContainer}>
                <Avatar name={post.AuthorName} size={36} />
                <div className={styles.author}>
                  <Text>{post.AuthorName}</Text>
                  <Text size={100}>{formatDate(new Date(post.Created))}</Text>
                </div>
                {post.UserID ===
                  context.pageContext.legacyPageContext?.userPuid && (
                  <MoreOptions
                    id={post.PostID}
                    dialogTitle='Delete post'
                    dialogDescription='Are you sure you want to delete this post?'
                    onClickDelete={() => handlePostDelete(post.PostID, post.ID)}
                  />
                )}
              </div>
              {post.Images.length > 0 && (
                <div className={styles.imageContainer}>
                  {post.Images.map((image: string) => (
                    <div className={styles.previewImageWrapper}>
                      <ImagePreview preview={image} />
                    </div>
                  ))}
                </div>
              )}
              <div
                dangerouslySetInnerHTML={{
                  __html: post.Description,
                }}
              ></div>
              <div className={fluentStyles.postActions}>
                <PostActions
                  post={post}
                  onClickPostLikeBtn={onClickPostLikeBtn}
                  exitCompactView={exitCompactView}
                  setExitCompactView={setExitCompactView}
                />
              </div>
              <Divider style={{ paddingTop: "1rem" }} />
              {post.comments.map((comment: any) => (
                <Comments
                  key={comment.id}
                  postId={post.ID}
                  comment={comment}
                  fetchPosts={fetchPosts}
                  isDarkTheme={isDarkTheme}
                />
              ))}
              <div className={styles.newCommentContainer}>
                <CompactTextArea
                  exitCompactView={exitCompactView}
                  setExitCompactView={setExitCompactView}
                  mode={"Comment"}
                />
                <AdvancedTextArea
                  exitCompactView={exitCompactView}
                  setExitCompactView={setExitCompactView}
                  mode={"Comment"}
                  postId={post.ID}
                  fetchPosts={fetchPosts}
                />
              </div>
            </article>
          </Card>
        ))}
    </>
  )
}
