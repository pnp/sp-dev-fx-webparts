import * as React from 'react';
import styles from './TermLabel.module.scss';
import { ContextualMenu, IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { ITermLabelProps } from "./ITermLabelProps";
import { IFileItem } from '../../../model/IFileItem';

export const TermLabel: React.FC<ITermLabelProps> = (props) => {
  const linkRef = React.useRef(null);
  const [showChildren, setShowChildren] = React.useState<boolean>(true);
  const [countDocuments, setCountDocuments] = React.useState<number>(props.node.childDocuments);
  const [showContextualMenu, setShowContextualMenu] = React.useState<boolean>(false);
  const [droppedFile, setDroppedFile] = React.useState<IFileItem>();
  const [dragEntered, setDragEntered] = React.useState<boolean>(false);

  const toggleIcon = React.useCallback(() => {
    setShowChildren(!showChildren);
  },[setShowChildren,showChildren]);

  const nodeSelected = React.useCallback(() => {
    props.resetChecked(props.node.guid);
    props.renderFiles(props.node.subFiles);
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  const hideContextualMenu = React.useCallback(() => {
    setShowContextualMenu(false);
  },[setShowContextualMenu]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadWithNewTerm = React.useCallback((file: any) => {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const newTaxonomyValue: string = `${props.node.name}|${props.node.guid}`;
    props.uploadFile(file, newTaxonomyValue);
  },[]); // eslint-disable-line react-hooks/exhaustive-deps
  
  const addNewTerm = React.useCallback((file: IFileItem) => {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const newTaxonomyValue: string = `${props.node.name}|${props.node.guid}`;
    file.termGuid.push(props.node.guid);
    file.taxValue.push(newTaxonomyValue);
    props.addTerm(file, newTaxonomyValue);
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  const drop = React.useCallback((ev) => {    
    ev.preventDefault();
    // Drop is a file or a FileLabel
    if (ev.dataTransfer.types.indexOf('Files') > -1) {
      const dt = ev.dataTransfer;
      const files =  Array.prototype.slice.call(dt.files);
      files.forEach(fileToUpload => {
        uploadWithNewTerm(fileToUpload);
      });
    }
    else {
      const data: string = ev.dataTransfer.getData("text");
      const file: IFileItem = JSON.parse(data);
      setDroppedFile(file);
      if (ev.ctrlKey) {
        setShowContextualMenu(true);
      }
      else {
        addNewTerm(file); // Default option: Simply add the new (target) term to existing ones
      }
    }
  },[uploadWithNewTerm, addNewTerm]);

  const dragOver = React.useCallback((ev) => {
    ev.preventDefault();
  },[]);

  const dragEnter = React.useCallback((ev) => {
    setDragEntered(true);
  },[setDragEntered]);

  const dragLeave = React.useCallback((ev) => {
    setDragEntered(false);
  },[setDragEntered]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const replaceByNewTerm = (file: IFileItem) => {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const newTaxonomyValue: string = `${props.node.name}|${props.node.guid}`;
    file.termGuid = [props.node.guid];
    file.taxValue = [newTaxonomyValue];
    console.log(file);
    props.addTerm(file, newTaxonomyValue);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const copyWithNewTerm = (file: IFileItem) => {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const newTaxonomyValue: string = `${props.node.name}|${props.node.guid}`;
    props.copyFile(file, newTaxonomyValue);
  };

  const currentExpandIcon: JSX.Element = showChildren? <Icon className={styles.icon} iconName="ChevronDown" onClick={toggleIcon} />:<Icon className={styles.icon} iconName="ChevronRight" onClick={toggleIcon} />;
  const menuItems: IContextualMenuItem[] = [
    {
      key: 'copyItem',
      text: 'Create new file with term (Copy)',
      onClick: () => copyWithNewTerm(droppedFile)
    },
    {
      key: 'moveItem',
      text: 'Replace with new term (Move)',
      onClick: () => replaceByNewTerm(droppedFile)
    },
    {
      key: 'linkItem',
      text: 'Add new term (Link)',
      onClick: () => addNewTerm(droppedFile)
    }];
  React.useEffect(() => {
    if (props.expandAll) {
      setShowChildren(true);
    }
    if (props.collapseAll) {
      setShowChildren(false);
    }
  }, [props.collapseAll, props.expandAll]);
  React.useEffect(() => {
    if (props.selectedNode===props.node.guid) {
      props.renderFiles(props.node.subFiles);
    }
    if (props.node.childDocuments !== countDocuments) {
      setCountDocuments(props.node.childDocuments);
    }
  }, [props.node.subFiles]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <li className={styles.termLabel}>            
      <div ref={linkRef} className={`${styles.label} ${props.selectedNode===props.node.guid ? styles.checkedLabel : ""} 
                                      ${dragEntered ? styles.dragEnter : ""}`} 
                          onClick={nodeSelected} 
                          onDrop={drop} 
                          onDragOver={dragOver}
                          onDragEnter={dragEnter}
                          onDragLeave={dragLeave}>
        <label>
          {props.node.children.length > 0 ? currentExpandIcon : <i className={styles.emptyicon}>&nbsp;</i>}
          <Icon className={styles.icon} iconName="FabricFolder" />
          {props.node.name}{countDocuments>0?<span className={styles.fileCount}>{countDocuments}</span>:""}
        </label>
      </div>
      <ContextualMenu
        items={menuItems}
        hidden={!showContextualMenu}
        target={linkRef}
        onItemClick={hideContextualMenu}
        onDismiss={hideContextualMenu}
      />
      {showChildren && <ul className={`${props.node.children.length > 0 ? styles.liFilled : ""}`}>
          {props.node.children.map(nc => { return <TermLabel node={nc}
                                                            key={nc.guid}
                                                            renderFiles={props.renderFiles} 
                                                            resetChecked={props.resetChecked} 
                                                            selectedNode={props.selectedNode}
                                                            collapseAll={props.collapseAll}
                                                            expandAll={props.expandAll}
                                                            addTerm={props.addTerm}
                                                            replaceTerm={props.replaceTerm}
                                                            copyFile={props.copyFile}
                                                            uploadFile={props.uploadFile} />; })}
      </ul>}            
    </li>
  );
};