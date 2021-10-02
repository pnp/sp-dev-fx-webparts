---
page_type: sample
products:
- office-sp
- office-365
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  platforms:
  - AngularJS
  createdDate: 1/8/2019 12:00:00 AM
---

# Angular Elements with HTML Template File in SharePoint Framework

## Summary

A sample web part illustrating how to use Angular Elements in the SharePoint Framework with the help of separate template HTML File.

## Used SharePoint Framework Version
 
![drop](https://img.shields.io/badge/drop-1.4.1-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
angularelements-html-templatefile| [Jayakumar Balasubramaniam](https://github.com/JayakumarB) (C# Corner MVP, Hubfly, [@jayakumrB](https://twitter.com/jayakumrB))

## Version history

Version|Date|Comments
-------|----|--------
1.0|Jan 8, 2019|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* clone this repo
* in the command line run:
  * `npm i`
  * `gulp serve`

## Features

This web part illustrates the following concepts on top of the SharePoint Framework:

* adding Angular Elements to a no-framework SharePoint Framework project
* bootstrapping Angular Elements inside a SharePoint Framework web part
* extending the building configuration to build Angular Elements
* utilizing build pipeline to compile and run angular template files in gulpfile.js

## Implementation

The below piece of code in gulpfile.js is the key to update the build pipeline:
```typescript
//************START: Added to handle Template file url ************/

var inlineNgxTemplate = require('gulp-inline-ngx-template');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('./tsconfig.json');

let tsInlines = build.subTask('tsInlines', function(gulp, buildOptions, done) {
  return  gulp.src('src/webparts/helloAngularTemplate/app/**/*.ts')
       .pipe(inlineNgxTemplate({ base: '/src/webparts/helloAngularTemplate/app/', useRelativePaths: true }))
       .pipe(tsProject())
       .pipe(gulp.dest('lib/webparts/helloAngularTemplate/app'));
})

build.rig.addPostTypescriptTask(tsInlines);

//************END: Added to handle Template file url ************/
```

## Support

We do not support samples, but we do use GitHub to track issues and constantly want to improve these samples.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=bug-report.yml&sample=angularelements-html-templatefile=@JayakumarB&title=angular-todo%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=question.yml&sample=angularelements-html-templatefile=@JayakumarB&title=angular-todo%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=suggestion.yml&sample=angularelements-html-templatefile=@JayakumarB&title=angular-todo%20-%20).


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/angularelements-helloworld" />
