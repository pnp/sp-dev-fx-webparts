# SharePoint references that need to remove when uninstall
$ReferencesToRemoveWhenUninstall = @(
    @("Microsoft.SharePoint.Client"),
    @("Microsoft.SharePoint.Client.Runtime")
)

# SharePoint references that need to be copy local
$CopyLocalReferences = @(
    @("Microsoft.IdentityModel"),
    @("Microsoft.IdentityModel.Extensions"),
    @("Microsoft.SharePoint.Client"),
    @("Microsoft.SharePoint.Client.Runtime")
)

# Imports needed for VB project
$VbImports = @(
    "Microsoft.SharePoint.Client"
)

Export-ModuleMember -Variable @( 'ReferencesToRemoveWhenUninstall', 'CopyLocalReferences', 'VbImports' )
