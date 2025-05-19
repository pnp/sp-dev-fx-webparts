import { useState } from "react"
import { addNewComment } from "../services/SPService"

type UseCommentSubmissionProps = {
  comment: string
  postId: number
  fetchPosts: () => Promise<void>
}

export const useCommentSubmission = ({
  comment,
  postId,
  fetchPosts,
}: UseCommentSubmissionProps) => {
  const [commentLoadingState, setCommentLoadingState] = useState<
    "initial" | "loading" | "loaded"
  >("initial")

  const submitComment = async () => {
    setCommentLoadingState("loading")
    await addNewComment(postId, comment)
    await fetchPosts()
    setCommentLoadingState("loaded")
  }

  return { submitComment, commentLoadingState }
}
