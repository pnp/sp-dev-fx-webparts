import * as React from 'react';
import './Image.scss';
import { IImageProps } from './Image.Props';
export interface IImageState {
    loadState?: ImageLoadState;
}
export declare enum CoverStyle {
    landscape = 0,
    portrait = 1,
}
export declare const CoverStyleMap: {
    [x: number]: string;
};
export declare const ImageFitMap: {
    [x: number]: string;
};
export declare enum ImageLoadState {
    notLoaded = 0,
    loaded = 1,
    error = 2,
    errorLoaded = 3,
}
export declare class Image extends React.Component<IImageProps, IImageState> {
    static defaultProps: {
        shouldFadeIn: boolean;
    };
    refs: {
        [key: string]: React.ReactInstance;
        image: HTMLImageElement;
    };
    private _events;
    private _coverStyle;
    constructor(props: IImageProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: IImageProps): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private _evaluateImage();
    private _computeCoverStyle(props);
    private _setError();
}
