import { IContextualMenuItem } from '@microsoft/office-ui-fabric-react-bundle'; //'office-ui-fabric-react/lib';
import { PagedItemCollection } from '@pnp/sp';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';

export interface IFillMetadataDialogContentProps {
  itemId: number;
  webUrl: string;
  close: () => void;
  submit: () => void;
}

export interface IFillMetadataDialogContentState { 
  loading: boolean;
  submitting: boolean;
  hasError: boolean;
  error: string;
  loadedItem: IMetadataNewsItem; 
}

export interface IMetadataNewsProps {
  ItemLimit: number;
  ItemHeight: string;
  AdditionalFilter: string;
  HideRefinerFromItemCard: string;
  RefinerInfos: IMetadataRefinerInfo[];
  webUrl: string;
  containerWidth: string;
  multiColumn: boolean;
}

export interface IMetadataRefinerInfo {
  IsSelected: boolean;
  List?: string;
  IsMultiValue: boolean;
  DisplayName: string;
  InternalName: string;
  DefaultValues?:string;
}

export interface IMetadataNewsItem {
  id: number;
  bannerImg: string;
  title: string;
  content: string;
  url: string;
  created: string;
  lookupMetadata: ILookupInfo[];
}

export interface ILookupInfo {
  lookupFieldInternalName: string;
  lookupFieldDisplayName: string;
  lookupFieldLookupList: string;
  lookupFieldIsMultiValue: boolean;
  lookupValues: ILookupFieldValue[];
  allLookupValues?: ILookupFieldValue[];
}

export interface ILookupFieldValue {
  lookupId: number;
  lookupValue: string;
}

export interface ILoadNewsResult {
  pagedItems: PagedItemCollection<any>;
  infos: IMetadataNewsItem[];
}

export interface IMetadataNewsPageCollectionInfo {
  collection: PagedItemCollection<any>;
  relatedRefiners: IMetadataRefinerInfo[];
}

export interface IMetadataNewsState {
  currentNewsItems: IMetadataNewsItem[];
  currentRefiners: IContextualMenuItem[];
  currentPage: number;
  pagedCollectionInfos: IMetadataNewsPageCollectionInfo[];
  loading: boolean;
  dialogItem: IMetadataNewsItem;
  containerWidth: number;
  containerHeight: number;
}

export interface IRefinersState {
  nodes: IContextualMenuItem[];
  loading: boolean;
  error: string;
  enabledFilterNodes: IContextualMenuItem[];
}

export interface IMetadataContextualMenuItemResult {
  refinerName: string;
  refinerFieldInternalName: string;
  items: IContextualMenuItem[];
}

const escapeChars = { lt: '<', gt: '>', quot: '"', apos: "'", amp: '&' };
export const unescapeHTML = (str) => {
  return str.replace(/\&([^;]+);/g, (entity, entityCode) => {
      var match;

      if ( entityCode in escapeChars) {
          return escapeChars[entityCode];
      } else if ( match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
          return String.fromCharCode(parseInt(match[1], 16));
      } else if ( match = entityCode.match(/^#(\d+)$/)) {
          return String.fromCharCode(~~match[1]);
      } else {
          return entity;
      }
  });
};