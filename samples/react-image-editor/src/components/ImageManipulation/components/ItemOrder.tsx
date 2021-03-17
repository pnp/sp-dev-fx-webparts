import { isEqual } from '@microsoft/sp-lodash-subset';
import { EventGroup, IButtonStyles, IconButton, ISelection, Label } from 'office-ui-fabric-react';
import { DragDropHelper, IDragDropContext, IDragDropHelperParams } from 'office-ui-fabric-react/lib-es2015/utilities/dragdrop';
import * as React from 'react';
import styles from './ItemOrder.module.scss';

export interface IItemOrderProps {
  label: string;
  disabled: boolean;
  items: Array<any>;
  textProperty?: string;
  moveUpIconName: string;
  moveDownIconName: string;
  disableDragAndDrop: boolean;
  removeArrows: boolean;
  maxHeight?: number;
  valueChanged: (newValue: Array<any>) => void;
  onRenderItem?: (item: any, index: number) => JSX.Element;
}

export interface IItemOrderState {
  items: Array<any>;
}


export default class ItemOrder extends React.Component<IItemOrderProps, IItemOrderState> {

  private _draggedItem: any;
  private _selection: ISelection;
  private _ddHelper: DragDropHelper;
  private _refs: Array<HTMLElement>;
  private _ddSubs: Array<any>;
  private _lastBox: HTMLElement;


  constructor(props: IItemOrderProps) {
    super(props);

    this._selection = null;
    this._ddHelper = new DragDropHelper({
      selection: this._selection
    });

    this._refs = new Array<HTMLElement>();
    this._ddSubs = new Array<any>();

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
              items.map((value: any, index: number) => {
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
            (items && items.length > 0) && <div className={styles.lastBox} ref={(ref: HTMLElement) => { this._lastBox = ref; }} />
          }
        </ul>
      </div>
    );
  }

  private renderItem(item: any, index: number): JSX.Element {
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

  private renderDisplayValue(item: any, index: number): JSX.Element {
    if (typeof this.props.onRenderItem === "function") {
      return this.props.onRenderItem(item, index);
    } else {
      return (
        <span>{this.props.textProperty ? item[this.props.textProperty] : item.toString()}</span>
      );
    }
  }

  private renderArrows(index: number): JSX.Element {
    let arrowButtonStyles: Partial<IButtonStyles> = {
      root: {
        width: '14px',
        height: '100%',
        display: 'inline-block !important'
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

  public componentWillMount(): void {
    this.setState({
      items: this.props.items || []
    });
  }

  public componentDidMount(): void {
    this.setupSubscriptions();
  }

  public componentWillUpdate(nextProps: IItemOrderProps): void {
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

  private registerRef = (ref: HTMLElement): void => {
    this._refs.push(ref);
  }

  private setupSubscriptions = (): void => {
    if (!this.props.disableDragAndDrop && !this.props.disabled) {
      this._refs.forEach((value: HTMLElement, index: number) => {
        this._ddSubs.push(this._ddHelper.subscribe(value, new EventGroup(value), {
          eventMap: [
            {
              callback: (context: IDragDropContext, event?: any) => {
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
          canDrag: (item?: any) => {
            return true;
          },
          onDrop: (item?: any, event?: DragEvent) => {
            if (this._draggedItem) {
              this.insertBeforeItem(item);
            }
          },
          /*onDragStart: (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent) => {
            //Never called for some reason, so using eventMap above
            this._draggedItem = item;
          },*/
          onDragEnd: (item?: any, event?: DragEvent) => {
            this._draggedItem = null;
          }
        }));
      });

      //Create dropable area below list to allow items to be dragged to the bottom
      if (this._refs.length && typeof this._lastBox !== "undefined") {
        this._ddSubs.push(this._ddHelper.subscribe(this._lastBox, new EventGroup(this._lastBox), {
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
          onDrop: (item?: any, event?: DragEvent) => {
            if (this._draggedItem) {
              let itemIndex: number = this.state.items.indexOf(this._draggedItem);
              this.moveItemAtIndexToTargetIndex(itemIndex, this.state.items.length - 1);
            }
          }
        }));
      }
    }
  }

  private cleanupSubscriptions = (): void => {
    while (this._ddSubs.length) {
      let sub: any = this._ddSubs.pop();
      sub.dispose();
    }
  }

  private insertBeforeItem = (item: any) => {
    let itemIndex: number = this.state.items.indexOf(this._draggedItem);
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
      let items: Array<any> = this.state.items;
      items.splice(targetIndex, 0, ...items.splice(itemIndex, 1)[0]);

      this.setState({
        items: items
      });

      this.props.valueChanged(items);
    }
  }
}
