import { IChatMessage } from "../models/IChatMessage";

export interface IOurHotelsFinderState {
  userQuery: string;
  sessionMessages: IChatMessage[];
  findingHotels: boolean;
}
