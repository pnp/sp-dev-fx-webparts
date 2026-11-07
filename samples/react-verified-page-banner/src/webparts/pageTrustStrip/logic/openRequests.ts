import { pageKeyMaxLength, statusNew } from "../schema";

/**
 * PageLink is a Note column. SharePoint REST rejects $filter on Note fields,
 * so the count uses an indexed PageKey (the server-relative path) when that
 * column exists. Items created before PageKey are included by the same query
 * when their PageKey is empty and their PageLink points at this page.
 */

export interface IOpenRequestItem {
  Id?: number;
  PageKey?: unknown;
  PageLink?: unknown;
}

export type OpenCountMode = "indexed" | "legacy";

export interface IOpenCountPlan {
  mode: OpenCountMode;
  filter: string;
  selectFields: readonly string[];
}

export interface IOpenRequestViewInput {
  webAbsoluteUrl: string;
  defaultViewUrl?: string;
  pageUrl: string;
  pageKeyReady: boolean;
}

const INDEXED_SELECT: readonly string[] = ["Id", "PageKey", "PageLink"];
const LEGACY_SELECT: readonly string[] = ["Id", "PageLink"];

export function readText(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function hasControlCharacter(value: string): boolean {
  for (let index = 0; index < value.length; index++) {
    if (value.charCodeAt(index) < 32) {
      return true;
    }
  }
  return false;
}

function stripFrom(value: string, marker: string): string {
  const index = value.indexOf(marker);
  return index >= 0 ? value.substring(0, index) : value;
}

function decodePath(path: string): string {
  try {
    return decodeURIComponent(path);
  } catch (error) {
    if (!(error instanceof Error)) {
      throw error;
    }
    return path;
  }
}

/**
 * Server-relative path (no query, no hash), or undefined when it will not fit
 * in the indexed text column.
 */
export function pageKeyFromUrl(pageUrl: string | undefined): string | undefined {
  const trimmed = readText(pageUrl);
  if (!trimmed) {
    return undefined;
  }
  const withoutHash = stripFrom(trimmed, "#");
  let path: string | undefined;
  if (withoutHash.indexOf("https://") === 0 || withoutHash.indexOf("http://") === 0) {
    try {
      path = decodePath(new URL(withoutHash).pathname);
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }
      return undefined;
    }
  } else {
    const withoutQuery = stripFrom(withoutHash, "?");
    path = withoutQuery.charAt(0) === "/" ? decodePath(withoutQuery) : undefined;
  }
  if (!path || path.length > pageKeyMaxLength || hasControlCharacter(path)) {
    return undefined;
  }
  return path;
}

export function odataString(value: string): string {
  return value.replace(/'/g, "''");
}

export function planOpenCount(pageKeyReady: boolean, pageUrl: string): IOpenCountPlan {
  const key = pageKeyReady ? pageKeyFromUrl(pageUrl) : undefined;
  if (key) {
    return {
      mode: "indexed",
      filter: `Status eq '${statusNew}' and (PageKey eq '${odataString(key)}' or PageKey eq null)`,
      selectFields: INDEXED_SELECT
    };
  }
  return {
    mode: "legacy",
    filter: `Status eq '${statusNew}'`,
    selectFields: LEGACY_SELECT
  };
}

/** Used when the blank-PageKey comparison is rejected. Exact for rows that already have PageKey. */
export function strictOpenCountPlan(pageUrl: string): IOpenCountPlan | undefined {
  const key = pageKeyFromUrl(pageUrl);
  if (!key) {
    return undefined;
  }
  return {
    mode: "indexed",
    filter: `Status eq '${statusNew}' and PageKey eq '${odataString(key)}'`,
    selectFields: INDEXED_SELECT
  };
}

export function itemMatchesOpenRequest(item: IOpenRequestItem, pageUrl: string): boolean {
  const wanted = pageKeyFromUrl(pageUrl);
  if (!wanted) {
    return false;
  }
  const wantedKey = wanted.toLowerCase();
  const itemKey = readText(item.PageKey);
  if (itemKey) {
    const normalized = pageKeyFromUrl(itemKey) || itemKey;
    return normalized.toLowerCase() === wantedKey;
  }
  const linkKey = pageKeyFromUrl(readText(item.PageLink));
  return !!linkKey && linkKey.toLowerCase() === wantedKey;
}

export function countOpenReviewItems(items: readonly IOpenRequestItem[], pageUrl: string): number {
  let count = 0;
  for (let index = 0; index < items.length; index++) {
    if (itemMatchesOpenRequest(items[index], pageUrl)) {
      count += 1;
    }
  }
  return count;
}

export function openRequestBadgeLabel(count: number): string {
  if (count === 1) {
    return "1 open review request";
  }
  return `${count} open review requests`;
}

export function shouldShowOpenRequestBadge(
  canSee: boolean,
  count: number | undefined,
  viewUrl: string | undefined
): boolean {
  return canSee && typeof count === "number" && count > 0 && !!viewUrl && viewUrl.length > 0;
}

export function openRequestViewQuery(pageUrl: string, pageKeyReady: boolean): string {
  const status = `FilterField1=Status&FilterValue1=${encodeURIComponent(statusNew)}&FilterType1=Choice`;
  const key = pageKeyReady ? pageKeyFromUrl(pageUrl) : undefined;
  if (key) {
    return `${status}&FilterField2=PageKey&FilterValue2=${encodeURIComponent(key)}&FilterType2=Text`;
  }
  return `${status}&FilterField2=PageLink&FilterValue2=${encodeURIComponent(pageUrl)}&FilterType2=Note`;
}

function absoluteViewUrl(webAbsoluteUrl: string, defaultViewUrl: string | undefined): string | undefined {
  const web = readText(webAbsoluteUrl);
  if (defaultViewUrl && (defaultViewUrl.indexOf("https://") === 0 || defaultViewUrl.indexOf("http://") === 0)) {
    return defaultViewUrl;
  }
  if (!web) {
    return undefined;
  }
  if (defaultViewUrl && defaultViewUrl.charAt(0) === "/") {
    try {
      return new URL(web).origin + defaultViewUrl;
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }
      return undefined;
    }
  }
  const base = web.charAt(web.length - 1) === "/" ? web.substring(0, web.length - 1) : web;
  return `${base}/Lists/Page%20Review%20Requests/AllItems.aspx`;
}

function withQuery(viewUrl: string, query: string): string {
  const hashIndex = viewUrl.indexOf("#");
  const hash = hashIndex >= 0 ? viewUrl.substring(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? viewUrl.substring(0, hashIndex) : viewUrl;
  const joiner = withoutHash.indexOf("?") >= 0 ? "&" : "?";
  return `${withoutHash}${joiner}${query}${hash}`;
}

export function buildOpenRequestsViewUrl(input: IOpenRequestViewInput): string | undefined {
  const view = absoluteViewUrl(input.webAbsoluteUrl, input.defaultViewUrl);
  if (!view || !readText(input.pageUrl)) {
    return undefined;
  }
  return withQuery(view, openRequestViewQuery(input.pageUrl, input.pageKeyReady));
}
