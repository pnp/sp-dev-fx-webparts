#!/bin/bash
SITE=$1
EMAIL=$2
PASS=$3
SCOPE=$4
ISDEV=$5

npm i -g @pnp/office365-cli
o365 version

# You have to run "o365 spo login https://contoso.sharepoint.com"
# to agree with the consent first time

sppkg_path="PROD-sppkg"

if [ ${ISDEV,,} = "true" ]
then
    sppkg_path="DEV-sppkg"
fi

o365 spo login $SITE --authType password --userName $EMAIL --password $PASS

o365 spo app add --filePath "./_SPFx build/$sppkg_path/react-app-settings.sppkg" --appCatalogUrl $SITE --scope $SCOPE --overwrite

o365 spo app deploy --name react-app-settings.sppkg --appCatalogUrl $SITE --scope $SCOPE --skipFeatureDeployment