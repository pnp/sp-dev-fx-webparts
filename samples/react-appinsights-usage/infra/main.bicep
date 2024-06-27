//gernerate application insights as iac and get as output instrumentation key

param location string = resourceGroup().location 
param appInsightsName string = 'ai-${replace(resourceGroup().name, 'rg-', '')}'


resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightsName
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
  }
}

output aiKey string = appInsights.properties.InstrumentationKey
output aiConnectionString string = appInsights.properties.ConnectionString 
output aiName string = appInsights.name
