import { useState } from "react"

type UsePostSubmissionProps = {
  addNewPost: (post: string, images: File[], context: any) => Promise<void>
  onPostSubmit?: () => void
  clearImages: () => void
  setText: (value: string) => void
  setIsCompactView: (value: boolean) => void
  context: any
}

export function usePostSubmission({
  addNewPost,
  onPostSubmit,
  clearImages,
  setText,
  setIsCompactView,
  context,
}: UsePostSubmissionProps) {
  const [loadingState, setLoadingState] = useState<
    "initial" | "loading" | "loaded"
  >("initial")

  const submitPost = async (post: string, images: File[]) => {
    setLoadingState("loading")
    await addNewPost(post, images, context.pageContext)
    setText("")
    clearImages()
    setIsCompactView(true)
    if (onPostSubmit) onPostSubmit()
    setLoadingState("loaded")
  }

  return { submitPost, loadingState }
}
