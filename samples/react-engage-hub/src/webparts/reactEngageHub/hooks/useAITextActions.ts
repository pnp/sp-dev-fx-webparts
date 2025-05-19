import { useAIActions } from "./useAIActions"

type UseAITextActionsProps = {
  apiKey: string
  apiEndpoint: string
  deploymentName: string
  content: any
  setContent: React.Dispatch<any>
}

export function useAITextActions(props: UseAITextActionsProps) {
  const { apiKey, apiEndpoint, deploymentName, content, setContent } = props

  const { reWrite, fixGrammar } = useAIActions({
    apiKey,
    apiEndpoint,
    deploymentName,
  })

  const handleRewrite = async () => {
    let response = await reWrite(content)
    setContent(response.choices[0].message.content)
  }

  const handleGrammarFix = async () => {
    let response = await fixGrammar(content)
    setContent(response.choices[0].message.content)
  }

  return { handleRewrite, handleGrammarFix }
}
