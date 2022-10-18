import { Logger, LogLevel } from "@pnp/logging";
import { spfi, SPFI } from "@pnp/sp";
import { useEffect, useState } from "react";
import { IFile, IResponseItem } from "../components/interfaces";
import { getSP } from "../pnpjsConfig";
import { Caching } from "@pnp/queryable";
import { IItemUpdateResult } from "@pnp/sp/items";

const useDocuments = () => {
  const LOG_SOURCE = "🅿PnPjsExample";
  const LIBRARY_NAME = "Documents";

  const [documents, setDocuments] = useState<IFile[]>([]);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [isError, setError] = useState<Boolean>(false);

  const _sp: SPFI = getSP();

  //side effect with empty depdency array, means to run once
  useEffect(() => {
    (async () => {
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
        const items: IFile[] = response.map((item: IResponseItem) => {
          return {
            Id: item.Id,
            Title: item.Title || "Unknown",
            Size: item.File?.Length || 0,
            Name: item.FileLeafRef,
          };
        });

        // Add the items and totalsize to the state of the hook
        setDocuments(items);
        setTotalSize(
          items.length > 0
            ? items.reduce<number>((acc: number, item: IFile) => {
                return acc + Number(item.Size);
              }, 0)
            : 0
        );
      } catch (err) {
        setError(true);
        Logger.write(
          `${LOG_SOURCE} (getting files useEffect) - ${JSON.stringify(err)} - `,
          LogLevel.Error
        );
      }
    })();
  }, []);

  const updateDocuments = async () => {
    try {
      const [batchedSP, execute] = _sp.batched();

      //clone documents
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

      //Update the state
      setDocuments(items);
      setError(false);
    } catch (err) {
      setError(true);
      Logger.write(
        `${LOG_SOURCE} (updating titles) - ${JSON.stringify(err)} - `,
        LogLevel.Error
      );
    }
  };

  return [documents, updateDocuments, totalSize, isError] as const;
};

export default useDocuments;
