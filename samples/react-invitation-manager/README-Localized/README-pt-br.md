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
# Exemplos de API do Gerenciador de convite do Azure Active Directory

## Resumo

Exemplo de Web Parts da Estrutura do SharePoint compiladas usando React, ilustrando a possibilidade de usar a API do Graph para convidar usuários externos para o Azure Active Directory.

### Gerenciador de convites

Exemplo de Web Part de cliente do SharePoint Framework criado usando reagir mostrando como convidar o usuário externo usando o Microsoft Graph.

NB. Estou aguardando o lançamento do HttpGraphClient (um bit limitado em termos de permissão) para usá-lo neste cenário.
Dê uma olhada detalhada:
* [HttpGraphClient](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/call-microsoft-graph-from-your-web-part)

![Web Part do Gerenciador de convites exibida no Workbench do SharePoint](./assets/SPFx-Invitation-Manager.gif)

## Versão do SharePoint Framework usada 
![drop](https://img.shields.io/badge/drop-1.3.0-green.svg)

## Aplicável a

* [Estrutura do SharePoint](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Locatário de desenvolvedor do Office 365](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solução

Solução | Autor (s)
--------|---------
reagir – Gerenciador de convite | Giuliano de Luca ([@giuleon](https://twitter.com/giuleon), [www.delucagiuliano.com](http://www.delucagiuliano.com))

## Histórico de versão

Versão | Data | Comentários
-------|----|--------
1.0.0 | 14 de julho de 2017 | Versão inicial do
1.0.1 | 9 de outubro de 2017 | Atualizado para a versão 1.3.0

## Aviso de isenção de responsabilidade
**ESSE CÓDIGO É FORNECIDO *EM* GARANTIA DE QUALQUER TIPO, SEJA EXPRESSA OU IMPLÍCITA, INCLUINDO QUAISQUER GARANTIAS IMPLÍCITAS DE ADEQUAÇÃO A UMA FINALIDADE ESPECÍFICA, COMERCIABILIDADE OU NÃO VIOLAÇÃO.**

---

## Pré-requisitos

- Assinatura do Office 365 com o SharePoint Online e o Exchange

## Caminho mínimo para impressionante

- Clone este repositório.
- no Azure Active Directory correspondente ao seu locatário do Office 365, registre um novo aplicativo Web:
  - como o **URL de logon** insira a URL da versão hospedada do SharePoint Workbench, por exemplo, *https://contoso.sharepoint.com/\_layouts/15/workbench.aspx*
  - habilitar o fluxo implícito OAuth
  - conceder ao aplicativo a permissão**de dados do Microsoft Graph/leitura e gravação do diretório**
  - copie a ID do aplicativo.
- no arquivo **src/WebParts/convitemanager/AdalConfig. TS**, na propriedade **clientId** insira a ID de aplicativo registrada no Azure
- na linha de comando, execute:
  - `npm i`
  - `gulp serve --nobrowser`
- Navegue até a versão hospedada do Workbench do SharePoint
- Adicionar a Web Part **Gerenciador de convites**

## Recursos

A web part de exemplo nesta solução ilustra os seguintes conceitos sobre a estrutura do SharePoint:

- usando reagir à criação de web parts do lado do cliente do SharePoint Framework
- usando o Office UI Fabric React estilos para criar uma experiência de usuário consistente com o SharePoint e o Office
- autenticação sob demanda com o Azure Active Directory usando a biblioteca ADAL JS
- comunicar-se com o Microsoft Graph usando sua API REST
- usar a biblioteca do JS do ADAL com web parts do SharePoint Framework construída usando o React

![](https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-invitation-manager)
