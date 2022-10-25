import { ServiceScope } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";
import { SPFI, spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/taxonomy";
import { IOrderedTermInfo, ITermInfo } from "@pnp/sp/taxonomy";
import "@pnp/sp/fields";
import { IFileItem } from "../model/IFileItem";
import { ITermNode } from "../model/ITermNode";

export class TaxonomyService {
  private _sp: SPFI;
  
  public constructor (serviceScope: ServiceScope) {
    serviceScope.whenFinished(() => {
      const pageContext: PageContext = serviceScope.consume(PageContext.serviceKey);
      this._sp = spfi().using(SPFx({ pageContext }));
    });
  }

  public async getTermsetInfo (fieldName: string): Promise<string> {
    const mmFieldInfo = await this._sp.web.fields.getByInternalNameOrTitle(fieldName)();
    const parser = new DOMParser();
    const xmlField = parser.parseFromString(mmFieldInfo.SchemaXml, "text/xml");
    const properties = xmlField.getElementsByTagName("ArrayOfProperty")[0].childNodes;
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    let termsetID: string = "";
    properties.forEach(prop => {
      if (prop.childNodes[0].textContent === "TermSetId") {
        termsetID = prop.childNodes[1].textContent;
      }
    });
    return termsetID;
  }

  public async getTermset(termsetID: string): Promise<ITermNode[]> {
    // list all the terms available in this term set by term set id
    const termset: IOrderedTermInfo[] = await this._sp.termStore.sets.getById(termsetID).getAllChildrenAsOrderedTree();
    const termnodes: ITermNode[] = [];
    termset.forEach(async ti => {
      const tn = this._getTermnode(ti);
      termnodes.push(tn);
    });
    return termnodes;
  }

  public incorporateFiles (terms: ITermNode[], files: IFileItem[]): ITermNode[] {
    terms.forEach(term => {
      term = this._incorporateFilesIntoTerm(term, files);
    });
    return terms;
  }

  private _getTermnode (term: ITermInfo): ITermNode {
    const node: ITermNode = {
      guid: term.id,
      childDocuments: 0,
      name: term.labels.filter(i => i.isDefault === true)[0].name,
      children: [],
      subFiles: []
    };
    if (term.childrenCount > 0) {
      const ctnodes: ITermNode[] = [];
      term.children.forEach(ct => {
        const ctnode: ITermNode = this._getTermnode(ct);
        node.childDocuments += ctnode.childDocuments;
        ctnodes.push(ctnode);
      });
      node.children = ctnodes;
    }   
    return node;
  }

  private _incorporateFilesIntoTerm (term: ITermNode, files: IFileItem[]): ITermNode {
    term.childDocuments = 0;
    term.subFiles = [];
    if (term.children.length > 0) {
      term.children.forEach(ct => {
        ct = this._incorporateFilesIntoTerm(ct, files);
        term.childDocuments += ct.childDocuments;
      });
    }
    files.forEach(fi => {
      if (fi.termGuid.indexOf(term.guid.toLowerCase()) > -1) {
        term.childDocuments++;
        term.subFiles.push(fi);
      }
    });
    return term;
  }
}