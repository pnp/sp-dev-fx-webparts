declare interface ITilesWebPartStrings {
  PropertyPaneDescription: string;
  TilesListDescription: string;
  TileHeight: string;
  tileColour: string;
  tileFont: string;
  iconInformation: string;

  // Properties
  tilesDataLabel: string;
  tilesPanelHeader: string;
  tilesManageBtn: string;
  tilesHeight: string;

  //Properties colour mode
  colourMode: string;
  colourModeTheme: string;
  colourModeUniform: string;
  colourModeUnique: string;

  //Properties width
  widthAutomaticOrStatic: string;
  widthStatic: string;
  widthAutomatic: string;
  widthStaticSet: string;

  //Propeties icon
  iconSelectFile: string;

  //Properties color
  colorSetUniqueFg:string;
  colorSetUniqueBg:string;


  // Tile fields
  titleField: string;
  descriptionField: string;
  urlField: string;
  iconField: string;
  targetField: string;
  sortOrder: string;



  targetCurrent: string;
  targetNew: string;

  // Component
  noTilesIconText: string;
  noTilesConfigured: string;
  noTilesBtn: string;
}

declare module 'TilesWebPartStrings' {
  const strings: ITilesWebPartStrings;
  export = strings;
}
