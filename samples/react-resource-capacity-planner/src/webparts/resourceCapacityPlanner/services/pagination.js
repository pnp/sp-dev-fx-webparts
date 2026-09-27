'use strict';

function values(body) {
  if (body && Array.isArray(body.value)) return body.value;
  if (body && body.d && Array.isArray(body.d.results)) return body.d.results;
  return [];
}

function nextLink(body) { return body && (body['@odata.nextLink'] || (body.d && body.d.__next)); }
function pageUrl(endpoint, pageSize) { const url = new URL(endpoint); url.searchParams.set('$top', String(pageSize)); return url.toString(); }

async function fetchPaged(client, endpoint, pageSize, maxItems, pageHost) {
  const items = []; let url = pageUrl(endpoint, pageSize); let partial = false;
  for (let page = 0; page < Math.ceil(maxItems / pageSize); page += 1) {
    const response = await client.get(url);
    if (!response.ok) { const error = new Error(`SharePoint REST returned ${response.status}.`); error.status = response.status; throw error; }
    const body = await response.json(); items.push(...values(body).slice(0, maxItems - items.length));
    const link = nextLink(body);
    if (!link || items.length >= maxItems) { partial = Boolean(link); break; }
    const candidate = new URL(link, url);
    if (candidate.protocol !== 'https:' || candidate.host !== pageHost || !candidate.pathname.includes('/_api/')) throw new Error('Pagination link is not a safe same-tenant REST URL.');
    url = pageUrl(candidate.toString(), pageSize);
  }
  return { items, partial };
}

module.exports = { fetchPaged };
