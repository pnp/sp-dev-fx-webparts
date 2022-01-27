import { sp } from "@pnp/sp";
import { IOrderedTermInfo } from "@pnp/sp/taxonomy";
import { IFileItem } from "../model/IFileItem";
import { ITermNode } from "../model/ITermNode";

export class TaxonomyService {
  public async getTermsetInfo (fieldName: string): Promise<string> {
    const mmFieldInfo = await sp.web.fields.getByInternalNameOrTitle(fieldName).get();
    const parser = new DOMParser();
    const xmlField = parser.parseFromString(mmFieldInfo.SchemaXml, "text/xml");
    const properties = xmlField.getElementsByTagName("ArrayOfProperty")[0].childNodes;
    let termsetID: string = "";
    properties.forEach(prop => {
      if (prop.childNodes[0].textContent == "TermSetId") {
        termsetID = prop.childNodes[1].textContent;
      }
    });
    return termsetID;
  }

  public async getTermset (termsetID: string) {
    // list all the terms available in this term set by term set id
    const termset: IOrderedTermInfo[] = await sp.termStore.sets.getById(termsetID).getAllChildrenAsOrderedTree();
    const termnodes: ITermNode[] = [];
    termset.forEach(async ti => {
      const tn = this.getTermnode(ti);
      termnodes.push(tn);
    });
    return termnodes;
  }

  public incorporateFiles (terms: ITermNode[], files: IFileItem[]): ITermNode[] {
    terms.forEach(term => {
      term = this.incorporateFilesIntoTerm(term, files);
    });
    return terms;
  }

  private getTermnode (term: IOrderedTermInfo): ITermNode {
    const node: ITermNode = {
      guid: term.id,
      childDocuments: 0,
      name: term.defaultLabel,
      children: [],
      subFiles: []
    };
    if (term.childrenCount > 0) {
      const ctnodes: ITermNode[] = [];
      term.children.forEach(ct => {
        const ctnode: ITermNode = this.getTermnode(ct);
        node.childDocuments += ctnode.childDocuments;
        ctnodes.push(ctnode);
      });
      node.children = ctnodes;
    }   
    return node;
  }

  private incorporateFilesIntoTerm (term: ITermNode, files: IFileItem[]): ITermNode {
    term.childDocuments = 0;
    term.subFiles = [];
    if (term.children.length > 0) {
      term.children.forEach(ct => {
        ct = this.incorporateFilesIntoTerm(ct, files);
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