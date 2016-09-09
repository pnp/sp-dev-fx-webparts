## angular2-prototype

This is expirimental project on boostrapping multiple identical angular2 applications with the same root class component.


### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
tsd install
gulp serve
```

This package produces the following:

* lib/* commonjs components - this allows this package to be reused from other packages.
* dist/* - a single bundle containing the components used for uploading to a cdn pointing a registered Sharepoint webpart library to.
* src/* - all files for the expiriemental angular2 todo webpart.

* src/webparts/todo/core - am abstract base class that we created for angular2 applications.
* src/webparts/todo/TodoWebPart.ts - a class to create unique instance of the root class component and return other metadata for the NgModule decorator funciton.

### Build options

gulp nuke - TODO
gulp test - TODO
gulp watch - TODO
gulp build - TODO
gulp deploy - TODO
