import { DisplayMode } from "@microsoft/sp-core-library";
import { ILink } from "../models/ILink";

export interface IPnPQuickLinksProps {
    webPartTitle: string;
    setWebpartTitle: (val: string) => void;
    links: ILink[];
    setLinks: (val: ILink[]) => void
  
    SelectedItemId: string,
    setSelectedItemId: (id: string) => void;
  
    displayMode: DisplayMode;
  }
  