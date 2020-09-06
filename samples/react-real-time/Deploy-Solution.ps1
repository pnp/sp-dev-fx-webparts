[CmdletBinding()]
Param(
	[Parameter(Mandatory=$True,Position=1)]
	[string]$SiteUrl,

	[Parameter(Mandatory=$True)]
	[string]$UserName,

	[Parameter(Mandatory=$True)]
	[string]$Password
)

$0 = $myInvocation.MyCommand.Definition
$CommandDirectory = [System.IO.Path]::GetDirectoryName($0)

Set-Location $CommandDirectory

# -----------------------------------------------------
# SharePoint Configuration
# -----------------------------------------------------

# Connect to the site
$PasswordAsSecure = ConvertTo-SecureString $Password -AsPlainText -Force
$Credentials = New-Object System.Management.Automation.PSCredential ($UserName , $PasswordAsSecure)
Connect-SPOnline -Url $SiteUrl -Credentials $Credentials

Write-Host -ForegroundColor Magenta "Apply PnP template to site '$SiteUrl'..."

# Create the SharePoint list in the dev site
Apply-SPOProvisioningTemplate -Path ".\template.xml"

Write-Host -ForegroundColor Green "Done!"

# -----------------------------------------------------
# Azure Configuration
# -----------------------------------------------------

Write-Host -ForegroundColor Magenta "Login to Azure..."
Login-AzureRmAccount 

$GitPublishingUserName = "tempdeployuser" + [Guid]::NewGuid();
$GitPublishingUserPassword = "socketio123!"
$LogicAppName = "LogicApp" + [Guid]::NewGuid();
$AzureSBNamespace = "ServiceBus" + [Guid]::NewGuid();
$AzureWebAppName = "WebApp" + [Guid]::NewGuid()
$AppServicePlanName = "ServicePlan" + [Guid]::NewGuid()
$TemplateFilePath = ".\azure-deploy.json"
$AzureResourceGroupLocation = "East US2"
$AzureResourceGroupName = "SPFxSocketIODemo"
$AzureRmResourceGroupDeploymentName = $AzureResourceGroupName 
$ServerCodeFolderLocation = ".\server"

# Set the publishing user and password for the local Git deployment 
$PropertiesObject = @{
	"publishingUserName" = $GitPublishingUserName;
    "publishingPassword" = $GitPublishingUserPassword;
}

Try {

    Set-AzureRmResource -PropertyObject $PropertiesObject -ResourceId /providers/Microsoft.Web/publishingUsers/web -ApiVersion 2015-08-01 -Force

    Write-Host -ForegroundColor Magenta "Creating the Azure resource Group [$AzureResourceGroupName]..."
    New-AzureRmResourceGroup -Name $AzureResourceGroupName -Location $AzureResourceGroupLocation

    # Deploy the Azure Resource Group using an ARM template
    # More information here: https://azure.microsoft.com/en-us/documentation/articles/resource-group-authoring-templates/#resources

    $TemplateParameters = @{
        "LogicAppName" = $LogicAppName
        "ServiceBusNameSpace"=$AzureSBNamespace;
        "AppServicePlanName"= $AppServicePlanName;
        "SiteName"=$AzureWebAppName;
        "Location"=$AzureResourceGroupLocation
    }

    Write-Host -ForegroundColor Magenta "Deploying Azure resources using ARM template..."
    Test-AzureRmResourceGroupDeployment -ResourceGroupName $AzureResourceGroupName -TemplateFile $TemplateFilePath -TemplateParameterObject $TemplateParameters
    New-AzureRmResourceGroupDeployment -Name $AzureRmResourceGroupDeploymentName -ResourceGroupName $AzureResourceGroupName -TemplateFile $TemplateFilePath -TemplateParameterObject $TemplateParameters
    Write-Host -ForegroundColor Green "Done!"

    Write-Host -ForegroundColor Magenta "Updating Web Application settings..."
    $CurrentNamespace = Get-AzureSBNamespace -Name $AzureSBNamespace

    # Check if the namespace already exists or needs to be created
    if ($CurrentNamespace) {

        Write-Host -ForegroundColor Magenta "Set application settings for service bus connection..."

        # Set the Web Application settings
        $AppSettings = New-Object Hashtable
        $AppSettings["AZURE_SERVICEBUS_ACCESS_KEY"]=$CurrentNamespace.ConnectionString

        # Set application settings and enable WebSockets
        Set-AzureWebsite -Name $AzureWebAppName -AppSettings $AppSettings
    } else {

        Write-Warning "Azure Service Bus namespace '$AzureSBNamespace' not found. Make sure you've selected the right Azure subscription (forgot to run the Add-AzureAccount cmdlet?)"
    }
    
    Write-Host -ForegroundColor Green "Done!"

    # Deploy the code to the Web Application using Local Git

    # Note: the part below is only valid for this demo. In a real world situation, you may want link to your TFS/GitHub/BitBucket repository instead.
    # See https://azure.microsoft.com/en-us/documentation/articles/app-service-deploy-local-git/ for more information
    Write-Host -ForegroundColor Magenta "Deploying the Web Application Node JS code using Local Git..."

    # Go to the location where the code for the server is located and commit/push it to the local git repository of the web application.
    Push-Location $ServerCodeFolderLocation 

    # Remove previous git config if exists
    if (Test-Path .git) {
        Remove-Item -Recurse .git -Force
    }

    git init

    git add -A

    git commit -m "SPFx Socket IO Demo - Server code"
    
    # Build the git clone URL with embbed password
    $GitCloneURL = "https://$GitPublishingUserName" + ":$GitPublishingUserPassword@$AzureWebAppName.scm.azurewebsites.net:443/$AzureWebAppName.git"

    # Make sure there is no 502 error and the git URL is up and running (can take few seconds)
    $Timeout = New-TimeSpan -Minutes 1
    $sw = [Diagnostics.Stopwatch]::StartNew()

    Write-Host -ForegroundColor Yellow "Wait for the git clone URL is up and running" -NoNewline
    while ($sw.elapsed -lt $Timeout) {

        if ((Invoke-WebRequest -Uri $GitCloneURL).StatusCode -eq 200) {

            Write-Host "`n"

            git remote add azure $GitCloneURL 2>&1 | %{ "$_" }

            # We force the push to overwrite remote with local files avoiding update conflicts (don't use this in production)

            git push azure master --force 2>&1 | %{ "$_" }

            # Update URLs in the client side code according to the web app name

            Pop-Location

            $files = @(".\client\config\config.json",".\client\src\webparts\realTimeNewsFeed\components\RealTimeNewsFeed.tsx")
            $files | ForEach-Object { (Get-Content $_) -replace 'https:\/\/(\S*)\.azurewebsites\.net', "https://$AzureWebAppName.azurewebsites.net"  | Set-Content $_ }               
            
            Write-Host -ForegroundColor Green "Done!"

            return
        }
    
        Start-Sleep -Seconds 5
        Write-Host -ForegroundColor Yellow "."
    }
    Write-Warning "The git clone URL timed out!"

} Catch {

    $ErrorMessage = $_.Exception.Message
    Write-Error $ErrorMessage
    Exit
}