import * as React from "react"
import { Card, Avatar, Divider, Text } from "@fluentui/react-components"
import styles from "../ReactEngageHub.module.scss"
import { formatDate } from "../utils/util"
import { Comments } from "./Comments"
import { CompactTextArea } from "./CompactTextArea"
import { ImagePreview } from "./ImagePreview"
import { MoreOptions } from "./MoreOptions"
import { PostActions } from "./PostActions"
import { RichTextEditor } from "./RichTextEditor"

interface IPostListProps {
  posts: any[]
  context: any
  isDarkTheme: boolean
  fluentStyles: any
  isCompactView: boolean
  setIsCompactView: React.Dispatch<React.SetStateAction<boolean>>
  fetchPosts: () => Promise<void>
  onClickPostLikeBtn: (postId: number, postLike: boolean) => void
  handlePostDelete: (postId: string, itemId: number) => Promise<void>
}

export const PostList = (props: IPostListProps) => {
  const [isCommentCompactView, setIsCommentCompactView] = React.useState<{
    [key: number]: boolean
  }>({})

  const {
    posts,
    context,
    isDarkTheme,
    fluentStyles,
    fetchPosts,
    onClickPostLikeBtn,
    handlePostDelete,
  } = props

  return (
    <>
      {posts &&
        posts.map((post: any) => (
          <Card key={post.ID} className={fluentStyles.card}>
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
              <div
                dangerouslySetInnerHTML={{
                  __html: post.Description,
                }}
              ></div>
              {post.Images.length > 0 && (
                <div className={styles.imageContainer}>
                  {post.Images.map((image: string, index: any) => (
                    <div className={styles.previewImageWrapper}>
                      <ImagePreview key={index} preview={image} />
                    </div>
                  ))}
                </div>
              )}
              <div className={fluentStyles.postActions}>
                <PostActions
                  post={post}
                  onClickPostLikeBtn={onClickPostLikeBtn}
                  setIsCommentCompactView={setIsCommentCompactView}
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
                  isCompactView={isCommentCompactView[post.ID] !== false}
                  setIsCompactView={() =>
                    setIsCommentCompactView((prev) => ({
                      ...prev,
                      [post.ID]: false,
                    }))
                  }
                  mode={"Comment"}
                />
                <RichTextEditor
                  isCompactView={isCommentCompactView[post.ID] !== false}
                  setIsCompactView={() =>
                    setIsCommentCompactView((prev) => ({
                      ...prev,
                      [post.ID]: true,
                    }))
                  }
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
