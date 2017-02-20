## react-property-bag-editor

This is where you include your web part docs.

The webpart can be deployed to a new page on your infrastructure site. Then
This powershell can be used to add a link to the siteactions of all sites to set the metadata.

Import-Module  C:\Users\Russell\Source\Repos\PnP-PowerShell\Commands\bin\Debug\SharePointPnP.PowerShell.Online.Commands.dll -ErrorAction SilentlyContinue
$adminSiteUrl="https://rgove3-admin.sharepoint.com"
$customActionDescription="CUSTOM_Navigation_Metadata" 
$pageUrl="https://rgove3.sharepoint.com/sites/cdn/SitePages/PropertBadEdcitor.aspx?siteUrl={0}"
$credentials=get-credential
Connect-SPOnline -Url $adminSiteUrl -Credentials $credentials
$ctx = Get-SPOContext
$sites = Get-SPOTenantSite -Detailed 
foreach($site in $sites){
    if ($site.Template -eq "STS#0") {
        Connect-SPOnline –Url $site.Url –Credentials $credentials
        $existing = Get-SPOCustomAction -Scope "Site" | ? { $_.Description -eq $customActionDescription }
        if ($existing) {
             $existing.DeleteObject(); 
             Execute-SPOQuery; 
             Write-Host "Deleteting existing action from"$site.Url

        }
        Write-Host "adding action to" $site.Url
        Add-SPOCustomAction -Description $customActionDescription -Location "Microsoft.SharePoint.SiteSettings" -name "Edit Site Metadata"-Title "Edit Site Metadata"  -Group "SiteAdministration" -Sequence 10100 -Url ( [string]::Format($pageUrl,$site.Url)) -Scope "Site"
        Execute-SPOQuery
        }
}

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* commonjs components - this allows this package to be reused from other packages.
* dist/* - a single bundle containing the components used for uploading to a cdn pointing a registered Sharepoint webpart library to.
* example/* a test page that hosts all components in this package.

### Build options

gulp clean - TODO
gulp test - TODO
gulp watch - TODO
gulp build - TODO
gulp deploy - TODO
