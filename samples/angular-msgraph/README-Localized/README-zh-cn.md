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
## 通过 Angular v1.x 构建的 Angular MS Graph web 部件

## 摘要
此 MS Graph Web 部件连接到 Microsoft Graph，并从租户中提取 SharePoint 信息。
首先拉取跟网站集（当前由 Microsoft Graph 限制），
随后显示后面跟着列表内所有项目的网站的关联列表。

![首屏](./assets/Connect.png)

![已登录](./assets/Connected.png)

![根网站集](./assets/Root.png)

![根网站中列表](./assets/Lists.png)

![通知列表项](./assets/Items.png)


> 注意：我当前只拥有专为通知列表开发的模型。所有其他列表当前都会产生错误。

## 使用的 SharePoint Framework 版本 
![drop](https://img.shields.io/badge/drop-ga-green.svg)

## 适用于

* [SharePoint Framework 开发人员预览版](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 开发人员租户](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## 解决方案

解决方案|作者
--------|---------
angular-msgraph|David Hartman ([Slalom](https://slalom.com))

## 版本历史记录

版本 |日期 |注释
-------|----|--------
2.0 |2017年4月19日 | GA 发布
1.0 |2017 年 2 月 6日 |首次发布

## 免责声明
**此代码*按原样提供*，不提供任何明示或暗示的担保，包括对特定用途适用性、适销性或不侵权的默示担保。**

---

## 配置 Bliss
- 克隆此存储库。
- 在命令行中运行：
 - `npm i typings -g`
 - `npm i`
 - `gulp serve

## 注册应用程序

1. 使用个人或工作或学校帐户登录到[应用注册门户](https://apps.dev.microsoft.com/)。

2. 选择“**添加应用**”。

3. 输入应用的名称，并选择“**创建应用程序**”。

   将显示注册页，其中列出应用的属性。

4. 复制应用程序 ID。这是应用的唯一标识符。

5. 在“**平台**”下，选择“**添加平台**”。

6. 选择“**Web**”。

7. 请确保已选中“**允许隐式流**”复选框，输入 *http://{Location of SP Workbench}* 作为重定向 URI。

8. 选择“**保存**”。

## 配置应用程序
1. 使用 src -> angularMsGraph -> GraphHelper.ts 下 GraphHelper.
ts 文件中的已注册 Azure 应用的应用程序 ID 和重定向 url 替换 **aad** 和 **redirect\_uri** 占位符值

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/angular-msgraph" /> 