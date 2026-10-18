import { IAnalyticsViewModel, SiteType } from '../../../../../common/types';

export interface ITypeDonutProps {
  analytics: IAnalyticsViewModel;
  onSelectType: (type: SiteType) => void;
}
