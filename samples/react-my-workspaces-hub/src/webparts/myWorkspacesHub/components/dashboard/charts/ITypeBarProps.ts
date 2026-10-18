import { IAnalyticsViewModel, SiteType } from '../../../../../common/types';

export interface ITypeBarProps {
  analytics: IAnalyticsViewModel;
  onSelectType: (type: SiteType) => void;
}
