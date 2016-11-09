declare namespace SP {
  export class ClientContext {
    static get_current(): ClientContext;
    load(obj: any, ...rest: string[]): void;
    executeQueryAsyncCallback(success: (result: any) => void, error: (error: any) => void);
  }

  namespace Taxonomy {
    export class TaxonomySession {
      static getTaxonomySession(spContext: ClientRect): TaxonomySession;
      get_termStores(): ITermStoreCollection;
    }

    export interface ITermStore {
      get_groups(): ITermGroupCollection;
    }

    export interface ITermStoreCollection {
      get_item(index: number): ITermStore;
    }

    export interface ITermGroup {
    }

    export interface ITermGroupCollection {
      get_item(index: number): ITermGroup;
    }
  }
}