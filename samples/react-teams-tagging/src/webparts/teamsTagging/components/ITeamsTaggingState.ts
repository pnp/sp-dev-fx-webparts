import { ITeamInfo } from "./ITeamsTaggingProps";
import { IPickerTerms } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";

export interface ITeamsTaggingState {
  similarTeams: ITeamInfo[];
  tags: IPickerTerms;
  tagsUpdatedResult: string;
}