import { useState } from "react"

type UsePostSubmissionProps = {
  addNewPost: (post: string, images: File[], context: any) => Promise<void>
  onPostSubmit?: () => void
  clearImages: () => void
  setPost: (value: string) => void
  setExitCompactView: (value: boolean) => void
  context: any
}

export function usePostSubmission({
  addNewPost,
  onPostSubmit,
  clearImages,
  setPost,
  setExitCompactView,
  context,
}: UsePostSubmissionProps) {
  const [loadingState, setLoadingState] = useState<
    "initial" | "loading" | "loaded"
  >("initial")

  const submitPost = async (post: string, images: File[]) => {
    setLoadingState("loading")
    await addNewPost(post, images, context.pageContext)
    setPost("")
    clearImages()
    setExitCompactView(true)
    if (onPostSubmit) onPostSubmit()
    setLoadingState("loaded")
  }

  return { submitPost, loadingState }
}
