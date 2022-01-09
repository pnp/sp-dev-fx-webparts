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

  const toggleIcon = () =>  {
    setShowChildren(!showChildren);
  };

  const nodeSelected = () => {
    props.resetChecked(props.node.guid);
    props.renderFiles(props.node.subFiles);
  };

  const hideContextualMenu = () => {
    setShowContextualMenu(false);
  };

  const drop = (ev) => {    
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    const file: IFileItem = JSON.parse(data);
    setDroppedFile(file);
    if (ev.ctrlKey) {
      setShowContextualMenu(true);
    }
    else {
      addNewTerm(file); // Default option: Simply add the new (target) term to existing ones
    }
  };

  const dragOver = (ev) => {
    ev.preventDefault();
  };
    
  const addNewTerm = (file: IFileItem) => {
    const newTaxonomyValue = `${props.node.name}|${props.node.guid}`;
    file.termGuid.push(props.node.guid);
    file.taxValue.push(newTaxonomyValue);
    console.log(file);
    props.addTerm(file, newTaxonomyValue);
  };

  const replaceByNewTerm = (file: IFileItem) => {
    const newTaxonomyValue = `${props.node.name}|${props.node.guid}`;
    file.termGuid = [props.node.guid];
    file.taxValue = [newTaxonomyValue];
    console.log(file);
    props.addTerm(file, newTaxonomyValue);
  };

  const copyWithNewTerm = (file: IFileItem) => {
    const newTaxonomyValue = `${props.node.name}|${props.node.guid}`;
    console.log(file);
    props.copyFile(file, newTaxonomyValue);
  };

  const currentExpandIcon = showChildren? <Icon className={styles.icon} iconName="ChevronDown" onClick={toggleIcon} />:<Icon className={styles.icon} iconName="ChevronRight" onClick={toggleIcon} />;
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
    if (props.selectedNode===props.node.guid) {
      props.renderFiles(props.node.subFiles);
    }
    if (props.node.childDocuments !== countDocuments) {
      setCountDocuments(props.node.childDocuments);
    }
  }, [props.node.subFiles]);
  return (
      <li className={styles.termLabel}>            
          <div ref={linkRef} className={`${styles.label} ${props.selectedNode===props.node.guid ? styles.checkedLabel : ""}`} onClick={nodeSelected} onDrop={drop} onDragOver={dragOver}>
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
                                                                renderFiles={props.renderFiles} 
                                                                resetChecked={props.resetChecked} 
                                                                selectedNode={props.selectedNode}
                                                                addTerm={props.addTerm}
                                                                replaceTerm={props.replaceTerm}
                                                                copyFile={props.copyFile} />; })}
          </ul>}            
      </li>
  );
};