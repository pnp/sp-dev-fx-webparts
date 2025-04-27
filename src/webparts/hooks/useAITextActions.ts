import { useAIActions } from "./useAIActions"

type UseAITextActionsProps = {
  apiKey: string
  apiEndpoint: string
  deploymentName: string
  post: string
  setPost: React.Dispatch<React.SetStateAction<string>>
  inputRef: React.RefObject<HTMLTextAreaElement>
  selectedText: string
}

export function useAITextActions(props: UseAITextActionsProps) {
  const {
    apiKey,
    apiEndpoint,
    deploymentName,
    post,
    setPost,
    inputRef,
    selectedText,
  } = props

  const { reWrite, fixGrammar } = useAIActions({
    apiKey,
    apiEndpoint,
    deploymentName,
  })

  const handleRewrite = async () => {
    if (selectedText.length === 0) {
      let response = await reWrite(post)
      setPost(response.choices[0].message.content)
    } else {
      let response = await reWrite(selectedText)
      const updatedText = response.choices[0].message.content

      const textarea = inputRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      const newContent =
        post.substring(0, start) + updatedText + post.substring(end)

      setPost(newContent)
    }
  }

  const handleGrammarFix = async () => {
    if (selectedText.length === 0) {
      let response = await fixGrammar(post)
      setPost(response.choices[0].message.content)
    } else {
      let response = await fixGrammar(selectedText)
      const updatedText = response.choices[0].message.content

      const textarea = inputRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      const newContent =
        post.substring(0, start) + updatedText + post.substring(end)

      setPost(newContent)
    }
  }

  return { handleRewrite, handleGrammarFix }
}
