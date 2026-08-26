import { useState } from "react"
import { ACTIONS } from "../constants/ai"
import { useAIActions } from "./useAIActions"

type UseAITextActionsProps = {
  apiKey: string
  apiEndpoint: string
  deploymentName: string
  content: any
  setContent: React.Dispatch<any>
  editorDivRef: React.RefObject<HTMLDivElement>
}

export function useAITextActions(props: UseAITextActionsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    apiKey,
    apiEndpoint,
    deploymentName,
    content,
    setContent,
    editorDivRef,
  } = props

  const { reWrite, fixGrammar, makeItShorter, makeItLonger } = useAIActions({
    apiKey,
    apiEndpoint,
    deploymentName,
  })

  const handleAIAction = async (aiAction: any) => {
    let response
    setIsLoading(true)

    try {
      switch (aiAction) {
        case ACTIONS.rewrite:
          response = await reWrite(content)
          break
        case ACTIONS.fixGrammar:
          response = await fixGrammar(content)
          break
        case ACTIONS.makeItShorter:
          response = await makeItShorter(content)
          break
        case ACTIONS.makeItLonger:
          response = await makeItLonger(content)
          break
        default:
          console.warn(`Unknown AI action: ${aiAction}`)
          return
      }

      const newContent = response.choices?.[0]?.message?.content
      if (newContent) {
        if (editorDivRef.current) {
          editorDivRef.current.innerHTML = newContent
        }
        setContent(newContent)
      } else {
        console.warn("AI response did not return content")
      }
    } catch (err) {
      console.error("AI action failed:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return { handleAIAction, isLoading }
}
