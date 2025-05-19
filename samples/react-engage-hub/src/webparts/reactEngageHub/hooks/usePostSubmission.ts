import { useState } from "react"

type UsePostSubmissionProps = {
  addNewPost: (post: string, images: File[], context: any) => Promise<void>
  onPostSubmit?: () => void
  clearImages: () => void
  setContent: React.Dispatch<any>
  setIsCompactView: (value: boolean) => void
  context: any
}

export function usePostSubmission({
  addNewPost,
  onPostSubmit,
  clearImages,
  setContent,
  setIsCompactView,
  context,
}: UsePostSubmissionProps) {
  const [loadingState, setLoadingState] = useState<
    "initial" | "loading" | "loaded"
  >("initial")

  const submitPost = async (post: string, images: File[]) => {
    setLoadingState("loading")
    await addNewPost(post, images, context.pageContext)
    setContent(null)
    clearImages()
    setIsCompactView(true)
    if (onPostSubmit) onPostSubmit()
    setLoadingState("loaded")
  }

  return { submitPost, loadingState }
}
