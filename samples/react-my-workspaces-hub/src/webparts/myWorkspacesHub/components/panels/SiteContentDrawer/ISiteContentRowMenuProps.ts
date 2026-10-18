import { ISiteContentItem } from '../../../../../common/types';

export interface ISiteContentRowMenuProps {
  item: ISiteContentItem;
  siteUrl: string;
  onDetails: () => void;
  menuMountNode?: HTMLElement;
}
