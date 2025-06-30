declare interface ICommonDasboardWebPartStrings {
  PropertyPaneDescription: string;
  GroupNameConnection: string;
  GroupNameLook: string;
  GroupNameLookList: string;
  GroupNameLookChart:string;


  LookShowTimePicker: string;
  LookLayout: string;
  LookShowList: string;
  LookShowChart:string;

  LookListStyle: string;
  LookListList: string;
  LookListHeatmap: string;


  LookChartColors: string;
  LookChartStyle: string;
  lookChartLine: string;
  lookChartArea: string;
  lookChartBar: string;
  lookChartColumn: string;
  lookChartPie: string;

  paletteCol1:string;
  paletteCol2:string;
  paletteCol3:string;
  paletteCol4:string;
  paletteMono1:string;
  paletteMono2:string;
  paletteMono3:string;
  paletteMono4:string;
  paletteMono5:string;
  paletteMono6:string;
  paletteMono7:string;

  Config_Desc_ReadMode: string;
  ApplyBtnLabel: string;
  ConfigBtnLabel: string;

  DatePicker_TimeSpan: string;
  DatePicker_StartDate: string;
  DatePicker_EndDate: string;
  DatePicker_TimeSpanCustom: string;
  DatePicker_Error: string;

  DatePicker_BtnSave: string;
  DatePicker_BtnCancel: string;

  Query_NoResults: string;

  Msg_FailedConfig:string;
  Msg_FailedVisErr: string;
  Msg_FailedVisErrPie:string;
  Msg_FailedVisErrOneNumerical: string;

}

declare module 'CommonDasboardWebPartStrings' {
  const stringsCommon: ICommonDasboardWebPartStrings;
  export = stringsCommon;
}
