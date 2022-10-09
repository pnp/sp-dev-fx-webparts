import { Logger, LogLevel } from "@pnp/logging";
import { spfi, SPFI } from "@pnp/sp";
import { useEffect, useState } from "react";
import { IFile, IResponseItem } from "../components/interfaces";
import { getSP } from "../pnpjsConfig";
import { Caching } from "@pnp/queryable";

const useDocuments = () => {
  const LOG_SOURCE = "🅿PnPjsExample";
  const LIBRARY_NAME = "Documents";

  const [documents, setDocuments] = useState<IFile[]>([]);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [isError, setError] = useState<Boolean>(false);

  const _sp: SPFI = getSP();

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
    })();
  }, []);

  return [documents, totalSize, isError] as const;
};

export default useDocuments;
