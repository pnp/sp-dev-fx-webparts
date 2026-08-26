# Provision WhoIsIn SharePoint list using PnP.PowerShell
# Requires the PnP.PowerShell module: Install-Module PnP.PowerShell
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$SiteUrl,
    [string]$ListTitle = "WhoIsIn",
    [switch]$Force
)

function Connect-Site {
    param([string]$Url)
    Write-Host "Connecting to $Url ..."
    Connect-PnPOnline -Url $Url -Interactive
}

function New-PnPListIfMissing {
    param([string]$Title)
    $list = Get-PnPList -Identity $Title -ErrorAction SilentlyContinue
    if ($null -eq $list) {
        Write-Host "Creating list '$Title' ..."
        New-PnPList -Title $Title -Template GenericList -OnQuickLaunch
    }
    else {
        Write-Host "List '$Title' already exists."
    }
}

function Add-PnPFieldIfMissing {
    param(
        [string]$List,
        [string]$DisplayName,
        [string]$InternalName,
        [string]$Type,
        $Options = $null
    )

    $existing = Get-PnPField -List $List -Identity $InternalName -ErrorAction SilentlyContinue
    if ($existing) {
        Write-Host "Field '$DisplayName' exists on list '$List'."
        return
    }

    Write-Host "Adding field '$DisplayName' to list '$List' ..."

    switch ($Type) {
        "Choice" {
            $choices = $Options -as [string[]]

            
            $addCmd = Get-Command Add-PnPField -ErrorAction SilentlyContinue
            if ($null -ne $addCmd -and $addCmd.Parameters.Keys -contains 'AddToDefaultView') {
                $params = @{
                    List             = $List
                    DisplayName      = $DisplayName
                    InternalName     = $InternalName
                    Type             = 'Choice'
                    Group            = 'WhoIsIn Columns'
                    Choices          = $choices
                    AddToDefaultView = $true
                    ErrorAction      = 'Stop'
                }
            }
            else {
                $params = @{
                    List         = $List
                    DisplayName  = $DisplayName
                    InternalName = $InternalName
                    Type         = 'Choice'
                    Group        = 'WhoIsIn Columns'
                    Choices      = $choices
                    ErrorAction  = 'Stop'
                }
            }
            Add-PnPField @params
        }
        "User" {
            # Use splatting to avoid unsupported parameters on older/newer PnP versions
            $addCmd = Get-Command Add-PnPField -ErrorAction SilentlyContinue
            if ($null -ne $addCmd -and $addCmd.Parameters.Keys -contains 'AddToDefaultView') {
                $params = @{
                    List             = $List
                    DisplayName      = $DisplayName
                    InternalName     = $InternalName
                    Type             = 'User'
                    Group            = 'WhoIsIn Columns'
                    AddToDefaultView = $true
                    ErrorAction      = 'Stop'
                }
            }
            else {
                $params = @{
                    List         = $List
                    DisplayName  = $DisplayName
                    InternalName = $InternalName
                    Type         = 'User'
                    Group        = 'WhoIsIn Columns'
                    ErrorAction  = 'Stop'
                }
            }
            Add-PnPField @params
        }
        "DateTime" {
            $format = $Options
            # Use Field XML to set DateTime format (Format="DateOnly" or "DateTime")
            $fieldXml = "<Field Type='DateTime' DisplayName='$DisplayName' Name='$InternalName' Group='WhoIsIn Columns' Format='$format' />"

            # Some PnP versions support AddToDefaultView on Add-PnPFieldFromXml; check and call accordingly
            $addFromXmlCmd = Get-Command Add-PnPFieldFromXml -ErrorAction SilentlyContinue
            if ($null -ne $addFromXmlCmd -and $addFromXmlCmd.Parameters.Keys -contains 'AddToDefaultView') {
                $params = @{
                    List             = $List
                    FieldXml         = $fieldXml
                    AddToDefaultView = $true
                    ErrorAction      = 'Stop'
                }
                Add-PnPFieldFromXml @params
            }
            else {
                # Create the field, then add it to the default view manually to preserve behavior across PnP versions
                Add-PnPFieldFromXml -List $List -FieldXml $fieldXml -ErrorAction Stop

                try {
                    # Attempt to add field to default view using view API (best-effort; will silently continue on older modules)
                    $defaultView = Get-PnPView -List $List -Identity "All Items" -ErrorAction SilentlyContinue
                    if ($null -eq $defaultView) {
                        $defaultView = Get-PnPView -List $List | Select-Object -First 1
                    }
                    if ($null -ne $defaultView) {
                        $field = Get-PnPField -List $List -Identity $InternalName -ErrorAction SilentlyContinue
                        if ($null -ne $field) {
                            $defaultView.ViewFields.Add($field.InternalName) | Out-Null
                            $defaultView.Update() | Out-Null
                            Invoke-PnPQuery -ErrorAction SilentlyContinue
                        }
                    }
                }
                catch {
                    Write-Host "Warning: unable to add DateTime field '$DisplayName' to default view automatically: $($_.Exception.Message)"
                }
            }
        }
        default {
            throw "Unsupported field type: $Type"
        }
    }
}

# Script start
Connect-Site -Url $SiteUrl
New-PnPListIfMissing -Title $ListTitle

Write-Host "Ensuring fields..."
Add-PnPFieldIfMissing -List $ListTitle -DisplayName "Employee" -InternalName "Employee" -Type "User"
Add-PnPFieldIfMissing -List $ListTitle -DisplayName "Base Location" -InternalName "BaseLocation" -Type "Choice" -Options @("Auckland", "Wellington", "Christchurch")
Add-PnPFieldIfMissing -List $ListTitle -DisplayName "Travelling to" -InternalName "TravellingTo" -Type "Choice" -Options @("Auckland", "Wellington", "Christchurch")
Add-PnPFieldIfMissing -List $ListTitle -DisplayName "From" -InternalName "From" -Type "DateTime" -Options "DateOnly"
Add-PnPFieldIfMissing -List $ListTitle -DisplayName "To" -InternalName "To" -Type "DateTime" -Options "DateOnly"

Write-Host "Provisioning complete. List '$ListTitle' is ready."

exit 0