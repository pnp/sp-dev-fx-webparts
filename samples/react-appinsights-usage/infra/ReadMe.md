## Login
```bash
az login
az account set --subscription "..."
az group list
```

## Create Resource Group
```bash
az group create --name 'rg-appinsight' --location eastus
```

## Create Resources

```bash
az deployment group create --resource-group 'rg-appinsight' --template-file main.bicep `
  --parameters 
 ```