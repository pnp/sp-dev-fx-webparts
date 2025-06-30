// eslint-disable-next-line no-undef
define([], function() {
  return {
    PropertyPaneDescription: 'Please use WebPart Dashboard to configure the properties',
    DevGroupName: "Developer Settings",
    IsDevModeLabel: "Enable authentication with ApiKey and AppId (not recommended for production)",
    IsDevModeOnText: "Yes, I know what I am doing, I am not in production",
    IsDevModeOffText: "No, I want to use AAD authentication",

    GroupNameAppInsights: "Application Insights",//-
    GroupNameKustoQuery:"Kusto Query",//-
    AppIdLabel: "Application ID", //-
    AppKeyLabel: "Application Key", //-
    KustoQueryLabel:"Kusto query",//-
    KustoQueryDocs:"Application Insights overview",//-
    KustoQueryRef:"KQL quick reference",//-
    AIAnalyticsDemo:"Application Insights demo data",//-

    Config_IconText: 'App Insights Dashboard Configuration',  //-
    CacheDurationLabel:'Cache duration',

    HelpAppInsightsAppId:  "<ul style='margin:10px;padding:0'><li>1. Application Insights instance / API Access </li ><li>2. Copy <b>Application ID</b></li></ul >", //-
    HelpAppInsightsAppKey: "<ul style='margin:10px;padding:0'><li>1. Application Insights instance / API Access / <b>Create API key</b></li ><li>2. Choose <b>Read telemetry</b></li></ul>", //-

    Msg_AuthWarning:"You are currently authenticating using AppId and AppKey. This is OK to quickly explore the API in a non-production environment. Storing secrets in WebPart properties is NOT secure, please switch to AAD authentication soon =)",
  }
});