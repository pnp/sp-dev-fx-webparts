import { IClient, IMatter } from "../../../../models";
import { INavLinkGroup } from "office-ui-fabric-react/lib/Nav";

export interface ITeamInABoxSlicerState {
    clients: IClient[];
    matters: IMatter[];
    slicerData: INavLinkGroup[];
}