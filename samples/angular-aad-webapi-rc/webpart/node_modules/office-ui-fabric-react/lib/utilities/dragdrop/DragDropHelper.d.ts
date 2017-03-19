import { EventGroup } from '../../utilities/eventGroup/EventGroup';
import { IDragDropHelper, IDragDropOptions } from './interfaces';
import { ISelection } from '../../utilities/selection/interfaces';
export interface IDragDropHelperParams {
    selection: ISelection;
}
export declare class DragDropHelper implements IDragDropHelper {
    private _dragEnterCounts;
    private _isDragging;
    private _dragData;
    private _selection;
    private _activeTargets;
    private _events;
    constructor(params: IDragDropHelperParams);
    dispose(): void;
    subscribe(root: HTMLElement, events: EventGroup, dragDropOptions: IDragDropOptions): void;
    unsubscribe(root: HTMLElement, key: string): void;
    /**
     * clear drag data when mouse up on body
     */
    private _onMouseUp(event);
    /**
     * clear drag data when mouse up outside of the document
     */
    private _onDocumentMouseUp(event);
    /**
     * when mouse move over a new drop target while dragging some items,
     * fire dragleave on the old target and fire dragenter to the new target
     * The target will handle style change on dragenter and dragleave events.
     */
    private _onMouseMove(target, event);
    /**
     * when mouse leave a target while dragging some items, fire dragleave to the target
     */
    private _onMouseLeave(target, event);
    /**
     * when mouse down on a draggable item, we start to track dragdata.
     */
    private _onMouseDown(target, event);
    /**
     * determine whether the child target is a descendant of the parent
     */
    private _isChild(parent, child);
    private _isDraggable(target);
    private _isDroppable(target);
}
