export interface ICompletionsResponse {
    id: string
    model: string
    created: number
    object: string
    choices: Choice[]
  }

  export interface Choice {
    index: number
    messages: Message[]
  }

  export interface Message {
    index: number
    role: "assistant" | "tool"
    content: string
    end_turn: boolean
  }
