import { PageTrustError } from "../errors";
import {
  clearSchemaCache,
  isSchemaLostError,
  isSchemaMissingFailure,
  readSchemaCache,
  schemaCacheKey,
  schemaCacheTtlMs,
  schemaLostError,
  writeSchemaCache,
  type ISchemaCacheEntry,
  type ISchemaCacheStorage
} from "./schemaCache";

class MemoryStorage implements ISchemaCacheStorage {
  public getItemError: Error | undefined;
  public setItemError: Error | undefined;
  private readonly _items: { [key: string]: string } = {};

  public getItem(key: string): string | undefined {
    if (this.getItemError) {
      throw this.getItemError;
    }
    return Object.prototype.hasOwnProperty.call(this._items, key) ? this._items[key] : undefined;
  }

  public setItem(key: string, value: string): void {
    if (this.setItemError) {
      throw this.setItemError;
    }
    this._items[key] = value;
  }

  public removeItem(key: string): void {
    delete this._items[key];
  }
}

const ready: ISchemaCacheEntry = {
  reviewListId: "22222222-2222-2222-2222-222222222222",
  listReady: true,
  columnsReady: true,
  cachedAt: 1_000,
  pageKeyReady: true,
  reviewListDefaultViewUrl: "/sites/hr/Lists/Page%20Review%20Requests/AllItems.aspx"
};

describe("schema cache", () => {
  it("builds a key from the schema fingerprint, site, and page library", () => {
    const key = schemaCacheKey("https://Contoso.sharepoint.com/sites/HR/", "ABC-DEF", "abc123");
    expect(key).toBe("verifiedPageBanner:schema:v1:abc123:https://contoso.sharepoint.com/sites/hr/:abc-def");
  });

  it("returns a fresh ready entry and drops an expired one", () => {
    const storage = new MemoryStorage();
    const key = schemaCacheKey("https://contoso.sharepoint.com/sites/hr", "page-list", "v");
    writeSchemaCache(storage, key, ready);

    expect(readSchemaCache(storage, key, ready.cachedAt + schemaCacheTtlMs - 1, schemaCacheTtlMs)).toEqual(ready);
    expect(readSchemaCache(storage, key, ready.cachedAt + schemaCacheTtlMs, schemaCacheTtlMs)).toBeUndefined();
    expect(storage.getItem(key)).toBeUndefined();
  });

  it("does not keep an entry that is not fully ready", () => {
    const storage = new MemoryStorage();
    const key = schemaCacheKey("https://contoso.sharepoint.com/sites/hr", "page-list", "v");
    writeSchemaCache(storage, key, {
      reviewListId: "",
      listReady: true,
      columnsReady: true,
      cachedAt: 1,
      pageKeyReady: false
    });
    writeSchemaCache(storage, key, {
      reviewListId: "list",
      listReady: false,
      columnsReady: true,
      cachedAt: 1,
      pageKeyReady: false
    } as unknown as ISchemaCacheEntry);

    expect(storage.getItem(key)).toBeUndefined();
  });

  it("ignores storage that throws", () => {
    const storage = new MemoryStorage();
    const key = schemaCacheKey("https://contoso.sharepoint.com/sites/hr", "page-list", "v");
    storage.setItemError = new Error("blocked");
    writeSchemaCache(storage, key, ready);
    storage.setItemError = undefined;
    storage.getItemError = new Error("blocked");
    expect(readSchemaCache(storage, key, ready.cachedAt, schemaCacheTtlMs)).toBeUndefined();
    storage.getItemError = undefined;
    writeSchemaCache(storage, key, ready);
    storage.removeItem = (): void => {
      throw new Error("blocked");
    };
    expect(() => clearSchemaCache(storage, key)).not.toThrow();
  });

  it("treats a deleted column or list as a schema miss, and a deleted item as something else", () => {
    expect(isSchemaMissingFailure(Object.assign(new Error("The field or property 'PageOwner' does not exist."), { status: 400 }))).toBe(true);
    expect(isSchemaMissingFailure(Object.assign(new Error("List does not exist."), { status: 404 }))).toBe(true);
    expect(isSchemaMissingFailure(Object.assign(new Error("Item does not exist. It may have been deleted by another user."), { status: 404 }))).toBe(false);
    expect(isSchemaMissingFailure(Object.assign(new Error("Access denied."), { status: 403 }))).toBe(false);
    expect(isSchemaMissingFailure(new PageTrustError("Verified Page Banner couldn't load this page."))).toBe(false);
    const lost = schemaLostError();
    expect(isSchemaLostError(lost)).toBe(true);
    expect(lost.message.indexOf("list or column is missing") >= 0).toBe(true);
  });
});
