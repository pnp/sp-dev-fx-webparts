import * as React from 'react';
import { AnalyticsService } from '../../../../common/services';
import { IAnalyticsViewModel, ISiteInfo } from '../../../../common/types';

/** Memoized analytics aggregation over the loaded sites. */
export function useAnalytics(sites: ISiteInfo[]): IAnalyticsViewModel {
  return React.useMemo(() => AnalyticsService.build(sites), [sites]);
}
