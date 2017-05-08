/**
 * SP namespace
 */
declare namespace SP {
  /**
   * Client Context class
   */
  export class ClientContext {
    /**
     * API to get current context
     */
    public static get_current(): ClientContext;
    /**
     * API to load client objects
     */
    public load(obj: any, ...rest: string[]): void;
    /**
     * API to execute query
     */
    public executeQueryAsync(success?: (result: any) => void, error?: (error: any) => void);
  }

  /**
   * Base collection interface
   */
  export interface ICollectionBase {
    /**
     * API to get count of items in the collection
     */
    get_count(): number;
  }

  /**
   * Taxonomy namespace
   */
  namespace Taxonomy {
    /**
     * Taxonomy Session class
     */
    export class TaxonomySession {
      /**
       * API to get current Taxonomy Session
       * @param spContext: current Client Context
       */
      public static getTaxonomySession(spContext: ClientContext): TaxonomySession;

      /**
       * API to get term stores
       */
      public get_termStores(): ITermStoreCollection;
    }

    /**
     * Base interface of taxonomy objects
     */
    export interface ITermBase {
      /**
       * API to get ID
       */
      get_id(): any;
      /**
       * API to get name
       */
      get_name(): string;
    }

    /**
     * Term Store interface
     */
    export interface ITermStore extends ITermBase {
      /**
       * API to get all groups in the term store
       */
      get_groups(): ITermGroupCollection;
      /**
       * API to get group by its id
       */
      getGroup(id: string): ITermGroup;
      /**
       * API to get term set by its id
       */
      getTermSet(id: string): ITermSet;
    }

    /**
     * Term Stores Collection interface
     */
    export interface ITermStoreCollection extends ICollectionBase {
      /**
       * Gets item by index
       */
      get_item(index: number): ITermStore;
    }

    /**
     * Term Group interface
     */
    export interface ITermGroup extends ITermBase {
      /**
       * API to get description
       */
      get_description(): string;
      /**
       * API to get term sets from the group
       */
      get_termSets(): ITermSetCollection;
    }

    /**
     * Term Groups Collection inteface
     */
    export interface ITermGroupCollection extends ICollectionBase {
      /**
       * Gets item by index
       */
      get_item(index: number): ITermGroup;
    }

    /**
     * Term Set Interface
     */
    export interface ITermSet extends ITermBase {
      /**
       * API to get description
       */
      get_description(): string;
      /**
       * API to get flat list of all terms in the Term set
       */
      getAllTerms(): ITermCollection;
    }

    /**
     * Term Sets collection interface
     */
    export interface ITermSetCollection extends ICollectionBase {
      /**
       * Gets item by index
       */
      get_item(index: number): ITermSet;
    }

    /**
     * Term interface
     */
    export interface ITerm extends ITermBase {
      /**
       * API to get description
       */
      get_description(): string;
      /**
       * API to get labels
       */
      get_labels(): ILabelCollection;
      /**
       * API to get flag if current term is root term
       */
      get_isRoot(): boolean;
      /**
       * API to get child terms count
       */
      get_termsCount(): number;
      /**
       * API to get path of the term in defauld lcid
       */
      get_pathOfTerm(): string;
    }

    /**
     * Terms Collection interface
     */
    export interface ITermCollection extends ICollectionBase {
      /**
       * Gets item by index
       */
      get_item(index: number): ITerm;
    }

    /**
     * Labels collection interface
     */
    export interface ILabelCollection extends ICollectionBase {
      /**
       * Gets item by index
       */
      get_item(index: number): ILabel;
    }

    /**
     * Label interface
     */
    export interface ILabel {
      /**
       * API to get flag if current label is default for the language
       */
      get_isDefaultForLanguage(): boolean;
      /**
       * API to get language
       */
      get_language(): string;
      /**
       * API to get label's value
       */
      get_value(): string;
    }
  }
}