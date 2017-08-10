# React Content Query WebPart

## Summary 

The `React Content Query WebPart` is a modern version of the good old `Content by Query WebPart` that was introduced in SharePoint 2007. Built for *SharePoint 2016* and *Office 365*, this modern version is built against the new **SharePoint Framework (SPFx)** and uses the latest *Web Stack* practices. While the original WebPart was based on a `XSLT` templating engine, this *React* WebPart is based on the well known [Handlebars templating engine](http://handlebarsjs.com), which empowers users to create simple, yet powerfull `HTML` templates for rendering the queried content. This new version also lets the user query `any site collections` which resides on the same domain url, add `unlimited filters`, query *DateTime* fields to the `nearest minute` rather than being limited to a day, and much more.

<img src="https://github.com/spplante/react-content-query/blob/master/Misc/toolpart.gif" />

## Used SharePoint Framework Version
![drop](https://img.shields.io/badge/drop-GA-green.svg)

## Applies to

* [SharePoint Framework Developer](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](http://dev.office.com/sharepoint/docs/spfx/set-up-your-developer-tenant)

## Solution

Solution|Authors
--------|-----------
react-content-query-webpart|Simon-Pierre Plante

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|May 04, 2017|Initial release
1.0.1|July 23rd 15, 2017|Updated to GA Version

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

## Features

### Cross site collection

The WebPart uses the search in order to get all sites under the current domain, which makes it possible to query not only subsites but other site collections and their subsites as well.

![DateTime](https://github.com/spplante/react-content-query/blob/master/Misc/allsites.gif "DateTime")
<br>

### Unlimited filters

The user isn't limited to 3 filters anymore, an unlimited amount of filters can be added to narrow down your query

<img src="https://github.com/spplante/react-content-query/blob/master/Misc/filters.gif" width="500" />
<br>

### Improved date time filters

It is now possible to include time validation when querying date fields, giving the ability to be more precise when it comes to querying items against date values.

<img src="https://github.com/spplante/react-content-query/blob/master/Misc/datetime.gif" width="500" />
<br>

### Handlebars templating engine

Enjoy a simple, yet powerfull html-based templating engine for rendering your results. The WebPart even generates a default Handlebars template for you based on the view fields you have selected during the configuration! 

For advanced users, more than 150 Handlebars block helpers are available by default within the user defined template. For a list of all block helpers, see [handlebars-helpers](https://github.com/helpers/handlebars-helpers#helpers) 
<br>

### Built-in template editor

Edit your Handlebars template directly within the toolpane using a built-in [code editor](https://ace.c9.io/) which provides code folding, syntax highlighting, line wrapping, indentation and many more features to the tip of your fingers.

<img src="https://github.com/spplante/react-content-query/blob/master/Misc/editor.gif" />
<br>

## Getting Started

### Adding the WebPart to your page

To add the `React Content Query WebPart` to your site page you have two options : 
- Either clone this repository, build the project yourself and connect it to SharePoint (see [officedev documentation](https://dev.office.com/sharepoint/docs/spfx/web-parts/get-started/connect-to-sharepoint))
- Or download the `react-content-query-webpart.sppkg` file available in the `sharepoint/solution` folder of the repository and add it directly in your app catalog in order to be able to use it in your site. 

Note : The second method will only work for Office 365 sites, since the **.ppkg** file points to an Office 365 public CDN url which expects the referer to come from a valid https://**\*.sharepoint.com\*** url.

### Configuring the WebPart

As seen in the [User friendly configuration](#user-friendly-configuration) section, configuring the WebPart is quite straight forward. However, here's a list of *gotchas* that could save you some time :

- The `Web Url` property uses the search to find all sites that are under the current domain. That being said, newly created sites can take a while to appear within the dropdown options, based on the search crawl schedule.
- The `Filters` property still supports query string expressions like *[PageQueryString:ParamName]* for text fields, and date expressions such as *[Today]* or *[Today] + 4* for date fields.
- The `Template` property stops getting automtically generated while selecting view fields as soon as the template is manually updated, in order to prevent unwanted loss of templating efforts.
- The `Template Url` property has priority over the `Template` property, which means if a valid handlebars template url is provided, the inline template will be kept, but ignored at runtime.  

### Designing your Handlebars template

#### Basics

Before anything, make sure you understand the basics of Handlebars and its associated syntax by reading their [documentation](http://handlebarsjs.com)

#### Available tokens

To make it simple, a `template context` is automatically exposed within the handlebars template, giving the user the ability to work with the following exposed tokens :

Property         | Description
-----------------|------------------
{{items}}        | The array of objects that represents the items returned from the CAML query
{{pageContext}}  | The SPFx [PageContext](https://github.com/SharePoint/sp-dev-docs/blob/master/reference/spfx/sp-page-context/pagecontext.md) object which contains usefull informations about the current web, list, user, language etc...
{{accessDenied}} | A boolean value indicating if the current user has a denied access to the configured site that gets queried. This gives the designer the power to decide what to render in a case where the current user doesn't have access to the queried site.
{{webNotFound}}  | A boolean value indicating if the configured site that gets queried doesn't exist anymore. This also gives the designer the power to decide what to render in a case where the queried site doesn't exist anymore.

#### Available block helpers

Besides the available tokens above, nearly 150 [block helpers](http://handlebarsjs.com/block_helpers.html) are also available for use in the Handlebars template, see [handlebars-helpers](https://github.com/helpers/handlebars-helpers#helpers) for a list of all available block helpers. 

*Example using the "compare" block helper for conditional rendering based on current language :*
```handlebars
{{#compare pageContext.web.language '==' 1033}}
    <h1>This is rendered if current language is 1033</h1>
{{else}}
    <h1>This is rendered if current language is anything else
{{/compare}}
```

#### Displaying items and their values

For displaying items and their field values, we must first iterate through the exposed **{{items}}** token using a **{{each}}** block helper : 

*Handlebars : *
```handlebars
{{#each items}}
    <div class="item"></div>
{{/each}}
```

*Output : *
```handlebars
<div class="item"></div>
<div class="item"></div>
<div class="item"></div>
...
```

Once we can loop within the items, we can render any field, as long as the field has been selected in the `View Fields` property of the toolpane. The Handlebars token corresponsding to a field is always the field's internal name, which is displayed in between {{brackets}} next to the field's display name in the property pane for reference. 

*Handlebars : *
```handlebars
{{#each items}}
    <div class="item">
        <p>MyField value : {{MyField}}</p>
    </div>
{{/each}}
```

*Output : *
```handlebars
<div class="item">[object]</div>
<div class="item">[object]</div>
<div class="item">[object]</div>
```

We are almost there, the above code is rendering a *[object]* because the Content Query Webpart offers 3 different ways to render a field value:

Property | Description
---------|---------------
{{MyField.textValue}} | Renders the text value of the field, a more readable end-user value to use for display.
{{MyField.htmlValue}} | Renders the HTML value of the field. For example, a *Link* field HTML value would render something like \<a href="...">My Link Field\</a>
{{MyField.rawValue}}  | Returns the raw value of the field. For example, a *Taxonomy* field raw value would return an object which contains the term wssId and it's label

*Handlebars : *
```handlebars
{{#each items}}
    <div class="item">
        <p>MyUserField text value : {{MyUserField.textValue}}</p>
        <p>MyUserField html value : {{MyUserField.htmlValue}}</p>
        <p>MyUserField raw value : {{MyUserField.rawValue}}</p>
    </div>
{{/each}}
```

*Output : *
```handlebars
<div class="item">
    <p>MyUserField text value : Simon-Pierre Plante</p>
    <p>MyUserField html value : <a href="..." onclick="...">Simon-Pierre Plante</a></p>
    <p>MyUserField raw value : 26</p>
</div>
...
```
<br>

## Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.



<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-content-query-webpart" />