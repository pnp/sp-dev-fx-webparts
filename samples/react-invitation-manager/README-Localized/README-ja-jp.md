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
# Azure Active Directory 招待マネージャー Graph API のサンプル

## 概要

Azure Active Directory に外部ユーザーを招待する Graph API を使用する可能性を示す React を使用して構築された SharePoint Framework Web パーツのサンプルです。

### 招待マネージャー

Microsoft Graph を使用して外部ユーザーを招待する方法を示す、React を使用して構築されたサンプルの SharePoint Framework クライアント側 Web パーツ。

NB.このシナリオでそれを使用するために HttpGraphClient の GA (許可という点では少し制限があります) を待っています。
詳細を確認するには、ここを参照してください:
* [HttpGraphClient](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/call-microsoft-graph-from-your-web-part)

![SharePoint ワークベンチに表示される招待マネージャーの Web パーツ](./assets/SPFx-Invitation-Manager.gif)

## 使用されている SharePoint Framework バージョン 
![drop](https://img.shields.io/badge/drop-1.3.0-green.svg)

## 適用対象

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 Developer のテナント](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## 解決方法

ソリューション|作成者
--------|---------
react-invitation-manager|Giuliano De Luca ([@giuleon](https://twitter.com/giuleon)、[www.delucagiuliano.com](http://www.delucagiuliano.com))

## バージョン履歴

バージョン|日付|コメント
-------|----|--------
1.0.0|2017 年 7 月 14 日|初期リリース
1.0.1|2017 年 10 月 9 日|バージョン 1.3.0 に更新

## 免責事項
**このコードは、明示または黙示のいかなる種類の保証なしに*現状のまま*提供されるものであり、特定目的への適合性、商品性、権利侵害の不存在についての暗黙的な保証は一切ありません。**

---

## 前提条件

- SharePoint Online および Exchange 付きの Office 365 サブスクリプション

## 素晴らしいへの最小限の道

- このリポジトリの複製を作成する
- Office 365 テナントに対応する Azure Active Directory で、新しい Web アプリケーションを登録する:
  - **サインオン URL** に SharePoint ワークベンチのホスト バージョンの URL を入力する (例: *https://contoso.sharepoint.com/\_layouts/15/workbench.aspx*)
  - OAuth 暗黙的フローを有効にする
  - アプリケーションに **Microsoft Graph/ディレクトリ データの読み取りと書き込み**権限を付与する
  - アプリケーション ID をコピーする
- **clientId** プロパティの **src/webparts/invitationManager/AdalConfig.ts** ファイルに、Azure に登録されているアプリケーション ID を入力する
- コマンド ラインで、次を実行する
  - `npm i`
  - `gulp serve --nobrowser`
- SharePoint ワークベンチのホスト バージョンに移動する
- **招待マネージャー**の Web パーツを追加する

## 機能

このソリューションの Web パーツのサンプルは、SharePoint Framework の上位にある次の概念を示しています。

- React を使用した SharePoint Framework クライアント側 Web パーツの構築
- Office UI Fabric React スタイルを使用した SharePoint および Office と一貫性のあるユーザー エクスペリエンスの構築
- ADAL JS ライブラリを使用した Azure Active Directory でのオンデマンド認証
- REST API を使用した Microsoft Graph との通信
- React を使用して構築された SharePoint Framework Web パーツを使用した ADAL JS ライブラリの使用

![](https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-invitation-manager)
