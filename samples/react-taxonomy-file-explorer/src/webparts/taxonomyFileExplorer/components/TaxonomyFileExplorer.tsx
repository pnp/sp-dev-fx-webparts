import * as React from 'react';
import styles from './TaxonomyFileExplorer.module.scss';
import { ITaxonomyFileExplorerProps } from './ITaxonomyFileExplorerProps';
import { IFileItem } from '../../../model/IFileItem';
import { ITermNode } from '../../../model/ITermNode';
import { TaxonomyService } from '../../../services/TaxonomyService';
import { SPService } from '../../../services/SPService';
import { FileLabel } from './FileLabel';
import { TermLabel } from './TermLabel';

export const TaxonomyFileExplorer: React.FC<ITaxonomyFileExplorerProps> = (props) => {
  const [spSvc, setSpSvc] = React.useState<SPService>();
  const [fileItems, setFileItems] = React.useState<IFileItem[]>([]);
  const [terms, setTerms] = React.useState<ITermNode[]>([]);
  const [shownFiles, setShownFiles] = React.useState<IFileItem[]>([]);
  const [selectedTermnode, setSelectedTermnode] = React.useState<string>("");

  const buildTree = async () => {
    const taxSvc: TaxonomyService = new TaxonomyService();
    const termsetID = await taxSvc.getTermsetInfo(props.fieldName);
    let termnodetree: ITermNode[];
    const termnodetreeStr = sessionStorage.getItem(`Termtree_${termsetID}`);
    if (termnodetreeStr === null) {
      termnodetree = await taxSvc.getTermset(termsetID);
      sessionStorage.setItem(`Termtree_${termsetID}`, JSON.stringify(termnodetree));
    }
    else {
      termnodetree = JSON.parse(termnodetreeStr);
    }

    const spSrvc: SPService = new SPService(props.listName, props.fieldName);
    const files = await spSrvc.getItems(termsetID);
    setSpSvc(spSrvc);
    updateFiles(files, termnodetree);
  };

  const updateFiles = (files: IFileItem[], termnodetree: ITermNode[]) => {
    const taxSvc: TaxonomyService = new TaxonomyService();
    termnodetree = taxSvc.incorporateFiles(termnodetree, files);
    setFileItems(files);
    setTerms(termnodetree);
  };

  const renderFiles = (files: IFileItem[]) => {
    setShownFiles(files);
  };

  const resetChecked = (newNodeID: string) => {
    setSelectedTermnode(newNodeID);
  };

  const reloadFiles = (file: IFileItem) => {
    const newFiles: IFileItem[] = [];
    fileItems.forEach(fi => {
      if (fi.id === file.id && fi.url === file.url) {
        newFiles.push(file);
      }
      else {
        newFiles.push(fi);
      }
    });
    updateFiles(newFiles, terms);
  };

  const loadNewFiles = (file: IFileItem) => {
    const newFiles: IFileItem[] = [file].concat(fileItems);
    updateFiles(newFiles, terms);
  };

  const addTerm = (file: IFileItem, newTaxonomyValue: string) => {
    spSvc.updateTaxonomyItemByAdd(file, props.fieldName, newTaxonomyValue);
    reloadFiles(file);
  };

  const replaceTerm = (file: IFileItem, newTaxonomyValue: string) => {
    spSvc.updateTaxonomyItemByReplace(file, props.fieldName, newTaxonomyValue);
    reloadFiles(file);
  };

  const copyFile = async (file: IFileItem, newTaxonomyValue: string) => {
    const newFile = await spSvc.newTaxonomyItemByCopy(file, props.fieldName, newTaxonomyValue);
    loadNewFiles(newFile);
  };

  React.useEffect(() => {
    buildTree();
  }, []);

  return (
    <div className={ styles.taxonomyFileExplorer }>
      <div className={ styles.container }>
        <div className={ styles.row }>
          <div className={ styles.column }>
            <ul>
              {terms.map(nc => { return <TermLabel node={nc} 
                                                    renderFiles={renderFiles} 
                                                    resetChecked={resetChecked} 
                                                    selectedNode={selectedTermnode}
                                                    addTerm={addTerm}
                                                    replaceTerm={replaceTerm}
                                                    copyFile={copyFile} />; })}
            </ul>
          </div>
          <div className={ styles.column }>
          {shownFiles.length > 0 && 
            <ul>
                {shownFiles.map(f => {
                    return <FileLabel file={f} />;
                })}
            </ul>}
          </div>
        </div>
      </div>
    </div>
  );
};
