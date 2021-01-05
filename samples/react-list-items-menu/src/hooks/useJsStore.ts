import * as JsStoreWorker from "jsstore/dist/jsstore.worker.commonjs2";
window["JsStoreWorker"] = JsStoreWorker;
import * as JsStore from "jsstore";
import { ITable, DATA_TYPE, IDataBase } from "jsstore";

// Otherwise due to multiple instance multiple worker will be created.
const idbCon = new JsStore.Connection();

export const useJsStore =  () => {
  const initJsStore = async (
    dbname: string,
    tablesSchemas: ITable[]
  ): Promise<JsStore.Connection> => {
    const dataBase: IDataBase = {
      name: dbname,
      tables: tablesSchemas,
    };
      idbCon.initDb(dataBase);
      window[`idbCon_${dbname}`] = idbCon;
      return idbCon;

  };

  return { initJsStore };
};
