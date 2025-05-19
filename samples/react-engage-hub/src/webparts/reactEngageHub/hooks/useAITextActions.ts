import { useAIActions } from "./useAIActions"

type UseAITextActionsProps = {
  apiKey: string
  apiEndpoint: string
  deploymentName: string
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  inputRef: React.RefObject<HTMLTextAreaElement>
  selectedText: string
}

export function useAITextActions(props: UseAITextActionsProps) {
  const {
    apiKey,
    apiEndpoint,
    deploymentName,
    text,
    setText,
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
      let response = await reWrite(text)
      setText(response.choices[0].message.content)
    } else {
      let response = await reWrite(selectedText)
      const updatedText = response.choices[0].message.content

      const textarea = inputRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      const newContent =
        text.substring(0, start) + updatedText + text.substring(end)

      setText(newContent)
    }
  }

  const handleGrammarFix = async () => {
    if (selectedText.length === 0) {
      let response = await fixGrammar(text)
      setText(response.choices[0].message.content)
    } else {
      let response = await fixGrammar(selectedText)
      const updatedText = response.choices[0].message.content

      const textarea = inputRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      const newContent =
        text.substring(0, start) + updatedText + text.substring(end)

      setText(newContent)
    }
  }

  return { handleRewrite, handleGrammarFix }
}
