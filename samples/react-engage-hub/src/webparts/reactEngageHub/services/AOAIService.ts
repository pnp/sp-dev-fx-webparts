export const reWritePostContents = async (client: any, input: string) => {
  const messages = [
    {
      role: "system",
      content:
        "You are a content writer, you can rewrite the given content in a way appealing to a social media post. If the sentence is short then dont create any hashtags. Dont change the meaning of the sentence.",
    },
    { role: "user", content: input },
  ]
  const result = await client.completions.create({
    messages,
    model: "",
    max_tokens: 100,
  })
  return result
}

export const grammarFix = async (client: any, input: string) => {
  const messages = [
    {
      role: "system",
      content:
        "Your task is to fix any grammar mistakes in the provided text without adding any new information or altering the meaning.",
    },
    { role: "user", content: input },
  ]
  const result = await client.completions.create({
    messages,
    model: "",
    max_tokens: 100,
  })
  return result
}
