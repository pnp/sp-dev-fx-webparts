import type { IPageTrustLoadRequest, IPageTrustSnapshot, PageTrustService } from "./PageTrustService";
import { schemaVersion } from "../schema";
import {
  readSchemaCache,
  schemaCacheKey,
  schemaCacheTtlMs,
  writeSchemaCache,
  type ISchemaCacheEntry,
  type ISchemaCacheStorage
} from "../logic/schemaCache";

jest.doMock("@pnp/sp", () => ({
  spfi: (): Record<string, never> => ({}),
  SPFx: (): Record<string, never> => ({}),
  PrincipalSource: { All: 15 },
  PrincipalType: { User: 1 }
}));
jest.doMock("@pnp/sp/webs", () => ({}));
jest.doMock("@pnp/sp/sites", () => ({}));
jest.doMock("@pnp/sp/lists", () => ({}));
jest.doMock("@pnp/sp/items", () => ({}));
jest.doMock("@pnp/sp/fields", () => ({
  AddFieldOptions: {
    AddFieldInternalNameHint: 8,
    AddToAllContentTypes: 4,
    AddFieldToDefaultView: 1
  }
}));
jest.doMock("@pnp/sp/security", () => ({
  PermissionKind: {
    ManageWeb: 31,
    EditListItems: 2,
    ManagePermissions: 27
  }
}));
jest.doMock("@pnp/sp/site-groups/web", () => ({}));
jest.doMock("@pnp/sp/site-users/web", () => ({}));
jest.doMock("@pnp/sp/sputilities", () => ({}));
jest.doMock("@pnp/sp/views", () => ({}));

class MemoryStorage implements ISchemaCacheStorage {
  public setItemError: Error | undefined;
  public getItemError: Error | undefined;
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

interface IFieldRow {
  InternalName: string;
  TypeAsString: string;
}

interface IFakeState {
  canManageWeb: boolean;
  canEdit: boolean;
  reviewLists: { Id: string; DefaultViewUrl?: string }[];
  pageTemplate: number;
  fieldsByList: { [listId: string]: IFieldRow[] };
  itemError: unknown;
  pageListError: unknown;
  reviewReads: number;
  fieldReads: string[];
  itemReads: number;
}

interface ISchemaProbes {
  _reviewList(): Promise<unknown>;
  _listHasFields(listId: string | undefined, specs: unknown[]): Promise<boolean>;
  _inspectFields(listId: string, specs: unknown[]): Promise<{ ready: boolean; problem?: string }>;
  _fieldsByName(listId: string, names: string[]): Promise<IFieldRow[]>;
  _ensureFields(listId: string, specs: unknown[]): Promise<void>;
  _ensureReviewList(): Promise<string>;
  _ensurePageKeyIndexed(listId: string): Promise<string | undefined>;
  _backfillPageKeys(listId: string): Promise<string | undefined>;
  _addFieldsToDefaultView(listId: string, names: string[]): Promise<string | undefined>;
}

const webUrl = "https://Contoso.sharepoint.com/sites/HR";
const pageListId = "11111111-1111-1111-1111-111111111111";
const reviewListId = "22222222-2222-2222-2222-222222222222";

const pageFields: IFieldRow[] = [
  { InternalName: "PageOwner", TypeAsString: "User" },
  { InternalName: "LastConfirmed", TypeAsString: "DateTime" }
];

const reviewFields: IFieldRow[] = [
  { InternalName: "PageTitle", TypeAsString: "Text" },
  { InternalName: "PageLink", TypeAsString: "Note" },
  { InternalName: "FlaggedBy", TypeAsString: "User" },
  { InternalName: "Note", TypeAsString: "Note" },
  { InternalName: "Status", TypeAsString: "Choice" },
  { InternalName: "PageKey", TypeAsString: "Text" }
];

function loadService(): new (sp: unknown, options?: {
  storage?: ISchemaCacheStorage;
  now?: () => number;
  schemaVersion?: string;
}) => PageTrustService {
  // Compiled tests run as CommonJS. jest.doMock is not hoisted above import statements,
  // so the service is loaded only after the @pnp/sp mocks exist.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return (require("./PageTrustService") as { PageTrustService: new (sp: unknown, options?: {
    storage?: ISchemaCacheStorage;
    now?: () => number;
    schemaVersion?: string;
  }) => PageTrustService }).PageTrustService;
}

function permissionKind(): { ManageWeb: number; EditListItems: number } {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return (require("@pnp/sp/security") as { PermissionKind: { ManageWeb: number; EditListItems: number } }).PermissionKind;
}

function readyState(): IFakeState {
  return {
    canManageWeb: false,
    canEdit: false,
    reviewLists: [{
      Id: reviewListId,
      DefaultViewUrl: "/sites/hr/Lists/Page Review Requests/AllItems.aspx"
    }],
    pageTemplate: 119,
    fieldsByList: {
      [pageListId]: pageFields.slice(),
      [reviewListId]: reviewFields.slice()
    },
    itemError: undefined,
    pageListError: undefined,
    reviewReads: 0,
    fieldReads: [],
    itemReads: 0
  };
}

function createSp(state: IFakeState): unknown {
  const kinds = permissionKind();
  const web = {
    getCurrentUserEffectivePermissions: (): Promise<Record<string, never>> => Promise.resolve({}),
    hasPermissions: (_permissions: unknown, kind: number): boolean => {
      if (kind === kinds.ManageWeb) {
        return state.canManageWeb;
      }
      if (kind === kinds.EditListItems) {
        return state.canEdit;
      }
      return false;
    },
    lists: {
      filter: (): { select: () => { top: () => () => Promise<{ Id: string; DefaultViewUrl?: string }[]> } } => ({
        select: (): { top: () => () => Promise<{ Id: string; DefaultViewUrl?: string }[]> } => ({
          top: (): (() => Promise<{ Id: string; DefaultViewUrl?: string }[]>) => (): Promise<{ Id: string; DefaultViewUrl?: string }[]> => {
            state.reviewReads += 1;
            return Promise.resolve(state.reviewLists);
          }
        })
      }),
      getById: (listId: string): {
        select: () => () => Promise<unknown>;
        items: { getById: (itemId: number) => { select: () => { expand: () => () => Promise<unknown> }; getCurrentUserEffectivePermissions: () => Promise<Record<string, never>> } };
        fields: { select: () => { filter: () => () => Promise<IFieldRow[]> } };
      } => ({
        select: (): (() => Promise<unknown>) => (): Promise<unknown> => {
          if (listId === pageListId && state.pageListError) {
            return Promise.reject(state.pageListError);
          }
          if (listId === pageListId) {
            return Promise.resolve({ Id: listId, BaseTemplate: state.pageTemplate });
          }
          return Promise.resolve({ Id: listId, HasUniqueRoleAssignments: false });
        },
        items: {
          getById: (_itemId: number): {
            select: () => { expand: () => () => Promise<unknown> };
            getCurrentUserEffectivePermissions: () => Promise<Record<string, never>>;
          } => ({
            select: (): { expand: () => () => Promise<unknown> } => ({
              expand: (): (() => Promise<unknown>) => (): Promise<unknown> => {
                state.itemReads += 1;
                if (state.itemError) {
                  return Promise.reject(state.itemError);
                }
                return Promise.resolve({
                  Id: 12,
                  Title: "Home",
                  FileRef: "/sites/hr/SitePages/Home.aspx",
                  Author: { Id: 3, Title: "Alex Morgan", EMail: "alex@contoso.com" },
                  PageOwner: { Id: 9, Title: "Sam Lee", EMail: "sam@contoso.com" },
                  LastConfirmed: "2026-10-25T00:00:00Z"
                });
              }
            }),
            getCurrentUserEffectivePermissions: (): Promise<Record<string, never>> => Promise.resolve({})
          })
        },
        fields: {
          select: (): { filter: () => () => Promise<IFieldRow[]> } => ({
            filter: (): (() => Promise<IFieldRow[]>) => (): Promise<IFieldRow[]> => {
              state.fieldReads.push(listId);
              return Promise.resolve(state.fieldsByList[listId] || []);
            }
          })
        }
      })
    }
  };
  return { web };
}

function request(): IPageTrustLoadRequest {
  return {
    pageListId,
    pageItemId: 12,
    webAbsoluteUrl: webUrl,
    currentUser: { displayName: "Alex Morgan", email: "alex@contoso.com" }
  };
}

function serviceFor(state: IFakeState, storage: MemoryStorage, now: () => number, version?: string): PageTrustService {
  const Service = loadService();
  return new Service(createSp(state), {
    storage,
    now,
    schemaVersion: version || schemaVersion
  });
}

function probesOf(service: PageTrustService): ISchemaProbes {
  return service as unknown as ISchemaProbes;
}

function readyEntry(cachedAt: number): ISchemaCacheEntry {
  return {
    reviewListId,
    listReady: true,
    columnsReady: true,
    cachedAt,
    pageKeyReady: true,
    reviewListDefaultViewUrl: "/sites/hr/Lists/Page Review Requests/AllItems.aspx"
  };
}

describe("PageTrustService schema cache", () => {
  it("lets a reader skip schema inspection on the second load inside the TTL", async () => {
    const state = readyState();
    const storage = new MemoryStorage();
    let now = 5_000;
    const service = serviceFor(state, storage, () => now);
    const probes = probesOf(service);
    const reviewSpy = jest.spyOn(probes, "_reviewList");
    const listHasSpy = jest.spyOn(probes, "_listHasFields");
    const inspectSpy = jest.spyOn(probes, "_inspectFields");
    const fieldsSpy = jest.spyOn(probes, "_fieldsByName");

    const first = await service.load(request());
    expect(first.columnsReady).toBe(true);
    expect(first.listReady).toBe(true);
    expect(first.pageKeyReady).toBe(true);
    expect(first.pageOwner && first.pageOwner.displayName).toBe("Sam Lee");
    expect(reviewSpy).toHaveBeenCalled();
    expect(listHasSpy).toHaveBeenCalled();
    expect(inspectSpy).toHaveBeenCalled();
    expect(fieldsSpy).toHaveBeenCalled();
    const reviewCalls = state.reviewReads;
    const fieldCalls = state.fieldReads.length;
    const itemCalls = state.itemReads;
    expect(reviewCalls).toBeGreaterThan(0);
    expect(fieldCalls).toBeGreaterThan(0);

    reviewSpy.mockClear();
    listHasSpy.mockClear();
    inspectSpy.mockClear();
    fieldsSpy.mockClear();
    now = 5_000 + schemaCacheTtlMs - 1;
    const second = await service.load(request());

    expect(second.columnsReady).toBe(true);
    expect(second.listReady).toBe(true);
    expect(second.pageKeyReady).toBe(true);
    expect(second.pageOwner && second.pageOwner.displayName).toBe("Sam Lee");
    expect(second.reviewListDefaultViewUrl).toBe("/sites/hr/Lists/Page Review Requests/AllItems.aspx");
    expect(reviewSpy).not.toHaveBeenCalled();
    expect(listHasSpy).not.toHaveBeenCalled();
    expect(inspectSpy).not.toHaveBeenCalled();
    expect(fieldsSpy).not.toHaveBeenCalled();
    expect(state.reviewReads).toBe(reviewCalls);
    expect(state.fieldReads.length).toBe(fieldCalls);
    expect(state.itemReads).toBe(itemCalls + 1);
  });

  it("rechecks the schema for a site owner even when a fresh cache entry exists", async () => {
    const state = readyState();
    state.canManageWeb = true;
    const storage = new MemoryStorage();
    const now = 8_000;
    writeSchemaCache(storage, schemaCacheKey(webUrl, pageListId, schemaVersion), readyEntry(now));
    const service = serviceFor(state, storage, () => now);
    const probes = probesOf(service);
    const reviewSpy = jest.spyOn(probes, "_reviewList");
    const inspectSpy = jest.spyOn(probes, "_inspectFields");
    const fieldsSpy = jest.spyOn(probes, "_fieldsByName");

    const snapshot = await service.load(request());

    expect(snapshot.canManageWeb).toBe(true);
    expect(snapshot.columnsReady).toBe(true);
    expect(reviewSpy).toHaveBeenCalled();
    expect(inspectSpy).toHaveBeenCalled();
    expect(fieldsSpy).toHaveBeenCalled();
    expect(state.reviewReads).toBeGreaterThan(0);
    expect(state.fieldReads.length).toBeGreaterThan(0);
  });

  it("checks SharePoint again after the cache entry expires", async () => {
    const state = readyState();
    const storage = new MemoryStorage();
    let now = 1_000;
    const service = serviceFor(state, storage, () => now);
    await service.load(request());
    const reviewCalls = state.reviewReads;
    const fieldCalls = state.fieldReads.length;

    now = 1_000 + schemaCacheTtlMs;
    const snapshot = await service.load(request());

    expect(snapshot.columnsReady).toBe(true);
    expect(state.reviewReads).toBeGreaterThan(reviewCalls);
    expect(state.fieldReads.length).toBeGreaterThan(fieldCalls);
    const refreshed = readSchemaCache(storage, schemaCacheKey(webUrl, pageListId, schemaVersion), now, schemaCacheTtlMs);
    expect(refreshed && refreshed.cachedAt).toBe(now);
  });

  it("does not cache a missing list or a column the banner cannot use", async () => {
    const missingList = readyState();
    missingList.reviewLists = [];
    const missingStorage = new MemoryStorage();
    const missing = await serviceFor(missingList, missingStorage, () => 50).load(request());
    expect(missing.listReady).toBe(false);
    expect(readSchemaCache(missingStorage, schemaCacheKey(webUrl, pageListId, schemaVersion), 50, schemaCacheTtlMs)).toBeUndefined();

    const wrongType = readyState();
    wrongType.fieldsByList[pageListId] = [
      { InternalName: "PageOwner", TypeAsString: "Text" },
      { InternalName: "LastConfirmed", TypeAsString: "DateTime" }
    ];
    const wrongStorage = new MemoryStorage();
    const broken = await serviceFor(wrongType, wrongStorage, () => 50).load(request());
    expect(broken.columnsReady).toBe(false);
    expect(broken.columnProblem).toBeTruthy();
    expect(readSchemaCache(wrongStorage, schemaCacheKey(webUrl, pageListId, schemaVersion), 50, schemaCacheTtlMs)).toBeUndefined();
  });

  it("drops a cached reader entry and returns the live schema when a column was deleted", async () => {
    const state = readyState();
    const storage = new MemoryStorage();
    const service = serviceFor(state, storage, () => 20_000);
    const probes = probesOf(service);
    const inspectSpy = jest.spyOn(probes, "_inspectFields");
    await service.load(request());
    inspectSpy.mockClear();
    expect(readSchemaCache(storage, schemaCacheKey(webUrl, pageListId, schemaVersion), 20_000, schemaCacheTtlMs)).toBeDefined();

    state.itemError = Object.assign(new Error("The field or property 'PageOwner' does not exist."), { status: 400 });
    state.fieldsByList[pageListId] = [{ InternalName: "LastConfirmed", TypeAsString: "DateTime" }];
    const healed: IPageTrustSnapshot = await service.load(request());

    expect(healed.columnsReady).toBe(false);
    expect(healed.listReady).toBe(true);
    expect(inspectSpy).toHaveBeenCalled();
    expect(readSchemaCache(storage, schemaCacheKey(webUrl, pageListId, schemaVersion), 20_000, schemaCacheTtlMs)).toBeUndefined();
  });

  it("drops a cached reader entry when the review list was deleted", async () => {
    const state = readyState();
    const storage = new MemoryStorage();
    const service = serviceFor(state, storage, () => 20_000);
    await service.load(request());

    state.pageListError = Object.assign(new Error("List does not exist."), { status: 404 });
    state.reviewLists = [];
    const healed = await service.load(request());

    expect(healed.listReady).toBe(false);
    expect(healed.columnsReady).toBe(false);
    expect(readSchemaCache(storage, schemaCacheKey(webUrl, pageListId, schemaVersion), 20_000, schemaCacheTtlMs)).toBeUndefined();
  });

  it("keeps the cache when the page item fails for a reason other than a missing column or list", async () => {
    const state = readyState();
    const storage = new MemoryStorage();
    const service = serviceFor(state, storage, () => 3_000);
    await service.load(request());
    state.itemError = Object.assign(new Error("Item does not exist. It may have been deleted by another user."), { status: 404 });

    await expect(service.load(request())).rejects.toThrow("The page, list, or column could not be found.");
    expect(readSchemaCache(storage, schemaCacheKey(webUrl, pageListId, schemaVersion), 3_000, schemaCacheTtlMs)).toBeDefined();
  });

  it("ignores a cache entry written for an older schema fingerprint", async () => {
    const state = readyState();
    const storage = new MemoryStorage();
    const older = "older-schema";
    writeSchemaCache(storage, schemaCacheKey(webUrl, pageListId, older), readyEntry(4_000));
    const service = serviceFor(state, storage, () => 4_000, schemaVersion);
    const probes = probesOf(service);
    const reviewSpy = jest.spyOn(probes, "_reviewList");
    const fieldsSpy = jest.spyOn(probes, "_fieldsByName");

    const snapshot = await service.load(request());

    expect(snapshot.columnsReady).toBe(true);
    expect(reviewSpy).toHaveBeenCalled();
    expect(fieldsSpy).toHaveBeenCalled();
    expect(readSchemaCache(storage, schemaCacheKey(webUrl, pageListId, older), 4_000, schemaCacheTtlMs)).toBeDefined();
    expect(readSchemaCache(storage, schemaCacheKey(webUrl, pageListId, schemaVersion), 4_000, schemaCacheTtlMs)).toBeDefined();
  });

  it("still loads when sessionStorage throws", async () => {
    const state = readyState();
    const storage = new MemoryStorage();
    storage.getItemError = new Error("private browsing");
    storage.setItemError = new Error("private browsing");
    const snapshot = await serviceFor(state, storage, () => 9).load(request());
    expect(snapshot.columnsReady).toBe(true);
    expect(snapshot.listReady).toBe(true);
    expect(snapshot.pageTitle).toBe("Home");
  });

  it("writes a ready cache entry when setup completes", async () => {
    const state = readyState();
    const storage = new MemoryStorage();
    const service = serviceFor(state, storage, () => 70_000);
    const probes = probesOf(service);
    jest.spyOn(probes, "_ensureFields").mockResolvedValue(undefined);
    jest.spyOn(probes, "_ensureReviewList").mockResolvedValue(reviewListId);
    jest.spyOn(probes, "_ensurePageKeyIndexed").mockResolvedValue(undefined);
    jest.spyOn(probes, "_backfillPageKeys").mockResolvedValue(undefined);
    jest.spyOn(probes, "_addFieldsToDefaultView").mockResolvedValue(undefined);

    const message = await service.setup(pageListId, webUrl);
    const entry = readSchemaCache(storage, schemaCacheKey(webUrl, pageListId, schemaVersion), 70_000, schemaCacheTtlMs);

    expect(message.indexOf("is set up") >= 0).toBe(true);
    expect(entry && entry.reviewListId).toBe(reviewListId);
    expect(entry && entry.listReady).toBe(true);
    expect(entry && entry.columnsReady).toBe(true);
    expect(entry && entry.pageKeyReady).toBe(true);
  });
});
