/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';


import colorFilterIcon from '../../svg/colorFilter.svg';
import cropIcon from '../../svg/crop.svg';
import flipVerticalIcon from '../../svg/flipVertical.svg';
import resizeIcon from '../../svg/resize.svg';

import * as strings from 'ImageManipulationStrings';

export enum SettingPanelType {
  Closed = 1,
  Filter = 2,
  Flip = 3,
  Rotate = 4,
  Scale = 5,
  Crop = 6,
  Resize = 7,
  History = 99
}

export enum FilterType {
  Grayscale,
  Sepia
  /*
  Blur,
  Emboss,
  Sepia2,
  Invert,
  Sharpen,
  RemoteWhite,
  Brightness,
  Noise,
  Pixelate,
  ColorOverLay*/
}

export interface ICrop {
  sx: number;
  sy: number;
  width: number;
  height: number;
  aspect?: number;
}

export interface IResize {
  width: number;
  height: number;
  aspect?: number;
}

export enum ManipulationType {
  Crop,
  Scale,
  Rotate,
  Flip,
  Filter,
  Resize
}
export interface IManipulationBase {
  type: ManipulationType;
}
export interface ICropSettings extends IManipulationBase, ICrop {
}
export interface IFlipSettings extends IManipulationBase {
  flipX: boolean;
  flipY: boolean;
}
export interface IScaleSettings extends IManipulationBase {
  scale: number;
}
export interface IRotateSettings extends IManipulationBase {
  rotate: number;
}
export interface IFilterSettings extends IManipulationBase {
  filterType: FilterType;
  nvalue?: number;
  svalue?: string;
}
export interface IResizeSettings extends IManipulationBase, IResize {
}
export type IImageManipulationSettings = IFilterSettings | IRotateSettings |
          IScaleSettings | IFlipSettings | ICropSettings | IResizeSettings;

export const filterTypeData: IFilterTypeData = {
  0: strings.FilterTypeGrayscale,
  1: strings.FilterTypeSepia
};

export interface IFilterTypeData {
  [key: string]: string;
}

export interface IManipulationTypeDataBase {
  text: string;
  iconName?: string;
  // eslint-disable-next-line: no-any
  svgIcon?: any;
  settingPanelType: SettingPanelType;
}

export interface IManipulationTypeData {
  [key: string]: IManipulationTypeDataDetails;
}

export interface IManipulationTypeDataDetails extends IManipulationTypeDataBase {
  toHTML: (item: IImageManipulationSettings) => JSX.Element;
}

export const manipulationTypeData: IManipulationTypeData = {
  0: {
    text: strings.ManipulationTypeCrop,
    svgIcon: cropIcon,
    toHTML: (item: ICropSettings) => {
      return (<span />);
      // return (<span>{`X:${item.sx} Y:${item.sy}`}</span>);
    },
    settingPanelType: SettingPanelType.Crop
  },
  1: {
    text: strings.ManipulationTypeScale,
    iconName: 'Zoom',
    toHTML: (item: IScaleSettings) => { return (<span />); },
    settingPanelType: SettingPanelType.Scale
  },
  2: {
    text: strings.ManipulationTypeRotate,
    iconName: 'Rotate',
    toHTML: (item: IRotateSettings) => { return (<span />); },
    settingPanelType: SettingPanelType.Rotate
  },
  3: {
    text: strings.ManipulationTypeFlip,
    svgIcon: flipVerticalIcon,
    toHTML: (item: IFlipSettings) => { return (<span />); },
    settingPanelType: SettingPanelType.Flip
  },
  4: {
    text: strings.ManipulationTypeFilter,
    svgIcon: colorFilterIcon,
    toHTML: (item: IFilterSettings) => {
      return (<span>{filterTypeData[item.filterType]}</span>);
    },
    settingPanelType: SettingPanelType.Filter
  },
  5: {
    text: strings.ManipulationTypeResize,
    iconName: 'SizeLegacy',
    svgIcon: resizeIcon,
    toHTML: (item: IResizeSettings) => { return (<span />); },
    settingPanelType: SettingPanelType.Resize
  }
};
