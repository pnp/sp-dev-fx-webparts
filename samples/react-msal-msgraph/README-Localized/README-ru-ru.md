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
# Образец проверка подлинности Microsoft Authentication Library (MSAL JS)

## Сводка

Пример веб-части SharePoint Framework, в которой используется [библиотека проверки подлинности Microsoft (MSAL JS)](https://github.com/AzureAD/microsoft-authentication-library-for-js) для вызова Microsoft Graph.

### MSAL WP

Образец веб-части получает маркер доступа с помощью областей `User.Read` и `Mail.Read`. После получения маркера доступа, выводится вызов для получения текущего пользователя и его сообщений.

![Области разрешений](./assets/permission-scopes.png)

После вашего разрешения, появится следующая информация:

![Веб-часть MSAL, отображаемая в рабочей области SharePoint](./assets/msal-wp-output.png)

## Использованная версия SharePoint Framework 
![drop](https://img.shields.io/badge/drop-GA-green.svg)

## Сфера применения

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [клиент разработчика приложений для Office 365;](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Решение

Решение | Авторы
--------|---------
react-msal-msgraph| Елио Струйф (MVP [U2U](https://www.u2u.be), [@eliostruyf](https://www.twitter.com/eliostruyf))

## Журнал версий

Версия | Дата | Примечания
-------|----|--------
1.0.0 | 17 марта 2017 г. | Первоначальный выпуск

## Заявление об отказе
**ЭТОТ КОД ПРЕДОСТАВЛЯЕТСЯ *КАК ЕСТЬ* БЕЗ КАКОЙ-ЛИБО ЯВНОЙ ИЛИ ПОДРАЗУМЕВАЕМОЙ ГАРАНТИИ, ВКЛЮЧАЯ ПОДРАЗУМЕВАЕМЫЕ ГАРАНТИИ ПРИГОДНОСТИ ДЛЯ КАКОЙ-ЛИБО ЦЕЛИ, ДЛЯ ПРОДАЖИ ИЛИ ГАРАНТИИ ОТСУТСТВИЯ НАРУШЕНИЯ ПРАВ ИНЫХ ПРАВООБЛАДАТЕЛЕЙ.**

---

## Необходимые компоненты

- Подписка на Office 365 с SharePoint Online and Exchange.

## Путь к совершенству

- Клонируйте этот репозиторий
- Зарегистрируйте новое приложение в [https://apps.dev.microsoft.com](https://apps.dev.microsoft.com)
    - После входа, нажмите **Добавить приложение**
    - Укажите имя приложения и щелкните "Создать".
    - Щелкните **Добавить платформу** и выберите параметр **Веб**.
    - Укажите URL-адрес рабочей области и убедитесь, что **разрешение неявного потока** включено
    - Чтобы сохранить изменения, нажмите кнопку "Сохранить".

![Настройка URL-адреса и неявный поток](./assets/redirect-url.png)

- Скопируйте **идентификатор приложения** и измените добавив в [файл MsalWP.tsx в строке 20](./src/webparts/msalWp/components/MsalWp.tsx#20)
- Запустите `npm i`
- Запустите `gulp serve --nobrowser`
- Проверьте нашу веб-часть в местной или размещенной рабочей области

## Функции

Образец веб-части иллюстрирует следующие концепции SharePoint Framework:

- использование React для создания клиентских веб-частей SharePoint Framework
- использование стилей Office UI Fabric React для постоянного взаимодействия пользователей с SharePoint и Office
- проверка подлинности по запросу используя Azure Active Directory с помощью библиотеки MSAL JS
- взаимодействие с Microsoft Graph с помощью REST API
- использование библиотеки MSAL JS с веб-частями SharePoint Framework, созданными с помощью React

![](https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-msal-msgraph)
