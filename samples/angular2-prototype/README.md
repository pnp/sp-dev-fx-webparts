## angular2-prototype

This is an experimental project on boostrapping multiple identical angular2 applications with the same root class component.


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
* src/webparts/todo/core - an abstract base class that we created for angular2 applications.
* src/webparts/todo/TodoWebPart.ts - a class to create unique instances of the root class component and return other metadata for the NgModule decorator function.

### Our experiment findings

Bootstrapping multiple angular2 applications on the same page:
* Each time bootstrap is invoked on a component, it will create ComponentMetadata associated with the class's 'annoations' array for the root component.
* Angular2 uses this annotation array to match element's on the DOM to angular root component references/properties.
* When bootstrap is invoked an additional time with the same root component class, it will again create a ComponentMetadata object and append it to the 'annotions' array associated with the root class.
* However, it appears that only the first defined ComponentMetadata object in the 'annotations' array is parsed by the compiler. (i.e. any other duplicate bootstrapped classes have nativeElements that point to the first boostrapped component)
* We were able to construct a work around by defining our root component class and AppModule as an expression with unique selector tags.
* This forced a new class prototype object to be created with a new annotations array.
* Moreover, it took a bit of reverse engineering and digging into hidden properties to find references to the rootComponent so that we could make updates to class properties and to the view.

### Our experiment questions:
* We have 3 questions you can find in 'src/webparts/todo/core/BaseAngular2WebpPart.ts' that are marked by '@question'.

### Build options

gulp nuke - TODO
gulp test - TODO
gulp watch - TODO
gulp build - TODO
gulp deploy - TODO
