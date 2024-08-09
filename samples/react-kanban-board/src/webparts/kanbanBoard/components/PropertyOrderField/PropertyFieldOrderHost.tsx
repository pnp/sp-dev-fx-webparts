import { IButtonStyles, IconButton } from '@fluentui/react/lib/Button';
//import { Selection } from '@fluentui/react/lib/DetailsList';
import { Label } from '@fluentui/react/lib/Label';
//import { DragDropHelper } from '@fluentui/react/lib/utilities/dragdrop';
//import { IDragDropContext } from '@fluentui/react/lib/utilities/dragdrop/interfaces';
import * as React from 'react';


import { IPropertyFieldOrderHostProps, IPropertyFieldOrderHostState } from './IPropertyFieldOrderHost';
import styles from './PropertyFieldOrderHost.module.scss';
import { isEqual } from '@microsoft/sp-lodash-subset';
//import { EventGroup } from '@fluentui/react/lib/Utilities'; //'@uifabric/utilities/lib/EventGroup';

export default class PropertyFieldOrderHost extends React.Component<IPropertyFieldOrderHostProps, IPropertyFieldOrderHostState> {

	private _draggedItem: any; // eslint-disable-line @typescript-eslint/no-explicit-any
	//private _selection: Selection;
	//private _ddHelper: DragDropHelper;
	private _refs: Array<HTMLElement>;
	private _ddSubs: Array<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
	private _lastBox: HTMLDivElement;

	constructor(props: IPropertyFieldOrderHostProps, state: IPropertyFieldOrderHostState) {
		super(props);
       // this._selection = new Selection();
		/*this._ddHelper = new DragDropHelper({
			selection: this._selection
		});
*/
		this._refs = new Array<HTMLElement>();
		this._ddSubs = new Array<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any

		this._draggedItem = null;

		this.state = {
			items: []
		};
	}

	public render(): JSX.Element {
		const {
			items
		} = this.state;
		return (
			<div className={styles.propertyFieldOrder}>
				{this.props.label && <Label>{this.props.label}</Label>}
				<ul style={{ maxHeight: this.props.maxHeight ? this.props.maxHeight + 'px' : '100%' }} className={!this.props.disabled ? styles.enabled : styles.disabled}>
					{
						(items && items.length > 0) && (
							items.map((value: any, index: number) => { // eslint-disable-line @typescript-eslint/no-explicit-any
								return (
									<li
										ref={this.registerRef}
										key={index}
										draggable={!this.props.disableDragAndDrop && !this.props.disabled}
										style={{ cursor: !this.props.disableDragAndDrop && !this.props.disabled ? 'pointer' : 'default' }}
									>{this.renderItem(value, index)}</li>
								);
							})
						)
					}
					{
						(items && items.length > 0) && <div className={styles.lastBox} ref={(ref:HTMLDivElement):void => { this._lastBox = ref; }} />
					}
				</ul>
			</div>
		);
	}

	private renderItem(item: any, index: number): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
		return (
			<div>
				<div className={styles.itemBox}>
					{this.renderDisplayValue(item, index)}
				</div>
				{!this.props.removeArrows &&
					<div>{this.renderArrows(index)}</div>
				}
			</div>
		);
	}

	private renderDisplayValue(item: any, index: number): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
		if (typeof this.props.onRenderItem === "function") {
			return this.props.onRenderItem(item, index);
		} else {
			return (
				<span>{this.props.textProperty ? item[this.props.textProperty] : item.toString()}</span>
			);
		}
	}

	private renderArrows(index: number): JSX.Element {
		const arrowButtonStyles: Partial<IButtonStyles> = {
			root: {
				width: '14px',
				height: '100%',
				display: 'inline-block'
			},
			rootDisabled: {
				backgroundColor: 'transparent'
			},
			icon: {
				fontSize: "10px"
			}
		};

		return (
			<div>
				<IconButton
					disabled={this.props.disabled || index === 0}
					iconProps={{ iconName: this.props.moveUpIconName }}
					onClick={() => { this.onMoveUpClick(index); }}
					styles={arrowButtonStyles}
				/>
				<IconButton
					disabled={this.props.disabled || index === this.props.items.length - 1}
					iconProps={{ iconName: this.props.moveDownIconName }}
					onClick={() => { this.onMoveDownClick(index); }}
					styles={arrowButtonStyles}
				/>
			</div>
		);
	}

	public UNSAFE_componentWillMount(): void {
		this.setState({
			items: this.props.items || []
		});
	}

	public componentDidMount(): void {
		this.setupSubscriptions();
	}

	public UNSAFE_componentWillUpdate(nextProps: IPropertyFieldOrderHostProps): void {
		// Check if the provided items are still the same
		if (!isEqual(nextProps.items, this.state.items)) {
			this.setState({
				items: this.props.items || []
			});
		}
	}

	public componentDidUpdate(): void {
		this.cleanupSubscriptions();
		this.setupSubscriptions();
	}

	public componentWillUnmount(): void {
		this.cleanupSubscriptions();
	}

	private registerRef = (ref: HTMLLIElement): void => {
		this._refs.push(ref);
	}

	private setupSubscriptions = (): void => {
		if (!this.props.disableDragAndDrop && !this.props.disabled) {
			this._refs.forEach((value: HTMLElement, index: number) => {
			/*	this._ddSubs.push(this._ddHelper.subscribe(value, new EventGroup(value), {
					eventMap: [
						{
							callback: (context: IDragDropContext) => {
								this._draggedItem = context.data;
							},
							eventName: 'dragstart'
						}
					],
					selectionIndex: index,
					context: { data: this.state.items[index], index: index },
					updateDropState: (isDropping: boolean, event: DragEvent) => {
						if (isDropping) {
							value.classList.add(styles.dragEnter);
						} else {
							value.classList.remove(styles.dragEnter);
						}
					},
					canDrop: (dropContext?: IDragDropContext, dragContext?: IDragDropContext) => {
						return true;
					},
					canDrag: (item?: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
						return true;
					},
					onDrop: (item?: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
						if (this._draggedItem) {
							this.insertBeforeItem(item);
						}
					},
					onDragEnd: () => {
						this._draggedItem = null;
					}
				}));*/
			});

			//Create dropable area below list to allow items to be dragged to the bottom
			if (this._refs.length && typeof this._lastBox !== "undefined") {
				/*this._ddSubs.push(this._ddHelper.subscribe(this._lastBox, new EventGroup(this._lastBox), {
					selectionIndex: this._refs.length,
					context: { data: {}, index: this._refs.length },
					updateDropState: (isDropping: boolean, event: DragEvent) => {
						if (isDropping) {
							this._refs[this._refs.length - 1].classList.add(styles.dragLast);
						} else {
							this._refs[this._refs.length - 1].classList.remove(styles.dragLast);
						}
					},
					canDrop: (dropContext?: IDragDropContext, dragContext?: IDragDropContext) => {
						return true;
					},
					onDrop: (item?: any, event?: DragEvent) => { // eslint-disable-line @typescript-eslint/no-explicit-any
						if (this._draggedItem) {
							const itemIndex: number = this.state.items.indexOf(this._draggedItem);
							this.moveItemAtIndexToTargetIndex(itemIndex, this.state.items.length - 1);
						}
					}
				}));*/
			}
		}
	}

	private cleanupSubscriptions = (): void => {
		while (this._ddSubs.length) {
			const sub: any = this._ddSubs.pop(); // eslint-disable-line @typescript-eslint/no-explicit-any
			sub.dispose();
		}
	}

	public insertBeforeItem = (item: any): void => { // eslint-disable-line @typescript-eslint/no-explicit-any
		const itemIndex: number = this.state.items.indexOf(this._draggedItem);
		let targetIndex: number = this.state.items.indexOf(item);
		if (itemIndex < targetIndex) {
			targetIndex -= 1;
		}
		this.moveItemAtIndexToTargetIndex(itemIndex, targetIndex);
	}


	private onMoveUpClick = (itemIndex: number): void => {
		if (itemIndex > 0) {
			this.moveItemAtIndexToTargetIndex(itemIndex, itemIndex - 1);
		}
	}

	private onMoveDownClick = (itemIndex: number): void => {
		if (itemIndex < this.state.items.length - 1) {
			this.moveItemAtIndexToTargetIndex(itemIndex, itemIndex + 1);
		}
	}

	private moveItemAtIndexToTargetIndex = (itemIndex: number, targetIndex: number): void => {
		if (itemIndex !== targetIndex && itemIndex > -1 && targetIndex > -1 && itemIndex < this.state.items.length && targetIndex < this.state.items.length) {
			const items: Array<any> = this.state.items; // eslint-disable-line @typescript-eslint/no-explicit-any
			items.splice(targetIndex, 0, ...items.splice(itemIndex, 1));

			this.setState({
				items: items
			});

			this.props.valueChanged(items);
		}
	}
}