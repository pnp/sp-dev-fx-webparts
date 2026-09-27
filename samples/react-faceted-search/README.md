# React faceted search

A minimal SharePoint Framework 1.23.2 web part that searches the current site with the read-only SharePoint Search REST endpoint:

`/_api/search/query`

It uses React 17 and Fluent UI v9, limits requests to 50 results, URL-encodes request parameters, validates user-controlled query and refinement values, and shows loading, empty, error, and retry states. It does not use Microsoft Graph or a custom API.

## Run

```bash
npm install
npm start
```

Use the SharePoint hosted workbench, then add **Faceted search**. The current user must have permission to search the site.

The sample author picture is [https://github.com/vystartasv.png](https://github.com/vystartasv.png).

## Test

```bash
npm test
```

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-faceted-search" />
