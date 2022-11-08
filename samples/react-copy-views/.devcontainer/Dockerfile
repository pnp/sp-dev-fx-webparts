FROM mcr.microsoft.com/powershell:7.1.0-ubuntu-focal

ENV NPM_CONFIG_PREFIX=/home/copy-views-container/.npm-global \
  PATH=$PATH:/home/copy-views-container/.npm-global/bin

RUN apt-get update && apt-get install -y \
  git \
  curl \
  sudo \
  zsh \
  jq \
  vim \
  && curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash - \
  && apt-get install nodejs -y \
  && rm -rf /var/lib/apt/lists/*

RUN useradd \
  --user-group \
  --system \
  --create-home \
  --no-log-init \
  copy-views-container
  
USER copy-views-container

EXPOSE 5432 4321 35729

WORKDIR /home/copy-views-container

# ********************************************************
# * Anything else you want to do like clean up goes here *
# ********************************************************

RUN npm install -g gulp-cli@latest yo@4 @microsoft/generator-sharepoint@1.15.x spfx-fast-serve@3 @pnp/cli-microsoft365 --unsafe-perm 

RUN zsh -c "$(curl https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)" --unattended \
    && git clone https://github.com/denysdovhan/spaceship-prompt.git "$HOME/.oh-my-zsh/custom/themes/spaceship-prompt" --depth=1 \
    && ln -s "$HOME/.oh-my-zsh/custom/themes/spaceship-prompt/spaceship.zsh-theme" "$HOME/.oh-my-zsh/custom/themes/spaceship.zsh-theme" \
    && cp "$HOME/.oh-my-zsh/templates/zshrc.zsh-template" $HOME/.zshrc \
    && git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $HOME/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting \
    && git clone https://github.com/zsh-users/zsh-autosuggestions $HOME/.oh-my-zsh/custom/plugins/zsh-autosuggestions \
    && sed -i "11s/ZSH_THEME=\"robbyrussell\"/ZSH_THEME=\"spaceship\"/" ~/.zshrc \
    && sed -i "27s/# DISABLE_AUTO_UPDATE=\"true\"/DISABLE_AUTO_UPDATE=\"true\"/" ~/.zshrc \
    && sed -i "73s/plugins=(git)/plugins=(git zsh-autosuggestions zsh-syntax-highlighting)/" ~/.zshrc \
    && sed -i "50s/# COMPLETION_WAITING_DOTS/COMPLETION_WAITING_DOTS/" ~/.zshrc

CMD [ "/bin/zsh", "-l" ]
