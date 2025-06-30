import { ITab } from '../../models/ITab';

export interface ITabMenuProps {
     tabs: ITab[];
     selectedTabId: string | undefined;
     onSelectedTab : (tabId: string) => void;
    }