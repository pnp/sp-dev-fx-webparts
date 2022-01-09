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
# Microsoft Authentication Library (MSAL JS) の認証サンプル

## 概要

[Microsoft Authentication Library (MSAL JS)](https://github.com/AzureAD/microsoft-authentication-library-for-js) を使用して Microsoft Graph を呼び出す SharePoint Framework Web パーツのサンプルです。

### MSAL WP

サンプル Web パーツは、`User.Read` および `Mail.Read` 範囲でアクセス トークンを取得します。アクセス トークンを取得すると、現在のユーザーとそのメール メッセージを受信する呼び出しが行われます。

![アクセス許可スコープ](./assets/permission-scopes.png)

アクセス許可を付与すると、次の情報が表示されます。

![SharePoint ワークベンチに表示される MSAL の Web パーツ](./assets/msal-wp-output.png)

## 使用されている SharePoint Framework バージョン 
![drop](https://img.shields.io/badge/drop-GA-green.svg)

## 適用対象

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 Developer のテナント](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## 解決方法

ソリューション|作成者
--------|---------
react-msal-msgraph|Elio Struyf (MVP、[U2U](https://www.u2u.be)、[@eliostruyf](https://www.twitter.com/eliostruyf))

## バージョン履歴

バージョン|日付|コメント
-------|----|--------
1.0.0|2017 年 3 月 17 日|初期リリース

## 免責事項
**このコードは、明示または黙示のいかなる種類の保証なしに*現状のまま*提供されるものであり、特定目的への適合性、商品性、権利侵害の不存在についての暗黙的な保証は一切ありません。**

---

## 前提条件

- SharePoint Online および Exchange 付きの Office 365 サブスクリプション

## 素晴らしいへの最小限の道

- このリポジトリの複製を作成する
- [https://apps.dev.microsoft.com](https://apps.dev.microsoft.com) にアクセスして、新しいアプリケーションを登録する
    - ログインしたら、[**アプリの追加**] をクリックする
    - [アプリケーション名] を指定し、[作成] をクリックする
    - [**プラットフォームの追加**] をクリックし、[**Web**] を選択する
    - ワークベンチの URL を指定し、[**暗黙的フローを許可する**] が有効であることを確認する
    - [保存] をクリックして変更を保存する

![Web URL 構成と暗黙的フロー](./assets/redirect-url.png)

- **アプリケーション ID** をコピーし、変更して [20 行目の MsalWP.tsx](./src/webparts/msalWp/components/MsalWp.tsx#20) ファイルに追加する
- `npm i` を実行する
- `gulp serve --nobrowser` を実行する
- ローカルまたはホスト ワークベンチで Web パーツをテストする

## 機能

このソリューションの Web パーツのサンプルは、SharePoint Framework の上位にある次の概念を示しています。

- React を使用した SharePoint Framework クライアント側 Web パーツの構築
- Office UI Fabric React スタイルを使用した SharePoint および Office と一貫性のあるユーザー エクスペリエンスの構築
- MSAL JS ライブラリを使用した Azure Active Directory でのオンデマンド認証
- REST API を使用した Microsoft Graph との通信
- React を使用して構築された SharePoint Framework Web パーツを使用した MSAL JS ライブラリの使用

![](https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-msal-msgraph)
