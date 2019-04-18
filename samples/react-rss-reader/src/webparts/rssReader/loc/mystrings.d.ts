declare interface IRssReaderWebPartStrings {
  FeedSettingsPageName: string;
  LayoutSettingsPageName: string;

  //feed settings
  FeedUrlLabel: string;
  FeedServiceLabel: string;
  FeedServiceUrlLabel: string;
  FeedServiceUrlDescription: string;

  UseCorsProxyLabel: string;
  CorsProxyUrlLabel: string;
  CorsProxyUrlDescription: string;
  DisableCorsModeLabel: string;
  DisableCorsModeDescription: string;
  DisableCorsModeSelectedDescription: string;

  MaxCountLabel: string;

  CacheResultsLabel: string;
  CacheResultsMinutesLabel: string;
  CacheStorageKeyPrefixLabel: string;
  CacheStorageKeyPrefixDescription: string;

  FeedLoadingLabel: string;
  DefaultFeedLoadingLabel: string;


  //layout / stlying settings
  SelectedLayoutLabel: string;
  TemplateUrlLabel: string;
  TemplateUrlPlaceholder: string;

  FeedViewAllLinkLabel: string;
  FeedViewAllLinkLabelLabel: string;
  FeedViewAllLinkPlaceholder: string;
  DefaultFeedViewAllLinkLabel: string;
  ShowPubDateLabel: string;
  ShowDescLabel: string;
  DescCharacterLimitLabel: string;
  TitleLinkTargetLabel: string;
  DateFormatLabel: string;
  BackgroundColorLabel: string;
  FontColorLabel: string;



  //feed service options
  DefaultFeedServiceOption: string;
  Feed2JsonFeedServiceOption: string;
  Rss2JsonFeedServiceOption: string;
  FeedServiceApiKeyLabel: string;
  FeedServiceApiKeyDescription: string;

  //feed layout options
  DefaultFeedLayoutOption: string;
  CustomFeedLayoutOption: string;


  //Template Service
  ErrorTemplateExtension: string;
  ErrorTemplateResolve: string;

  //Template Dialog
  CancelButtonText: string;
  DialogButtonLabel: string;
  DialogButtonText: string;
  DialogTitle: string;
  SaveButtonText: string;

  //additional messages
  NoReturnedFeed: string;
  RssLoadError: string;

  //groups
  FeedSettingsGroupLabel: string;
  CorsSettingsGroupLabel: string;

  //messages
  ErrorNoResults: string;
  ErrorPossibleCORSBlock: string;
  ErrorParsingFeed: string;
  ErrorCovertFeedInvalidSource: string;
  ErrorPossibleCORBBlock: string;

}

declare module 'RssReaderWebPartStrings' {
  const strings: IRssReaderWebPartStrings;
  export = strings;
}
