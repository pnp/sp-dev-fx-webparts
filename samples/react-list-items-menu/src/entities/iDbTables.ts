import { DATA_TYPE, ITable } from "jsstore";


const iDbListItems: ITable = {
  name: 'NavItems',
  columns: {
    groupBy: {
      notNull: true,
      dataType: DATA_TYPE.String
  },
      id: {
          primaryKey: true,
      },
      name: {
          notNull: true,
          dataType: DATA_TYPE.String
      },
      url: {
          dataType: DATA_TYPE.String,
          notNull: true
      }
  }
};

const iDbTokens: ITable = {
  name: 'Tokens',
  columns: {
      id: {
          primaryKey: true,
      },
      token: {
          notNull: true,
          dataType: DATA_TYPE.String
      },
  }
};

export const iDbTables : ITable[] = [iDbListItems, iDbTokens];
