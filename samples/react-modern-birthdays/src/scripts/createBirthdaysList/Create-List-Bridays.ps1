# Load the PnP PowerShell module
Import-Module SharePointPnPPowerShellOnline

param (
  [Parameter(Mandatory=$true)][string]$tenant
)

# Validate the parameters
if ($null -eq $tenant  ) {
  Write-Host "Tenant is mandatory parameter. Please specify value."
  return
}

# Connect to the SharePoint site
$connection = Connect-PnPOnline -Url "https://$tenant" -Interactive
if ($null -eq $connection) {
  Write-Host "Could not connect to the SharePoint tenant. Please check the tenant value and try again."
  return
}

# Apply the PnP Provisioning Template
Invoke-PnPSiteTemplate -Path template.xml

