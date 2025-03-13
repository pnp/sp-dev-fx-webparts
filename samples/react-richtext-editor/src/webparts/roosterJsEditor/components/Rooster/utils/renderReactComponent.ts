import { UIUtilities } from "../Ribbon/type/UIUtilities";

/**
 * @internal
 */
export function renderReactComponent(uiUtilities: UIUtilities | undefined, reactElement: JSX.Element) {
  if (uiUtilities) {
    return uiUtilities.renderComponent(reactElement);
  } else {
    throw new Error(
      "UIUtilities is required but not provided. Please call ReactEditorPlugin.setUIUtilities() to set a valid uiUtilities object",
    );
  }
}
