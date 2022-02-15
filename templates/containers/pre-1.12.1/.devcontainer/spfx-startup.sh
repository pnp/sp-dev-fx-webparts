echo
echo -e "\e[1;94mInstalling Node dependencies\e[0m"
npm install

## commands to create dev certificate and copy it to the root folder of the project
echo
echo -e "\e[1;94mGenerating dev certificate\e[0m"
gulp trust-dev-cert


cp ~/.gcb-serve-data/gcb-serve.cer ./spfx-dev-cert.cer
cp ~/.gcb-serve-data/gcb-serve.cer ./spfx-dev-cert.pem

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