import { INasaItem } from "../../../models/INasaImageSearchResponse";

export interface ISpFxHttpClientProps {
  apolloMissionImage: INasaItem;
  isDarkTheme: boolean;
  environmentMessage: string;
  userDisplayName: string;
}
