import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';
import {
  Panel, PanelType, Stack, PrimaryButton, DefaultButton, Dropdown,
  IDropdownOption, TextField, Checkbox, MessageBar, MessageBarType,
  Icon, IconButton, Label, Separator
} from '@fluentui/react';
import { SPService } from '../services/SPService';
import { IQuickLink } from '../models/IQuickLink';
import styles from './ConfigurationPanel.module.scss';
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface Props {
  isOpen: boolean;
  onDismiss: () => void;
  onSaved: () => void;
  context: WebPartContext;
  listId: string;
  listTitle: string;
  updateProperty: (v: { listId: string; listTitle: string }) => void;
}

export const ConfigurationPanel: React.FC<Props> = (props) => {
  const [sp] = useState(() => new SPService(props.context));
  const [lists, setLists] = useState<Array<{ id: string; title: string }>>([]);
  const [listId, setListId] = useState(props.listId);
  const [, setListTitle] = useState(props.listTitle);
  const [tree, setTree] = useState<IQuickLink[]>([]);
  const [flat, setFlat] = useState<IQuickLink[]>([]);
  const [selected, setSelected] = useState<IQuickLink | undefined>(undefined);
  const [edit, setEdit] = useState<IQuickLink | undefined>(undefined);
  const [msg, setMsg] = useState<{ text: string; type: MessageBarType } | undefined>(undefined);
  const [isListLocked, setIsListLocked] = useState<boolean>(!!props.listId);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const parentOptions: IDropdownOption[] = useMemo(() => {
    const opts: IDropdownOption[] = [{ key: 'none', text: 'None (Top Level)' }];
    flat.filter(f => f.id !== edit?.id).forEach(i => opts.push({ key: i.id, text: i.title }));
    return opts;
  }, [flat, edit?.id]);

  const loadLists = async (): Promise<void> => {
    const fetchedLists = await sp.getLists();
    setLists(fetchedLists);
  };

  const loadTree = async (): Promise<void> => {
    if (!listId) { 
      setTree([]);
      setFlat([]);
      return;
    }
    const t = await sp.getItemsTree(listId, true);
    setTree(t);
    const acc: IQuickLink[] = [];
    const walk = (n: IQuickLink[]): void => {
      n.forEach(i => {
        acc.push(i);
        if (i.children) {
          walk(i.children);
        }
      });
    };
    walk(t);
    setFlat(acc);
  };

  useEffect(() => {
    if (props.isOpen) {
      void loadLists();
      if (listId) {
        void loadTree();
      }
    }
  }, [props.isOpen]);

  const onSelectList = (_: React.FormEvent<HTMLDivElement>, opt?: IDropdownOption): void => {
    if (!opt) return;
    const newListId = String(opt.key);
    const newListTitle = String(opt.text);
    
    setListId(newListId);
    setListTitle(newListTitle);
    props.updateProperty({ listId: newListId, listTitle: newListTitle });
    setSelected(undefined);
    setEdit(undefined);
    setMsg(undefined);
    setIsListLocked(true);
    
    // Auto-refresh tree when list is selected
    void sp.getItemsTree(newListId, true).then(t => {
      setTree(t);
      const acc: IQuickLink[] = [];
      const walk = (n: IQuickLink[]): void => {
        n.forEach(i => {
          acc.push(i);
          if (i.children) {
            walk(i.children);
          }
        });
      };
      walk(t);
      setFlat(acc);
    });
  };

  const onPick = (i: IQuickLink): void => { 
    setSelected(i);
    setEdit({ ...i });
  };

  const onAdd = (parent?: IQuickLink): void => {
    setSelected(undefined);
    setEdit({
      id: `new_${Date.now()}`,
      title: '',
      url: '',
      iconName: 'Link',
      sortOrder: 0,
      openWith: 'New Tab',
      active: true,
      isHeader: false,
      parentId: parent?.id ?? undefined,
      children: []
    });
  };

  const onDelete = async (): Promise<void> => {
    if (!listId || !selected) return;
    if (!confirm(`Delete "${selected.title}"? (Children will remain orphaned)`)) return;
    await sp.deleteItem(listId, selected.id);
    setSelected(undefined);
    setEdit(undefined);
    await loadTree();
  };

  const showMessage = (text: string, type: MessageBarType): void => {
    setMsg({ text, type });
    setTimeout(() => setMsg(undefined), 4000);
  };

  const onSave = async (): Promise<void> => {
    if (!listId || !edit) return;
    if (isSaving) return;
    if (!edit.title) {
      showMessage('Title is required.', MessageBarType.error);
      return;
    }
    setIsSaving(true);

    try {
      const payload: IQuickLink = {
        ...edit,
        parentId: edit.parentId && edit.parentId !== 'none' ? edit.parentId : undefined
      };
      if (edit.id.startsWith('new_')) {
        await sp.addItem(listId, payload);
      } else {
        await sp.updateItem(listId, payload);
      }
      showMessage('Link saved successfully.', MessageBarType.success);
      await loadTree();
    } catch (error) {
      console.error(error);
      showMessage('Error saving link.', MessageBarType.error);
    } finally {
      setIsSaving(false);
    }
  };

  const Tree: React.FC<{ nodes: IQuickLink[]; level?: number }> = ({ nodes, level = 0 }) => {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    useEffect(() => {
      const allExpanded: Record<string, boolean> = {};
      nodes.forEach(n => {
        if (n.isHeader || n.children?.length) {
          allExpanded[n.id] = true;
        }
      });
      setExpanded(allExpanded);
    }, [nodes]);

    const toggle = (id: string): void => {
      setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
      <div className={styles.treeLevel} style={{ marginLeft: level > 0 ? 18 : 0 }}>
        {nodes.map(n => {
          const hasKids = !!n.children?.length;
          const isOpen = expanded[n.id];
          const iconName = n.isHeader ? 'FabricFolder' : 'Link';

          return (
            <div key={n.id} className={styles.treeNode}>
              <div
                className={`${styles.treeItem} ${selected?.id === n.id ? styles.treeSelected : ''}`}
                onClick={() => onPick(n)}
              >
                {hasKids ? (
                  <IconButton
                    iconProps={{ iconName: isOpen ? 'ChevronDown' : 'ChevronRight' }}
                    onClick={(e) => { e.stopPropagation(); toggle(n.id); }}
                    styles={{ root: { marginRight: 4 } }}
                  />
                ) : (
                  <span className={styles.treeSpacer} />
                )}

                <Icon
                  iconName={iconName}
                  className={n.isHeader ? styles.iconFolder : styles.iconLink}
                />
                <span className={styles.treeTitle}>{n.title}</span>
              </div>

              {hasKids && isOpen && (
                <div className={styles.treeChildren}>
                  <Tree nodes={n.children!} level={level + 1} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Panel
      isOpen={props.isOpen}
      onDismiss={props.onDismiss}
      type={PanelType.large}
      headerText="Quick Links Configuration"
      className={styles.panel}
    >
      <div className={styles.configWrapper}>
        {msg && (
          <MessageBar
            messageBarType={msg.type}
            className={styles.messageBar}
          >
            {msg.text}
          </MessageBar>
        )}

        <div className={styles.toolbar}>
          <Stack horizontal tokens={{ childrenGap: 8 }}>
            <PrimaryButton 
              text="Save Changes" 
              onClick={() => void onSave()} 
              disabled={isSaving}
              iconProps={{ iconName: 'Save' }}
            />
            <DefaultButton 
              text="Apply Configuration" 
              onClick={() => {
                props.onSaved();
                props.onDismiss();
              }}
              iconProps={{ iconName: 'CheckMark' }}
            />
            <DefaultButton 
              text="Refresh" 
              onClick={() => void loadTree()}
              iconProps={{ iconName: 'Refresh' }}
            />
            <DefaultButton 
              text="Cancel" 
              onClick={props.onDismiss}
              iconProps={{ iconName: 'Cancel' }}
            />
          </Stack>

          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 4 }}>
            <Dropdown
              label=""
              placeholder="Select List"
              selectedKey={listId}
              onChange={onSelectList}
              options={lists.map(l => ({ key: l.id, text: l.title }))}
              styles={{ root: { width: 220 } }}
              disabled={isListLocked}
            />
            {isListLocked && (
              <IconButton
                iconProps={{ iconName: 'Edit' }}
                title="Edit List Selection"
                onClick={() => setIsListLocked(false)}
              />
            )}
          </Stack>
        </div>

        <Separator />

        <div className={styles.mainContainer}>
          <div className={styles.leftPane}>
            <Stack horizontal tokens={{ childrenGap: 8 }} className={styles.actionButtons}>
              <PrimaryButton 
                text="Add Parent" 
                onClick={() => onAdd()}
                iconProps={{ iconName: 'FabricFolder' }}
              />
              {selected && (
                <PrimaryButton 
                  text="Add Child" 
                  onClick={() => onAdd(selected)}
                  iconProps={{ iconName: 'Link' }}
                />
              )}
              {selected && (
                <DefaultButton 
                  text="Delete" 
                  onClick={() => void onDelete()}
                  iconProps={{ iconName: 'Delete' }}
                  styles={{ root: { color: '#a4262c' } }}
                />
              )}
            </Stack>
            <Separator />
            <div className={styles.treeContainer}>
              <Tree nodes={tree} />
            </div>
          </div>

          <div className={styles.rightPane}>
            <Label className={styles.formLabel}>Link Details</Label>
            {!edit && <MessageBar>Select a link or click Add.</MessageBar>}
            {edit && (
              <div className={styles.formGroup}>
                <TextField
                  label="Link Label"
                  value={edit.title}
                  required
                  onChange={(_, v) => setEdit({ ...edit!, title: v || '' })}
                />
                <TextField
                  label="Link URL"
                  value={edit.url || ''}
                  onChange={(_, v) => setEdit({ ...edit!, url: v || '' })}
                  placeholder="https://..."
                  disabled={edit.isHeader}
                />
                <Checkbox
                  label="Active"
                  checked={edit.active}
                  onChange={(_, c) => setEdit({ ...edit!, active: !!c })}
                />
                <Checkbox
                  label="Is Header (no URL)"
                  checked={edit.isHeader}
                  onChange={(_, c) => setEdit({ ...edit!, isHeader: !!c, url: c ? '' : edit.url })}
                />
                <Dropdown
                  label="Open With"
                  selectedKey={edit.openWith}
                  options={[
                    { key: 'Same Window', text: 'Same Window' },
                    { key: 'New Tab', text: 'New Tab' }
                  ]}
                  onChange={(_, o) =>
                    setEdit({ ...edit!, openWith: o?.key as 'Same Window' | 'New Tab' })
                  }
                />
                <TextField
                  label="Icon"
                  value={edit.iconName || 'Link'}
                  onChange={(_, v) => setEdit({ ...edit!, iconName: v || 'Link' })}
                />
                <Dropdown
                  label="Parent Link"
                  selectedKey={edit.parentId || 'none'}
                  options={parentOptions}
                  onChange={(_, o) => setEdit({
                    ...edit!,
                    parentId: o?.key === 'none' ? undefined : (o!.key as string)
                  })}
                />
                <TextField
                  label="Sort Order"
                  type="number"
                  value={String(edit.sortOrder || 0)}
                  onChange={(_, v) => setEdit({ ...edit!, sortOrder: parseInt(v || '0', 10) })}
                />
                <TextField
                  label="Description"
                  value={edit.description || ''}
                  multiline
                  rows={3}
                  onChange={(_, v) => setEdit({ ...edit!, description: v || '' })}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Panel>
  );
};