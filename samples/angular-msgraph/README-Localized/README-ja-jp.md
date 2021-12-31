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
##Angular v1.x で作成された Angular MS Graph Web パーツ

## 概要
これは、Microsoft Graph に接続し、テナントから SharePoint
情報を引き出すサンプルの MS Graph Web パーツです。最初にルート サイト コレクションを取得し (現在は Microsoft Graph による制限)、
次にサイトに関連付けられているすべてのリストを表示し、次にリスト内のすべてのアイテムを表示します。

![最初の画面](./assets/Connect.png)

![ログイン済み](./assets/Connected.png)

![ルート サイト コレクション](./assets/Root.png)

![ルート サイト内のリスト](./assets/Lists.png)

![お知らせリストのアイテム](./assets/Items.png)


> 注:現在、お知らせリスト用に開発されたモデルのみを持っています。その他のリストはすべて、現在エラーが発生しています。

## 使用されている SharePoint Framework バージョン 
![drop](https://img.shields.io/badge/drop-ga-green.svg)

## 適用対象

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 Developer のテナント](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## 解決方法

ソリューション|作成者
--------|---------
angular-msgraph|David Hartman ([Slalom](https://slalom.com))

## バージョン履歴

バージョン|日付|コメン
-------|----|--------
2.0|2017 年 4 月 19 日|GA リリース
1.0|2017 年 2 月 6 日|初期リリース

## 免責事項
**このコードは、明示または黙示のいかなる種類の保証なしに*現状のまま*提供されるものであり、特定目的への適合性、商品性、権利侵害の不存在についての暗黙的な保証は一切ありません。**

---

## 構成の草原
- このリポジトリの複製を作成する
- コマンド ラインで、次を実行する
 - `npm i typings -g`
 - `npm i`
 - `gulp serve

## アプリケーションの登録

1. 個人用アカウントか職場または学校アカウントのいずれかを使用して、[アプリ登録ポータル](https://apps.dev.microsoft.com/)にサインインします。

2. [**アプリの追加**] を選択します。

3. アプリの名前を入力して、[**アプリケーションの作成**] を選択します。

   登録ページが表示され、アプリのプロパティが一覧表示されます。

4. アプリケーション ID をコピーします。これは、アプリの一意識別子です。

5. [**プラットフォーム**] で、[**プラットフォームの追加**] を選択します。

6. [**Web**] を選択します。

7. [**暗黙的フローを許可する**] チェック ボックスが選択されていることを確認して、リダイレクト URI として *http://{SP ワークベンチの場所}* を入力します。

8. [**保存**] を選択します。

## アプリの構成
1. **aad** および **redirect_uri** プレースホルダー値をアプリケーション ID に置き換え、
GraphHelper.ts ファイルの登録済み Azure アプリケーションの URL を src -> angularMsGraph -> GraphHelper.ts でリダイレクトします。

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/angular-msgraph" /> 