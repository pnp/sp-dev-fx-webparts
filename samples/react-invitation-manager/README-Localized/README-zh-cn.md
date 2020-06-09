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
# Azure Active Directory 邀请管理器 Graph API 示例

## 摘要

此示例 SharePoint 框架 Web 部件使用 React 生成，展示了如何使用 Graph API 邀请外部用户转到 Azure Active Directory。

### 邀请管理器

使用“回应”创建的示例 SharePoint 框架客户端 web 部件显示如何利用 Microsoft Graph 邀请外部用户。

NB。我正在等待 HttpGraphClient 的 GA（权限方面有所限制）以在此场景中使用。
查看以深入了解：
* [HttpGraphClient](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/call-microsoft-graph-from-your-web-part)

![邀请管理器 web 部件在 SharePoint 工作台中显示](./assets/SPFx-Invitation-Manager.gif)

## 使用的 SharePoint Framework 版本 
![drop](https://img.shields.io/badge/drop-1.3.0-green.svg)

## 适用于

* [SharePoint 框架](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 开发人员租户](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## 解决方案

解决方案|作者
--------|---------
react-invitation-manager|Giuliano De Luca ([@giuleon](https://twitter.com/giuleon) , [www.delucagiuliano.com](http://www.delucagiuliano.com))

## 版本历史记录

版本|日期|注释
-------|----|--------
1.0.0|2017 年 7 月 14 日|首次发布
1.0.1|2017 年 10 月 9 日|更新到版本 1.3.0

## 免责声明
**此代码*按原样提供*，不提供任何明示或暗示的担保，包括对特定用途适用性、适销性或不侵权的默示担保。**

---

## 先决条件

- 包含 SharePoint Online 和 Exchange 的 Office 365 订阅

## 通向卓越的最短路径

- 克隆此存储库。
- 在对应 Office 365 租户的 Azure Active Directory 中注册新的 Web 应用程序：
  - 在“**登录 URL**”上输入托管版 SharePoint 工作台的 URL，例如 *https://contoso.sharepoint.com/\_layouts/15/workbench.aspx*
  - 启用 OAuth 隐式流
  - 向应用程序授予 **Microsoft Graph/读写目录数据** 权限
  - 复制应用程序 ID
- 在 **clientId** 属性中的 **src/webparts/invitationManager/AdalConfig.ts** 件内输入 Azure 中注册的应用程序 ID
- 在命令行中，运行
  - `npm i`
  - `gulp serve --nobrowser`
- 转到 托管版 SharePoint 工作台
- 添加 **邀请管理器** web 部件

## 功能

此解决方案中的示例 web 部件基于 SharePoint 框架阐述了以下概念：

- 使用“回应” 构建 SharePoint 框架客户端 Web 部件
- 使用 Office UI Fabric React 样式创建与 SharePoint 和 Office 一致的用户体验
- 使用 ADAL JS 库通过 Azure Active Directory 按需进行身份验证
- 使用 REST API 与 Microsoft Graph 通信
- 使用 ADAL JS 库及使用“回应”创建的 SharePoint 框架 web 部件

![](https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-invitation-manager)
