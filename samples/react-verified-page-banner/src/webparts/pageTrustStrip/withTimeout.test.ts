import { PAGE_TRUST_LOAD_TIMEOUT_MESSAGE, PAGE_TRUST_LOAD_TIMEOUT_MS, withTimeout } from "./withTimeout";

describe("withTimeout", () => {
  it("waits about fifteen seconds before giving up on a page load", () => {
    expect(PAGE_TRUST_LOAD_TIMEOUT_MS).toBe(15000);
    expect(PAGE_TRUST_LOAD_TIMEOUT_MESSAGE).toContain("too long");
    expect(PAGE_TRUST_LOAD_TIMEOUT_MESSAGE).not.toContain("Try again");
  });

  it("returns the value when the operation finishes in time", async () => {
    await expect(withTimeout(Promise.resolve("ready"), 200, "too slow")).resolves.toBe("ready");
  });

  it("rejects with the timeout message when the operation does not finish", async () => {
    const pending: Promise<string> = new Promise<string>(() => undefined);
    await expect(withTimeout(pending, 20, "too slow")).rejects.toThrow("too slow");
  });

  it("keeps the original failure when that arrives first", async () => {
    await expect(withTimeout(Promise.reject(new Error("sharepoint failed")), 200, "too slow")).rejects.toThrow("sharepoint failed");
  });

  it("ignores a success that arrives after the timeout", async () => {
    let resolveLate: (value: string) => void = () => undefined;
    const pending: Promise<string> = new Promise<string>((resolve) => {
      resolveLate = resolve;
    });
    await expect(withTimeout(pending, 20, "too slow")).rejects.toThrow("too slow");
    resolveLate("late");
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 20);
    });
  });

  it("ignores a failure that arrives after the timeout", async () => {
    let rejectLate: (error: Error) => void = () => undefined;
    const pending: Promise<string> = new Promise<string>((_resolve, reject) => {
      rejectLate = reject;
    });
    await expect(withTimeout(pending, 20, "too slow")).rejects.toThrow("too slow");
    rejectLate(new Error("late failure"));
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 20);
    });
  });
});
