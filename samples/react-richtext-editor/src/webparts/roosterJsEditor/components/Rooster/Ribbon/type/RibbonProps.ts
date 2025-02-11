import type { ToolbarProps } from "@fluentui/react-components";
//import { RibbonPlugin } from "./RibbonPlugin";
import { ContentModelFormatState, IEditor } from "roosterjs-content-model-types";
import { IRoosterPlugin } from "./IRoosterPlugin";
import type { RibbonItem } from "./RibbonItem";
import { UIUtilities } from "./UIUtilities";
/**
 * Properties of Ribbon component
 */
export interface RibbonProps extends ToolbarProps {
  editor: IEditor;
  ribbonItems: RibbonItem[];
  plugin?: IRoosterPlugin;
  vertical?: boolean;
  size?: "small" | "medium" | "large";
  formatState?: ContentModelFormatState;
  uiUtilities: UIUtilities;
}
