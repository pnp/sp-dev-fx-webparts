function Set-SPFxEnvironment {
    [CmdletBinding()]
    param ()
    dynamicparam {

        if (-not (Test-Path ".yo-rc.json")) {
            Write-Host "No .yo-rc.json make sure you're in an active SPFx project!" -ForegroundColor Red;
            return;
        }

        if (-not (Test-Path ".\src\settings")) {
            Write-Host "No settings folder found, please setup first..." -ForegroundColor Yellow;
            return;
        }

        $parameterAttribute = New-Object System.Management.Automation.ParameterAttribute
        $parameterAttribute.ParameterSetName = "ParamsList"
        $parameterAttribute.Mandatory = $true
        $parameterAttribute.Position = 1
        $parameterAttribute.ValueFromPipelineByPropertyName = $true
            
        $envrionemts = Get-ChildItem .\src\settings\ -Filter "settings.*.json" | ForEach-Object { $_.Name -replace "^settings\.(.*)\.json$", '$1' }
        $parameterValidateSet = New-Object System.Management.Automation.ValidateSetAttribute -ArgumentList $envrionemts
    
    
        $attributeCollection = New-Object Collections.ObjectModel.Collection[System.Attribute]
        $attributeCollection.Add($parameterAttribute)
        $attributeCollection.Add($parameterValidateSet)
        $attributeCollection.Add($parameterValidateScript)
    
        $parameter = New-Object System.Management.Automation.RuntimeDefinedParameter -ArgumentList @("Environment", [string], $attributeCollection)
    
        $paramDictionary = New-Object -Type System.Management.Automation.RuntimeDefinedParameterDictionary
        $paramDictionary.Add("Environment", $parameter)
    
        $paramDictionary
    }
    process {
        # Do stuff here. The parameter we added can be found in $PSBoundParameters
        Write-Host Switching to: $PSBoundParameters.Environment
        $settingsFile = ".\src\settings\settings.$($PSBoundParameters.Environment).json"
        New-Item ".\src\settings\settings.json" -ItemType File -Force -Value (Get-Content $settingsFile -Raw) | out-null
    }
}

function Add-SPFxEnvrionmentSettings() {
    if (-not (Test-Path ".yo-rc.json")) {
        Write-Host "No .yo-rc.json make sure you're in an active SPFx project!" -ForegroundColor Red;
        return;
    }

    if ((Test-Path ".\src\settings")) {
        Write-Host "Settings folder found, cannot run setup twice..." -ForegroundColor Yellow;
        return;
    }

    Write-Host "Creating settings folder..." -ForegroundColor Green;
    New-Item ".\src\settings" -ItemType Directory -Force;

    Write-Host "Creating settings files..." -ForegroundColor Green;
    New-Item ".\src\settings\settings.d.ts" -ItemType File -Force -Value ("declare interface ISettings {
    MessageOfTheDay: string;
}

declare module '*.settings' {
    const settings: ISettings;
    export = settings;
}");
    
    New-Item ".\src\settings\settings.dev.json" -ItemType File -Force -Value ("{
    ""MessageOfTheDay"": ""Test Message""
}");

    New-Item ".\src\settings\settings.prod.json" -ItemType File -Force -Value ("{
    ""MessageOfTheDay"": ""Prod Message""
}");


    
    $tsConfig = Get-Content -Path "tsconfig.json" -Raw | ConvertFrom-Json
    Add-Member -InputObject ($tsConfig.compilerOptions) NoteProperty -Name "resolveJsonModule" -Value $true -Force;
    $tsConfig | ConvertTo-Json -Depth 100 | Set-Content -Path "tsconfig.json"
}