import { readPageItemId, readPageListId, readPageLocation } from "./pageLocation";

describe("readPageListId", () => {
  it("reads a list id string", () => {
    expect(readPageListId({ id: " 8B58FA13-2D75-40ED-9B7A-FF824E84547D " })).toBe("8B58FA13-2D75-40ED-9B7A-FF824E84547D");
  });

  it("reads a Guid-like object and strips braces", () => {
    expect(readPageListId({ id: { toString: () => "{8b58fa13-2d75-40ed-9b7a-ff824e84547d}" } })).toBe("8b58fa13-2d75-40ed-9b7a-ff824e84547d");
  });

  it("treats a missing list, a missing id, and the empty guid as no page", () => {
    expect(readPageListId(undefined)).toBeUndefined();
    expect(readPageListId({})).toBeUndefined();
    expect(readPageListId({ id: undefined })).toBeUndefined();
    expect(readPageListId({ id: "00000000-0000-0000-0000-000000000000" })).toBeUndefined();
    expect(readPageListId({ id: "   " })).toBeUndefined();
  });

  it("logs and returns undefined when the id cannot be read", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => undefined);
    const id = {
      toString: (): string => {
        throw new Error("bad guid");
      }
    };
    expect(readPageListId({ id })).toBeUndefined();
    expect(spy.mock.calls.some((call) => String(call[0]).indexOf("[PageTrustStrip]") === 0)).toBe(true);
    spy.mockRestore();
  });
});

describe("readPageItemId", () => {
  it("reads a positive whole item id", () => {
    expect(readPageItemId({ id: 12 })).toBe(12);
    expect(readPageItemId({ id: " 8 " })).toBe(8);
  });

  it("rejects missing, zero, fractional, and non-numeric ids", () => {
    expect(readPageItemId(undefined)).toBeUndefined();
    expect(readPageItemId({})).toBeUndefined();
    expect(readPageItemId({ id: undefined })).toBeUndefined();
    expect(readPageItemId({ id: 0 })).toBeUndefined();
    expect(readPageItemId({ id: -3 })).toBeUndefined();
    expect(readPageItemId({ id: 1.5 })).toBeUndefined();
    expect(readPageItemId({ id: "nope" })).toBeUndefined();
  });
});

describe("readPageLocation", () => {
  it("returns both ids when the page context can be read", () => {
    expect(readPageLocation(
      () => ({ id: "8b58fa13-2d75-40ed-9b7a-ff824e84547d" }),
      () => ({ id: 4 })
    )).toEqual({
      pageListId: "8b58fa13-2d75-40ed-9b7a-ff824e84547d",
      pageItemId: 4
    });
  });

  it("logs and reports a problem when reading the list throws", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => undefined);
    const location = readPageLocation(() => {
      throw new Error("list unavailable");
    }, () => ({ id: 4 }));
    expect(location.problem).toBe("Verified Page Banner couldn't read this page.");
    expect(location.pageListId).toBeUndefined();
    expect(spy.mock.calls.some((call) => String(call[0]).indexOf("[PageTrustStrip]") === 0)).toBe(true);
    spy.mockRestore();
  });

  it("logs and reports a problem when reading the list item throws", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => undefined);
    const location = readPageLocation(
      () => ({ id: "8b58fa13-2d75-40ed-9b7a-ff824e84547d" }),
      () => {
        throw new Error("item unavailable");
      }
    );
    expect(location.problem).toBe("Verified Page Banner couldn't read this page.");
    expect(spy.mock.calls.some((call) => String(call[0]).indexOf("[PageTrustStrip]") === 0)).toBe(true);
    spy.mockRestore();
  });
});
