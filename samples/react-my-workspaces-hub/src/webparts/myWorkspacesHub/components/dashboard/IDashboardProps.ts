import { SPFI } from '@pnp/sp';
import { GraphFI } from '@pnp/graph';
import { IAnalyticsViewModel, SiteType } from '../../../../common/types';

export interface IDashboardProps {
  analytics: IAnalyticsViewModel;
  sp: SPFI | undefined;
  graph: GraphFI | undefined;
  onSelectType: (type: SiteType) => void;
}
