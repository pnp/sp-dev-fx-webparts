/* eslint-disable @typescript-eslint/explicit-function-return-type */
import GPT3Tokenizer from 'gpt3-tokenizer';

export const getTokens = (text: string, type?: "gpt3" | "codex"): string => {
  const tokenizer = new GPT3Tokenizer({ type: type ?? "gpt3" }); // or 'codex'
  const str = text;
  const encoded: { bpe: number[]; text: string[] } = tokenizer.encode(str);
  let stringResponse = "";
  for (const token of encoded.text) {
    stringResponse += token;
  }
  return stringResponse;
};

