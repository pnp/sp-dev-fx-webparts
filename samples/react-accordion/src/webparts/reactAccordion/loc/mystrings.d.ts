declare interface IReactAccordionWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ListNameLabel: string;
  MaxItemsPerPageLabel: string;
  EnablePagingLabel: string;
  TotalItemsLabel:string;
}

declare module 'ReactAccordionWebPartStrings' {
  const strings: IReactAccordionWebPartStrings;
  export = strings;
}
