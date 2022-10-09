import * as React from "react";
import styles from "./PnPjsExample.module.scss";
import { IPnPjsExampleProps } from "./IPnPjsExampleProps";

// import interfaces
import { IFile, IResponseItem } from "./interfaces";

import { Caching } from "@pnp/queryable";
import { getSP } from "../pnpjsConfig";
import { SPFI, spfi } from "@pnp/sp";
import { Logger, LogLevel } from "@pnp/logging";
import { IItemUpdateResult } from "@pnp/sp/items";
import { Label, PrimaryButton } from "@microsoft/office-ui-fabric-react-bundle";
import { useEffect, useState } from "react";

export interface IAsyncAwaitPnPJsProps {
  description: string;
}

export const PnPjsExample: React.FC<IPnPjsExampleProps> = (props) => {
  const LOG_SOURCE = "🅿PnPjsExample";
  const LIBRARY_NAME = "Documents";

  //initialize state using react useState hooks
  const [documents, setDocuments] = useState<IFile[]>([]);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [isError, setError] = useState<Boolean>(false);

  const _sp: SPFI = getSP();

  //useEffect hook with empty dependency array means to only execute the side effect once on load.
  useEffect(() => {
    (async () => {
      _readAllFilesSize();
    })();
  }, []);

  const _readAllFilesSize = async (): Promise<void> => {
    try {
      // do PnP JS query, some notes:
      //   - .expand() method will retrive Item.File item but only Length property
      //   - .get() always returns a promise
      //   - await resolves proimises making your code act syncronous, ergo Promise<IResponseItem[]> becomes IResponse[]

      //Extending our sp object to include caching behavior, this modification will add caching to the sp object itself
      //this._sp.using(Caching("session"));

      //Creating a new sp object to include caching behavior. This way our original object is unchanged.
      const spCache = spfi(_sp).using(Caching({ store: "session" }));

      const response: IResponseItem[] = await spCache.web.lists
        .getByTitle(LIBRARY_NAME)
        .items.select("Id", "Title", "FileLeafRef", "File/Length")
        .expand("File/Length")();

      // use map to convert IResponseItem[] into our internal object IFile[]
      const documents: IFile[] = response.map((item: IResponseItem) => {
        return {
          Id: item.Id,
          Title: item.Title || "Unknown",
          Size: item.File?.Length || 0,
          Name: item.FileLeafRef,
        };
      });

      // Add the items to the state
      setDocuments(documents);
      setTotalSize(
        documents.length > 0
          ? documents.reduce<number>((acc: number, item: IFile) => {
              return acc + Number(item.Size);
            }, 0)
          : 0
      );
    } catch (err) {
      setError(true);
      Logger.write(
        `${LOG_SOURCE} (_readAllFilesSize) - ${JSON.stringify(err)} - `,
        LogLevel.Error
      );
    }
  };

  const _updateTitles = async (): Promise<void> => {
    try {
      //Will create a batch call that will update the title of each item
      //  in the library by adding `-Updated` to the end.
      const [batchedSP, execute] = _sp.batched();

      //Clone items from the state
      const items = JSON.parse(JSON.stringify(documents));

      const res: IItemUpdateResult[] = [];

      for (let i = 0; i < items.length; i++) {
        // you need to use .then syntax here as otherwise the application will stop and await the result
        batchedSP.web.lists
          .getByTitle(LIBRARY_NAME)
          .items.getById(items[i].Id)
          .update({ Title: `${items[i].Name}-Updated` })
          .then((r) => res.push(r));
      }
      // Executes the batched calls
      await execute();

      // Results for all batched calls are available
      for (let i = 0; i < res.length; i++) {
        //If the result is successful update the item
        //NOTE: This code is over simplified, you need to make sure the Id's match
        const item = await res[i].item.select("Id, Title")<{
          Id: number;
          Title: string;
        }>();
        items[i].Name = item.Title;
      }
      debugger;
      //Update the state which rerenders the component
      setDocuments(items);
      setError(false);
    } catch (err) {
      setError(true);
      Logger.write(
        `${LOG_SOURCE} (_updateTitles) - ${JSON.stringify(err)} - `,
        LogLevel.Error
      );
    }
  };

  if (!isError) {
    return (
      <div className={styles.pnPjsExample}>
        <Label>Welcome to PnP JS Version 3 Demo!</Label>
        <PrimaryButton onClick={_updateTitles}>
          Update Item Titles
        </PrimaryButton>
        <Label>List of documents:</Label>
        <table width="100%">
          <tr>
            <td>
              <strong>Title</strong>
            </td>
            <td>
              <strong>Name</strong>
            </td>
            <td>
              <strong>Size (KB)</strong>
            </td>
          </tr>
          {documents.map((document, idx) => {
            return (
              <tr key={idx}>
                <td>{document.Title}</td>
                <td>{document.Name}</td>
                <td>{(document.Size / 1024).toFixed(2)}</td>
              </tr>
            );
          })}
          <tr>
            <td>&nbps;</td>
            <td>
              <strong>Total:</strong>
            </td>
            <td>
              <strong>{(totalSize / 1024).toFixed(2)}</strong>
            </td>
          </tr>
        </table>
      </div>
    );
  } else {
    return <p>Error</p>;
  }
};
