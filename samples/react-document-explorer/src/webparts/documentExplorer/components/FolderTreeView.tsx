import * as React from 'react';
import { IFolderNode } from './IDocumentExplorerProps';
import { Icon, Spinner, SpinnerSize } from '@fluentui/react';
import styles from './DocumentExplorer.module.scss';

export interface IFolderTreeViewProps {
  folders: IFolderNode[];
  onFolderSelect: (node: IFolderNode, isAllFiles?: boolean) => Promise<void>;
  onFolderExpand: (node: IFolderNode) => Promise<IFolderNode[]>;
}

export interface IFolderTreeViewState {
  expandedFolders: { [key: string]: IFolderNode };
  loadingFolders: { [key: string]: boolean };
  selectedFolder: string;
}

export default class FolderTreeView extends React.Component<IFolderTreeViewProps, IFolderTreeViewState> {
  
  constructor(props: IFolderTreeViewProps) {
    super(props);
    
    this.state = {
      expandedFolders: {},
      loadingFolders: {},
      selectedFolder: ''
    };
  }

  private handleToggle = async (node: IFolderNode, event: React.MouseEvent): Promise<void> => {
    event.stopPropagation();
    
    const key = node.serverRelativeUrl;
    const { expandedFolders } = this.state;
    
    if (expandedFolders[key]) {
      // Collapse the folder
      const newExpanded = { ...expandedFolders };
      delete newExpanded[key];
      this.setState({ expandedFolders: newExpanded });
    } else {
      // Expand the folder
      if (!node.children || node.children.length === 0) {
        // Set loading state
        this.setState(prevState => ({ 
          loadingFolders: { ...prevState.loadingFolders, [key]: true } 
        }));
        
        try {
          // Fetch children
          const children = await this.props.onFolderExpand(node);
          
          const updatedNode = { ...node, children };
          
          // Update state with new node
          this.setState(prevState => {
            const newLoading = { ...prevState.loadingFolders };
            delete newLoading[key];
            
            return {
              loadingFolders: newLoading,
              expandedFolders: { 
                ...prevState.expandedFolders, 
                [key]: updatedNode 
              }
            };
          });
        } catch (error) {
          console.error('Error expanding folder:', error);
          
          this.setState(prevState => {
            const newLoading = { ...prevState.loadingFolders };
            delete newLoading[key];
            return { loadingFolders: newLoading };
          });
        }
      } else {
        this.setState(prevState => ({ 
          expandedFolders: { 
            ...prevState.expandedFolders, 
            [key]: node 
          } 
        }));
      }
    }
  };

  private handleSelect = async (node: IFolderNode, isAllFiles: boolean = false): Promise<void> => {
    this.setState({ selectedFolder: node.serverRelativeUrl });
    await this.props.onFolderSelect(node, isAllFiles);
  };

  private renderNode = (node: IFolderNode, level: number = 0): JSX.Element => {
    const key = node.serverRelativeUrl;
    const expandedNode = this.state.expandedFolders[key];
    const isExpanded = !!expandedNode;
    const isLoading = !!this.state.loadingFolders[key];
    
    // Use expanded node's children if available, otherwise use node's children
    const nodeToRender = expandedNode || node;
    const hasChildren = nodeToRender.hasChildren || (nodeToRender.children && nodeToRender.children.length > 0);
    const isSelected = this.state.selectedFolder === node.serverRelativeUrl;

    return (
      <div key={key} className={styles.treeNode}>
        {level === 0 && (
          <div 
            className={styles.treeNodeContent}
            style={{ 
              paddingLeft: `${level * 20}px`,
              fontStyle: 'italic',
              color: '#0078d4',
              fontWeight: 600
            }}
            onClick={() => this.handleSelect(node, true)}
          >
            <span className={styles.treeNodeSpacer} />
            <Icon iconName="DocumentSet" className={styles.treeNodeIcon} style={{ color: '#0078d4' }} />
            <span className={styles.treeNodeLabel}>All Files</span>
          </div>
        )}

        {/* Main folder/library node */}
        <div 
          className={`${styles.treeNodeContent} ${isSelected ? styles.selectedNode : ''}`}
          style={{ paddingLeft: `${level * 20}px` }}
          onClick={() => this.handleSelect(node, false)}
        >
          {hasChildren && (
            <span 
              className={styles.treeNodeToggle}
              onClick={(e) => this.handleToggle(node, e)}
            >
              {isLoading ? (
                <Spinner size={SpinnerSize.xSmall} />
              ) : (
                <Icon iconName={isExpanded ? 'ChevronDown' : 'ChevronRight'} />
              )}
            </span>
          )}
          {!hasChildren && <span className={styles.treeNodeSpacer} />}
          <Icon 
            iconName={level === 0 ? 'Library' : isExpanded ? 'FolderOpen' : 'Folder'} 
            className={styles.treeNodeIcon}
          />
          <span className={styles.treeNodeLabel}>{node.name}</span>
        </div>
        
        {/* Child folders */}
        {isExpanded && nodeToRender.children && nodeToRender.children.length > 0 && (
          <div className={styles.treeNodeChildren}>
            {nodeToRender.children.map(child => this.renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  public render(): React.ReactElement<IFolderTreeViewProps> {
    const { folders } = this.props;

    return (
      <div className={styles.folderTree}>
        <div className={styles.panelHeader}>
          <Icon iconName="FabricFolder" />
          <span>Folder Tree</span>
        </div>
        <div className={styles.treeContent}>
          {folders.length === 0 ? (
            <div className={styles.emptyState}>No libraries available</div>
          ) : (
            folders.map(folder => this.renderNode(folder))
          )}
        </div>
      </div>
    );
  }
}