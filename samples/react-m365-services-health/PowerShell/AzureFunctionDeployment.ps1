# Build the function app using dotnet publish
$AzureFunctionAppPath ="<AzureFunctionAppPath>" #Path of azure function
$AzureFunctionAppZipPath="<AzureFunctionAppZipPath>" #Path where zip file will be created
$resourceGroupName = "<AzureFunctionAppResourceGroupName>" #Resource group name of azure function
$functionAppName = "<AzureFunctionAppName>" #Name of azure function created in azure portal

dotnet publish $AzureFunctionAppPath -c Release -o "$AzureFunctionAppPath\bin\Release"
# Include the published output folder in the zip
Compress-Archive -Path "$AzureFunctionAppPath\bin\Release\*" -DestinationPath "$AzureFunctionAppZipPath\functionApp.zip" -CompressionLevel Optimal

Connect-AzAccount


Publish-AzWebApp -ResourceGroupName $resourceGroupName -Name $functionAppName -ArchivePath "$AzureFunctionAppZipPath\functionApp.zip"
Update-AzFunctionAppSetting -Name $functionAppName -ResourceGroupName $resourceGroupName -AppSetting @{"AzureAd:Audience" = "<Entra ID Application ID URI>"} #Application ID URI created during `Expose an API' step
Update-AzFunctionAppSetting -Name $functionAppName -ResourceGroupName $resourceGroupName -AppSetting @{"AzureAd:ClientId" = "<Entra ID  Application Client Id>"} 
Update-AzFunctionAppSetting -Name $functionAppName -ResourceGroupName $resourceGroupName -AppSetting @{"AzureAd:ClientSecret" = "<Entra ID Application Client Secret>"}
Update-AzFunctionAppSetting -Name $functionAppName -ResourceGroupName $resourceGroupName -AppSetting @{"AzureAd:Instance" = "https://login.microsoftonline.com/"}
Update-AzFunctionAppSetting -Name $functionAppName -ResourceGroupName $resourceGroupName -AppSetting @{"AzureAd:TenantId" = "<Tenant ID where Entra ID APP is created>"}
Update-AzFunctionAppSetting -Name $functionAppName -ResourceGroupName $resourceGroupName -AppSetting @{"RunAsApplicationPermission" = "<true | false>"} #True will use application permissions and false will use delegated permissions
