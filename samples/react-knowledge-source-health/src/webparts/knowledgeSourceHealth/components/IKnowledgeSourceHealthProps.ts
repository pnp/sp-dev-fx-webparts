import { IScanService } from '../../../services/IScanService';

export interface IKnowledgeSourceHealthProps {
  scanService: IScanService;
  /** Cap on documents read per library, so a large library cannot hang the page. */
  maxItemsPerLibrary: number;
  /** A document untouched for longer than this is reported as informational. */
  staleAfterMonths: number;
  /** True when the fabricated data set is in use rather than the current site. */
  usingDemoData: boolean;
  hasTeamsContext: boolean;
}
