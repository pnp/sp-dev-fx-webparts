# Apply PnP Provisioning Template to SharePoint Site

This PowerShell script applies a PnP Provisioning Template to a SharePoint site to create the Birthdaylist on root Site.

## Requirements

- [SharePoint Online Management Shell](https://www.microsoft.com/en-us/download/details.aspx?id=35588)
- [PnP PowerShell module](https://docs.microsoft.com/en-us/powershell/sharepoint/sharepoint-pnp/sharepoint-pnp-cmdlets?view=sharepoint-ps)

## Usage

1. Download the script file `CreateBrithdaysList.zip` to your local machine.
2. Unzip the file
3. Open a SharePoint Online Management Shell.
4. Run the following command to execute the script:

.\Create-List-Bridays.ps1 -tenant "[tenant].sharepoint.com"

Replace `[tenant]`  with the actual value for your tenant.

## Parameters

- `tenant`: The URL of the SharePoint Online tenant, in the format `[tenant].sharepoint.com`.
 
