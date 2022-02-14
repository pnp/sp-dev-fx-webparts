## Optional switch to dev branch (if pushing to main/master is restricted)
# git checkout dev

## configure nvm, modejs, and fix project for spfx, if not handled by Dockerfile
#. ${NVM_DIR}/nvm.sh
#npm config delete prefix
#nvm install 10
#npm install -g gulp

npm install

## commands to create dev certificate and copy it to the root folder of the project
gulp trust-dev-cert
# Use following command for SPFx >= 1.12.1
cp ~/.rushstack/rushstack-serve.pem ./spfx-dev-cert.cer
# Use following command for SPFx < 1.12.1
# cp ~/.gcb-serve-data/gcb-serve.cer ./spfx-dev-cert.cer

## add *.cer to .gitignore to prevent certificates from being saved in repo
if ! grep -Fxq '*.cer' ./.gitignore
  then
    echo "# .CER Certificates" >> .gitignore
    echo "*.cer" >> .gitignore
fi

## add *.pem to .gitignore to prevent certificates from being saved in repo
if ! grep -Fxq '*.pem' ./.gitignore
  then
    echo "# .PEM Certificates" >> .gitignore
    echo "*.pem" >> .gitignore
fi

echo
echo -e "\e[1;92mReady!\e[0m"

echo -e "\n\e[1;94m**********\nOptional: if you plan on using gulp serve, don't forget to add the container certificate to your local machine. Please visit https://aka.ms/spfx-devcontainer for more information\n**********"