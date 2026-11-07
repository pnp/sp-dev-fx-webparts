import * as React from "react";
import * as ReactDom from "react-dom";
import { act } from "react-dom/test-utils";
import { webLightTheme } from "@fluentui/react-components";
import { VisitorFlagPane, type IVisitorFlagPaneProps } from "./VisitorFlagPane";

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

function paneProps(overrides: Partial<IVisitorFlagPaneProps>): IVisitorFlagPaneProps {
  return {
    instanceId: "pane",
    theme: webLightTheme,
    canManage: true,
    listReady: true,
    placedOnPage: true,
    visitorsCanFlag: false,
    onAllow: (): Promise<void> => Promise.resolve(),
    onStop: (): Promise<void> => Promise.resolve(),
    ...overrides
  };
}

function renderPane(element: React.ReactElement): HTMLDivElement {
  const host = document.createElement("div");
  document.body.appendChild(host);
  act(() => {
    ReactDom.render(element, host);
  });
  return host;
}

function unmountPane(host: HTMLDivElement): void {
  act(() => {
    ReactDom.unmountComponentAtNode(host);
  });
  host.remove();
}

function buttonByText(host: HTMLElement, text: string): HTMLButtonElement | undefined {
  const buttons = host.querySelectorAll("button");
  for (let index = 0; index < buttons.length; index++) {
    if ((buttons[index].textContent || "").indexOf(text) >= 0) {
      return buttons[index] as HTMLButtonElement;
    }
  }
  return undefined;
}

describe("Visitor flag property pane", () => {
  beforeAll(() => {
    (window as unknown as { ResizeObserver: typeof ResizeObserverStub }).ResizeObserver = ResizeObserverStub;
  });

  it("offers the action and explains the list-only permission change", () => {
    const host = renderPane(React.createElement(VisitorFlagPane, paneProps({})));
    try {
      expect(host.textContent).toContain("Let visitors flag pages");
      expect(host.textContent).toContain("Verified Page Banner");
      expect(host.textContent).toContain("Page Trust - Add only");
      expect(host.textContent).toContain("Site and page permissions stay the same.");
      expect(host.textContent).toContain("This changes the Page Review Requests list only.");
      expect(buttonByText(host, "Let visitors flag pages")).toBeDefined();
      expect(buttonByText(host, "Stop letting visitors flag pages")).toBeUndefined();
    } finally {
      unmountPane(host);
    }
  });

  it("shows the current granted status without asking again", () => {
    const host = renderPane(React.createElement(VisitorFlagPane, paneProps({
      visitorsCanFlag: true,
      feedbackSuccess: "Visitors can now flag pages."
    })));
    try {
      expect(host.textContent).toContain("Visitors can flag pages.");
      expect(host.textContent).toContain("Visitors can now flag pages.");
      expect(host.textContent).toContain("Stop letting visitors flag pages");
      expect(buttonByText(host, "Let visitors flag pages")).toBeUndefined();
      expect(buttonByText(host, "Stop letting visitors flag pages")).toBeDefined();
    } finally {
      unmountPane(host);
    }
  });

  it("shows a failure from the action in the pane", async () => {
    const host = renderPane(React.createElement(VisitorFlagPane, paneProps({
      onAllow: (): Promise<void> => Promise.reject(new Error("SharePoint said: You cannot customize permission levels in a web site with inherited permission levels."))
    })));
    try {
      const button = buttonByText(host, "Let visitors flag pages");
      expect(button).toBeDefined();
      await act(async () => {
        if (button) {
          button.click();
        }
        await Promise.resolve();
        await Promise.resolve();
      });
      expect(host.textContent).toContain("inherited permission levels");
    } finally {
      unmountPane(host);
    }
  });

  it("treats a fresh success message as enabled even before the list snapshot agrees", () => {
    const host = renderPane(React.createElement(VisitorFlagPane, paneProps({
      visitorsCanFlag: false,
      feedbackSuccess: "Visitors can now flag pages."
    })));
    try {
      expect(host.textContent).toContain("Visitors can flag pages.");
      expect(buttonByText(host, "Let visitors flag pages")).toBeUndefined();
      expect(buttonByText(host, "Stop letting visitors flag pages")).toBeDefined();
    } finally {
      unmountPane(host);
    }
  });

  it("turns visitor flagging off from the revert button", async () => {
    let stopped = false;
    const host = renderPane(React.createElement(VisitorFlagPane, paneProps({
      visitorsCanFlag: true,
      onStop: (): Promise<void> => {
        stopped = true;
        return Promise.resolve();
      }
    })));
    try {
      const button = buttonByText(host, "Stop letting visitors flag pages");
      expect(button).toBeDefined();
      await act(async () => {
        if (button) {
          button.click();
        }
        await Promise.resolve();
        await Promise.resolve();
      });
      expect(stopped).toBe(true);
    } finally {
      unmountPane(host);
    }
  });

  it("shows a failure from the revert action in the pane", async () => {
    const host = renderPane(React.createElement(VisitorFlagPane, paneProps({
      visitorsCanFlag: true,
      onStop: (): Promise<void> => Promise.reject(new Error("Verified Page Banner couldn't stop visitor flagging during remove role assignment. SharePoint said: Access denied."))
    })));
    try {
      const button = buttonByText(host, "Stop letting visitors flag pages");
      expect(button).toBeDefined();
      await act(async () => {
        if (button) {
          button.click();
        }
        await Promise.resolve();
        await Promise.resolve();
      });
      expect(host.textContent).toContain("remove role assignment");
      expect(host.textContent).toContain("Access denied.");
    } finally {
      unmountPane(host);
    }
  });

  it("keeps the action unavailable when the person cannot manage the site", () => {
    const host = renderPane(React.createElement(VisitorFlagPane, paneProps({ canManage: false })));
    try {
      expect(host.textContent).toContain("manage this site");
      expect(buttonByText(host, "Let visitors flag pages")).toBeUndefined();
      expect(buttonByText(host, "Stop letting visitors flag pages")).toBeUndefined();
    } finally {
      unmountPane(host);
    }

    const granted = renderPane(React.createElement(VisitorFlagPane, paneProps({
      canManage: false,
      visitorsCanFlag: true
    })));
    try {
      expect(buttonByText(granted, "Stop letting visitors flag pages")).toBeUndefined();
      expect(buttonByText(granted, "Let visitors flag pages")).toBeUndefined();
    } finally {
      unmountPane(granted);
    }
  });

  it("shows an error passed back into the pane after a refresh", () => {
    const host = renderPane(React.createElement(VisitorFlagPane, paneProps({
      feedbackError: "Page Trust couldn't let visitors flag pages during add role assignment. SharePoint said: Access denied. You do not have permission to perform this action or access this resource."
    })));
    try {
      expect(host.textContent).toContain("add role assignment");
      expect(host.textContent).toContain("Access denied.");
    } finally {
      unmountPane(host);
    }
  });
});
