# Connect to the SharePoint tenant app catalog
$url = Get-PnPTenantAppCatalogUrl
if ($null -eq $url) {
    Write-Host "Unable to retrieve the tenant app catalog URL. Please ensure you have the necessary permissions."
    return
}

# Connect to the SharePoint site
Connect-PnPOnline -Url $url -ClientId 6c5c98c7-e05a-4a0f-bcfa-0cfc65aa1f28 -Tenant 'contoso.onmicrosoft.com' -Thumbprint 34CFAA860E5FB8C44335A38A097C1E41EEA206AA

# Apply the PnP Provisioning Template
Invoke-PnPSiteTemplate -Path dashboard.xml