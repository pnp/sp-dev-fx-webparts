import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls";

export interface IScriptEditorWebPartProps {
  script: string;
  useExternalScript: boolean;
  externalScript?: string;
  title: string;
  removePadding: boolean;
  spPageContextInfo: boolean;
  teamsContext: boolean;
  audiences: IPropertyFieldGroupOrPerson[];
  audienceCacheDuration: number;
}
