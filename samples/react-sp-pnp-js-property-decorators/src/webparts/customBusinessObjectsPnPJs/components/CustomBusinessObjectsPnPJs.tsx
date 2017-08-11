import * as React from "react";
import styles from "./CustomBusinessObjectsPnPJs.module.scss";

// import models
import { MyDocument } from "../model/MyDocument";
import { MyDocumentCollection } from "../model/MyDocumentCollection";
// initially we import our custom model which extends from Item class from PnP JS Core
import { MyItem } from "../model/MyItem";

// import custom parsers
import { SelectDecoratorsParser, SelectDecoratorsArrayParser } from "../parser/SelectDecoratorsParsers";

// import pnp and pnp logging system
import pnp from "sp-pnp-js";

import { ICustomBusinessObjectsPnPJsProps } from "./ICustomBusinessObjectsPnPJsProps";
import { ICustomBusinessObjectsPnPJsState } from "./ICustomBusinessObjectsPnPJsState";

export default class CustomBusinessObjectsPnPJs extends React.Component<ICustomBusinessObjectsPnPJsProps, ICustomBusinessObjectsPnPJsState> {

  constructor(props: ICustomBusinessObjectsPnPJsProps) {
    super(props);
    // set initial state
    this.state = {
      myDocuments: [],
      errors: []
    };

    // normally we don't need to bind the functions as we use arrow functions and do automatically the bing
    // http://bit.ly/reactArrowFunction
    // but using Async function we can't convert it into arrow function, so we do the binding here
    this._loadPnPJsLibrary.bind(this);

  }

  public render(): React.ReactElement<ICustomBusinessObjectsPnPJsProps> {
    return (
      <div className={styles.container}>
        <div className={"ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + styles.row}>
          <div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
            <span className="ms-font-xl ms-fontColor-white">Welcome to Custom Business Objects, Decorators and Renders Demo!</span>
            <div>
              {this._gerErrors()}
            </div>
            <p className="ms-font-l ms-fontColor-white">List of documents:</p>
            <div>
              <div className={styles.row}>
                <div className={styles.left}>Name</div>
                <div className={styles.right}>Size (KB)</div>
                <div className={styles.clear + " " + styles.header}></div>
              </div>
              {this.state.myDocuments.map((item) => {
                return (
                  <div className={styles.row}>
                    <div className={styles.left}>{item.Name}</div>
                    <div className={styles.right}>{(item.Size / 1024).toFixed(2)}</div>
                    <div className={styles.clear}></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div >
    );
  }

  public componentDidMount(): void {
    const libraryName: string = "Documents";
    console.log("libraryName: " + libraryName);
    this._loadPnPJsLibrary(libraryName);
  }

  private async _loadPnPJsLibrary(libraryName: string): Promise<void> {
    console.log("loadPnPJsLibrary");
    try {


      console.log("######################################");
      console.log("# PnP JS Core without custom objects #");
      console.log("######################################");

      const plainItemAsAny: any = await pnp.sp
        .web
        .lists
        .getByTitle("PnPJSSample")
        .items
        .getById(1)
        .select("ID", "Title", "Category", "Quantity")
        .get();
      console.log(plainItemAsAny);

      // plainItemAsAny hasn't intellisense neither type checking using TypeScript
      console.log(plainItemAsAny.Title);      // compiler: ok (any object), result: Fig
      console.log(plainItemAsAny.title);      // compiler: ok (any object), result: undefined (posible mistake)
      console.log(plainItemAsAny.otherProp);  // compiler: ok (any object), result: undefined (posible mistake not having type check)

      // from TypeScript 1.6 we can use as operator like the default way to cast inside .tsx file
      //  (removing any ambiguity between JSX expressions and the TypeScript prefix cast operator)
      //  https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-6.html
      // a workarround for having intellisense and type checking is using as operator with the specific type
      const plainItemAsObject = plainItemAsAny as { ID: string, Title: string, Category: string, Quantity: number };
      console.log(plainItemAsObject.Category);   // compiler: ok, result: Fruit
      // console.log(plainItemAsObject.otherProp);  // compiler: error because otherProp isn't on the defined type
      console.log(plainItemAsObject);



      console.log("######################################");
      console.log("#   PnP JS Core WITH custom objects  #");
      console.log("######################################");

      const itemCustomObject: MyItem = await pnp.sp
        .web
        .lists
        .getByTitle("PnPJSSample")
        .items
        .getById(1)
        // we don't need the select here as we have already implemented on our custom model
        // .select("ID", "Title", "Category", "Quantity")
        // as("model") means PnP JS Core will use the returned object from here and we can use it later using method chaining
        .as(MyItem)
        .get();
      console.log(itemCustomObject);

      // itemCustomObject has intellisense and type checking using TypeScript
      console.log(itemCustomObject.Title);         // compiler: ok (any object), result: Fig
      // console.log(itemCustomObject.title);      // compiler: error
      // console.log(itemCustomObject.otherProp);  // compiler: error
      console.log(itemCustomObject);


      console.log("#############################");
      console.log("#  Query only one document  #");
      console.log("#############################");
      console.log("*************************************************************");
      console.log("***  One document selecting all properties");
      console.log("*************************************************************");
      const myDocument: any = await pnp.sp
        .web
        .lists
        .getByTitle(libraryName)
        .items
        .getById(1)
        .get();
      // query all item's properties
      console.log(myDocument);

      console.log("*************************************************************");
      console.log("***  One document with getAs<MyDocument>()");
      console.log("*************************************************************");
      const myDocumentGetAs: MyDocument = await pnp.sp
        .web
        .lists
        .getByTitle(libraryName)
        .items
        .getById(1)
        .getAs<MyDocument>();
      // query all item's properties, exactly the same result as before
      console.log(myDocumentGetAs);

      console.log("*************************************************************");
      console.log("***  One document using select, expand and get()");
      console.log("*************************************************************");
      const myDocumentWithSelectExpandGet: any = await pnp.sp
        .web
        .lists
        .getByTitle(libraryName)
        .items
        .getById(1)
        .select("Title", "FileLeafRef", "File/Length")
        .expand("File/Length")
        .get();
      // query only selected properties, but ideally should
      // get the props from our custom object
      console.log(myDocumentWithSelectExpandGet);

      console.log("*************************************************************");
      console.log("***  One document using select, expand and get() with MyDocument Custom Parser");
      console.log("*************************************************************");
      const myDocumentWithSelectExpandGetParser: any = await pnp.sp
        .web
        .lists
        .getByTitle(libraryName)
        .items
        .getById(1)
        .select("Title", "FileLeafRef", "File/Length")
        .expand("File/Length")
        .get(new SelectDecoratorsParser<MyDocument>(MyDocument));
      // query only selected properties, but ideally should
      // get the props from our custom object
      console.log(myDocumentWithSelectExpandGetParser);

      console.log("*************************************************************");
      console.log("***  One document using select, expand and getAs<MyDocument>()");
      console.log("*************************************************************");
      const myDocumentWithSelectExpandGetAs: MyDocument = await pnp.sp
        .web
        .lists
        .getByTitle(libraryName)
        .items
        .getById(1)
        .select("Title", "FileLeafRef", "File/Length")
        .expand("File/Length")
        .getAs<MyDocument>();
      // query only selected properties, but ideally should
      // get the props from our custom object
      console.log(myDocumentWithSelectExpandGetAs);

      console.log("*************************************************************");
      console.log("***  One document using as(MyDocument) and get() with Default Parser");
      console.log("*************************************************************");
      const myDocumentWithCustomObjectGet: MyDocument = await pnp.sp
        .web
        .lists
        .getByTitle(libraryName)
        .items
        .getById(1)
        // using as("Model") overrides select and expand queries
        .as(MyDocument)
        .get();
      // query only selected properties, using our Custom Model properties
      // but only those that have the proper @select and @expand decorators
      console.log(myDocumentWithCustomObjectGet);

      console.log("*************************************************************");
      console.log("***  One document using as(MyDocument) and getAs<MyDocument>()");
      console.log("*************************************************************");
      const myDocumentWithCustomObjectGetAs: MyDocument = await pnp.sp
        .web
        .lists
        .getByTitle(libraryName)
        .items
        .getById(1)
        // using as("Model") overrides select and expand queries
        .as(MyDocument)
        // it's using getAs from MyDocument which has SelectDecoratorsParser
        .getAs<MyDocument>();
      // query only selected properties, using our Custom Model properties
      // but only those that have the proper @select and @expand decorators
      console.log(myDocumentWithCustomObjectGetAs);


      console.log("###############################");
      console.log("#  Query document collection  #");
      console.log("###############################");
      console.log("*************************************************************");
      console.log("***  Document Collection selecting all properties");
      console.log("*************************************************************");
      const myDocumentCollection: any = await pnp.sp
        .web
        .lists
        .getByTitle(libraryName)
        .items
        .get();
      console.log(myDocumentCollection);

      console.log("*************************************************************");
      console.log("***  Document Collection using as(MyDocument) and get()");
      console.log("*************************************************************");
      const myDocumentsWithCustomObjectAsDocumentGet: MyDocument[] = await pnp.sp
        .web
        .lists
        .getByTitle(libraryName)
        .items
        // using as("Model") overrides select and expand queries
        // that´s where the MAGIC happends as even if we are using
        // items (item collection) it will use the proper query
        .as(MyDocument)
        .get();
      console.log(myDocumentsWithCustomObjectAsDocumentGet);

      console.log("*************************************************************");
      console.log("***  Document Collection using as(MyDocument) and getAs<MyDocument>()");
      console.log("*************************************************************");
      const myDocumentsWithCustomObjectAsDocument: MyDocument[] = await pnp.sp
        .web
        .lists
        .getByTitle(libraryName)
        .items
        // *Note that the downside using this approach is after .as(MyDocument)
        //   we can't use QueryableCollection methods as the type is transformed
        //   to Item instead of Items
        .as(MyDocument)
        .getAs<MyDocument[]>();
      // query only selected properties, using our Custom Model properties
      // but only those that have the proper @select and @expand decorators
      console.log(myDocumentsWithCustomObjectAsDocument);


      console.log("*************************************************************");
      console.log("***  Document Collection using as(MyDocumentCollection) and get()");
      console.log("*************************************************************");
      const myDocumentsWithCustomObjectAsDocuments: MyDocument[] = await pnp.sp
        .web
        .lists
        .getByTitle(libraryName)
        .items
        // using as("Model") overrides select and expand queries
        .as(MyDocumentCollection)
        .get();
      // query only selected properties, using our Custom Model properties
      // but only those that have the proper @select and @expand decorators
      console.log(myDocumentsWithCustomObjectAsDocuments);


      console.log("*************************************************************");
      console.log("***  Document Collection using as(MyDocumentCollection) and getAs<MyDocumentCollection>()");
      console.log("*************************************************************");
      const myDocumentsWithCustomObjectAsDocumentsGetAs: any = await pnp.sp
        .web
        .lists
        .getByTitle(libraryName)
        .items
        // using as("Model") overrides select and expand queries
        .as(MyDocumentCollection)
        .getAs<MyDocumentCollection>();
      // query only selected properties, using our Custom Model properties
      // but only those that have the proper @select and @expand decorators
      console.log(myDocumentsWithCustomObjectAsDocumentsGetAs);

      console.log("*************************************************************");
      console.log("***  Document Collection using as(MyDocumentCollection) and getAsMyDocument()");
      console.log("*************************************************************");
      const myDocumentsWithCustomObjectAsDocumentsGetAsMyDocument: any = await pnp.sp
        .web
        .lists
        .getByTitle(libraryName)
        .items
        // using as("Model") overrides select and expand queries
        .as(MyDocumentCollection)
        .getAsMyDocument();
      // query only selected properties, using our Custom Model properties
      // but only those that have the proper @select and @expand decorators
      console.log(myDocumentsWithCustomObjectAsDocumentsGetAsMyDocument);

      console.log("*************************************************************");
      console.log("***  Document Collection using as(MyDocumentCollection) and get() with Custom Array Parser returning only properties with @select");
      console.log("*************************************************************");
      const myDocumentsWithCustomObjectAsDocumentsGetParserJustSelect: any[] = await pnp.sp
        .web
        .lists
        .getByTitle(libraryName)
        .items
        // using as("Model") overrides select and expand queries
        .as(MyDocumentCollection)
        .get(new SelectDecoratorsArrayParser<MyDocument>(MyDocument, true));
      // query only selected properties, using our Custom Model properties
      // but only those that have the proper @select and @expand decorators
      console.log(myDocumentsWithCustomObjectAsDocumentsGetParserJustSelect);

      console.log("*************************************************************");
      console.log("***  Document Collection using as(MyDocumentCollection) and get() with Custom Array Parser");
      console.log("*************************************************************");
      const myDocumentsWithCustomObjectAsDocumentsGetParser: any[] = await pnp.sp
        .web
        .lists
        .getByTitle(libraryName)
        .items
        // using as("Model") overrides select and expand queries
        .as(MyDocumentCollection)
        .skip(1)
        // this renderer mix the properties and do the match between the props names and the selected if they have /
        .get(new SelectDecoratorsArrayParser<MyDocument>(MyDocument));
      // query only selected properties, using our Custom Model properties
      // but only those that have the proper @select and @expand decorators
      console.log(myDocumentsWithCustomObjectAsDocumentsGetParser);

      // set our Component´s State
      this.setState({ ...this.state, myDocuments: myDocumentsWithCustomObjectAsDocumentsGetParser });

    } catch (error) {
      // set a new state conserving the previous state + the new error
      console.error(error);
      this.setState({
        ...this.state,
        errors: [...this.state.errors, "Error in " + libraryName + ". Error: " + error]
      });
    }
  }

  private _gerErrors() {
    return this.state.errors.length > 0
      ?
      <div style={{ color: "orangered" }} >
        <div>Errors:</div>
        {
          this.state.errors.map((item) => {
            return (<div>{JSON.stringify(item)}</div>);
          })
        }
      </div>
      : null;
  }

}
