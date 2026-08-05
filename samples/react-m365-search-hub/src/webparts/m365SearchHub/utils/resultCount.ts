import * as strings from 'M365SearchHubWebPartStrings';
import { format } from './format';

/**
 * How many results to say there are.
 *
 * The awkward part is that filtering by content kind happens over the results
 * rather than in the query, so once a filter is on, the total Microsoft Graph
 * reported no longer describes what is being shown. Saying "23 of 147" then
 * reads as "147 documents exist", when 147 counted every kind.
 *
 * So: with a filter on, only the number actually known is stated. With no
 * filter, the total is Graph's own and can be quoted safely.
 */
export function resultCountMessage(
  shown: number,
  total: number,
  isFiltered: boolean
): string {
  if (shown === 0) {
    return '';
  }

  if (isFiltered) {
    return shown === 1
      ? strings.StatusMatchingCountOne
      : format(strings.StatusMatchingCount, shown);
  }

  if (shown < total) {
    return format(strings.StatusShowingCount, shown, total);
  }

  return shown === 1 ? strings.StatusResultCountOne : format(strings.StatusResultCount, shown);
}
