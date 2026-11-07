import * as React from "react";
import * as ReactDom from "react-dom";
import { act } from "react-dom/test-utils";
import { PageTrustStripErrorBoundary } from "./PageTrustStripErrorBoundary";

function BrokenStrip(): React.ReactElement {
  throw new Error("broken strip");
}

function HealthyStrip(): React.ReactElement {
  return React.createElement("p", null, "Page trust recovered");
}

function renderInto(host: HTMLDivElement, element: React.ReactElement): void {
  act(() => {
    ReactDom.render(element, host);
  });
}

function unmountFrom(host: HTMLDivElement): void {
  act(() => {
    ReactDom.unmountComponentAtNode(host);
  });
  host.remove();
}

describe("PageTrustStripErrorBoundary", () => {
  it("shows a visible error and logs it with the PageTrustStrip prefix", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => undefined);
    const host = document.createElement("div");
    document.body.appendChild(host);
    renderInto(
      host,
      React.createElement(PageTrustStripErrorBoundary, { recovery: 0 }, React.createElement(BrokenStrip))
    );
    try {
      expect(host.textContent).toContain("Verified Page Banner hit a problem and could not show this banner.");
      expect(host.textContent).toContain("broken strip");
      expect(host.textContent).toContain("Try again");
      expect(spy.mock.calls.some((call) => String(call[0]).indexOf("[PageTrustStrip]") === 0)).toBe(true);
    } finally {
      unmountFrom(host);
      spy.mockRestore();
    }
  });

  it("mounts the strip again when the host advances recovery", () => {
    let recovery: number = 0;
    let broken: boolean = true;
    const host = document.createElement("div");
    document.body.appendChild(host);
    const render = (): void => {
      renderInto(
        host,
        React.createElement(
          PageTrustStripErrorBoundary,
          {
            recovery,
            onRetry: (): void => {
              broken = false;
              recovery += 1;
              render();
            }
          },
          broken ? React.createElement(BrokenStrip) : React.createElement(HealthyStrip)
        )
      );
    };
    const spy = jest.spyOn(console, "error").mockImplementation(() => undefined);
    try {
      render();
      const button = host.querySelector("button");
      if (!button) {
        throw new Error("Try again was not rendered.");
      }
      act(() => {
        button.click();
      });
      expect(host.textContent).toContain("Page trust recovered");
    } finally {
      unmountFrom(host);
      spy.mockRestore();
    }
  });
});
