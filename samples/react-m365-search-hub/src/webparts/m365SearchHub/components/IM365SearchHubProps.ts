import { SearchScope } from '../models/ISearchModels';
import { GraphSearchService } from '../services/GraphSearchService';

export interface IM365SearchHubProps {
  /** Heading shown above the search box. Empty hides it. */
  title: string;
  /** How many results one page asks Microsoft Graph for. */
  pageSize: number;
  /** Where to look. `site` restricts to the site the web part sits on. */
  scope: SearchScope;
  /** Absolute URL of the current site, used when the scope is `site`. */
  currentSiteUrl: string;
  /** Whether the local diagnostics panel is shown. Off by default. */
  showPerformancePanel: boolean;
  /** Built once by the web part, so the cache survives a re-render. */
  service: GraphSearchService;
}
