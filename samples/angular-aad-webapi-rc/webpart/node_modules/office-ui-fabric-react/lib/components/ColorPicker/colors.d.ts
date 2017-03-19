import { IColor } from './IColor';
export declare const MAX_COLOR_SATURATION: number;
export declare const MAX_COLOR_HUE: number;
export declare const MAX_COLOR_VALUE: number;
export interface IColor {
    a: number;
    b: number;
    g: number;
    h: number;
    hex: string;
    r: number;
    s: number;
    str: string;
    v: number;
}
export declare function getColorFromString(color: string): IColor;
export declare function getFullColorString(color: IColor): string;
export declare function updateSV(color: IColor, s: number, v: number): IColor;
export declare function updateH(color: IColor, h: number): IColor;
export declare function updateA(color: IColor, a: number): IColor;
