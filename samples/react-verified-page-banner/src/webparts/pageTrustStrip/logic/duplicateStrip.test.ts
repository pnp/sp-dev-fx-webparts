import {
  duplicateNoteForInstance,
  duplicateStripMessage,
  isExtraStrip,
  registerStripInstance,
  resetStripRegistry,
  stripRegistryKey,
  subscribeStripRegistry,
  unregisterStripInstance
} from "./duplicateStrip";

describe("duplicate strip detection", () => {
  beforeEach(() => {
    resetStripRegistry();
  });

  it("treats only the later instances on the same page as extras", () => {
    const pageKey = stripRegistryKey("pages-list", 12);
    expect(registerStripInstance(pageKey, "first")).toBe(false);
    expect(registerStripInstance(pageKey, "second")).toBe(true);
    expect(registerStripInstance(pageKey, "third")).toBe(true);
    expect(registerStripInstance(pageKey, "first")).toBe(false);
    expect(isExtraStrip(pageKey, "second")).toBe(true);
  });

  it("keeps a different page independent", () => {
    const home = stripRegistryKey("pages-list", 1);
    const other = stripRegistryKey("pages-list", 2);
    registerStripInstance(home, "home-strip");
    expect(registerStripInstance(other, "other-strip")).toBe(false);
    expect(stripRegistryKey(undefined, undefined)).toBe("page-trust:no-page");
  });

  it("promotes the next instance when the first one leaves", () => {
    const pageKey = stripRegistryKey("pages-list", 4);
    registerStripInstance(pageKey, "first");
    registerStripInstance(pageKey, "second");
    unregisterStripInstance(pageKey, "first");
    expect(isExtraStrip(pageKey, "second")).toBe(false);
    unregisterStripInstance(pageKey, "second");
    expect(isExtraStrip(pageKey, "second")).toBe(false);
  });

  it("shows the note only in edit mode on an extra instance", () => {
    expect(duplicateNoteForInstance(true, true)).toBe(duplicateStripMessage);
    expect(duplicateStripMessage).toBe("There's already a Verified Page Banner on this page. One is enough.");
    expect(duplicateNoteForInstance(true, false)).toBeUndefined();
    expect(duplicateNoteForInstance(false, true)).toBeUndefined();
  });

  it("notifies listeners after the registry changes", async () => {
    const seen: number[] = [];
    const unsubscribe = subscribeStripRegistry(() => {
      seen.push(seen.length + 1);
    });
    registerStripInstance("page-trust:no-page", "only");
    await Promise.resolve();
    expect(seen).toEqual([1]);
    registerStripInstance("page-trust:no-page", "only");
    await Promise.resolve();
    expect(seen).toEqual([1]);
    unsubscribe();
    registerStripInstance("page-trust:no-page", "another");
    await Promise.resolve();
    expect(seen).toEqual([1]);
  });
});
