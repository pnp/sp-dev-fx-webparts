mkdir ~/.npm-global
export NPM_CONFIG_PREFIX=~/.npm-global
export PATH=$PATH:~/.npm-global/bin
echo -e "export NPM_CONFIG_PREFIX=~/.npm-global\nexport PATH=\$PATH:~/.npm-global/bin" >> ~/.bashrc

echo
echo -e "\e[1;94mInstalling Node dependencies for library\e[0m"
cd library
npm install
# npm install sudo -g
gulp bundle --ship
gulp package-solution --ship
npm link

## commands to create dev certificate and copy it to the root folder of the project
echo
echo -e "\e[1;94mGenerating dev certificate\e[0m"
gulp trust-dev-cert


# Convert the generated PEM certificate to a  CER certificate
openssl x509 -inform PEM -in ~/.rushstack/rushstack-serve.pem -outform DER -out ../spfx-dev-cert.cer

# Copy the PEM ecrtificate for non-Windows hosts
cp ~/.rushstack/rushstack-serve.pem ../spfx-dev-cert.pem

cd ..

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
echo -e "\e[1;94mInstalling Node dependencies for web part\e[0m"
cd webpart
npm link manage-data
npm if
echo
echo -e "\e[1;92mReady!\e[0m"

echo -e "\n\e[1;94m**********\nOptional: if you plan on using gulp serve, don't forget to add the container certificate to your local machine. Please visit https://aka.ms/spfx-devcontainer for more information\n**********"