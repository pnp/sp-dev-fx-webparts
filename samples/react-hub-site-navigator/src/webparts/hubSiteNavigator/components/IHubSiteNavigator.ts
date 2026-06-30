import { HeadlessFlatTreeItemProps, TreeItemValue } from "@fluentui/react-components";
import { SPService } from "../../../common/services/SPService";
import { IHubSiteInfo } from "@pnp/sp/hubsites";
import { IAssociatedHubSiteInfo } from "../../../common/models/IAssociatedHubSiteInfo";
import { IWebInfo } from "@pnp/sp/webs";

export interface IHubSiteNavigatorProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  spService: SPService;
  height: string;
}

export interface IHubSiteNavigatorState {
  treeData: ISiteNode[];
  loading: boolean;
  showWebDetail: boolean;
  webDetails: IWebInfo | undefined;
  openItems: Set<TreeItemValue>;
  searchTerm: string;
  allTreeData: ISiteNode[];
}

export interface INodeActionsProps {
  node: IHubSiteInfo | IAssociatedHubSiteInfo;
  isHubSite: boolean;
  onMoreInfoClick: (node: string) => Promise<void>;
}

export type ISiteNode = HeadlessFlatTreeItemProps & { content: string; data: IHubSiteInfo | IAssociatedHubSiteInfo; isHubSite: boolean };
