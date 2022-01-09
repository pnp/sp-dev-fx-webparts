---
page_type: sample
products:
- office-sp
- ms-graph
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  - Microsoft Graph
  services:
  - SharePoint
  platforms:
  - react
  createdDate: 8/1/2017 12:00:00 AM
---
# Exemplo de autenticação do MSAL JS (biblioteca de autenticação da Microsoft)

## Resumo

Exemplo de Web Part da Estrutura do SharePoint que utiliza a [Microsoft Authentication Library (MSAL JS)](https://github.com/AzureAD/microsoft-authentication-library-for-js) para chamar o Microsoft Graph.

### MSAL WP

A web part de exemplo recuperará um token de acesso com o escopo `User.Read` e `Mail.Read`. Quando um token de acesso é recuperado, ele fará uma chamada para receber o usuário atual e suas mensagens de e-mail.

![Escopos de permissão](./assets/permission-scopes.png)

Depois de ter concedido as permissões, as seguintes informações serão exibidas:

![A web part MSAL exibida no Workbench do SharePoint](./assets/msal-wp-output.png)

## Versão do SharePoint Framework usada 
![drop](https://img.shields.io/badge/drop-GA-green.svg)

## Aplicável a

* [Estrutura do SharePoint](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Locatário de desenvolvedor do Office 365](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solução

Solução | Autor (s)
--------|---------
reagir-MSAL-msgraph | Elio Struyf (MVP, [U2U](https://www.u2u.be), [@eliostruyf](https://www.twitter.com/eliostruyf))

## Histórico de versão

Versão | Data | Comentários
-------|----|--------
1.0.0 | 17 de março de 2017 | Versão inicial

## Aviso de isenção de responsabilidade
**ESSE CÓDIGO É FORNECIDO *EM* GARANTIA DE QUALQUER TIPO, SEJA EXPRESSA OU IMPLÍCITA, INCLUINDO QUAISQUER GARANTIAS IMPLÍCITAS DE ADEQUAÇÃO A UMA FINALIDADE ESPECÍFICA, COMERCIABILIDADE OU NÃO VIOLAÇÃO.**

---

## Pré-requisitos

- Assinatura do Office 365 com o SharePoint Online e o Exchange

## Caminho mínimo para impressionante

- Clone este repositório
- Vá e registre um novo aplicativo no [https://apps.dev.microsoft.com](https://apps.dev.microsoft.com)
    - Quando estiver conectado, clique em **adicionar um aplicativo**
    - Especifique o nome do aplicativo e clique em criar
    - Clique em **Adicionar plataforma** e escolha **Web**.
    - Especifique a URL do Workbench e certifique-se de que **permitir o fluxo implícito** esteja habilitado
    - Clique em salvar para armazenar essas alterações

![Configuração de URL da Web e fluxo implícito](./assets/redirect-url.png)

- Copie a **identificação do aplicativo** e altere adicionar isto ao arquivo [MsalWP.tsx na linha 20](./src/webparts/msalWp/components/MsalWp.tsx#20)
- Executar `npm i`
- Execute `gulp serve --nobrowser`
- Teste sua Web Part no ambiente de trabalho local ou hospedado

## Recursos

A web part de exemplo nesta solução ilustra os seguintes conceitos sobre a estrutura do SharePoint:

- usando reagir à criação de web parts do lado do cliente do SharePoint Framework
- usando o Office UI Fabric React estilos para criar uma experiência de usuário consistente com o SharePoint e o Office
- autenticação sob demanda com o Azure Active Directory usando a biblioteca MSAL JS
- comunicar-se com o Microsoft Graph usando sua API REST
- usar a biblioteca do JS do MSAL com web parts do SharePoint Framework construída usando o React

![](https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-msal-msgraph)
