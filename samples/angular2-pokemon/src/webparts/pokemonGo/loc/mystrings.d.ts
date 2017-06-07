declare interface IPokemonGoStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'pokemonGoStrings' {
  const strings: IPokemonGoStrings;
  export = strings;
}
