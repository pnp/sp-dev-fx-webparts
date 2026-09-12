import { ISiteInfo } from '../../../../common/types';
import { IMySitesRowActions } from './IMySitesRowActions';

export interface IMySitesRowMenuProps {
  site: ISiteInfo;
  actions: IMySitesRowActions;
}
