import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IReactTeamsTabsgraphProps {
  context: WebPartContext;
  webPartTitle: string;
  showChannelSearch: boolean;
  sortGeneralFirst: boolean;

}

export interface IWebPropertiesResult {
  AllProperties: {
    GroupId?: string;
    [key: string]: string | number | boolean | undefined; 
    };
}

export interface IChannel {
  id?: string;
  displayName?: string;
}

export interface ITab {
  id?: string;
  displayName?: string;
  webUrl?: string;
}
