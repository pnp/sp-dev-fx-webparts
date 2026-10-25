import {
  computeSchemaVersion,
  fnv1a32,
  reviewListTitle,
  schemaFingerprintParts,
  schemaVersion,
  type ISchemaFingerprint
} from "./schema";
import {
  readSchemaCache,
  schemaCacheKey,
  schemaCacheTtlMs,
  writeSchemaCache,
  type ISchemaCacheStorage
} from "./logic/schemaCache";

class MemoryStorage implements ISchemaCacheStorage {
  private readonly _items: { [key: string]: string } = {};

  public getItem(key: string): string | undefined {
    return Object.prototype.hasOwnProperty.call(this._items, key) ? this._items[key] : undefined;
  }

  public setItem(key: string, value: string): void {
    this._items[key] = value;
  }

  public removeItem(key: string): void {
    delete this._items[key];
  }
}

function copyParts(): ISchemaFingerprint[] {
  const source = schemaFingerprintParts();
  const parts: ISchemaFingerprint[] = [];
  for (let index = 0; index < source.length; index++) {
    parts.push({
      name: source[index].name,
      type: source[index].type,
      schemaXml: source[index].schemaXml
    });
  }
  return parts;
}

describe("schema fingerprint", () => {
  it("hashes the list title and every required field", () => {
    expect(schemaVersion).toBe(computeSchemaVersion(reviewListTitle, schemaFingerprintParts()));
    expect(fnv1a32("verified-page-banner")).toBe(fnv1a32("verified-page-banner"));
    expect(schemaVersion).toMatch(/^[0-9a-f]{8}$/);
  });

  it("changes when a field name, type, schema XML, or the list title changes", () => {
    const renamed = copyParts();
    renamed[0] = { name: `${renamed[0].name}Extra`, type: renamed[0].type, schemaXml: renamed[0].schemaXml };
    const retyped = copyParts();
    retyped[1] = { name: retyped[1].name, type: "Text", schemaXml: retyped[1].schemaXml };
    const rewritten = copyParts();
    rewritten[2] = { name: rewritten[2].name, type: rewritten[2].type, schemaXml: `${rewritten[2].schemaXml}<Extra />` };

    expect(computeSchemaVersion(reviewListTitle, renamed)).not.toBe(schemaVersion);
    expect(computeSchemaVersion(reviewListTitle, retyped)).not.toBe(schemaVersion);
    expect(computeSchemaVersion(reviewListTitle, rewritten)).not.toBe(schemaVersion);
    expect(computeSchemaVersion("Page Review Requests renamed", schemaFingerprintParts())).not.toBe(schemaVersion);
  });

  it("a new fingerprint misses a sessionStorage entry written for the previous schema", () => {
    const web = "https://contoso.sharepoint.com/sites/hr";
    const pageListId = "11111111-1111-1111-1111-111111111111";
    const renamed = copyParts();
    renamed[0] = { name: "PageOwnerRenamed", type: renamed[0].type, schemaXml: renamed[0].schemaXml };
    const previous = computeSchemaVersion(reviewListTitle, schemaFingerprintParts());
    const next = computeSchemaVersion(reviewListTitle, renamed);
    const storage = new MemoryStorage();
    const previousKey = schemaCacheKey(web, pageListId, previous);
    writeSchemaCache(storage, previousKey, {
      reviewListId: "22222222-2222-2222-2222-222222222222",
      listReady: true,
      columnsReady: true,
      cachedAt: 10,
      pageKeyReady: true
    });

    expect(next).not.toBe(previous);
    expect(schemaCacheKey(web, pageListId, next)).not.toBe(previousKey);
    expect(readSchemaCache(storage, schemaCacheKey(web, pageListId, next), 10, schemaCacheTtlMs)).toBeUndefined();
    expect(readSchemaCache(storage, previousKey, 10, schemaCacheTtlMs)).toBeDefined();
  });
});
