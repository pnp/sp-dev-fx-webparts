declare interface ISpfxReactGridStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;

  ListDefinitionFieldLabel:string;
    /**The Label on the reset CD Button */
  ListDefinitionsButtonSelect:string;
   /**The Label on the reset Button */
  ListDefinitionsButtonReset:string;
  /**The Title on the popupPage */
  ListDefinitionsTitle:string;
  ColumnDefinitionFieldLabel:string;
    /**The Label on the reset CD Button */
  ColumnDefinitionsButtonSelect:string;
   /**The Label on the reset Button */
  ColumnDefinitionsButtonReset:string;
  /**The Title on the popupPage */
  ColumnDefinitionsTitle:string;
  /**The Title on the WebSelector panel */
  WebSelectorHeaderText:string;
}
declare module 'spfxReactGridStrings' {
  const strings: ISpfxReactGridStrings;
  export = strings;
}
