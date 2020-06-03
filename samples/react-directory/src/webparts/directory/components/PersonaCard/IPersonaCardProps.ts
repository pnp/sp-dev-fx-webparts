import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { IUserProperties } from "./IUserProperties";
import { PeoplePickerEntity, SearchResult, SearchResults } from "@pnp/pnpjs";

export interface IPersonaCardProps {
  context: WebPartContext | ApplicationCustomizerContext;
  profileProperties: IUserProperties;
}
