import { IChatMessage } from "../models/IChatMessage";

export interface IChatStreamingState {
  userQuery: string;
  sessionMessages: IChatMessage[];
  thinking: boolean;
  disableMarkdown: boolean;
}
