import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Panel,
  PanelType,
  PrimaryButton,
  DefaultButton,
  TextField,
  Dropdown,
  IDropdownOption,
  Stack,
  IconButton,
  MessageBar,
  MessageBarType,
  Label,
  Separator,
  Toggle
} from '@fluentui/react';
import { IQuickLink, IListInfo } from '../models/IQuickLink';
import { SPService } from '../services/SPService';

export interface IConfigurationPanelProps {
  isOpen: boolean;
  onDismiss: () => void;
  quickLinks: IQuickLink[];
  selectedListId: string;
  selectedListTitle: string;
  spService: SPService;
  onSave: (
    quickLinks: IQuickLink[],
    selectedListId: string,
    selectedListTitle: string
  ) => void;
}

export const ConfigurationPanel: React.FC<IConfigurationPanelProps> = (props) => {
  const [links, setLinks] = useState<IQuickLink[]>([...props.quickLinks]);
  const [availableLists, setAvailableLists] = useState<IListInfo[]>([]);
  const [selectedListId, setSelectedListId] = useState<string>(props.selectedListId);
  const [selectedListTitle, setSelectedListTitle] = useState<string>(props.selectedListTitle);
  const [editingLink, setEditingLink] = useState<IQuickLink | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; type: MessageBarType } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
   void loadLists();
  }, []);

  useEffect(() => {
    if (selectedListId) {
     void loadLinksFromList();
    }
  }, [selectedListId]);

  const loadLists = async (): Promise<void> => {
    try {
      const lists = await props.spService.getLists();
      setAvailableLists(lists);
    } catch {
      setMessage({ text: 'Error loading lists', type: MessageBarType.error });
    }
  };

  const loadLinksFromList = async (): Promise<void> => {
    if (!selectedListId) return;
    
    setIsLoading(true);
    try {
      const items = await props.spService.getListItems(selectedListId);
      setLinks(items);
      setMessage(null);
    } catch {
      setMessage({ text: 'Error loading links from list', type: MessageBarType.error });
    } finally {
      setIsLoading(false);
    }
  };

  const handleListChange = (event: React.FormEvent, option?: IDropdownOption): void => {
    if (option) {
      setSelectedListId(option.key as string);
      setSelectedListTitle(option.text);
    }
  };

  const handleAddNew = (): void => {
    setEditingLink({
      id: `new_${Date.now()}`,
      title: '',
      url: '',
      iconName: 'Link',
      description: '',
      sortOrder: links.length,
      openInNewWindow: true
    });
    setIsAddingNew(true);
  };

  const handleEdit = (link: IQuickLink): void => {
    setEditingLink({ ...link });
    setIsAddingNew(false);
  };

  const handleDelete = async (link: IQuickLink): Promise<void> => {
    if (!confirm(`Are you sure you want to delete "${link.title}"?`)) return;

    if (selectedListId && link.id.indexOf('new_') !== 0) {
      try {
        await props.spService.deleteListItem(selectedListId, link.id);
        setLinks(links.filter(l => l.id !== link.id));
        setMessage({ text: 'Link deleted successfully', type: MessageBarType.success });
      } catch {
        setMessage({ text: 'Error deleting link', type: MessageBarType.error });
      }
    } else {
      setLinks(links.filter(l => l.id !== link.id));
    }
  };

  const handleSaveLink = async (): Promise<void> => {
    if (!editingLink || !editingLink.title || !editingLink.url) {
      setMessage({ text: 'Title and URL are required', type: MessageBarType.error });
      return;
    }

    if (selectedListId) {
      try {
        if (isAddingNew) {
          const newLink = await props.spService.addListItem(selectedListId, editingLink);
          setLinks([...links, newLink]);
        } else {
          await props.spService.updateListItem(selectedListId, editingLink);
          setLinks(links.map(l => l.id === editingLink.id ? editingLink : l));
        }
        setMessage({ text: 'Link saved successfully', type: MessageBarType.success });
      } catch {
        setMessage({ text: 'Error saving link', type: MessageBarType.error });
        return;
      }
    }

    setEditingLink(null);
    setIsAddingNew(false);
  };

  const handleCancelEdit = (): void => {
    setEditingLink(null);
    setIsAddingNew(false);
  };

  const handleSaveConfiguration = (): void => {
    if (!selectedListId) {
      setMessage({ text: 'Please select a list', type: MessageBarType.error });
      return;
    }

    props.onSave(links, selectedListId, selectedListTitle);
    props.onDismiss();
  };

  const listOptions: IDropdownOption[] = availableLists.map(list => ({
    key: list.id,
    text: list.title
  }));

  return (
    <Panel
      isOpen={props.isOpen}
      onDismiss={props.onDismiss}
      type={PanelType.medium}
      headerText="Quick Links Configuration"
      closeButtonAriaLabel="Close"
    >
      <Stack tokens={{ childrenGap: 20 }}>
        {message && (
          <MessageBar
            messageBarType={message.type}
            onDismiss={() => setMessage(null)}
            dismissButtonAriaLabel="Close"
          >
            {message.text}
          </MessageBar>
        )}

        {/* List Selection */}
        <Stack tokens={{ childrenGap: 10 }}>
          <Dropdown
            label="Select SharePoint List"
            selectedKey={selectedListId}
            onChange={handleListChange}
            placeholder="Choose a list"
            options={listOptions}
            required
          />
          {selectedListId && (
            <MessageBar messageBarType={MessageBarType.info}>
              Make sure the list has these columns: Title, URL (Hyperlink), IconName (Single line)
            </MessageBar>
          )}
        </Stack>

        <Separator />

        {/* Links Management */}
        <Stack tokens={{ childrenGap: 10 }}>
          <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
            <Label>Quick Links</Label>
            <PrimaryButton
              text="Add New Link"
              iconProps={{ iconName: 'Add' }}
              onClick={handleAddNew}
              disabled={isLoading || editingLink !== null || !selectedListId}
            />
          </Stack>

          {isLoading ? (
            <MessageBar>Loading links...</MessageBar>
          ) : (
            <Stack tokens={{ childrenGap: 10 }}>
              {links.map(link => (
                <Stack
                  key={link.id}
                  horizontal
                  horizontalAlign="space-between"
                  verticalAlign="center"
                  styles={{
                    root: {
                      padding: 10,
                      border: '1px solid #edebe9',
                      borderRadius: 4
                    }
                  }}
                >
                  <Stack.Item grow>
                    <Stack tokens={{ childrenGap: 5 }}>
                      <strong>{link.title}</strong>
                      <span style={{ fontSize: 12, color: '#605e5c' }}>{link.url}</span>
                      <span style={{ fontSize: 11, color: '#a19f9d' }}>
                        Opens in: {link.openInNewWindow ? 'New Window' : 'Same Window'}
                      </span>
                    </Stack>
                  </Stack.Item>
                  <Stack horizontal tokens={{ childrenGap: 5 }}>
                    <IconButton
                      iconProps={{ iconName: 'Edit' }}
                      title="Edit"
                      onClick={() => handleEdit(link)}
                      disabled={editingLink !== null}
                    />
                    <IconButton
                      iconProps={{ iconName: 'Delete' }}
                      title="Delete"
                      onClick={() => handleDelete(link)}
                      disabled={editingLink !== null}
                    />
                  </Stack>
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>

        {/* Edit/Add Link Form */}
        {editingLink && (
          <>
            <Separator />
            <Stack tokens={{ childrenGap: 15 }}>
              <Label>{isAddingNew ? 'Add New Link' : 'Edit Link'}</Label>
              
              <TextField
                label="Title"
                value={editingLink.title}
                onChange={(e, val) => setEditingLink({ ...editingLink, title: val || '' })}
                required
              />
              
              <TextField
                label="URL"
                value={editingLink.url}
                onChange={(e, val) => setEditingLink({ ...editingLink, url: val || '' })}
                required
                placeholder="https://example.com"
              />
              
              <TextField
                label="Icon Name (Fluent UI)"
                value={editingLink.iconName}
                onChange={(e, val) => setEditingLink({ ...editingLink, iconName: val || 'Link' })}
                placeholder="Link, Globe, Document, etc."
              />
              
              <TextField
                label="Description"
                value={editingLink.description}
                onChange={(e, val) => setEditingLink({ ...editingLink, description: val || '' })}
                multiline
                rows={3}
              />
              
              <TextField
                label="Sort Order"
                type="number"
                value={editingLink.sortOrder?.toString() || '0'}
                onChange={(e, val) => setEditingLink({ ...editingLink, sortOrder: parseInt(val || '0') })}
              />

              <Toggle
                label="Open in New Window"
                checked={editingLink.openInNewWindow !== false}
                onChange={(e, checked) => setEditingLink({ ...editingLink, openInNewWindow: checked })}
                onText="Yes"
                offText="No"
              />

              <Stack horizontal tokens={{ childrenGap: 10 }}>
                <PrimaryButton text="Save Link" onClick={handleSaveLink} />
                <DefaultButton text="Cancel" onClick={handleCancelEdit} />
              </Stack>
            </Stack>
          </>
        )}

        <Separator />

        {/* Footer Buttons */}
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <PrimaryButton
            text="Save Configuration"
            onClick={handleSaveConfiguration}
            disabled={editingLink !== null}
          />
          <DefaultButton text="Cancel" onClick={props.onDismiss} />
        </Stack>
      </Stack>
    </Panel>
  );
};