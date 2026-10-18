import { ISiteContentItem } from '../../../../../common/types';

export interface ISiteContentColumnActions {
  siteUrl: string;
  onDetails: (item: ISiteContentItem) => void;
  menuMountNode?: HTMLElement;
}
