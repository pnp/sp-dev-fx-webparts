#################
# Configuration #
#################
$catalogSite = "https://giuleon.sharepoint.com/sites/apps" # => App Catalog site
$catalogRelativePath = "sites/apps/AppCatalog" # => App Catalog relative url
#######
# End #
#######

# Get Web Request
function GetRequest ($apiUrl, $webSession) {
    return Invoke-WebRequest -Uri $apiUrl -Method Get -WebSession $webSession
}

# Post Web Request
function PostRequest($apiUrl, $webSession, $body) {
    return Invoke-WebRequest -Uri $apiUrl -Body $body -Method Post -WebSession $webSession
   
}

# Settting the right parameters value
function setXmlMapping($xmlBody, $siteId, $webId, $listId, $fileId, $fileVersion, $skipDeployment) {
    # Replace the random token with a random guid
    $randomGuid = [guid]::NewGuid()
    if($skipDeployment -eq $True){
        $skipDeployment = "true"
    }
    else{
        $skipDeployment = "false"
    }
    $xmlBody = [regex]::replace($xmlBody, "{randomId}", $randomGuid)
    # Replace the site ID token with the actual site ID string
    $xmlBody = [regex]::replace($xmlBody, "{siteId}", $siteId)
    # Replace the web ID token with the actual web ID string
    $xmlBody = [regex]::replace($xmlBody, "{webId}", $webId)
    # Replace the list ID token with the actual list ID string
    $xmlBody = [regex]::replace($xmlBody, "{listId}", $listId)
    # Replace the item ID token with the actual item ID number
    $xmlBody = [regex]::replace($xmlBody, "{itemId}", $fileId)
    # Replace the file version token with the actual file version number
    $xmlBody = [regex]::replace($xmlBody, "{fileVersion}", $fileVersion)
    # Replace the skipFeatureDeployment token with the skipFeatureDeployment option
    $xmlBody = [regex]::replace($xmlBody, "{skipFeatureDeployment}", $skipDeployment)
    return $xmlBody;
}

Write-Host ***************************************** -ForegroundColor Yellow
Write-Host * Uploading the sppkg on the AppCatalog * -ForegroundColor Yellow
Write-Host ***************************************** -ForegroundColor Yellow
$packageConfig = Get-Content -Raw -Path .\config\package-solution.json | ConvertFrom-Json
$packagePath = Join-Path "sharepoint/" $packageConfig.paths.zippedPackage -Resolve
$skipFeatureDeployment = $packageConfig.solution.skipFeatureDeployment

# Connect-PnPOnline $catalogSite -Credentials (Get-Credential)
Connect-PnPOnline $catalogSite -Credentials giuleon
Add-PnPFile -Path $packagePath -Folder "AppCatalog"

Write-Host *************************************************** -ForegroundColor Yellow
Write-Host * The SPFx solution has been succesfully uploaded to the AppCatalog * -ForegroundColor Yellow
Write-Host *************************************************** -ForegroundColor Yellow

# Connect to SharePoint Online
$targetSite = "https://giuleon.sharepoint.com/sites/apps"
$targetSiteUri = [System.Uri]$targetSite
 
# Retrieve the client credentials and the related Authentication Cookies
$context = (Get-PnPWeb).Context
$credentials = $context.Credentials
$authenticationCookies = $credentials.GetAuthenticationCookie($targetSiteUri, $true)
 
# Set the Authentication Cookies and the Accept HTTP Header
$webSession = New-Object Microsoft.PowerShell.Commands.WebRequestSession  
$webSession.Cookies.SetCookies($targetSiteUri, $authenticationCookies)
$webSession.Headers.Add("Accept", "application/json;odata=verbose")

$apiUrl = $catalogSite + "/_api/contextinfo?$"+"select=FormDigestValue"
$result = PostRequest -apiUrl $apiUrl -webSession $webSession
$formDigest = $result.Content | ConvertFrom-Json
Write-Host "FormDigestValue - " $formDigest.d.GetContextWebInformation.FormDigestValue
$formDigest = $formDigest.d.GetContextWebInformation.FormDigestValue
$webSession.Headers.Add("X-RequestDigest", $formDigest)
 
# Set request variables
$apiUrl = "$targetSite" + "/_api/site?$"+"select=Id"

# Make the REST request
$webRequest =  GetRequest -apiUrl $apiUrl -webSession $webSession # Invoke-WebRequest -Uri $apiUrl -Method Get -WebSession $webSession
$response = $webRequest.Content | ConvertFrom-Json
$siteId = $response.d.Id
Write-Host "Site Id - " $response.d.Id

# Retrieving webId and listId
$apiUrl = "$targetSite" + "/_api/web/getList('$catalogRelativePath')?$"+"select=Id,ParentWeb/Id`&`$"+"expand=ParentWeb"
$webRequest =  GetRequest -apiUrl $apiUrl -webSession $webSession # Invoke-WebRequest -Uri $apiUrl -Method Get -WebSession $webSession
$response = $webRequest.Content | ConvertFrom-Json
$webId = $response.d.ParentWeb.Id
$listId = $response.d.Id
Write-Host "Web Id - " $webId " / List Id - " + $listId

# Get the ListItemAllFields Id and Version
$fileName = $packageConfig.paths.zippedPackage.Substring($packageConfig.paths.zippedPackage.LastIndexOf("/")+1)
$apiUrl = "$targetSite" + "/_api/web/GetFolderByServerRelativeUrl('AppCatalog')/Files('$fileName')?$"+"expand=ListItemAllFields`&`$" + "select=ListItemAllFields/ID,ListItemAllFields/owshiddenversion"
$webRequest =  GetRequest -apiUrl $apiUrl -webSession $webSession 
$response = $webRequest.Content -replace '"id":', '"id_":' | ConvertFrom-Json
$fileId = $response.d.ListItemAllFields.id_
$fileVersion = $response.d.ListItemAllFields.owshiddenversion
Write-Host "ListItem Id - " $fileId  " / Version - " $fileVersion

# Read the xml
$xmlBody = Get-Content DeploySPFxToAppCatalogRequestBody.xml -Encoding UTF8
$xmlBody = setXmlMapping -xmlBody $xmlBody -siteId $siteId -webId $webId -listId $listId -fileId $fileId -fileVersion $fileVersion -skipDeployment $skipFeatureDeployment
Write-Host "deployment in progress....."

# Deploy the sspkg
$webSession.Headers.Add("Content-type", "application/xml")
$apiUrl = $catalogSite + "/_vti_bin/client.svc/ProcessQuery"
$result = PostRequest -apiUrl $apiUrl -webSession $webSession -body $xmlBody
Write-Host $result