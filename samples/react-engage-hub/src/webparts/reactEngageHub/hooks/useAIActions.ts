import { useContext } from "react"
import { AzureOpenAI } from "openai"
import {
  grammarFix,
  lengthenPostContents,
  reWritePostContents,
  shortenPostContents,
} from "../services/AOAIService"
import { WEBPARTCONTEXT } from "../context/webPartContext"
import { APIVERSION } from "../constants/ai"

type AIType = {
  apiKey: string
  apiEndpoint: string
  deploymentName: string
}

export const useAIActions = (props: AIType) => {
  const { apiKey, apiEndpoint, deploymentName } = useContext(WEBPARTCONTEXT)

  const getClient = () =>
    new AzureOpenAI({
      apiKey,
      endpoint: apiEndpoint,
      apiVersion: APIVERSION,
      deployment: deploymentName,
      dangerouslyAllowBrowser: true,
    })

  const reWrite = async (text: string) => {
    const client = getClient()
    return reWritePostContents(client, text)
  }

  const fixGrammar = async (text: string) => {
    const client = getClient()
    return grammarFix(client, text)
  }

  const makeItShorter = async (text: string) => {
    const client = getClient()
    return shortenPostContents(client, text)
  }

  const makeItLonger = async (text: string) => {
    const client = getClient()
    return lengthenPostContents(client, text)
  }

  return { reWrite, fixGrammar, makeItShorter, makeItLonger }
}
