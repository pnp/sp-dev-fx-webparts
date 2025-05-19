import * as React from "react"
import { LikeUnlike } from "./LikeUnlike"
import { Button } from "@fluentui/react-components"
import { CommentIcon } from "../constants/icons"

interface IPostActionsProps {
  post: any
  onClickPostLikeBtn: (postId: number, postLike: boolean) => void
  setIsCommentCompactView: any
}

export const PostActions = (props: IPostActionsProps) => {
  const { post, onClickPostLikeBtn, setIsCommentCompactView } = props

  return (
    <>
      <LikeUnlike
        isLiked={post.isLiked}
        likesCount={post.LikesCount}
        onClick={() => onClickPostLikeBtn(post.ID, post.isLiked)}
      />
      <Button
        appearance='transparent'
        icon={<CommentIcon />}
        onClick={() =>
          setIsCommentCompactView((prev: any) => ({
            ...prev,
            [post.ID]: prev[post.ID] === false ? true : false,
          }))
        }
      >
        Comment
      </Button>
    </>
  )
}
