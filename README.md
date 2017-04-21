## React Content Query WebPart

The `React Content Query WebPart` is a modern version of the good old `Content by Query WebPart` that was introduced in SharePoint 2007. Built for *SharePoint 2016* and *Office 365*, this modern version is built against the new **SharePoint Framework (SPFx)** and uses the latest *Web Stack* practices. While the original WebPart was based on a `XSLT` templating engine, this *React* WebPart is based on the well known [Handlebars templating engine](http://handlebarsjs.com), which empowers users to create simple, yet powerfull `HTML` templates for rendering the queried content. This new version also lets the user query `any site collections` which resides on the same domain url, add `unlimited filters`, query *DateTime* fields to the `nearest minute` rather than being limited to a day, and much more.

### Features

#### Custom tool pane

![Custom Tool Part](https://github.com/spplante/react-content-query/blob/master/Misc/toolpart.gif "Custom ToolPart")

#### Handlebars templating engine

Provide a link to your handlebars `.html` template and decide how you want to render the queried results.

*Handlebars template :*
```handlebars
<h1>Results : </h1>
<ul id="items">
  {{ #each items }}
  <li>
    <span>{{ Title.textVaue }}</span>
    {{ FileRef.htmlValue }}
  </li>
  {{ /each }}
</ul>
```

*Output :*
```handlebars
<h1>Results : </h1>
<ul id="items">
  <li>
    <span>My Item #1</span>
    <a href="...">..</a>
  </li>
  <li>
    <span>My Item #2</span>
    <a href="...">..</a>
  </li>
  ...
</ul>
```

#### Query any site collection within the same domain

![DateTime](https://github.com/spplante/react-content-query/blob/master/Misc/allsites.gif "DateTime")

#### Add unlimited filters

![Unlimited Filters](https://github.com/spplante/react-content-query/blob/master/Misc/filters.gif "Unlimited Filters")

#### Include time in date filters if needed

![DateTime](https://github.com/spplante/react-content-query/blob/master/Misc/datetime.gif "Datime Filters")

#### Built in page context available within the template

The SPFx [PageContext](https://github.com/SharePoint/sp-dev-docs/blob/master/reference/spfx/sp-page-context/pagecontext.md) object is exposed directly within the handlebars template context, which allows the user to interact with many usefull dynamic properties such as the current language for instance.

```handlebars
<h1>Current language : {{ pageContext.web.language }} </h1>
<h1>Current web title : {{ pageContext.web.title }} </h1>
<h1>Current user display name : {{ pageContext.user.displayName }} </h1>
<h1>Current user login name : {{ pageContext.user.loginName }} </h1>
<h1>Current user email : {{ pageContext.user.email }} </h1>
...
```

#### Three predefined type of values for any field

For every view field returned by the query, three predefined types of values are available for an easier integration by the user who designs the handlebars template.

*Handlebars template :*
```handlebars
<h1>Text Value : {{ MyUserField.textValue }}</h1>
<h1>Html Value : {{ MyUserField.htmlValue }}</h1>
<h1>Raw Value : {{ MyUserField.rawValue }}</h1>
```

*Output :*
```handlebars
<h1>Text Value : Simon-Pierre Plante</h1>
<h1>Html Value : <a href="..." onclick="...">Simon-Pierre Plante</a></h1>
<h1>Raw Value : { ID: 18 }</h1>
```


### Building the code

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
