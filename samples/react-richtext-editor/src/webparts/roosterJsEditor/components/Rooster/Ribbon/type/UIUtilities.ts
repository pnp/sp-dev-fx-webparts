/**
 * A set of  UI Utilities to help render additional UI element from a plugin
 */
export interface UIUtilities {
  /**
   * Render additional react component from a plugin, with correlated theme and window context of Rooster
   * @param element The UI element (JSX object) to render
   * @returns A disposer function to help unmount this element
   */
  renderComponent(element: JSX.Element): () => void;

  /**
   * Check if editor is rendered in Right-to-left mode
   */
  isRightToLeft(): boolean;
}
