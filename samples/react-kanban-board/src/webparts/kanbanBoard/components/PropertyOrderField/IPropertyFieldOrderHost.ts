/**
 * PropertyFieldOrderHost properties interface
 */
export interface IPropertyFieldOrderHostProps {
	label: string;
	disabled: boolean;
	items: Array<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
	textProperty?: string;
	moveUpIconName: string;
	moveDownIconName: string;
	disableDragAndDrop: boolean;
	removeArrows: boolean;
	maxHeight?: number;
	valueChanged: (newValue: Array<any>) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
	onRenderItem?: (item: any, index: number) => JSX.Element; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * PropertyFieldOrderHost state interface
 */
export interface IPropertyFieldOrderHostState {
	items: Array<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}