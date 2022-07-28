import * as React from 'react';
import styles from './TaxonomyFileExplorer.module.scss';
import { ITaxonomyFileExplorerProps } from './ITaxonomyFileExplorerProps';
import { IFileItem } from '../../../model/IFileItem';
import { ITermNode } from '../../../model/ITermNode';
import { TaxonomyService } from '../../../services/TaxonomyService';
import { SPService } from '../../../services/SPService';
import { FileLabel } from './FileLabel';
import { TermLabel } from './TermLabel';
import { Icon } from 'office-ui-fabric-react';

export const TaxonomyFileExplorer: React.FC<ITaxonomyFileExplorerProps> = (props) => {
  const [spSvc, setSpSvc] = React.useState<SPService>();
  const [fileItems, setFileItems] = React.useState<IFileItem[]>([]);
  const [terms, setTerms] = React.useState<ITermNode[]>([]);
  const [shownFiles, setShownFiles] = React.useState<IFileItem[]>([]);
  const [selectedTermnode, setSelectedTermnode] = React.useState<string>("");
  const [collapseAll, setCollapseAll] = React.useState<boolean>(false);
  const [expandAll, setExpandAll] = React.useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const buildTree = async () => {
    const taxSvc: TaxonomyService = new TaxonomyService(props.serviceScope);
    const termsetID: string = await taxSvc.getTermsetInfo(props.fieldName);
    let termnodetree: ITermNode[];
    const termnodetreeStr: string = sessionStorage.getItem(`Termtree_${termsetID}`);
    if (termnodetreeStr === null) {
      termnodetree = await taxSvc.getTermset(termsetID);
      sessionStorage.setItem(`Termtree_${termsetID}`, JSON.stringify(termnodetree));
    }
    else {
      termnodetree = JSON.parse(termnodetreeStr);
    }

    const spSrvc: SPService = new SPService(props.serviceScope, props.listName, props.fieldName);
    const files: IFileItem[] = await spSrvc.getItems(termsetID);
    setSpSvc(spSrvc);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    updateFiles(files, termnodetree);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const updateFiles = (files: IFileItem[], termnodetree: ITermNode[]) => {
    const taxSvc: TaxonomyService = new TaxonomyService(props.serviceScope);
    termnodetree = taxSvc.incorporateFiles(termnodetree, files);
    setFileItems(files);
    setTerms(termnodetree);
  };

  const renderFiles = React.useCallback((files: IFileItem[]) => {
    setShownFiles(files);
  },[setShownFiles]);

  const resetChecked = React.useCallback((newNodeID: string) => {
    setSelectedTermnode(newNodeID);
  },[setSelectedTermnode]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const loadNewFiles = (file: IFileItem) => {
    const newFiles: IFileItem[] = [file].concat(fileItems);
    updateFiles(newFiles, terms);
  };

  const addTerm = React.useCallback((file: IFileItem, newTaxonomyValue: string) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    spSvc.updateTaxonomyItemByAdd(file, props.fieldName, newTaxonomyValue);
    reloadFiles(file);
  },[spSvc, fileItems, terms]); // eslint-disable-line react-hooks/exhaustive-deps

  const replaceTerm = React.useCallback((file: IFileItem, newTaxonomyValue: string) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    spSvc.updateTaxonomyItemByReplace(file, props.fieldName, newTaxonomyValue);
    reloadFiles(file);
  },[spSvc, fileItems, terms]); // eslint-disable-line react-hooks/exhaustive-deps

  const copyFile = React.useCallback(async (file: IFileItem, newTaxonomyValue: string) => {
    const newFile = await spSvc.newTaxonomyItemByCopy(file, props.fieldName, newTaxonomyValue);
    loadNewFiles(newFile);
  },[spSvc, fileItems, terms]); // eslint-disable-line react-hooks/exhaustive-deps

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadFile = React.useCallback(async (file: any, newTaxonomyValue: string) => {
    const newFile = await spSvc.newTaxonomyItemByUpload(file, props.fieldName, newTaxonomyValue)
    loadNewFiles(newFile);
  },[spSvc, fileItems, terms]); // eslint-disable-line react-hooks/exhaustive-deps

  const expandAllTerms = React.useCallback(() => {
    setExpandAll(true);
    setCollapseAll(false);
  },[setExpandAll, setCollapseAll]);

  const collapseAllTerms = React.useCallback(() => {
    setCollapseAll(true);
    setExpandAll(false);
  },[setExpandAll, setCollapseAll]);

  React.useEffect(() => {
    buildTree(); // eslint-disable-line @typescript-eslint/no-floating-promises
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={ styles.taxonomyFileExplorer }>
      <div className={ styles.container }>            
        <div className={ styles.row }>
          <div className={ styles.column }>
            <Icon className={styles.icon} iconName="ExploreContent" onClick={expandAllTerms} /> {/*  Alt: DoubleChevronRight */}
            <Icon className={styles.icon} iconName="CollapseContent" onClick={collapseAllTerms} /> {/*  Alt: DoubleChevronDown */}
            <ul>
              {terms.map(nc => { return <TermLabel node={nc}
                                                    key={nc.guid}
                                                    renderFiles={renderFiles} 
                                                    resetChecked={resetChecked} 
                                                    selectedNode={selectedTermnode}
                                                    collapseAll={collapseAll}
                                                    expandAll={expandAll}
                                                    addTerm={addTerm}
                                                    replaceTerm={replaceTerm}
                                                    copyFile={copyFile}
                                                    uploadFile={uploadFile} />; })}
            </ul>
          </div>
          <div className={ styles.column }>
          {shownFiles.length > 0 && 
            <ul>
                {shownFiles.map(f => {
                    return <FileLabel file={f} key={f.id} />;
                })}
            </ul>}
          </div>
        </div>
      </div>
    </div>
  );
};
