import { IPerson } from "../models/IPerson";
import { Dictionary } from "../models/Dictionary";

export interface IPeopleWithPresenceState {
  members: Dictionary<IPerson>;
}
