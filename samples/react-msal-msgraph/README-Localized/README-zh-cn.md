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
# Microsoft 身份验证库(MSAL JS) 身份验证示例

## 摘要

此示例 SharePoint 框架 Web 部件使用 [Microsoft 身份验证库 (MSAL JS) ](https://github.com/AzureAD/microsoft-authentication-library-for-js)来调用 Microsoft Graph。

### MSAL WP

此示例使用 `User.Read` 和 `Mail.Read` 范围检索访问令牌。检索到访问令牌后，将执行调用以接收当前用户和其邮件正文。

![权限范围](./assets/permission-scopes.png)

授予权限后，将显示下列信息：

![SharePoint 工作台中显示的 MSAL web 部件](./assets/msal-wp-output.png)

## 使用的 SharePoint Framework 版本 
![drop](https://img.shields.io/badge/drop-GA-green.svg)

## 适用于

* [SharePoint 框架](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 开发人员租户](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## 解决方案

解决方案|作者
--------|---------
react-msal-msgraph|Elio Struyf (MVP, [U2U](https://www.u2u.be), [@eliostruyf](https://www.twitter.com/eliostruyf))

## 版本历史记录

版本|日期|注释
-------|----|--------
1.0.0|2017 年 3 月 17 日|首次发布

## 免责声明
**此代码*按原样提供*，不提供任何明示或暗示的担保，包括对特定用途适用性、适销性或不侵权的默示担保。**

---

## 先决条件

- 包含 SharePoint Online 和 Exchange 的 Office 365 订阅

## 通向卓越的最短路径

- 克隆此存储库
- 转到 [https://apps.dev.microsoft.com](https://apps.dev.microsoft.com) 注册新的应用程序
    - 登录后，单击“**添加应用**”
    - 指定应用程序名称，并点击“创建”。
    - 单击“**添加平台**”并选择 **Web**
    - 指定工作台 URL，并确保已启用“**允许隐式流**”
    - 点击“保存”以存储这些更改

![Web URL 配置和隐式流](./assets/redirect-url.png)

- 复制**应用程序 id**并添加至 [MsalWP.tsx file on line 20](./src/webparts/msalWp/components/MsalWp.tsx#20)
- 运行 `npm i`
- 运行 `gulp serve --nobrowser`
- 在本地或托管工作台中测试 web 部件

## 功能

此解决方案中的示例 web 部件基于 SharePoint 框架阐述了以下概念：

- 使用“回应” 构建 SharePoint 框架客户端 Web 部件
- 使用 Office UI Fabric React 样式创建与 SharePoint 和 Office 一致的用户体验
- 使用 MSAL JS 库通过 Azure Active Directory 按需进行身份验证
- 使用 REST API 与 Microsoft Graph 通信
- 使用 MSAL JS 库及使用“回应”创建的 SharePoint 框架 web 部件

![](https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-msal-msgraph)
