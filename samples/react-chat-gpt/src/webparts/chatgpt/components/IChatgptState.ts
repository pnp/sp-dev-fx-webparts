import { IChatgpt } from "./IChatgpt";

export interface IChatgptState {
  chatgpt: Array<IChatgpt>;
  currentQuestion: string;
  loading: boolean;
}
