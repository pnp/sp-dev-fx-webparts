import * as React from 'react';
import { useEffect, useState } from 'react';
import { DisplayMode } from '@microsoft/sp-core-library';
import { Icon, IconButton } from '@fluentui/react';
import { SPService } from '../services/SPService';
import { IQuickLink } from '../models/IQuickLink';
import { ConfigurationPanel } from './ConfigurationPanel';
import styles from './QuickLinksHierarchy.module.scss';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IQuickLinksHierarchyProps {
  context: WebPartContext;
  displayMode: DisplayMode;
  listId: string;
  listTitle: string;
  updateProperty: (v: { listId: string; listTitle: string }) => void;
}

const QuickLinksHierarchy: React.FC<IQuickLinksHierarchyProps> = (props) => {
  const [sp] = useState(() => new SPService(props.context));
  const [tree, setTree] = useState<IQuickLink[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [openConfig, setOpenConfig] = useState(false);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const isEdit = props.displayMode === DisplayMode.Edit;

  const load = async (): Promise<void> => {
    try {
      setError(undefined);
      if (!props.listId) { 
        setTree([]);
        return;
      }
      const data = await sp.getItemsTree(props.listId, false);
      setTree(data);
    } catch (e) {
      console.error(e);
      setError('Failed to load links.');
    }
  };

  useEffect(() => {
    void load();
  }, [props.listId]);

  const toggleExpand = (id: string): void => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const onNavigate = (node: IQuickLink): void => {
    if (!node.url || node.isHeader) return;
    const target = node.openWith === 'Same Window' ? '_self' : '_blank';
    window.open(node.url, target, 'noopener,noreferrer');
  };

  const renderSection = (node: IQuickLink): JSX.Element => {
    const hasChildren = node.children && node.children.length > 0;
    const expanded = expandedIds.includes(node.id);

    return (
      <div key={node.id} className={styles.section}>
        <div 
          className={styles.header} 
          onClick={() => hasChildren ? toggleExpand(node.id) : onNavigate(node)}
        >
          <Icon 
            iconName={node.isHeader ? 'FabricFolder' : 'Link'} 
            className={styles.icon}
          />
          <span className={styles.title}>{node.title}</span>
          {hasChildren && (
            <Icon
              iconName={expanded ? 'ChevronDown' : 'ChevronRight'}
              className={styles.chevron}
            />
          )}
        </div>

        {expanded && hasChildren && (
          <div className={styles.children}>
            {node.children!.map(c => (
              <div key={c.id} className={styles.child} onClick={() => onNavigate(c)}>
                <Icon iconName="Link" className={styles.childIcon} />
                {c.title}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      {isEdit && (
        <div className={styles.gear}>
          <IconButton
            iconProps={{ iconName: 'Settings' }}
            onClick={() => setOpenConfig(true)}
            title="Configure Quick Links"
          />
        </div>
      )}

      {error && <div className={styles.error}>{error}</div>}
      {!error && tree.length === 0 && (
        <div className={styles.empty}>No quick links configured.</div>
      )}

      {!error && tree.length > 0 && (
        <div className={styles.container}>
          {tree.map(node => renderSection(node))}
        </div>
      )}

      <ConfigurationPanel
        isOpen={openConfig}
        onDismiss={() => setOpenConfig(false)}
        context={props.context}
        listId={props.listId}
        listTitle={props.listTitle}
        updateProperty={props.updateProperty}
        onSaved={() => { 
          setOpenConfig(false);
          void load();
        }}
      />
    </div>
  );
};

export default QuickLinksHierarchy;