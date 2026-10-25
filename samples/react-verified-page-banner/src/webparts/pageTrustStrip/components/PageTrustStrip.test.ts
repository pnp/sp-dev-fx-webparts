import * as React from "react";
import * as ReactDom from "react-dom";
import { act } from "react-dom/test-utils";
import { webLightTheme } from "@fluentui/react-components";
import { duplicateStripMessage } from "../logic/duplicateStrip";
import { PageTrustStrip } from "./PageTrustStrip";
import type { IPageTrustStripProps } from "./IPageTrustStripProps";

const resolved: Promise<void> = Promise.resolve();

class ResizeObserverStub {
  public observe(): void {
    return undefined;
  }

  public unobserve(): void {
    return undefined;
  }

  public disconnect(): void {
    return undefined;
  }
}

function props(overrides: Partial<IPageTrustStripProps>): IPageTrustStripProps {
  return {
    instanceId: "8b58fa13-2d75-40ed-9b7a-ff824e84547d",
    theme: webLightTheme,
    loading: false,
    placedOnPage: true,
    columnsReady: true,
    listReady: true,
    canManageWeb: false,
    canConfirm: false,
    ownerName: "Alex Morgan",
    ownerIsAuthorFallback: false,
    status: "current",
    reviewPeriodDays: 90,
    onRetry: (): void => undefined,
    onConfirm: (): Promise<void> => resolved,
    onSetup: (): Promise<void> => resolved,
    onSubmitFlag: (): Promise<void> => resolved,
    ...overrides
  };
}

function renderStrip(element: React.ReactElement): HTMLDivElement {
  const host = document.createElement("div");
  document.body.appendChild(host);
  act(() => {
    ReactDom.render(element, host);
  });
  return host;
}

function unmountStrip(host: HTMLDivElement): void {
  act(() => {
    ReactDom.unmountComponentAtNode(host);
  });
  host.remove();
}

describe("PageTrustStrip", () => {
  beforeAll(() => {
    (window as unknown as { ResizeObserver: typeof ResizeObserverStub }).ResizeObserver = ResizeObserverStub;
  });

  it("paints a spinner instead of an empty root while loading", () => {
    const host = renderStrip(React.createElement(PageTrustStrip, props({ loading: true })));
    try {
      expect(host.textContent).toContain("Loading Verified Page Banner");
      expect(host.querySelector("[aria-busy='true']")).not.toBeNull();
    } finally {
      unmountStrip(host);
    }
  });

  it("shows an open review badge that links to the filtered list", () => {
    const href = "https://contoso.sharepoint.com/sites/hr/Lists/Page%20Review%20Requests/AllItems.aspx?FilterField1=Status&FilterValue1=New&FilterField2=PageKey&FilterValue2=%2Fsites%2Fhr%2FSitePages%2FHome.aspx";
    const host = renderStrip(React.createElement(PageTrustStrip, props({
      canSeeOpenRequests: true,
      openRequestCount: 3,
      openRequestsUrl: href
    })));
    try {
      const link = host.querySelector("a");
      expect(link).not.toBeNull();
      expect(link && link.getAttribute("href")).toBe(href);
      expect(link && link.textContent).toContain("3 open review requests");
    } finally {
      unmountStrip(host);
    }
  });

  it("hides the open review badge when there are none or the person cannot edit", () => {
    const quiet = renderStrip(React.createElement(PageTrustStrip, props({
      canSeeOpenRequests: true,
      openRequestCount: 0,
      openRequestsUrl: "https://contoso.sharepoint.com/lists"
    })));
    try {
      expect(quiet.textContent).not.toContain("open review");
    } finally {
      unmountStrip(quiet);
    }

    const reader = renderStrip(React.createElement(PageTrustStrip, props({
      canSeeOpenRequests: false,
      openRequestCount: 4,
      openRequestsUrl: "https://contoso.sharepoint.com/lists"
    })));
    try {
      expect(reader.textContent).not.toContain("open review");
    } finally {
      unmountStrip(reader);
    }
  });

  it("shows the duplicate note when one is provided", () => {
    const host = renderStrip(React.createElement(PageTrustStrip, props({
      duplicateNote: duplicateStripMessage
    })));
    try {
      expect(host.textContent).toContain("There's already a Verified Page Banner on this page. One is enough.");
    } finally {
      unmountStrip(host);
    }
  });

  it("keeps Let visitors flag pages off the page canvas", () => {
    const setup = renderStrip(React.createElement(PageTrustStrip, props({
      canManageWeb: true,
      columnsReady: false,
      listReady: false,
      canConfirm: false,
      ownerName: undefined,
      status: "unavailable"
    })));
    try {
      expect(setup.textContent).toContain("Verified Page Banner");
      expect(setup.textContent).toContain("Letting visitors flag pages is in the web part properties.");
      expect(setup.textContent).not.toContain("Let visitors flag pages");
      expect(setup.textContent).toContain("Set up Verified Page Banner");
    } finally {
      unmountStrip(setup);
    }

    const ready = renderStrip(React.createElement(PageTrustStrip, props({
      canManageWeb: true,
      ownerIsAuthorFallback: true
    })));
    try {
      expect(ready.textContent).not.toContain("Let visitors flag pages");
      expect(ready.textContent).not.toContain("Visitors can flag pages.");
      expect(ready.textContent).toContain("Author (no owner set)");
    } finally {
      unmountStrip(ready);
    }
  });

  it("shows the load error and Try again when the page could not be read", () => {
    const host = renderStrip(React.createElement(PageTrustStrip, props({
      loading: false,
      placedOnPage: false,
      columnsReady: false,
      loadError: "Verified Page Banner took too long to load this page."
    })));
    try {
      expect(host.textContent).toContain("Verified Page Banner");
      expect(host.textContent).toContain("Verified Page Banner took too long to load this page.");
      expect(host.textContent).toContain("Try again");
    } finally {
      unmountStrip(host);
    }
  });
});
