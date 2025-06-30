import { ITab } from '../../models/ITab';

export interface IOverFlowMenuProps {
    onTabSelect?: (tabId: string) => void;
    tabdata: ITab[];
}