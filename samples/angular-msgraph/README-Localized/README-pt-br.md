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
  - AngularJS
  createdDate: 2/16/2017 12:00:00 AM
---
## Web Part do MS Graph em Angular integrada com o Angular v1\. x

## Resumo
Este é um exemplo de web part do MS Graph que se conecta ao Microsoft Graph e extrai informações sobre o SharePoint do seu locatário.
Primeiro, ele receberá o conjunto de sites raiz (na limitação do Microsoft Graph)
e exibirá todas as listas associadas ao site seguido por todos os itens da lista.

![Primeira tela](./assets/Connect.png)

![Conectado](./assets/Connected.png)

![Conjunto de sites raiz](./assets/Root.png)

![Listas no site raiz](./assets/Lists.png)

![Itens da lista de comunicados](./assets/Items.png)


> Observação: Atualmente, no momento, só temos modelos desenvolvidos para a lista de comunicados. Todas as outras listas gerarão erros no momento.

## Versão do SharePoint Framework usada 
![drop](https://img.shields.io/badge/drop-ga-green.svg)

## Aplicável a

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Locatário de desenvolvedor do Office 365](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solução

Solução | Autor (s)
--------|---------
angulares-msgraph | David Hartman ([Slalom](https://slalom.com))

## Histórico de versão

Versão | Data | Comentários
-------|----|--------
2.0 | 19 de abril de 2017 | GA versão
1.0 | 6 de fevereiro de 2017 | Versão inicial

## Aviso de isenção de responsabilidade
**ESSE CÓDIGO É FORNECIDO *EM* GARANTIA DE QUALQUER TIPO, SEJA EXPRESSA OU IMPLÍCITA, INCLUINDO QUAISQUER GARANTIAS IMPLÍCITAS DE ADEQUAÇÃO A UMA FINALIDADE ESPECÍFICA, COMERCIABILIDADE OU NÃO VIOLAÇÃO.**

---

## Diversão de configuração
- clone este repositório.
- na linha de comando, execute:
 - `npm i typings -g`
 - `npm i`
 - `gulp serve

## Registrar o aplicativo

1. Entre no [Portal de Registro do Aplicativo](https://apps.dev.microsoft.com/) usando sua conta pessoal ou sua conta corporativa ou de estudante.

2. Escolha **Adicionar um aplicativo**.

3. Insira um nome para o aplicativo e escolha **Criar aplicativo**.

   A página de registro é exibida, listando as propriedades do seu aplicativo.

4. Copie a ID do Aplicativo. Esse é o identificador exclusivo do aplicativo.

5. Em **Plataformas**, escolha **Adicionar plataforma**.

6. Escolha **Web**.

7. Não deixe de marcar a caixa de diálogo **Permitir Fluxo Implícito** e insira *http://{Location of SP Workbench}* como o URI de Redirecionamento.

8. Escolha **Salvar**.

## Configurando o aplicativo
1. Substitua os valores de espaço reservado **aad** e **redirect_uri** pela ID do aplicativo e URL de redirecionamento do aplicativo registrado do Azure no arquivo GraphHelper.ts Em
src -> angularMsGraph -> GraphHelper.ts

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/angular-msgraph" /> 