import * as React from "react"
import { LikeUnlike } from "./LikeUnlike"
import { Button } from "@fluentui/react-components"
import { CommentIcon } from "../../constants/icons"

interface IPostActionsProps {
  post: any
  onClickPostLikeBtn: (postId: number, postLike: boolean) => void
  isCompactView: boolean
  setIsCompactView: React.Dispatch<React.SetStateAction<boolean>>
}

export const PostActions = (props: IPostActionsProps) => {
  const { post, onClickPostLikeBtn, isCompactView, setIsCompactView } = props

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
        onClick={() => setIsCompactView(!isCompactView)}
      >
        Comment
      </Button>
    </>
  )
}
