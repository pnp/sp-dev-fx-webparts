import * as React from "react";
import styles from "./AsyncAwaitPnPJs.module.scss";

// import interfaces
import { IFile, IResponseItem } from "../interfaces";

// import pnp and pnp logging system
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Logger, LogLevel, LogEntry, FunctionListener } from "@pnp/logging";

// import SPFx Logging system
import { Log } from "@microsoft/sp-core-library";

// import React props and state
import { IAsyncAwaitPnPJsProps } from "./IAsyncAwaitPnPJsProps";
import { IAsyncAwaitPnPJsState } from "./IAsyncAwaitPnPJsState";

export default class AsyncAwaitPnPJs extends React.Component<IAsyncAwaitPnPJsProps, IAsyncAwaitPnPJsState> {

  constructor(props: IAsyncAwaitPnPJsProps) {
    super(props);
    // set initial state
    this.state = {
      items: [],
      errors: []
    };

    // normally we don't need to bind the functions as we use arrow functions and do automatically the bing
    // http://bit.ly/reactArrowFunction
    // but using Async function we can't convert it into arrow function, so we do the binding here
    this._readAllFilesSize.bind(this);

    // enable PnP JS Logging integrated with SPFx Logging
    this._enableLogging();
  }

  public componentDidMount(): void {
    // read all file sizes from Documents library
    this._readAllFilesSize("Documents");
  }

  public render(): React.ReactElement<IAsyncAwaitPnPJsProps> {
    // calculate total of file sizes
    const totalDocs: number = this.state.items.length > 0
      ? this.state.items.reduce<number>((acc: number, item: IFile) => {
        return (acc + Number(item.Size));
      }, 0)
      : 0;
    return (
      <div className={styles.container}>
        <div className={"ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + styles.row}>
          <div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
            <span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint Async Await SP PnP JS Demo!</span>
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
              {this.state.items.map((item, idx) => {
                return (
                  <div key={idx} className={styles.row}>
                    <div className={styles.left}>{item.Name}</div>
                    <div className={styles.right}>{(item.Size / 1024).toFixed(2)}</div>
                    <div className={styles.clear}></div>
                  </div>
                );
              })}
              <div className={styles.row}>
                <div className={styles.clear + " " + styles.header}></div>
                <div className={styles.left}>Total: </div>
                <div className={styles.right}>{(totalDocs / 1024).toFixed(2)}</div>
                <div className={styles.clear + " " + styles.header}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private _enableLogging(): void {
    ////////////////////////////////////////////////////////////////////////
    // enable Logging system
    ////////////////////////////////////////////////////////////////////////
    // we will integrate PnP JS Logging System with SPFx Logging system
    // 1. Logger object => PnP JS Logger
    //    https://github.com/SharePoint/PnP-JS-Core/wiki/Working-With:-Logging
    // 2. Log object => SPFx Logger
    //    https://github.com/SharePoint/sp-dev-docs/wiki/Working-with-the-Logging-API
    ////////////////////////////////////////////////////////////////////////
    // [PnP JS Logging] activate Info level
    Logger.activeLogLevel = LogLevel.Info;

    // [PnP JS Logging] create a custom FunctionListener to integrate PnP JS and SPFx Logging systems
    const listener = new FunctionListener((entry: LogEntry) => {

      // get React component name
      const componentName: string = (this as any)._reactInternalInstance._currentElement.props.description;

      // mapping betwween PnP JS Log types and SPFx logging methods
      // instead of using switch we use object easy syntax
      const logLevelConversion = { 0: "verbose", 1: "info", 2: "warn", 3: "error" };

      // create Message. Two importante notes here:
      // 1. Use JSON.stringify to output everything. It´s helpful when some internal exception comes thru.
      // 2. Use JavaScript´s Error constructor allows us to output more than 100 characters using SPFx logging
      let formatedMessage;
      if (entry.level === LogLevel.Error) {
        formatedMessage = new Error(`Message: ${entry.message} Data: ${JSON.stringify(entry.data)}`);
        // formatedMessage = `Message: ${entry.message} Data: ${JSON.stringify(entry.data)}`;
      } else {
        formatedMessage = `Message: ${entry.message} Data: ${JSON.stringify(entry.data)}`;
      }

      // [SPFx Logging] Calculate method to invoke verbose, info, warn or error
      const method = logLevelConversion[entry.level];

      // [SPFx Logging] Call SPFx Logging system with the message received from PnP JS Logging
      Log[method](componentName, formatedMessage);
    });

    // [PnP JS Logging] Once create the custom listerner we should subscribe to it
    Logger.subscribe(listener);
  }

  // async functions were introduced with ES3/ES5 native support in TypeScript 2.1
  // https://blogs.msdn.microsoft.com/typescript/2016/12/07/announcing-typescript-2-1/
  // async function always return a Promise, on this scenario we return void Promise
  //   because we will not need it as we are directly setting the Component´s state
  private async _readAllFilesSize(libraryName: string): Promise<void> {
    try {
      // do PnP JS query, some notes:
      //   - .expand() method will retrive Item.File item but only Length property
      //   - .usingCaching() will be using SessionStorage by default to cache the  results
      //   - .get() always returns a promise
      //   - await converts Promise<IResponseItem[]> into IResponse[]
 
      const response: IResponseItem[] = await sp.web.lists
        .getByTitle(libraryName)
        .items
        .select("Title", "FileLeafRef", "File/Length")
        .expand("File/Length")
        .usingCaching()
        .get();

      // use map to convert IResponseItem[] into our internal object IFile[]
      const items: IFile[] = response.map((item: IResponseItem) => {
        return {
          Title: item.Title,
          Size: item.File.Length,
          Name: item.FileLeafRef
        };
      });

      // set our Component´s State
      this.setState({ ...this.state, items });

      // intentionally set wrong query to see console errors...
      const failResponse: IResponseItem[] = await sp.web.lists
        .getByTitle(libraryName)
        .items
        .select("Title", "FileLeafRef", "File/Length")
        .expand("File/Length")
        .usingCaching()
        .get();

    } catch (error) {
      // set a new state conserving the previous state + the new error
      this.setState({ ...this.state, errors: [...this.state.errors, error] });
    }
  }

  private _gerErrors() {
    return this.state.errors.length > 0
      ?
      <div style={{ color: "orangered" }} >
        <div>Errors:</div>
        {
          this.state.errors.map((item, idx) => {
            return (<div key={idx} >{JSON.stringify(item)}</div>);
          })
        }
      </div>
      : null;
  }

}
