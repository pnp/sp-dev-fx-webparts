param(
    $site, 
    $accessToken,
    [ValidateSet("Site", "Tenant")]
    $scope,
    [switch]$isDev
) 

# Install pnp powershell module on your release agent/vm

$sppkgPath = "PROD-sppkg"

if ($isDev.ToString) {
    $sppkgPath = "DEV-sppkg"
}

Connect-PnPOnline $site -AccessToken $accessToken

Add-PnPApp -Path "./_SPFx build/$sppkgPath/react-app-settings.sppkg" -Scope $scope -Publish