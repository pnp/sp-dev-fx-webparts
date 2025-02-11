import type { PartialTheme } from "@fluentui/react/lib/Theme";
import { ThemeProvider } from "@fluentui/react/lib/Theme";
import { WindowProvider } from "@fluentui/react/lib/WindowProvider";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { UIUtilities } from "../Ribbon/type/UIUtilities";

/**
 * Create the UI Utilities object for plugins to render additional react components
 * @param container Container DIV of editor
 * @param theme Current theme used by editor
 * @returns A UIUtilities object
 */
export function CreateUIUtilities(container: HTMLDivElement, theme: PartialTheme): UIUtilities {
  return {
    renderComponent: (element) => {
      const doc = container.ownerDocument;
      const div = doc.createElement("div");
      doc.body.appendChild(div);

      ReactDOM.render(
        <WindowProvider window={doc.defaultView!}>
          <ThemeProvider theme={theme}>{element}</ThemeProvider>
        </WindowProvider>,
        div,
      );

      return () => {
        ReactDOM.unmountComponentAtNode(div);
        doc.body.removeChild(div);
      };
    },
    isRightToLeft: () => {
      const dir = container && container.ownerDocument.defaultView?.getComputedStyle(container).direction;

      return dir === "rtl";
    },
  };
}
