import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ITeamsTaggingProps {
  termSetId: string;
  context: WebPartContext;
}

export interface ITeamInfo {
  id: string;
  name: string;
  tags: string[];
}
