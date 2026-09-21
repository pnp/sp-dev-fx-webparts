import {
  extractRows,
  IGetOnlyClient,
  ISourceConfig,
  ISourceResult,
  mapHttpError,
  normalizeRow,
  pagedRequestUrl,
  summarizeState,
  safeSharePointUrl,
  IGovernanceSite
} from './governanceLogic';

export const loadSource = async (
  client: IGetOnlyClient,
  source: ISourceConfig,
  tenantOrigin: string,
  referenceDate: Date,
  reviewHorizonDays: number,
  configuration: unknown = {}
): Promise<ISourceResult> => {
  const items: IGovernanceSite[] = [];
  let malformedRows = 0;
  let pages = 0;
  let nextLink: string | undefined = source.url;

  try {
    while (nextLink && pages < source.maxPages && items.length < source.maxItems) {
      const requestUrl = pagedRequestUrl(nextLink, tenantOrigin, source.pageSize);
      const response = await client.get(requestUrl, configuration);
      pages += 1;
      if (!response.ok) {
        const mapped = mapHttpError(response.status);
        return { source, state: mapped.kind, items, pages, malformedRows, error: mapped.message, errorKind: mapped.kind };
      }

      let payload: unknown;
      try {
        payload = await response.json();
      } catch (_) {
        return { source, state: 'error', items, pages, malformedRows, error: 'The source returned invalid JSON.', errorKind: 'error' };
      }

      const extracted = extractRows(payload);
      malformedRows += extracted.malformedRows;
      extracted.rows.forEach((row) => {
        if (items.length >= source.maxItems) { return; }
        const item = normalizeRow(row, source, tenantOrigin, referenceDate, reviewHorizonDays);
        if (item) { items.push(item); } else { malformedRows += 1; }
      });

      nextLink = extracted.nextLink;
      if (nextLink) {
        try {
          nextLink = safeSharePointUrl(nextLink, tenantOrigin).toString();
        } catch (_) {
          return { source, state: 'partial', items, pages, malformedRows, error: 'SharePoint returned an unsafe next-page URL; pagination stopped.', errorKind: 'error' };
        }
      }
    }
    const hasMorePages = !!nextLink && (pages >= source.maxPages || items.length >= source.maxItems);
    const state = summarizeState(items, malformedRows, hasMorePages);
    return {
      source,
      state,
      items: items.map((item) => ({ ...item, sourceState: state, sourceError: state === 'partial' ? 'Some rows or pages were not available.' : undefined })),
      pages,
      malformedRows,
      error: state === 'partial' ? 'The source was bounded before all available data could be read.' : undefined
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'The source could not be read.';
    return { source, state: 'error', items, pages, malformedRows, error: message, errorKind: 'error' };
  }
};

export const loadSources = async (
  client: IGetOnlyClient,
  sources: ISourceConfig[],
  tenantOrigin: string,
  referenceDate: Date,
  reviewHorizonDays: number,
  configuration: unknown = {}
): Promise<ISourceResult[]> => Promise.all(sources.map((source) => loadSource(client, source, tenantOrigin, referenceDate, reviewHorizonDays, configuration)));
