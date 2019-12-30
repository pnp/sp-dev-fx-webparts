import { Guid } from "@microsoft/sp-core-library";

export interface IPerson {
  id: Guid;
  displayName: string;
  department?: string;
  availability?: string;
  activity?: string;
}
