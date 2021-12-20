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
# Образцы диспетчера приглашений API Graph для Azure Active Directory

## Сводка

Примеры созданных с использованием React веб-частей SharePoint Framework, демонстрирующие возможность использовать Graph API для приглашения внешних пользователей в Azure Active Directory.

### Диспетчер приглашений

Пример клиентской веб-части SharePoint Framework на основе React, иллюстрирующих приглашение внешнего пользователя с помощью Microsoft Graph.

NB Я ожидаю общедоступную версию от HttpGraphClient (в условиях разрешения), чтобы использовать его в сценарии.
Ознакомьтесь с этой статьей:
* [HttpGraphClient](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/call-microsoft-graph-from-your-web-part)

![Веб-часть диспетчера приглашений, отображаемая в рабочей области SharePoint](./assets/SPFx-Invitation-Manager.gif)

## Использованная версия SharePoint Framework 
![drop](https://img.shields.io/badge/drop-1.3.0-green.svg)

## Сфера применения

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [клиент разработчика приложений для Office 365;](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Решение

Решение | Авторы
--------|---------
react-invitation-manager | Гиулиано де-Лука ([@giuleon](https://twitter.com/giuleon) [www.delucagiuliano.com](http://www.delucagiuliano.com))

## Журнал версий

Версия | Дата | Примечания
-------|----|--------
1.0.0 | 14 июля 2017 г. | Начальный выпуск
1.0.1 | 09 октября 2017 г. | Обновлено до версии 1.3.0

## Заявление об отказе
**ЭТОТ КОД ПРЕДОСТАВЛЯЕТСЯ *КАК ЕСТЬ* БЕЗ КАКОЙ-ЛИБО ЯВНОЙ ИЛИ ПОДРАЗУМЕВАЕМОЙ ГАРАНТИИ, ВКЛЮЧАЯ ПОДРАЗУМЕВАЕМЫЕ ГАРАНТИИ ПРИГОДНОСТИ ДЛЯ КАКОЙ-ЛИБО ЦЕЛИ, ДЛЯ ПРОДАЖИ ИЛИ ГАРАНТИИ ОТСУТСТВИЯ НАРУШЕНИЯ ПРАВ ИНЫХ ПРАВООБЛАДАТЕЛЕЙ.**

---

## Необходимые компоненты

- Подписка на Office 365 с SharePoint Online and Exchange.

## Путь к совершенству

- Клонируйте этот репозиторий
- Зарегистрировать новое веб-приложение в службе Azure Active Directory, соответствующей вашему клиенту Office 365:
  - Введите URL-адрес размещенной версии рабочей области SharePoint как **URL-адрес для входа**, например. *https://contoso.sharepoint.com/\_layouts/15/workbench.aspx*
  - Включите неявный поток OAuth
  - Предоставьте приложению разрешение на ** чтение и запись данных каталога Microsoft Graph**
  - Скопируйте идентификатор приложения
- В файле **src/webparts/invitationManager/AdalConfig.ts** свойства **clientId** введите идентификатор приложения, зарегистрированный в Azure
- выполните в командной строке следующую команду:
  - `npm i`
  - `gulp serve --nobrowser`
- перейдите к размещенной рабочей области SharePoint
- добавьте веб-части** диспетчера приглашений **

## Функции

Образец веб-части иллюстрирует следующие концепции SharePoint Framework:

- использование React для создания клиентских веб-частей SharePoint Framework
- использование стилей Office UI Fabric React для постоянного взаимодействия пользователей с SharePoint и Office
- проверка подлинности по запросу используя Azure Active Directory с помощью библиотеки ADAL JS
- взаимодействие с Microsoft Graph с помощью REST API
- использование библиотеки ADAL JS с веб-частями SharePoint Framework, созданными с помощью React

![](https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-invitation-manager)
