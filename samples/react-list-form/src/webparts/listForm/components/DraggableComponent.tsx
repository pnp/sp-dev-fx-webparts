import * as React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { css } from 'office-ui-fabric-react/lib/Utilities';

import styles from './DraggableComponent.module.scss';

import * as strings from 'ListFormStrings';

const dragSource = {
  beginDrag(props: IDraggableComponentProps) {
    return {
      key: props.itemKey,
      originalIndex: props.index,
    };
  },

  endDrag(props: IDraggableComponentProps, monitor) {
    const { key: droppedKey, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveField(droppedKey, originalIndex);
    }
  },
};

const dragTarget = {

  hover(props: IDraggableComponentProps, monitor) {
    const { key: draggedKey } = monitor.getItem();
    if (draggedKey !== props.itemKey) {
      props.moveField(draggedKey, props.index);
    }
  },
};


export interface IDraggableComponentProps {
  index: number;
  itemKey: string;
  isDragging?: boolean;
  connectDragSource?(child: any): any;
  connectDropTarget?(child: any): any;
  moveField(fieldKey: string, toIndex: number): void;
  removeField(index: number): void;
}

@DropTarget('Fields', dragTarget, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource('Fields', dragSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class DraggableComponent extends React.Component<IDraggableComponentProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    const { children, isDragging, connectDragSource, connectDropTarget } = this.props;

    return connectDropTarget(connectDragSource(
      <div className={css('ard-draggableComponent', styles.draggableComponent, isDragging ? styles.isDragging : null)}>
        {children}
        <div className={css(styles.toolbar)}>
          <button type='button' className={css('ard-draggableComponent', styles.button)} title={strings.MoveField} >
            <i className='ms-Icon ms-Icon--Move'></i>
          </button>
          <button type='button' className={css('ard-draggableComponent', styles.button)} title={strings.RemoveField}
            onClick={() => this.props.removeField(this.props.index)}><i className='ms-Icon ms-Icon--Delete'></i></button>
        </div>
      </div>,
    ));
  }
}
