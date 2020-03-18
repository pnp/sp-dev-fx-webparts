import { IPropertyPaneCustomFieldProps } from "@microsoft/sp-property-pane";
import { IMonacoEditorProps } from "../MonacoEditor";

export interface IPropertyFieldMonacoEditorProps {
  /**
   * Custom Field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
   * Default value is 200.
   */
  deferredValidationTime?: number;

  defaultValue?: string;

  /**
  * Specify if the control needs to be disabled
  */
  disabled?: boolean;

  /**
   * The CSS class name to apply to the code editor component
   */
  editorClassName?: string;

  /**
   * The height style to apply to the code editor component
   */
  editorHeight?: string;

   /**
   * If set, this will be displayed as an error message.
   *
   * When onGetErrorMessage returns empty string, if this property has a value set then this will
   * be displayed as the error message.
   *
   * So, make sure to set this only if you want to see an error message dispalyed for the text field.
   */
  errorMessage?: string;

  /**
   * The initial code to display in the code editor
   */
  initialValue?: string;

  /**
   * An UNIQUE key indicates the identity of this control
   */
  key: string;

  /**
   * Property field label displayed on top
   */
  label?: string;

  /**
   * The language you wish to use with the editor.
   * */
  language: string;

  /**
   * The theme you wish to use.
   */
  theme?: string;

  /**
   * The code you wish to display in the code editor
   */
  value?: string;

  /**
   * Indicates whether the editor should be read only
   */
  readOnly?: boolean;

  /**
   * Indicates whether the editor should show line numbers
   */
  showLineNumbers?: boolean;

  /**
   * Indicates whether the editor should show a mini-map
   */
  showMiniMap?: boolean;

  /**
   * Indicates whether the editor should show indent guides
   */
  showIndentGuides?: boolean;

  /**
   * Indicates whether the editor should allow code folding
   */
  folding?: boolean;

  /**
   * Indicates whether you should show a Full Page Editor button
   */
  showFullScreen?: boolean;

  /**
   * Defines a onPropertyChange function to raise when the code changes.
   * Normally this function must be always defined with the 'this.onPropertyChange'
   * method of the web part object.
   */
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
}

export interface IPropertyFieldMonacoEditorPropsInternal extends IPropertyPaneCustomFieldProps, IPropertyFieldMonacoEditorProps {
  targetProperty: string;
}
