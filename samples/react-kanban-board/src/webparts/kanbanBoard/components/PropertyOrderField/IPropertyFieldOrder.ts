import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';

/**
 * Public properties of the PropertyFieldOrder custom field
 */
export interface IPropertyFieldOrderProps {

	/**
	* Property field label displayed on top
	*/
	label: string;

	/**
	 * Defines an onPropertyChange function to raise when the items order changes.
	 * Normally this function must be defined with the 'this.onPropertyChange'
	 * method of the web part object.
	 */
	onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void; // eslint-disable-line @typescript-eslint/no-explicit-any

	/**
	 * An array of values to reorder
	 */
	items: Array<any>; // eslint-disable-line @typescript-eslint/no-explicit-any

	/**
	 * The property to use for display, when undefined, the toString() method of the object is used (ignored when the onRenderItem function is specified)
	 */
	textProperty?: string;

	/**
	 * When true, drag and drop reordering is disabled (defaults to false)
	 */
	disableDragAndDrop?: boolean;

	/**
	 * When true, arrow buttons are not displayed (defaults to false)
	 */
	removeArrows?: boolean;

	/**
	 * The maximun height for the items in px (when not set, the control expands as necessary)
	 */
	maxHeight?: number;

	/**
	 * Whether the property pane field is enabled or not.
	 */
	disabled?: boolean;

	/**
	 * Optional callback to provide custom rendering of the item (default is simple text based on either item or the property identified in the textProperty)
	 */
	onRenderItem?: (item: any, index: number) => JSX.Element; // eslint-disable-line @typescript-eslint/no-explicit-any

	/**
	 * An UNIQUE key indicates the identity of this control
	 */
	key: string;

	/**
	 * Parent Web Part properties
	 */
	properties: any; // eslint-disable-line @typescript-eslint/no-explicit-any

	/**
	 * The name of the UI Fabric Font Icon to use for the move up button (defaults to ChevronUpSmall)
	 */
	moveUpIconName?: string;

	/**
	 * The name of the UI Fabric Font Icon to use for the move down button (defaults to ChevronDownSmall)
	 */
	moveDownIconName?: string;
}

export interface IPropertyFieldOrderPropsInternal extends IPropertyFieldOrderProps, IPropertyPaneCustomFieldProps {
}