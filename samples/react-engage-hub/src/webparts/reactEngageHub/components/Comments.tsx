import { Avatar, Text } from "@fluentui/react-components"
import * as React from "react"
import { useAtom } from "jotai"
import styles from "../ReactEngageHub.module.scss"

import { deleteComment, updateCommentLikeUnlike } from "../services/SPService"
import { LikeUnlike } from "./LikeUnlike"
import { WEBPARTCONTEXT } from "../context/webPartContext"
import { IReactEngageHubProps } from "../IReactEngageHubProps"
import { useContext } from "react"
import { MoreOptions } from "./MoreOptions"
import { formatDate } from "../utils/util"

import { postsAtom } from "../atoms/globalAtoms"

interface IComments {
  key: number
  postId: number
  comment: any
  fetchPosts: () => Promise<void>
  isDarkTheme: boolean
}

export const Comments = (props: IComments) => {
  const [posts, setPosts] = useAtom(postsAtom)

  const { postId, comment, isDarkTheme, fetchPosts } = props
  const { context } = useContext(WEBPARTCONTEXT) as IReactEngageHubProps

  const onClickCommentLikeBtn = async () => {
    await updateCommentLikeUnlike(postId, comment.id, comment.isLikedByUser)
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.ID === postId
          ? {
              ...post,
              comments: post.comments.map((item) =>
                item.id === comment.id
                  ? {
                      ...item,
                      isLikedByUser: !comment.isLikedByUser,
                      likeCount: comment.isLikedByUser
                        ? item.likeCount - 1
                        : item.likeCount + 1,
                    }
                  : item
              ),
            }
          : post
      )
    )
  }

  const onClickDeleteCommentBtn = async (postID: number, commentID: string) => {
    await deleteComment(postID, commentID)
    await fetchPosts()
  }

  return (
    <div
      className={styles.commentArea}
      style={{
        backgroundColor: isDarkTheme ? "#2b2b2b" : "#f7f7f7",
      }}
    >
      <div className={styles.topContainer}>
        <Avatar name={comment.author.name} size={36} />
        <div className={styles.author}>
          <Text>{comment.author.name}</Text>
          <Text size={100}>{formatDate(new Date(comment.createdDate))}</Text>
        </div>

        {comment.author.email &&
          comment.author.email.toLowerCase() ===
            context.pageContext.user.email.toLowerCase() && (
            <MoreOptions
              id={comment.id}
              dialogTitle='Delete comment'
              dialogDescription='Are you sure you want to delete this comment?'
              onClickDelete={() => onClickDeleteCommentBtn(postId, comment.id)}
            />
          )}
      </div>
      <Text>{comment.text}</Text>
      <LikeUnlike
        isLiked={comment.isLikedByUser}
        likesCount={comment.likeCount}
        onClick={onClickCommentLikeBtn}
      />
    </div>
  )
}
