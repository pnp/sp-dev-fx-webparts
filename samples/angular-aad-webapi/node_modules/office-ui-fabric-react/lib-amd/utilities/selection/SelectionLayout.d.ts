import { ISelectionLayout, SelectionDirection } from './interfaces';
export declare class SelectionLayout implements ISelectionLayout {
    private _direction;
    constructor(direction: SelectionDirection);
    getItemIndexAbove(focusIndex: number, items: any[]): number;
    getItemIndexBelow(focusIndex: number, items: any[]): number;
    getItemIndexLeft(focusIndex: number, items: any[]): number;
    getItemIndexRight(focusIndex: number, items: any[]): number;
}
