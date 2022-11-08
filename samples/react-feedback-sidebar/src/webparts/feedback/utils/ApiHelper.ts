import { FeedbackPayload } from "./Types";

export const sendFeedback = async (body: FeedbackPayload): Promise<boolean> => {
  // TODO: send payload to backend
  console.log(body);
  return true;
};
