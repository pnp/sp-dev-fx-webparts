import { AzureOpenAI } from "openai"

const createChatCompletion = async (client: AzureOpenAI, messages: any) => {
  return await client.chat.completions.create({
    messages,
    model: "",
    max_tokens: 500,
  })
}

export const reWritePostContents = async (
  client: AzureOpenAI,
  input: string
) => {
  const messages = [
    {
      role: "system",
      content:
        "You are a content writer. Rewrite the given content in a way that's appealing for a social media post. Avoid hashtags for short sentences. Preserve the original meaning.",
    },
    { role: "user", content: input },
  ]
  return createChatCompletion(client, messages)
}

export const grammarFix = async (client: AzureOpenAI, input: string) => {
  const messages = [
    {
      role: "system",
      content:
        "Your task is to fix any grammar mistakes in the provided text without adding new info or changing the meaning.",
    },
    { role: "user", content: input },
  ]
  return createChatCompletion(client, messages)
}

export const shortenPostContents = async (
  client: AzureOpenAI,
  input: string
) => {
  const messages = [
    {
      role: "system",
      content:
        "You are a writing assistant that shortens posts without removing critical context. Make it concise but clear.",
    },
    { role: "user", content: input },
  ]
  return createChatCompletion(client, messages)
}

export const lengthenPostContents = async (
  client: AzureOpenAI,
  input: string
) => {
  const messages = [
    {
      role: "system",
      content:
        "You are a writing assistant that expands posts with more detail, examples, or context—without rambling or going off-topic.",
    },
    { role: "user", content: input },
  ]
  return createChatCompletion(client, messages)
}
