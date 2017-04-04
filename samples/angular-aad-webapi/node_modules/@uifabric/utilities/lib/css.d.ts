export interface ICssMapping {
    [className: string]: boolean;
}
export declare type ICssInput = string | ICssMapping;
export declare function css(...args: ICssInput[]): string;
