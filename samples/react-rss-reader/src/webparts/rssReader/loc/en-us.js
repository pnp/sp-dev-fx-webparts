define([], function() {
  return {
    //"PropertyPaneDescription": "Customize your RSS Feed",
    "FeedSettingsPageName": "Specify Feed Settings",
    "LayoutSettingsPageName": "Style Feed Results",

    //feed settings
    "FeedUrlLabel": "Feed Url",
    "FeedServiceLabel": "Feed Retrieval Service",
    "FeedServiceUrlLabel": "Feed Service Url",
    "FeedServiceUrlDescription": "Optional Feed Service for Feed2Json.org. Default url: https://feed2json.org/, is not for production use. For production, use own Feed2Json node service, source code available at: https://github.com/appsattic/feed2json.org",
    "FeedServiceApiKeyLabel": "Feed Service Api Key",
    "FeedServiceApiKeyDescription": "Optional Feed Service API Key for Rss2Json.com. Free service has limitations, view pricing plans at https://rss2json.com/plans",

    "UseCorsProxyLabel": "Use a CORS proxy for cross domain requests?",
    "CorsProxyUrlLabel": "CORS proxy url",
    "CorsProxyUrlDescription": "{0} token will be replaced with RSS Feed URL",
    "DisableCorsModeLabel": "Disable CORS mode?",
    "DisableCorsModeDescription": "Should CORS mode be disabled when getting RSS Feed? If disabled, OPTIONS request will not be sent to feed service. Browser may still reject if response does not include Access-Control-Allow-Origin header.",
    "DisableCorsModeSelectedDescription": "CORS mode will be disabled, no pre-flight will occur, mode will be set to 'no-cors'",

    "MaxCountLabel": "Max Count",

    "CacheResultsLabel": "Cache Results",
    "CacheResultsMinutesLabel": "Minutes to cache results",
    "CacheStorageKeyPrefixLabel": "Cache Storage Key Prefix",
    "CacheStorageKeyPrefixDescription": "Optional local storage key prefix to use when storing rss results to local storage",

    "FeedLoadingLabel": "Loading Message",
    "DefaultFeedLoadingLabel": "Loading Rss Feed",


    //layout / styling settings
    "SelectedLayoutLabel": "Results Layout",
    "TemplateUrlLabel": "External Template Url",
    "TemplateUrlPlaceholder": "https://myLayout.html",

    "FeedViewAllLinkLabel": "Feed View All link (i.e. https://yourfeed)",
    "FeedViewAllLinkLabelLabel": "Feed View All link label (i.e. View all posts)",
    "FeedViewAllLinkPlaceholder": "https://...",
    "DefaultFeedViewAllLinkLabel": "View All",
    "ShowPubDateLabel": "Show publication date",
    "ShowDescLabel": "Show description",
    "DescCharacterLimitLabel": "Description Characters limit",
    "TitleLinkTargetLabel": "Link Target",
    "DateFormatLabel": "Date Format",
    "BackgroundColorLabel": "Background Color",
    "FontColorLabel": "Title Color",


    //feed service options
    "DefaultFeedServiceOption" : "Direct request",
    "Feed2JsonFeedServiceOption" : "Feed2Json.org",
    "Rss2JsonFeedServiceOption" : "Rss2Json.com",


    //feed layout options
    "DefaultFeedLayoutOption": "Default",
    "CustomFeedLayoutOption": "Custom",


    //template service
    "ErrorTemplateExtension": "The template must be a valid .htm or .html file",
    "ErrorTemplateResolve": "Unable to resolve the specified template, check the url, or may be blocked by CORS. Error details: '{0}'",

    //template dialog
    "CancelButtonText": "Cancel",
    "DialogButtonLabel": "Template Editor",
    "DialogButtonText": "Edit template",
    "DialogTitle": "Edit results template",
    "SaveButtonText": "Save",

    //additional messages
    "NoReturnedFeed": "Rss feed did not return any entries",
    "RssLoadError": "An error occurred attempting to retrieve the feed",


    //groups
    "FeedSettingsGroupLabel": "Feed Settings",
    "CorsSettingsGroupLabel": "Cross-Origin Resource Sharing (CORS)",

    //Messages
    "ErrorNoResults": "Feed returned no results",
    "ErrorPossibleCORSBlock": "Possibly blocked by CORS policy.",
    "ErrorParsingFeed": "Unable to parse rss feed",
    "ErrorCovertFeedInvalidSource": "Unable to convert rss feed, source is not valid",
    "ErrorPossibleCORBBlock": "Unable to retrieve rss feed. The rss feed url is incorrect or Cross-Origin Read Blocking (CORB) blocked cross-origin response by the browser.",



  }
});


