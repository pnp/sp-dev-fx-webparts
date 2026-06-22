import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Panel,
  PanelType,
  PrimaryButton,
  DefaultButton,
  Dropdown,
  IDropdownOption,
  Stack,
  MessageBar,
  MessageBarType,
  Label,
  Separator,
  ChoiceGroup,
  IChoiceGroupOption,
  TextField,
  IconButton,
  Spinner,
  SpinnerSize,
  Dialog,
  DialogType,
  DialogFooter,
  Toggle,
  Icon,
  TooltipHost
} from '@fluentui/react';
import { IListInfo, IProjectItem } from '../models/IProjectItem';
import { SPService } from '../services/SPService';
import RichTextEditor from './RichTextEditor';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IConfigurationPanelProps {
  isOpen: boolean;
  onDismiss: () => void;
  selectedListId: string;
  selectedListTitle: string;
  layoutMode: string;
  spService: SPService;
  context: WebPartContext;
  onSave: (
    selectedListId: string,
    selectedListTitle: string,
    layoutMode: string
  ) => void;
}

export const ConfigurationPanel: React.FC<IConfigurationPanelProps> = (props) => {
  const [availableLists, setAvailableLists] = useState<IListInfo[]>([]);
  const [selectedListId, setSelectedListId] = useState<string>(props.selectedListId);
  const [selectedListTitle, setSelectedListTitle] = useState<string>(props.selectedListTitle);
  const [layoutMode, setLayoutMode] = useState<string>(props.layoutMode || 'card');
  
  const [projects, setProjects] = useState<IProjectItem[]>([]);
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
  const [editingProjects, setEditingProjects] = useState<Map<number, IProjectItem>>(new Map());
  
  const [message, setMessage] = useState<{ text: string; type: MessageBarType } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [projectToDelete, setProjectToDelete] = useState<IProjectItem | null>(null);
  const [currentStep, setCurrentStep] = useState<'settings' | 'projects'>('settings');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [draggedIsActive, setDraggedIsActive] = useState<boolean>(true);

  const activeProjects = projects
    .filter(p => p.Active !== false)
    .sort((a, b) => (a.SortOrder || 0) - (b.SortOrder || 0));
  
  const inactiveProjects = projects
    .filter(p => p.Active === false)
    .sort((a, b) => (a.SortOrder || 0) - (b.SortOrder || 0));

  const loadLists = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const lists = await props.spService.getLists();
      setAvailableLists(lists);
    } catch (err) {
      setMessage({ text: 'Error loading lists', type: MessageBarType.error });
      console.error('Error loading lists:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadProjects = async (): Promise<void> => {
    if (!selectedListId) {
      setProjects([]);
      return;
    }

    try {
      setIsLoading(true);
      await props.spService.ensureColumns(selectedListId);
      const items = await props.spService.getListItems(selectedListId);
      setProjects(items);
    } catch (err) {
      setMessage({ text: 'Error loading projects', type: MessageBarType.error });
      console.error('Error loading projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (props.isOpen) {
      loadLists().catch(console.error);
      setCurrentStep('settings');
      setExpandedProjectId(null);
      setEditingProjects(new Map());
    }
  }, [props.isOpen]);

  useEffect(() => {
    setSelectedListId(props.selectedListId);
    setSelectedListTitle(props.selectedListTitle);
    setLayoutMode(props.layoutMode || 'card');
  }, [props.selectedListId, props.selectedListTitle, props.layoutMode]);

  const handleListChange = (event: React.FormEvent, option?: IDropdownOption): void => {
    if (option) {
      setSelectedListId(option.key as string);
      setSelectedListTitle(option.text);
    }
  };

  const handleNextToProjects = async (): Promise<void> => {
    if (!selectedListId) {
      setMessage({ text: 'Please select a list', type: MessageBarType.error });
      return;
    }

    setMessage(null);
    await loadProjects();
    setCurrentStep('projects');
  };

  const handleBackToSettings = (): void => {
    setCurrentStep('settings');
    setMessage(null);
  };

  const handleApplyConfiguration = (): void => {
    if (!selectedListId) {
      setMessage({ text: 'Please select a list', type: MessageBarType.error });
      return;
    }

    props.onSave(selectedListId, selectedListTitle, layoutMode);
    setMessage({ text: 'Configuration applied successfully!', type: MessageBarType.success });
    
    setTimeout(() => {
      props.onDismiss();
      setMessage(null);
    }, 1500);
  };

  const handleAddNew = (): void => {
    const maxSortOrder = projects.length > 0 
      ? Math.max(...projects.map(p => p.SortOrder || 0))
      : 0;
    
    const newProject: IProjectItem = {
      Id: -Date.now(), // Temporary negative ID for new items
      Title: '',
      Description: '',
      Active: true,
      SortOrder: maxSortOrder + 1
    };

    setProjects([newProject, ...projects]);
    setExpandedProjectId(newProject.Id!);
    
    const newMap = new Map<number, IProjectItem>();
    editingProjects.forEach((value, key) => newMap.set(key, value));
    newMap.set(newProject.Id!, newProject);
    setEditingProjects(newMap);
  };

  const toggleExpand = (projectId: number): void => {
    if (expandedProjectId === projectId) {
      setExpandedProjectId(null);
    } else {
      setExpandedProjectId(projectId);
      // Initialize editing state for this project
      const project = projects.find(p => p.Id === projectId);
      if (project && !editingProjects.has(projectId)) {
        const newMap = new Map<number, IProjectItem>();
        editingProjects.forEach((value, key) => newMap.set(key, value));
        newMap.set(projectId, { ...project });
        setEditingProjects(newMap);
      }
    }
  };

  const updateEditingProject = <K extends keyof IProjectItem>(
  projectId: number,
  field: K,
  value: IProjectItem[K]
): void => {
    const newMap = new Map<number, IProjectItem>();
    editingProjects.forEach((val, key) => newMap.set(key, val));
    const current = newMap.get(projectId);
    if (current) {
      newMap.set(projectId,  { ...current, [field]: value });
      setEditingProjects(newMap);
    }
  };

  const handleSaveProject = async (projectId: number): Promise<void> => {
    const editedProject = editingProjects.get(projectId);
    
    if (!editedProject || !editedProject.Title?.trim()) {
      setMessage({ text: 'Project title is required', type: MessageBarType.error });
      return;
    }

    if (!selectedListId) {
      setMessage({ text: 'Please select a list first', type: MessageBarType.error });
      return;
    }

    try {
      setIsLoading(true);

      const isNew = projectId < 0;

      if (isNew) {
        //const { Id, ...projectData } = editedProject;
        const { ...projectData } = editedProject;
        await props.spService.addListItem(selectedListId, projectData);
        setMessage({ text: 'Item created successfully', type: MessageBarType.success });
      } else {
        await props.spService.updateListItem(selectedListId, editedProject);
        setMessage({ text: 'Item updated successfully', type: MessageBarType.success });
      }

      await loadProjects();
      setExpandedProjectId(null);
      
      const newMap = new Map<number, IProjectItem>();
      editingProjects.forEach((value, key) => {
        if (key !== projectId) newMap.set(key, value);
      });
      setEditingProjects(newMap);
      
    } catch (err) {
      setMessage({ text: 'Error saving item', type: MessageBarType.error });
      console.error('Error saving item:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = (projectId: number): void => {
    const isNew = projectId < 0;
    
    if (isNew) {
      // Remove the new item from the list
      setProjects(projects.filter(p => p.Id !== projectId));
    }
    
    setExpandedProjectId(null);
    const newMap = new Map<number, IProjectItem>();
    editingProjects.forEach((value, key) => {
      if (key !== projectId) newMap.set(key, value);
    });
    setEditingProjects(newMap);
  };

  const handleDeleteProject = (project: IProjectItem): void => {
    setProjectToDelete(project);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async (): Promise<void> => {
    if (!projectToDelete || !selectedListId) return;

    // If it's a new unsaved item
    if (projectToDelete.Id! < 0) {
      setProjects(projects.filter(p => p.Id !== projectToDelete.Id));
      setShowDeleteDialog(false);
      setProjectToDelete(null);
      return;
    }

    try {
      setIsLoading(true);
      await props.spService.deleteListItem(selectedListId, projectToDelete.Id!);
      await loadProjects();
      setMessage({ text: 'Item deleted successfully', type: MessageBarType.success });
      setShowDeleteDialog(false);
      setProjectToDelete(null);
    } catch (err) {
      setMessage({ text: 'Error deleting item', type: MessageBarType.error });
      console.error('Error deleting item:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragStart = (index: number, isActive: boolean): void => {
    setDraggedIndex(index);
    setDraggedIsActive(isActive);
  };

  const handleDragOver = (e: React.DragEvent): void => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number, isActive: boolean): Promise<void> => {
    e.preventDefault();
    
    if (draggedIndex === null || (draggedIndex === dropIndex && draggedIsActive === isActive)) {
      setDraggedIndex(null);
      return;
    }

    // Don't allow dragging between active and inactive
    if (draggedIsActive !== isActive) {
      setDraggedIndex(null);
      setMessage({ text: 'Cannot reorder between active and inactive items', type: MessageBarType.warning });
      return;
    }

    try {
      setIsLoading(true);
      
      const itemsToReorder = isActive ? [...activeProjects] : [...inactiveProjects];
      const [draggedItem] = itemsToReorder.splice(draggedIndex, 1);
      itemsToReorder.splice(dropIndex, 0, draggedItem);

      // Update sort orders
      const updates = itemsToReorder.map((project, index) => ({
        id: project.Id!,
        sortOrder: index + 1
      }));

      await props.spService.batchUpdateSortOrders(selectedListId, updates);
      await loadProjects();
      
      setMessage({ text: 'Sort order updated successfully', type: MessageBarType.success });
    } catch (err) {
      setMessage({ text: 'Error updating sort order', type: MessageBarType.error });
      console.error('Error updating sort order:', err);
    } finally {
      setIsLoading(false);
      setDraggedIndex(null);
    }
  };

  // const handleToggleActive = async (project: IProjectItem): Promise<void> => {
  //   try {
  //     setIsLoading(true);
      
  //     // Calculate new sort order - put at end of target section
  //     const targetProjects = !project.Active ? activeProjects : inactiveProjects;
  //     const newSortOrder = targetProjects.length > 0 
  //       ? Math.max(...targetProjects.map(p => p.SortOrder || 0)) + 1 
  //       : 1;

  //     const updatedProject: IProjectItem = {
  //       ...project,
  //       Active: !project.Active,
  //       SortOrder: newSortOrder
  //     };

  //     await props.spService.updateListItem(selectedListId, updatedProject);
  //     await loadProjects();
      
  //     setMessage({ 
  //       text: `Project ${updatedProject.Active ? 'activated' : 'deactivated'} successfully`, 
  //       type: MessageBarType.success 
  //     });
  //   } catch (err) {
  //     setMessage({ text: 'Error updating project status', type: MessageBarType.error });
  //     console.error('Error toggling active status:', err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const renderProjectItem = (project: IProjectItem, index: number, isActive: boolean): JSX.Element => {
    const isExpanded = expandedProjectId === project.Id;
    const editedProject = editingProjects.get(project.Id!) || project;
    const isDragging = draggedIndex === index && draggedIsActive === isActive;
    const isNew = project.Id! < 0;

    return (
      <div
        key={project.Id}
        draggable={!isExpanded}
        onDragStart={() => !isExpanded && handleDragStart(index, isActive)}
        onDragOver={handleDragOver}
        onDrop={(e) => !isExpanded && handleDrop(e, index, isActive)}
        style={{
          border: '2px solid #edebe9',
          borderRadius: '6px',
          background: isDragging ? '#deecf9' : '#ffffff',
          marginBottom: '8px',
          overflow: 'hidden',
          transition: 'all 0.2s ease',
          boxShadow: isDragging ? '0 4px 12px rgba(0,120,212,0.2)' : '0 1px 3px rgba(0,0,0,0.1)'
        }}
      >
        {/* Header */}
        <Stack
          horizontal
          horizontalAlign="space-between"
          verticalAlign="center"
          style={{
            padding: '12px 16px',
            cursor: isExpanded ? 'default' : 'pointer',
            background: isExpanded ? '#f3f2f1' : '#fafafa',
            borderBottom: isExpanded ? '2px solid #edebe9' : 'none'
          }}
          onClick={() => !isExpanded && toggleExpand(project.Id!)}
        >
          <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="center" styles={{ root: { flex: 1 } }}>
            {!isExpanded && (
              <TooltipHost content="Drag to reorder">
                <Icon iconName="GripperDotsVertical" styles={{ root: { fontSize: 16, color: '#605e5c' } }} />
              </TooltipHost>
            )}
            
            <Icon 
              iconName={isExpanded ? 'ChevronDown' : 'ChevronRight'} 
              styles={{ root: { fontSize: 14, color: '#0078d4', cursor: 'pointer' } }}
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(project.Id!);
              }}
            />
            
            <Label styles={{ root: { fontWeight: 600, fontSize: 14, margin: 0, flex: 1 } }}>
              {isNew ? 'New Item' : `Item ${index + 1}: ${project.Title || 'Untitled'}`}
            </Label>

            {!isExpanded && (
              <div style={{
                padding: '3px 10px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: 600,
                background: project.Active ? '#d4edda' : '#f8d7da',
                color: project.Active ? '#155724' : '#721c24'
              }}>
                {project.Active ? 'Active' : 'Inactive'}
              </div>
            )}
          </Stack>

          <Stack horizontal tokens={{ childrenGap: 4 }}>
            {!isExpanded && (
              <TooltipHost content="Delete Item">
                <IconButton
                  iconProps={{ iconName: 'Delete' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProject(project);
                  }}
                  disabled={isLoading}
                  styles={{ root: { color: '#a4262c' } }}
                />
              </TooltipHost>
            )}
            
            {isExpanded && (
              <Toggle
                checked={editedProject.Active !== false}
                onChange={(e, checked) => updateEditingProject(project.Id!, 'Active', checked)}
                disabled={isLoading}
                onText=""
                offText=""
                styles={{ root: { marginRight: 8 } }}
              />
            )}
          </Stack>
        </Stack>

        {/* Expanded Content */}
        {isExpanded && (
          <div style={{ padding: '20px' }}>
            <Stack tokens={{ childrenGap: 15 }}>
              <TextField
                label="Title *"
                value={editedProject.Title}
                onChange={(e, newValue) => updateEditingProject(project.Id!, 'Title', newValue || '')}
                placeholder="Enter Item title"
                required
                disabled={isLoading}
                errorMessage={!editedProject.Title?.trim() ? 'Please enter a value for Title' : ''}
              />

              <Stack horizontal tokens={{ childrenGap: 15 }}>
                <TextField
                  label="Sort Order"
                  type="number"
                  value={(editedProject.SortOrder || 0).toString()}
                  onChange={(e, newValue) => updateEditingProject(project.Id!, 'SortOrder', parseInt(newValue || '0'))}
                  disabled={isLoading}
                  styles={{ root: { width: '120px' } }}
                />

                <Stack verticalAlign="end">
                  <Toggle
                    label="Status"
                    checked={editedProject.Active !== false}
                    onChange={(e, checked) => updateEditingProject(project.Id!, 'Active', checked)}
                    onText="Active"
                    offText="Inactive"
                    disabled={isLoading}
                  />
                </Stack>
              </Stack>

              <div>
                <Label>Description</Label>
                <RichTextEditor
                  value={editedProject.Description || ''}
                  onChange={(value) => updateEditingProject(project.Id!, 'Description', value)}
                  disabled={isLoading}
                  context={props.context}
                />
              </div>

              <Stack horizontal tokens={{ childrenGap: 10 }}>
                <PrimaryButton
                  text="Save"
                  onClick={() => handleSaveProject(project.Id!)}
                  disabled={isLoading || !editedProject.Title?.trim()}
                  iconProps={{ iconName: 'Save' }}
                />
                <DefaultButton
                  text="Cancel"
                  onClick={() => handleCancelEdit(project.Id!)}
                  disabled={isLoading}
                  iconProps={{ iconName: 'Cancel' }}
                />
                {!isNew && (
                  <DefaultButton
                    text="Delete"
                    onClick={() => handleDeleteProject(project)}
                    disabled={isLoading}
                    iconProps={{ iconName: 'Delete' }}
                    styles={{ root: { marginLeft: 'auto', color: '#a4262c' } }}
                  />
                )}
              </Stack>
            </Stack>
          </div>
        )}
      </div>
    );
  };

  const listOptions: IDropdownOption[] = availableLists.map(list => ({
    key: list.Id,
    text: list.Title
  }));

  const viewOptions: IChoiceGroupOption[] = [
    { 
      key: 'card', 
      text: 'Card View', 
      iconProps: { iconName: 'GridViewMedium' }
    },
    { 
      key: 'accordion', 
      text: 'Accordion View', 
      iconProps: { iconName: 'CollapseMenu' }
    }
  ];

  return (
    <Panel
      isOpen={props.isOpen}
      onDismiss={props.onDismiss}
      type={PanelType.large}
      headerText="Project Manager Configuration"
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

        <Stack horizontal tokens={{ childrenGap: 20 }} styles={{ root: { padding: '10px 0' } }}>
          <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: currentStep === 'settings' ? '#0078d4' : '#c8c6c4',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600
            }}>1</div>
            <Label styles={{ root: { fontWeight: currentStep === 'settings' ? 600 : 400 } }}>Settings</Label>
          </Stack>
          
          <div style={{ width: 40, height: 2, background: '#c8c6c4', alignSelf: 'center' }} />
          
          <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: currentStep === 'projects' ? '#0078d4' : '#c8c6c4',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600
            }}>2</div>
            <Label styles={{ root: { fontWeight: currentStep === 'projects' ? 600 : 400 } }}>Manage Items</Label>
          </Stack>
        </Stack>

        <Separator />

        {currentStep === 'settings' && (
          <Stack tokens={{ childrenGap: 20 }}>
            <Stack tokens={{ childrenGap: 10 }}>
              <Label>Data Source</Label>
              <Dropdown
                label="Select SharePoint List"
                selectedKey={selectedListId}
                onChange={handleListChange}
                placeholder="Choose a list"
                options={listOptions}
                required
                disabled={isLoading}
              />
              {selectedListId && (
                <MessageBar messageBarType={MessageBarType.info}>
                  Required columns: Title (Single line), Description (Multiple lines). Optional: Active (Yes/No), SortOrder (Number)
                </MessageBar>
              )}
            </Stack>

            <Separator />

            <Stack tokens={{ childrenGap: 10 }}>
              <Label>Display Settings</Label>
              <ChoiceGroup
                label="Choose View Mode"
                selectedKey={layoutMode}
                options={viewOptions}
                onChange={(e, option) => setLayoutMode(option?.key || 'card')}
              />
              
              <MessageBar messageBarType={MessageBarType.info}>
                <strong>Card View:</strong> Best for detailed project viewing<br />
                <strong>Accordion View:</strong> Space-efficient for many items
              </MessageBar>
            </Stack>

            <Separator />

            <Stack horizontal tokens={{ childrenGap: 10 }}>
              <PrimaryButton
                text="Next: Manage Items"
                onClick={handleNextToProjects}
                disabled={!selectedListId || isLoading}
                iconProps={{ iconName: 'Forward' }}
              />
            </Stack>
          </Stack>
        )}

        {currentStep === 'projects' && (
          <Stack tokens={{ childrenGap: 20 }}>
            <MessageBar messageBarType={MessageBarType.success}>
              <strong>Selected List:</strong> {selectedListTitle}<br />
              <strong>View Mode:</strong> {layoutMode === 'card' ? 'Card View' : 'Accordion View'}
            </MessageBar>

            <PrimaryButton
              text="+ Add New"
              onClick={handleAddNew}
              disabled={isLoading}
              styles={{ root: { maxWidth: '150px' } }}
            />

            {isLoading && (
              <Stack horizontalAlign="center" tokens={{ padding: 20 }}>
                <Spinner size={SpinnerSize.large} label="Processing..." />
              </Stack>
            )}

            {!isLoading && projects.length > 0 && (
              <Stack tokens={{ childrenGap: 20 }}>
                {/* Active Items Section */}
                {activeProjects.length > 0 && (
                  <Stack tokens={{ childrenGap: 10 }}>
                    <Label styles={{ root: { fontSize: 16, fontWeight: 600, color: '#323130' } }}>
                      Active Items
                    </Label>
                    <div>
                      {activeProjects.map((project, index) => renderProjectItem(project, index, true))}
                    </div>
                  </Stack>
                )}

                {/* Inactive Items Section */}
                {inactiveProjects.length > 0 && (
                  <Stack tokens={{ childrenGap: 10 }}>
                    <Label styles={{ root: { fontSize: 16, fontWeight: 600, color: '#323130' } }}>
                      Inactive Items
                    </Label>
                    <div>
                      {inactiveProjects.map((project, index) => renderProjectItem(project, index, false))}
                    </div>
                  </Stack>
                )}
              </Stack>
            )}

            {!isLoading && projects.length === 0 && (
              <MessageBar messageBarType={MessageBarType.info}>
                No items found. Click + Add New to create your first project.
              </MessageBar>
            )}

            <Separator />

            <Stack horizontal tokens={{ childrenGap: 10 }} horizontalAlign="space-between">
              <DefaultButton
                text="Back to Settings"
                onClick={handleBackToSettings}
                iconProps={{ iconName: 'Back' }}
              />
              <PrimaryButton
                text="Apply Configuration"
                onClick={handleApplyConfiguration}
                iconProps={{ iconName: 'Accept' }}
              />
            </Stack>
          </Stack>
        )}
      </Stack>

      <Dialog
        hidden={!showDeleteDialog}
        onDismiss={() => setShowDeleteDialog(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Delete Project',
          subText: `Are you sure you want to delete "${projectToDelete?.Title}"? This action cannot be undone.`
        }}
        modalProps={{ isBlocking: true }}
      >
        <DialogFooter>
          <PrimaryButton onClick={confirmDelete} text="Delete" disabled={isLoading} />
          <DefaultButton onClick={() => setShowDeleteDialog(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </Panel>
  );
};