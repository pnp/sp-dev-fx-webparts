import { productName } from "./logic/productName";

const EMPTY_LIST_ID: string = "00000000-0000-0000-0000-000000000000";

export interface IPageListId {
  toString(): string;
}

export interface IPageListRef {
  id?: IPageListId | string;
}

export interface IPageListItemRef {
  id?: number | string;
}

export interface IPageLocation {
  pageListId?: string;
  pageItemId?: number;
  problem?: string;
}

export function readPageListId(list: IPageListRef | undefined): string | undefined {
  if (!list) {
    return undefined;
  }
  try {
    const rawId: unknown = (list as { id?: unknown }).id;
    if (typeof rawId === "string") {
      return normalizeListId(rawId);
    }
    if (typeof rawId === "object" && rawId && typeof (rawId as IPageListId).toString === "function") {
      return normalizeListId((rawId as IPageListId).toString());
    }
    return undefined;
  } catch (error) {
    console.error("[PageTrustStrip] Couldn't read the page list id.", error);
    return undefined;
  }
}

export function readPageItemId(item: IPageListItemRef | undefined): number | undefined {
  if (!item) {
    return undefined;
  }
  try {
    const rawId: unknown = (item as { id?: unknown }).id;
    if (typeof rawId === "number") {
      return wholeItemId(rawId);
    }
    if (typeof rawId === "string" && rawId.trim()) {
      return wholeItemId(Number(rawId));
    }
    return undefined;
  } catch (error) {
    console.error("[PageTrustStrip] Couldn't read the page item id.", error);
    return undefined;
  }
}

export function readPageLocation(
  readList: () => IPageListRef | undefined,
  readItem: () => IPageListItemRef | undefined
): IPageLocation {
  let list: IPageListRef | undefined;
  try {
    list = readList();
  } catch (error) {
    console.error("[PageTrustStrip] Couldn't read the page list.", error);
    return { problem: `${productName} couldn't read this page.` };
  }

  let item: IPageListItemRef | undefined;
  try {
    item = readItem();
  } catch (error) {
    console.error("[PageTrustStrip] Couldn't read the page item.", error);
    return { problem: `${productName} couldn't read this page.` };
  }

  return {
    pageListId: readPageListId(list),
    pageItemId: readPageItemId(item)
  };
}

function normalizeListId(value: string): string | undefined {
  const text: string = value.trim().replace(/^\{|\}$/g, "");
  if (!text || text.toLowerCase() === EMPTY_LIST_ID) {
    return undefined;
  }
  return text;
}

function wholeItemId(value: number): number | undefined {
  if (!Number.isFinite(value) || value <= 0 || Math.floor(value) !== value) {
    return undefined;
  }
  return value;
}
