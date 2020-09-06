/// <reference path="../common/SP.d.ts" />
import {
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import {
  ITermStore,
  ITermSet,
  ITermGroup,
  ITerm
} from '../common/SPEntities';
import {
  IDataHelper
} from './DataHelperBase';

/**
 * Interface for terms with path property and nested terns
 */
interface ITermWithTerms extends ITerm {
  /**
   * Term's path
   */
  path: string[];

  /**
   * Term's full path
   */
  fullPath: string;

  /**
   * child terms
   */
  terms?: ITerms;
}

/**
 * Interface that represents a map wit key term ID and value ITermWithTerms object
 */
interface ITerms {
  [name: string]: ITermWithTerms;
}

/**
 * Interface that represents a map with key term set ID and value ITerms object
 */
interface ITermSetTerms {
  [name: string]: ITerms;
}

/**
 * SharePoint Data Helper class.
 * Gets information from current web
 */
export class DataHelperSP implements IDataHelper {
  /**
   * cached term stores. This property can be changed to static to be able to use the same cache in different web parts
   */
  private _loadedTermStores: SP.Taxonomy.ITermStoreCollection;
  /**
   * cached terms' hierarchy. This property can be changed to static to be able to use the same cache in different web parts
   */
  private _loadedTermsHierarchy: ITermSetTerms = {};
  /**
   * cached terms' flat list. This property can be changed to static to be able to use the same cache in different web parts
   */
  private _loadedTermsFlat: ITerms[] = [];

  /**
   * Web part context
   */
  public context: IWebPartContext;

  /**
   * ctor
   * @param context: web part context
   */
  public constructor(_context: IWebPartContext) {
    this.context = _context;
  }

  /**
   * API to get Term Stores
   */
  public getTermStores(): Promise<ITermStore[]> {
    return new Promise<ITermStore[]>((resolve) => {
      // term stores have been already loaded
      if (this._loadedTermStores) {
        // converting SP.Taxonomy.ITermStore object to ITermStore objects
        const termStoreEntities: ITermStore[] = this.getTermStoreEntities(this._loadedTermStores);
        resolve(termStoreEntities);
        return;
      }

      //
      // need to load term stores
      //

      this.loadScripts().then(() => { // loading scripts first
        const taxonomySession = this.taxonomySession;
        let termStores = taxonomySession.get_termStores();
        this.clientContext.load(termStores);
        this.clientContext.executeQueryAsync(() => {
          // converting SP.Taxonomy.ITermStore object to ITermStore objects
          const termStoreEntities: ITermStore[] = this.getTermStoreEntities(termStores);
          // caching loaded term stores
          this._loadedTermStores = termStores;
          resolve(termStoreEntities);
        }, () => {
          resolve([]);
        });

      });
    });
  }

  /**
   * API to get Term Groups by Term Store
   */
  public getTermGroups(termStoreId: string): Promise<ITermGroup[]> {
    return new Promise<ITermGroup[]>((resolve) => {
      this.getTermStoreById(termStoreId).then((termStore) => { // getting the term store
        if (!termStore) {
          resolve([]);
          return;
        }

        let groups = termStore.get_groups();
        //
        // if Groups property is not loaded get_count will throw an error that will be handled to retrieve groups
        //
        try {

          if (!groups.get_count()) { // this will throw error if groups were not loaded
            resolve([]);
            return;
          }

          // converting SP.Taxonomy.ITermGroup object to ITermGroup objects
          resolve(this.getTermGroupEntities(groups, termStore.get_id().toString()));
        }
        catch (ex) { // retrieving groups
          this.clientContext.load(groups);
          this.clientContext.executeQueryAsync(() => {
            // converting SP.Taxonomy.ITermGroup object to ITermGroup objects
            resolve(this.getTermGroupEntities(groups, termStore.get_id().toString()));
          }, () => {
            resolve([]);
          });
        }
        finally {
        }
      });
    });
  }
  /**
   * API to get Term Sets by Term Group
   */
  public getTermSets(termGroup: ITermGroup): Promise<ITermSet[]> {
    return new Promise<ITermSet[]>((resolve) => {
      this.getTermStoreById(termGroup.termStoreId).then((termStore) => { // getting term store by id
        if (!termStore) {
          resolve([]);
          return;
        }

        this.getTermGroupById(termStore, termGroup.id).then((group) => { // getting term group by id
          if (!group) {
            resolve([]);
            return;
          }
          let termSets = group.get_termSets();
          //
          // if termSets property is not loaded get_count will throw an error that will be handled to retrieve term sets
          //
          try {
            if (!termSets.get_count()) { // this will throw error if term sets were not loaded
              resolve([]);
              return;
            }

            //converting SP.Taxonomy.ITermSet object to ITermSet object
            resolve(this.getTermSetEntities(termSets, termGroup.id, termGroup.termStoreId));
          }
          catch (ex) { // retrieving term sets
            this.clientContext.load(termSets);
            this.clientContext.executeQueryAsync(() => {
              //converting SP.Taxonomy.ITermSet object to ITermSet object
              resolve(this.getTermSetEntities(termSets, termGroup.id, termGroup.termStoreId));
            }, () => {
              resolve([]);
            });
          }
          finally {
          }
        });
      });
    });
  }
  /**
   * API to get Terms by Term Set
   */
  public getTerms(termSet: ITermSet): Promise<ITerm[]> {
    return new Promise<ITerm[]>((resolve) => {
      // checking if terms were previously loaded
      if (this._loadedTermsHierarchy[termSet.id]) {
        const termSetTerms = this._loadedTermsHierarchy[termSet.id];
        // converting ITerms object to collection of ITerm objects
        resolve(this.getTermEntities(termSetTerms));
        return;
      }

      //
      // need to load terms
      //
      this.getTermStoreById(termSet.termStoreId).then((termStore) => { // getting store by id
        if (!termStore) {
          resolve([]);
          return;
        }

        this.getTermGroupById(termStore, termSet.termGroupId).then((group) => { // getting group by id
          if (!group) {
            resolve([]);
            return;
          }

          this.getTermSetById(termStore, group, termSet.id).then((set) => { // getting term set by id
            if (!set) {
              resolve([]);
              return;
            }

            let allTerms: SP.Taxonomy.ITermCollection;
            //
            // if terms property is not loaded get_count will throw an error that will be handled to retrieve terms
            //
            try {
              allTerms = set.getAllTerms();

              if (!allTerms.get_count()) { // this will throw error if terms were not loaded
                resolve([]);
                return;
              }

              // caching terms
              this._loadedTermsHierarchy[termSet.id] = this.buildTermsHierarchy(allTerms, termSet.id);
              // converting ITerms object to collection of ITerm objects
              resolve(this.getTermEntities(this._loadedTermsHierarchy[termSet.id]));
            }
            catch (ex) { // retrieving terms
              this.clientContext.load(allTerms, 'Include(Id, Name, Description, IsRoot, TermsCount, PathOfTerm, Labels)');
              this.clientContext.executeQueryAsync(() => {
                // caching terms
                this._loadedTermsHierarchy[termSet.id] = this.buildTermsHierarchy(allTerms, termSet.id);
                // converting ITerms object to collection of ITerm objects
                resolve(this.getTermEntities(this._loadedTermsHierarchy[termSet.id]));
              }, () => {
                resolve([]);
              });
            }
            finally { }

          });
        });
      });
    });
  }
  /**
   * API to get Terms by Term
   */
  public getChildTerms(term: ITerm): Promise<ITerm[]> {
    return new Promise<ITerm[]>((resolve) => {
      if (!this._loadedTermsFlat.length) {
        //
        // We can add logic to retrieve term from term Store
        // But I'll skip it for this example
        //
        resolve([]);
        return;
      }

      let terms: ITerms;
      // iterating through flat list of terms to find needed one
      for (let i = 0, len = this._loadedTermsFlat.length; i < len; i++) {
        const currTerm = this._loadedTermsFlat[i][term.id];
        if (currTerm) {
          terms = currTerm.terms;
          break;
        }
      }

      if (!terms) {
        resolve([]);
        return;
      }

      // converting ITerms object to collection of ITerm objects
      resolve(this.getTermEntities(terms));

    });
  }

  /**
   * Loads scripts that are needed to work with taxonomy
   */
  private loadScripts(): Promise<void> {
    return new Promise<void>((resolve) => {
      //
      // constructing path to Layouts folder
      //
      let layoutsUrl: string = this.context.pageContext.site.absoluteUrl;
      if (layoutsUrl.lastIndexOf('/') === layoutsUrl.length - 1)
        layoutsUrl = layoutsUrl.slice(0, -1);
      layoutsUrl += '/_layouts/15/';

      this.loadScript(layoutsUrl + 'init.js', 'Sod').then(() => { // loading init.js
        return this.loadScript(layoutsUrl + 'sp.runtime.js', 'sp_runtime_initialize'); // loading sp.runtime.js
      }).then(() => {
        return this.loadScript(layoutsUrl + 'sp.js', 'sp_initialize'); // loading sp.js
      }).then(() => {
        return this.loadScript(layoutsUrl + 'sp.taxonomy.js', 'SP.Taxonomy'); // loading sp.taxonomy.js
      }).then(() => {
        resolve();
      });
    });
  }

  /**
   * Loads script
   * @param url: script src
   * @param globalObjectName: name of global object to check if it is loaded to the page
   */
  private loadScript(url: string, globalObjectName: string): Promise<void> {
    return new Promise<void>((resolve) => {
      let isLoaded = true;
      if (globalObjectName.indexOf('.') !== -1) {
        const props = globalObjectName.split('.');
        let currObj: any = window;

        for (let i = 0, len = props.length; i < len; i++) {
          if (!currObj[props[i]]) {
            isLoaded = false;
            break;
          }

          currObj = currObj[props[i]];
        }
      }
      else {
        isLoaded = !!window[globalObjectName];
      }
      // checking if the script was previously added to the page
      if (isLoaded || document.head.querySelector('script[src="' + url + '"]')) {
        resolve();
        return;
      }

      // loading the script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.onload = () => {
        resolve();
      };
      document.head.appendChild(script);
    });
  }

  /**
   * Taxonomy session getter
   */
  private get taxonomySession(): SP.Taxonomy.TaxonomySession {
    return SP.Taxonomy.TaxonomySession.getTaxonomySession(this.clientContext);
  }

  /**
   * Client Context getter
   */
  private get clientContext(): SP.ClientContext {
    return SP.ClientContext.get_current();
  }

  /**
   * Converts SP.Taxonomy.ITermStore objects to ITermStore objects
   * @param termStores: SP.Taxonomy.ITermStoreCollection object
   */
  private getTermStoreEntities(termStores: SP.Taxonomy.ITermStoreCollection): ITermStore[] {
    if (!termStores)
      return [];

    const termStoreEntities: ITermStore[] = [];
    for (let i = 0, len = termStores.get_count(); i < len; i++) {
      const termStore = termStores.get_item(i);
      termStoreEntities.push({
        id: termStore.get_id().toString(),
        name: termStore.get_name()
      });
    }

    return termStoreEntities;
  }

  /**
   * Converts SP.Taxonomy.ITermGroup objects to ITermGroup objects
   * @param termGroups: SP.Taxonomy.ITermGroupCollection object
   * @param termStoreId: the identifier of parent term store
   */
  private getTermGroupEntities(termGroups: SP.Taxonomy.ITermGroupCollection, termStoreId: string): ITermGroup[] {
    if (!termGroups)
      return [];
    const termGroupEntities: ITermGroup[] = [];
    for (let i = 0, len = termGroups.get_count(); i < len; i++) {
      const termGroup = termGroups.get_item(i);
      termGroupEntities.push({
        id: termGroup.get_id().toString(),
        termStoreId: termStoreId,
        name: termGroup.get_name(),
        description: termGroup.get_description()
      });
    }

    return termGroupEntities;
  }

  /**
   * Converts SP.Taxonomy.ITermSet objects to ITermSet objects
   * @param termSets: SP.Taxonomy.ITermSetCollection object
   * @param termGroupId: the identifier of parent term group
   * @param termStoreId: the identifier of parent term store
   */
  private getTermSetEntities(termSets: SP.Taxonomy.ITermSetCollection, termGroupId: string, termStoreId: string): ITermSet[] {
    if (!termSets)
      return [];
    const termSetEntities: ITermSet[] = [];

    for (let i = 0, len = termSets.get_count(); i < len; i++) {
      const termSet = termSets.get_item(i);
      termSetEntities.push({
        id: termSet.get_id().toString(),
        name: termSet.get_name(),
        description: termSet.get_description(),
        termGroupId: termGroupId,
        termStoreId: termStoreId
      });
    }

    return termSetEntities;
  }

  /**
   * Retrieves term store by its id
   * @param termStoreId: the identifier of the store to retrieve
   */
  private getTermStoreById(termStoreId: string): Promise<SP.Taxonomy.ITermStore> {
    return new Promise<SP.Taxonomy.ITermStore>((resolve) => {
      if (!this._loadedTermStores) { // term stores were not loaded, need to load them
        this.getTermStores().then(() => {
          return this.getTermStoreById(termStoreId);
        });
      }
      else { // term stores are loaded
        let termStore = null;

        if (this._loadedTermStores) {
          for (let i = 0, len = this._loadedTermStores.get_count(); i < len; i++) {
            if (this._loadedTermStores.get_item(i).get_id().toString() === termStoreId) {
              termStore = this._loadedTermStores.get_item(i);
              break;
            }
          }
        }

        resolve(termStore);
      }
    });
  }

  /**
   * Retrieves term group by its id and parent term store
   * @param termStore: parent term store
   * @param termGroupId: the identifier of the group to retrieve
   */
  private getTermGroupById(termStore: SP.Taxonomy.ITermStore, termGroupId: string): Promise<SP.Taxonomy.ITermGroup> {
    return new Promise<SP.Taxonomy.ITermGroup>((resolve) => {
      if (!termStore || !termGroupId) {
        resolve(null);
        return;
      }

      let result: SP.Taxonomy.ITermGroup;
      //
      // if Groups property is not loaded get_count will throw an error that will be handled to retrieve groups
      //
      try {
        const groups: SP.Taxonomy.ITermGroupCollection = termStore.get_groups();
        const groupsCount: number = groups.get_count();
        const groupIdUpper = termGroupId.toUpperCase();

        for (let i = 0; i < groupsCount; i++) {
          const currGroup: SP.Taxonomy.ITermGroup = groups.get_item(i);
          if (currGroup.get_id().toString().toUpperCase() === groupIdUpper) {
            result = currGroup;
            break;
          }
        }

        if (!result) { // throwing an exception to try to load the group from server again
          throw new Error();
        }

        resolve(result);
      }
      catch (ex) { // retrieving the groups from server
        result = termStore.getGroup(termGroupId);
        this.clientContext.load(result);
        this.clientContext.executeQueryAsync(() => {
          resolve(result);
        }, () => {
          resolve(null);
        });
      }
      finally { }
    });
  }

  /**
   * Retrieves term set by its id, parent group and parent store
   * @param termStore: parent term store
   * @param termGroup: parent term group
   * @param termSetId: the identifier of the term set to retrieve
   */
  private getTermSetById(termStore: SP.Taxonomy.ITermStore, termGroup: SP.Taxonomy.ITermGroup, termSetId: string): Promise<SP.Taxonomy.ITermSet> {
    return new Promise<SP.Taxonomy.ITermSet>((resolve) => {
      if (!termGroup || !termSetId) {
        resolve(null);
        return;
      }

      let result: SP.Taxonomy.ITermSet;
      //
      // if termSets property is not loaded get_count will throw an error that will be handled to retrieve term sets
      //
      try {
        const termSets: SP.Taxonomy.ITermSetCollection = termGroup.get_termSets();
        const setsCount: number = termSets.get_count();
        const setIdUpper = termSetId.toUpperCase();

        for (let i = 0; i < setsCount; i++) {
          const currSet: SP.Taxonomy.ITermSet = termSets.get_item(i);
          if (currSet.get_id().toString().toUpperCase() === setIdUpper) {
            result = currSet;
            break;
          }
        }

        if (!result) { // throwing an exception to try to load the term set from server again
          throw new Error();
        }

        resolve(result);
      }
      catch (ex) {
        result = termStore.getTermSet(termSetId);
        this.clientContext.load(result);
        this.clientContext.executeQueryAsync(() => {
          resolve(result);
        }, () => {
          resolve(null);
        });
      }
      finally { }
    });
  }

  /**
   * Builds terms' hierarchy and also caches flat list of terms
   * @param terms: SP.Taxonomy.ITermCollection object
   * @param termSetId: the indetifier of parent term set
   */
  private buildTermsHierarchy(terms: SP.Taxonomy.ITermCollection, termSetId: string): ITerms {
    if (!terms)
      return {};
    const tree: ITerms = {};
    const flat: ITerms = {};

    //
    // Iterating through terms to collect flat list and create ITermWithTerms instances
    //
    for (let i = 0, len = terms.get_count(); i < len; i++) {
      const term = terms.get_item(i);
      // creating instance
      const termEntity: ITermWithTerms = {
        id: term.get_id().toString(),
        name: term.get_name(),
        description: term.get_description(),
        labels: [],
        termsCount: term.get_termsCount(),
        isRoot: term.get_isRoot(),
        path: term.get_pathOfTerm().split(';'),
        fullPath:term.get_pathOfTerm(),
        termSetId: termSetId
      };

      //
      // settings labels
      //
      const labels = term.get_labels();
      for (let lblIdx = 0, lblLen = labels.get_count(); lblIdx < lblLen; lblIdx++) {
        const lbl = labels.get_item(lblIdx);
        termEntity.labels.push({
          isDefaultForLanguage: lbl.get_isDefaultForLanguage(),
          value: lbl.get_value(),
          language: lbl.get_language()
        });
      }

      // if term is root we need to add it to the tree
      if (termEntity.isRoot) {
        tree[termEntity.id] = termEntity;
      }

      // adding term entity to flat list
      flat[termEntity.id] = termEntity;
    }

    const keys = Object.keys(flat);
    //
    // iterating through flat list of terms to build the tree structure
    //
    for (let keyIdx = 0, keysLength = keys.length; keyIdx < keysLength; keyIdx++) {
      const key = keys[keyIdx];
      const currentTerm = flat[key];

      // skipping root items
      if (currentTerm.isRoot) continue;

      // getting parent term name
      const termParentName = currentTerm.path[currentTerm.path.length - 2];

      //
      // second iteration to get parent term in flat list
      //
      for (let keySecondIndex = 0; keySecondIndex < keysLength; keySecondIndex++) {
        const secondTerm = flat[keys[keySecondIndex]];
        if (secondTerm.name === termParentName && secondTerm.path.length == currentTerm.path.length-1 && currentTerm.fullPath.indexOf(secondTerm.fullPath)==0) {
          if (!secondTerm.terms)
            secondTerm.terms = {};
          secondTerm.terms[currentTerm.id] = currentTerm;
        }
      }
    }

    this._loadedTermsFlat.push(flat);

    return tree;
  }

  /**
   * Converts ITerms object to collection of ITerm objects
   * @param terms: ITerms object
   */
  private getTermEntities(terms: ITerms): ITerm[] {
    const termsKeys = Object.keys(terms);
    const termEntities: ITerm[] = [];
    for (let keyIdx = 0, keysLength = termsKeys.length; keyIdx < keysLength; keyIdx++) {
      termEntities.push(terms[termsKeys[keyIdx]]);
    }

    return termEntities;
  }
}