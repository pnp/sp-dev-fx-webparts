declare interface IImageManipulationStrings {

  ManipulationTypeFilter: string;
  ManipulationTypeFlip: string;
  ManipulationTypeRotate: string;
  ManipulationTypeScale: string;
  ManipulationTypeCrop: string;
  ManipulationTypeResize: string;

  FilterTypeGrayscale: string;
  FilterTypeSepia: string;

  SettingPanelClose: string;
  SettingPanelHistory: string;

  CommandBarRedo: string;
  CommandBarUndo: string;
  CommandBarReset: string;

  FlipVertical: string;
  FlipHorizontal: string;

  LockAspect: string;
  Width: string;
  Height: string;
  SourceX: string;
  SourceY: string;

}

declare module 'ImageManipulationStrings' {
  const strings: IImageManipulationStrings;
  export = strings;
}
