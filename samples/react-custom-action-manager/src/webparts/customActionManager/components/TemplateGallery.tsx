import * as React from 'react';
import {
  Stack,
  Text,
  SearchBox,
  Dropdown,
  IDropdownOption,
  CommandBar,
  ICommandBarItemProps,
  DetailsList,
  IColumn,
  SelectionMode,
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize,
  Panel,
  PanelType,
  PrimaryButton,
  DefaultButton,
  Icon,
  Rating,
  RatingSize,
  Persona,
  PersonaSize,
  TooltipHost,
  Pivot,
  PivotItem,
  DocumentCard,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardDetails,
  DocumentCardActions,
  ActionButton,
  DetailsListLayoutMode,
  ConstrainMode,
  Dialog,
  DialogType,
  DialogFooter,
  TextField,
  Toggle,
  Checkbox,
  SpinButton,
  Label,
  Separator,
  IconButton
} from '@fluentui/react';
import styles from './styles/TemplateGallery.module.scss';
import {
  ICustomActionTemplate,
  ITemplateSearchCriteria,
  ITemplateSearchResult,
  ITemplateFormData,
  ITemplateValidationResult,
  TemplateSortField,
  TemplateParameterType
} from '../../../models/ITemplate';
import { CustomActionScope } from '../../../models';
import { TemplateService } from '../../../services/TemplateService';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface ITemplateGalleryProps {
  context: WebPartContext;
  onTemplateSelected?: (template: ICustomActionTemplate, formData: ITemplateFormData) => void;
  onClose?: () => void;
  defaultScope?: CustomActionScope;
  targetSiteUrl?: string;
}

export interface ITemplateGalleryState {
  searchResult: ITemplateSearchResult;
  loading: boolean;
  error: string | null;
  searchCriteria: ITemplateSearchCriteria;
  selectedTemplate: ICustomActionTemplate | null;
  showTemplateDetails: boolean;
  showTemplateForm: boolean;
  templateFormData: ITemplateFormData;
  validationResult: ITemplateValidationResult | null;
  currentView: 'gallery' | 'list';
  operationInProgress: boolean;
  createTemplateForm: ICreateTemplateForm;
  savingTemplate: boolean;
}

export interface ICreateTemplateForm {
  name: string;
  description: string;
  category: string;
  tags: string;
  template: {
    title: string;
    description: string;
    location: string;
    sequence: number;
    scriptBlock: string;
    scriptSrc: string;
    url: string;
    commandUIExtension: string;
    registrationType: number;
    registrationId: string;
    rights: string;
    group: string;
    hostProperties: string;
    clientSideComponentId: string;
    clientSideComponentProperties: string;
    imageUrl: string;
  };
  requiredParameters: ITemplateParameterForm[];
  optionalParameters: ITemplateParameterForm[];
}

export interface ITemplateParameterForm {
  id: string;
  name: string;
  displayName: string;
  description: string;
  type: TemplateParameterType;
  required: boolean;
  defaultValue: string;
  placeholder: string;
  helpText: string;
  validation: {
    pattern: string;
    minLength: number;
    maxLength: number;
    min: number;
    max: number;
  };
}

export class TemplateGallery extends React.Component<ITemplateGalleryProps, ITemplateGalleryState> {
  private _templateService: TemplateService;

  constructor(props: ITemplateGalleryProps) {
    super(props);

    this._templateService = new TemplateService(props.context, props.targetSiteUrl);

    this.state = {
      searchResult: {
        templates: [],
        totalCount: 0,
        categories: [],
        tags: [],
        authors: []
      },
      loading: true,
      error: null,
      searchCriteria: {
        searchTerm: '',
        category: [],
        tags: [],
        author: [],
        isBuiltIn: null,
        minRating: 0,
        sortBy: TemplateSortField.Rating,
        sortDirection: 'desc'
      },
      selectedTemplate: null,
      showTemplateDetails: false,
      showTemplateForm: false,
      templateFormData: {},
      validationResult: null,
      currentView: 'gallery',
      operationInProgress: false,
      createTemplateForm: this._getEmptyTemplateForm(),
      savingTemplate: false
    };
  }

  public componentDidMount(): void {
    this._searchTemplates();
  }

  public componentDidUpdate(prevProps: ITemplateGalleryProps): void {
    if (prevProps.targetSiteUrl !== this.props.targetSiteUrl) {
      this._templateService.setTargetSite(this.props.targetSiteUrl);
      this._searchTemplates();
    }
  }

  public render(): React.ReactElement<ITemplateGalleryProps> {
    const { 
      searchResult, 
      loading, 
      error, 
      currentView, 
      showTemplateDetails, 
      showTemplateForm, 
      selectedTemplate 
    } = this.state;

    return (
      <div className={styles.templateGallery}>
        <div className={styles.header}>
          <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
            <Text variant="xLarge" className={styles.title}>Template Gallery</Text>
            <DefaultButton 
              iconProps={{ iconName: 'Cancel' }} 
              onClick={this.props.onClose}
              text="Close"
            />
          </Stack>
        </div>

        {error && (
          <MessageBar messageBarType={MessageBarType.error} onDismiss={this._clearError}>
            {error}
          </MessageBar>
        )}

        <Pivot defaultSelectedKey="browse">
          <PivotItem headerText="Browse Templates" itemKey="browse">
            <div className={styles.toolbar}>
              {this._renderToolbar()}
            </div>

            <div className={styles.content}>
              <Stack horizontal tokens={{ childrenGap: 20 }}>
                <Stack.Item grow={1}>
                  {loading ? this._renderLoading() : this._renderTemplates()}
                </Stack.Item>
              </Stack>
            </div>
          </PivotItem>

          <PivotItem headerText="Create Template" itemKey="create">
            <div className={styles.content} style={{ marginTop: '16px' }}>
              {this._renderCreateTemplateForm()}
            </div>
          </PivotItem>
        </Pivot>

        {showTemplateDetails && selectedTemplate && (
          <Panel
            headerText={selectedTemplate.name}
            isOpen={true}
            onDismiss={this._hideTemplateDetails}
            type={PanelType.largeFixed}
            isFooterAtBottom={true}
          >
            {this._renderTemplateDetails(selectedTemplate)}
          </Panel>
        )}

        {showTemplateForm && selectedTemplate && (
          <Dialog
            hidden={false}
            onDismiss={this._hideTemplateForm}
            dialogContentProps={{
              type: DialogType.largeHeader,
              title: `Create from ${selectedTemplate.name}`,
              subText: selectedTemplate.description
            }}
            modalProps={{ isBlocking: true, className: styles.templateFormDialog }}
          >
            {this._renderTemplateForm(selectedTemplate)}
          </Dialog>
        )}
      </div>
    );
  }

  private _renderToolbar = (): React.ReactElement => {
    const { searchCriteria, searchResult, currentView } = this.state;

    const sortOptions: IDropdownOption[] = [
      { key: TemplateSortField.Rating, text: 'Rating' },
      { key: TemplateSortField.UsageCount, text: 'Usage Count' },
      { key: TemplateSortField.Name, text: 'Name' },
      { key: TemplateSortField.CreatedDate, text: 'Created Date' },
      { key: TemplateSortField.Category, text: 'Category' }
    ];

    const categoryOptions: IDropdownOption[] = searchResult.categories.map(cat => ({
      key: cat.id,
      text: `${cat.name} (${cat.templateCount})`
    }));

    const viewOptions: IDropdownOption[] = [
      { key: 'gallery', text: 'Gallery View' },
      { key: 'list', text: 'List View' }
    ];

    return (
      <Stack tokens={{ childrenGap: 16 }}>
        <Stack horizontal tokens={{ childrenGap: 16 }} verticalAlign="center">
          <SearchBox
            placeholder="Search templates..."
            value={searchCriteria.searchTerm}
            onChange={this._onSearchChanged}
            className={styles.searchBox}
          />
          
          <Dropdown
            placeholder="All Categories"
            options={categoryOptions}
            multiSelect
            selectedKeys={searchCriteria.category}
            onChange={this._onCategoryFilterChanged}
            className={styles.filterDropdown}
          />

          <Dropdown
            placeholder="Sort by"
            options={sortOptions}
            selectedKey={searchCriteria.sortBy}
            onChange={this._onSortChanged}
            className={styles.sortDropdown}
          />

          <Dropdown
            placeholder="View"
            options={viewOptions}
            selectedKey={currentView}
            onChange={this._onViewChanged}
            className={styles.viewDropdown}
          />

          <Text variant="small" className={styles.resultsCount}>
            {searchResult.totalCount} templates
          </Text>
        </Stack>
      </Stack>
    );
  };

  private _renderLoading = (): React.ReactElement => {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size={SpinnerSize.large} label="Loading templates..." />
      </div>
    );
  };

  private _renderTemplates = (): React.ReactElement => {
    const { searchResult, currentView } = this.state;

    if (searchResult.templates.length === 0) {
      return (
        <div className={styles.emptyState}>
          <Stack horizontalAlign="center" verticalAlign="center" tokens={{ childrenGap: 16 }}>
            <Icon iconName="FabricFolder" className={styles.emptyIcon} />
            <Stack horizontalAlign="center" tokens={{ childrenGap: 8 }}>
              <Text variant="xLarge" className={styles.emptyTitle}>No templates found</Text>
              <Text className={styles.emptyText}>
                Try adjusting your search criteria or browse by category.
              </Text>
            </Stack>
          </Stack>
        </div>
      );
    }

    return currentView === 'gallery' ? this._renderGalleryView() : this._renderListView();
  };

  private _renderGalleryView = (): React.ReactElement => {
    const { searchResult } = this.state;

    return (
      <div className={styles.galleryGrid}>
        {searchResult.templates.map(template => (
          <DocumentCard
            key={template.id}
            className={styles.templateCard}
            onClick={() => this._showTemplateDetails(template)}
          >
            <DocumentCardPreview
              previewImages={[{
                name: template.name,
                linkProps: { href: '#' },
                previewImageSrc: template.icon,
                iconSrc: template.icon,
                width: 300,
                height: 200
              }]}
            />
            <DocumentCardDetails>
              <DocumentCardTitle
                title={template.name}
                shouldTruncate
              />
              <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
                <Rating
                  rating={template.rating}
                  readOnly
                  size={RatingSize.Small}
                />
                <Text variant="small" className={styles.ratingText}>
                  ({template.usageCount} uses)
                </Text>
              </Stack>
              <Text variant="small" className={styles.templateDescription}>
                {template.description}
              </Text>
              <Stack horizontal tokens={{ childrenGap: 4 }} className={styles.templateTags}>
                {template.tags.slice(0, 3).map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </Stack>
            </DocumentCardDetails>
            <DocumentCardActions
              actions={[
                {
                  iconProps: { iconName: 'View' },
                  onClick: (ev) => {
                    ev?.stopPropagation();
                    this._showTemplateDetails(template);
                  },
                  ariaLabel: 'View template details'
                },
                {
                  iconProps: { iconName: 'Add' },
                  onClick: (ev) => {
                    ev?.stopPropagation();
                    this._useTemplate(template);
                  },
                  ariaLabel: 'Use this template'
                }
              ]}
            />
          </DocumentCard>
        ))}
      </div>
    );
  };

  private _renderListView = (): React.ReactElement => {
    const { searchResult } = this.state;

    const columns: IColumn[] = [
      {
        key: 'name',
        name: 'Name',
        fieldName: 'name',
        minWidth: 200,
        maxWidth: 300,
        isResizable: true,
        onRender: (template: ICustomActionTemplate) => (
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
            <Icon iconName={template.icon || 'FabricFolder'} />
            <Text>{template.name}</Text>
            {template.isBuiltIn && (
              <span className={styles.builtInBadge}>Built-in</span>
            )}
          </Stack>
        )
      },
      {
        key: 'category',
        name: 'Category',
        fieldName: 'category',
        minWidth: 120,
        maxWidth: 150,
        isResizable: true
      },
      {
        key: 'rating',
        name: 'Rating',
        fieldName: 'rating',
        minWidth: 100,
        maxWidth: 120,
        onRender: (template: ICustomActionTemplate) => (
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
            <Rating
              rating={template.rating}
              readOnly
              size={RatingSize.Small}
            />
            <Text variant="small">({template.usageCount})</Text>
          </Stack>
        )
      },
      {
        key: 'author',
        name: 'Author',
        fieldName: 'author',
        minWidth: 120,
        maxWidth: 150,
        isResizable: true,
        onRender: (template: ICustomActionTemplate) => (
          <Persona
            text={template.author}
            size={PersonaSize.size24}
            hidePersonaDetails={false}
            showSecondaryText={false}
          />
        )
      },
      {
        key: 'description',
        name: 'Description',
        fieldName: 'description',
        minWidth: 250,
        isResizable: true,
        onRender: (template: ICustomActionTemplate) => (
          <TooltipHost content={template.description}>
            <Text>
              {template.description.length > 100
                ? `${template.description.substring(0, 100)}...`
                : template.description
              }
            </Text>
          </TooltipHost>
        )
      },
      {
        key: 'actions',
        name: 'Actions',
        minWidth: 100,
        maxWidth: 120,
        onRender: (template: ICustomActionTemplate) => (
          <Stack horizontal tokens={{ childrenGap: 4 }}>
            <ActionButton
              iconProps={{ iconName: 'View' }}
              title="View Details"
              onClick={() => this._showTemplateDetails(template)}
            />
            <ActionButton
              iconProps={{ iconName: 'Add' }}
              title="Use Template"
              onClick={() => this._useTemplate(template)}
            />
          </Stack>
        )
      }
    ];

    return (
      <DetailsList
        items={searchResult.templates}
        columns={columns}
        setKey="templates"
        layoutMode={DetailsListLayoutMode.justified}
        selectionMode={SelectionMode.none}
        constrainMode={ConstrainMode.unconstrained}
        onItemInvoked={this._showTemplateDetails}
        compact={false}
      />
    );
  };

  private _renderTemplateDetails = (template: ICustomActionTemplate): React.ReactElement => {
    return (
      <Stack tokens={{ childrenGap: 20 }}>
        <div className={styles.detailsCard}>
          <Stack tokens={{ childrenGap: 12 }}>
            <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
              <Text variant="xLarge">{template.name}</Text>
              <Stack horizontal tokens={{ childrenGap: 8 }}>
                {template.isBuiltIn && (
                  <span className={styles.builtInBadge}>Built-in</span>
                )}
                <Text variant="small">v{template.version}</Text>
              </Stack>
            </Stack>

            <Text>{template.description}</Text>

            <Stack horizontal tokens={{ childrenGap: 20 }}>
              <Stack tokens={{ childrenGap: 4 }}>
                <Text variant="small" styles={{ root: { fontWeight: 600 } }}>Category</Text>
                <Text variant="small">{template.category}</Text>
              </Stack>
              <Stack tokens={{ childrenGap: 4 }}>
                <Text variant="small" styles={{ root: { fontWeight: 600 } }}>Author</Text>
                <Persona
                  text={template.author}
                  size={PersonaSize.size32}
                  hidePersonaDetails={false}
                />
              </Stack>
              <Stack tokens={{ childrenGap: 4 }}>
                <Text variant="small" styles={{ root: { fontWeight: 600 } }}>Rating</Text>
                <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
                  <Rating rating={template.rating} readOnly />
                  <Text variant="small">({template.usageCount} uses)</Text>
                </Stack>
              </Stack>
            </Stack>

            <Stack tokens={{ childrenGap: 4 }}>
              <Text variant="small" styles={{ root: { fontWeight: 600 } }}>Tags</Text>
              <Stack horizontal wrap tokens={{ childrenGap: 4 }}>
                {template.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </div>

        <div className={styles.detailsCard}>
          <Stack tokens={{ childrenGap: 12 }}>
            <Text variant="large">Parameters</Text>
            
            {template.requiredParameters.length > 0 && (
              <Stack tokens={{ childrenGap: 8 }}>
                <Text variant="medium" styles={{ root: { fontWeight: 600 } }}>Required</Text>
                {template.requiredParameters.map(param => (
                  <div key={param.name} className={styles.parameterItem}>
                    <Text variant="small" styles={{ root: { fontWeight: 600 } }}>
                      {param.displayName}
                    </Text>
                    <Text variant="small">{param.description}</Text>
                    <Text variant="small" className={styles.parameterType}>
                      Type: {param.type}
                    </Text>
                  </div>
                ))}
              </Stack>
            )}

            {template.optionalParameters.length > 0 && (
              <Stack tokens={{ childrenGap: 8 }}>
                <Text variant="medium" styles={{ root: { fontWeight: 600 } }}>Optional</Text>
                {template.optionalParameters.map(param => (
                  <div key={param.name} className={styles.parameterItem}>
                    <Text variant="small" styles={{ root: { fontWeight: 600 } }}>
                      {param.displayName}
                    </Text>
                    <Text variant="small">{param.description}</Text>
                    <Text variant="small" className={styles.parameterType}>
                      Type: {param.type}
                    </Text>
                    {param.defaultValue && (
                      <Text variant="small" className={styles.defaultValue}>
                        Default: {param.defaultValue}
                      </Text>
                    )}
                  </div>
                ))}
              </Stack>
            )}
          </Stack>
        </div>

        <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 8 }}>
          <DefaultButton
            text="Close"
            onClick={this._hideTemplateDetails}
          />
          <PrimaryButton
            text="Use Template"
            onClick={() => this._useTemplate(template)}
          />
        </Stack>
      </Stack>
    );
  };

  private _renderTemplateForm = (template: ICustomActionTemplate): React.ReactElement => {
    const { templateFormData, validationResult } = this.state;
    const allParameters = [...template.requiredParameters, ...template.optionalParameters];

    return (
      <Stack tokens={{ childrenGap: 16 }}>
        {allParameters.map(param => (
          <div key={param.name}>
            {this._renderParameterInput(param, templateFormData[param.name])}
          </div>
        ))}

        {validationResult && !validationResult.isValid && (
          <MessageBar messageBarType={MessageBarType.error}>
            {validationResult.errors.join(', ')}
          </MessageBar>
        )}

        <DialogFooter>
          <PrimaryButton
            text="Create"
            onClick={this._handleCreateFromTemplate}
            disabled={this.state.operationInProgress}
          />
          <DefaultButton
            text="Cancel"
            onClick={this._hideTemplateForm}
            disabled={this.state.operationInProgress}
          />
        </DialogFooter>
      </Stack>
    );
  };

  private _renderParameterInput = (param: any, value: any): React.ReactElement => {
    const commonProps = {
      label: param.displayName + (param.required ? ' *' : ''),
      description: param.helpText || param.description,
      placeholder: param.placeholder,
      value: value || param.defaultValue || '',
      onChange: (ev: any, newValue: any) => this._onParameterChanged(param.name, newValue),
      required: param.required
    };

    switch (param.type) {
      case TemplateParameterType.Dropdown:
        return (
          <Dropdown
            {...commonProps}
            options={param.options || []}
            selectedKey={value}
          />
        );

      case TemplateParameterType.MultiSelect:
        return (
          <Dropdown
            {...commonProps}
            options={param.options || []}
            selectedKeys={value || []}
            multiSelect
          />
        );

      case TemplateParameterType.Boolean:
        return (
          <Toggle
            label={commonProps.label}
            onText="Yes"
            offText="No"
            checked={value === 'true' || value === true}
            onChange={(ev, checked) => this._onParameterChanged(param.name, checked)}
          />
        );

      case TemplateParameterType.Number:
        return (
          <TextField
            {...commonProps}
            type="number"
            value={value?.toString() || ''}
          />
        );

      case TemplateParameterType.Code:
        return (
          <TextField
            {...commonProps}
            multiline
            rows={6}
          />
        );

      default:
        return (
          <TextField
            {...commonProps}
            multiline={param.type === TemplateParameterType.Code}
            rows={param.type === TemplateParameterType.Code ? 6 : 1}
          />
        );
    }
  };

  private _searchTemplates = async (): Promise<void> => {
    this.setState({ loading: true, error: null });

    try {
      const searchResult = await this._templateService.searchTemplates(this.state.searchCriteria);
      this.setState({ searchResult, loading: false });
    } catch (error) {
      this.setState({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load templates'
      });
    }
  };

  private _onSearchChanged = (_: any, newValue?: string): void => {
    this.setState({
      searchCriteria: { ...this.state.searchCriteria, searchTerm: newValue || '' }
    }, this._searchTemplates);
  };

  private _onCategoryFilterChanged = (_: any, option?: IDropdownOption): void => {
    if (option) {
      const categories = option.selected
        ? [...this.state.searchCriteria.category, option.key as string]
        : this.state.searchCriteria.category.filter(c => c !== option.key);

      this.setState({
        searchCriteria: { ...this.state.searchCriteria, category: categories }
      }, this._searchTemplates);
    }
  };

  private _onSortChanged = (_: any, option?: IDropdownOption): void => {
    if (option) {
      this.setState({
        searchCriteria: { 
          ...this.state.searchCriteria, 
          sortBy: option.key as TemplateSortField 
        }
      }, this._searchTemplates);
    }
  };

  private _onViewChanged = (_: any, option?: IDropdownOption): void => {
    if (option) {
      this.setState({ currentView: option.key as 'gallery' | 'list' });
    }
  };

  private _showTemplateDetails = (template: ICustomActionTemplate): void => {
    this.setState({
      selectedTemplate: template,
      showTemplateDetails: true
    });
  };

  private _hideTemplateDetails = (): void => {
    this.setState({
      showTemplateDetails: false,
      selectedTemplate: null
    });
  };

  private _useTemplate = (template: ICustomActionTemplate): void => {
    this.setState({
      selectedTemplate: template,
      showTemplateForm: true,
      templateFormData: {},
      validationResult: null,
      showTemplateDetails: false
    });
  };

  private _hideTemplateForm = (): void => {
    this.setState({
      showTemplateForm: false,
      templateFormData: {},
      validationResult: null
    });
  };

  private _onParameterChanged = (paramName: string, value: any): void => {
    this.setState({
      templateFormData: {
        ...this.state.templateFormData,
        [paramName]: value
      }
    });
  };

  private _handleCreateFromTemplate = async (): Promise<void> => {
    const { selectedTemplate, templateFormData } = this.state;
    if (!selectedTemplate) return;

    this.setState({ operationInProgress: true });

    try {
      const validation = await this._templateService.validateTemplateData(selectedTemplate, templateFormData);
      
      if (!validation.isValid) {
        this.setState({ validationResult: validation, operationInProgress: false });
        return;
      }

      if (this.props.onTemplateSelected) {
        this.props.onTemplateSelected(selectedTemplate, templateFormData);
      }

      this.setState({
        showTemplateForm: false,
        operationInProgress: false,
        templateFormData: {},
        validationResult: null
      });

    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Failed to create from template',
        operationInProgress: false
      });
    }
  };

  private _clearError = (): void => {
    this.setState({ error: null });
  };

  private _getEmptyTemplateForm = (): ICreateTemplateForm => {
    return {
      name: '',
      description: '',
      category: '',
      tags: '',
      template: {
        title: '',
        description: '',
        location: 'ScriptLink',
        sequence: 1000,
        scriptBlock: '',
        scriptSrc: '',
        url: '',
        commandUIExtension: '',
        registrationType: 0,
        registrationId: '',
        rights: '',
        group: '',
        hostProperties: '',
        clientSideComponentId: '',
        clientSideComponentProperties: '',
        imageUrl: ''
      },
      requiredParameters: [],
      optionalParameters: []
    };
  };

  private _renderCreateTemplateForm = (): React.ReactElement => {
    const { createTemplateForm, savingTemplate } = this.state;

    return (
      <Stack tokens={{ childrenGap: 24 }}>
        <Stack tokens={{ childrenGap: 16 }}>
          <Text variant="xLarge">Create Custom Template</Text>
          <Text>Create a reusable template for custom actions. Define the basic structure and parameters that users can customize when using your template.</Text>
        </Stack>

        <Pivot defaultSelectedKey="basic">
          <PivotItem headerText="Basic Information" itemKey="basic">
            <Stack tokens={{ childrenGap: 16 }} style={{ marginTop: '16px' }}>
              <TextField
                label="Template Name"
                required
                value={createTemplateForm.name}
                onChange={(_, newValue) => this._updateTemplateForm('name', newValue || '')}
                placeholder="Enter a descriptive name for your template"
                description="This name will be displayed in the template gallery"
              />

              <TextField
                label="Description"
                required
                multiline
                rows={3}
                value={createTemplateForm.description}
                onChange={(_, newValue) => this._updateTemplateForm('description', newValue || '')}
                placeholder="Describe what this template does and when to use it"
                description="Help users understand the purpose and benefits of your template"
              />

              <TextField
                label="Category"
                required
                value={createTemplateForm.category}
                onChange={(_, newValue) => this._updateTemplateForm('category', newValue || '')}
                placeholder="e.g., Analytics, Navigation, Styling, Utilities"
                description="Category helps users find your template more easily"
              />

              <TextField
                label="Tags"
                value={createTemplateForm.tags}
                onChange={(_, newValue) => this._updateTemplateForm('tags', newValue || '')}
                placeholder="javascript, css, analytics, tracking (comma-separated)"
                description="Tags help users search and filter templates"
              />
            </Stack>
          </PivotItem>

          <PivotItem headerText="Custom Action Definition" itemKey="action">
            <Stack tokens={{ childrenGap: 16 }} style={{ marginTop: '16px' }}>
              <Text variant="large">Define the Custom Action Structure</Text>
              <Text>Configure the basic custom action that will be created from this template. Use placeholder syntax for values that users should customize.</Text>

              <TextField
                label="Action Title"
                required
                value={createTemplateForm.template.title}
                onChange={(_, newValue) => this._updateTemplateField('title', newValue || '')}
                placeholder="e.g., Analytics Tracking - {{siteName}}"
                description="Title for the custom action (supports parameters)"
              />

              <TextField
                label="Action Description"
                multiline
                rows={2}
                value={createTemplateForm.template.description}
                onChange={(_, newValue) => this._updateTemplateField('description', newValue || '')}
                placeholder="e.g., Adds {{trackingType}} tracking to all pages"
                description="Description for the custom action (supports parameters)"
              />

              <Dropdown
                label="Location"
                required
                selectedKey={createTemplateForm.template.location}
                options={[
                  { key: 'ScriptLink', text: 'ScriptLink' },
                  { key: 'Microsoft.SharePoint.StandardMenu', text: 'Site Actions Menu' },
                  { key: 'Microsoft.SharePoint.SiteSettings', text: 'Site Settings' },
                  { key: 'EditControlBlock', text: 'Edit Control Block' },
                  { key: 'CommandUI.Ribbon', text: 'Ribbon' }
                ]}
                onChange={(_, option) => this._updateTemplateField('location', option?.key as string || '')}
              />

              <Stack>
                <SpinButton
                  label="Sequence"
                  value={createTemplateForm.template.sequence.toString()}
                  min={0}
                  max={65536}
                  step={100}
                  onValidate={(value) => {
                    const numValue = parseInt(value, 10);
                    if (!isNaN(numValue)) {
                      this._updateTemplateField('sequence', numValue);
                    }
                    return value;
                  }}
                />
                <Text variant="small" style={{ color: '#666' }}>Lower numbers appear first in menus</Text>
              </Stack>

              <TextField
                label="Script Block"
                multiline
                rows={8}
                value={createTemplateForm.template.scriptBlock}
                onChange={(_, newValue) => this._updateTemplateField('scriptBlock', newValue || '')}
                placeholder="<script>&#10;// Your JavaScript code here&#10;// Use {{parameterName}} for dynamic values&#10;</script>"
                description="JavaScript code to execute (supports parameters)"
              />

              <TextField
                label="Script Source URL"
                value={createTemplateForm.template.scriptSrc}
                onChange={(_, newValue) => this._updateTemplateField('scriptSrc', newValue || '')}
                placeholder="{{scriptUrl}} or https://example.com/script.js"
                description="URL to external JavaScript file (supports parameters)"
              />

              <TextField
                label="URL"
                value={createTemplateForm.template.url}
                onChange={(_, newValue) => this._updateTemplateField('url', newValue || '')}
                placeholder="{{targetUrl}} or https://example.com"
                description="URL to navigate to (supports parameters)"
              />
            </Stack>
          </PivotItem>

          <PivotItem headerText="Required Parameters" itemKey="required">
            <Stack tokens={{ childrenGap: 16 }} style={{ marginTop: '16px' }}>
              <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                <Text variant="large">Required Parameters</Text>
                <PrimaryButton
                  iconProps={{ iconName: 'Add' }}
                  text="Add Required Parameter"
                  onClick={() => this._addParameter(true)}
                />
              </Stack>
              <Text>Define parameters that users must provide when using this template.</Text>

              {createTemplateForm.requiredParameters.map((param, index) => (
                <div key={param.id} style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '4px' }}>
                  {this._renderParameterForm(param, index, true)}
                </div>
              ))}

              {createTemplateForm.requiredParameters.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                  <Icon iconName="Info" style={{ fontSize: '24px', marginBottom: '8px' }} />
                  <div>No required parameters defined</div>
                  <div style={{ fontSize: '12px' }}>Required parameters must be filled by users</div>
                </div>
              )}
            </Stack>
          </PivotItem>

          <PivotItem headerText="Optional Parameters" itemKey="optional">
            <Stack tokens={{ childrenGap: 16 }} style={{ marginTop: '16px' }}>
              <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                <Text variant="large">Optional Parameters</Text>
                <DefaultButton
                  iconProps={{ iconName: 'Add' }}
                  text="Add Optional Parameter"
                  onClick={() => this._addParameter(false)}
                />
              </Stack>
              <Text>Define optional parameters with default values that users can customize.</Text>

              {createTemplateForm.optionalParameters.map((param, index) => (
                <div key={param.id} style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '4px' }}>
                  {this._renderParameterForm(param, index, false)}
                </div>
              ))}

              {createTemplateForm.optionalParameters.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                  <Icon iconName="Info" style={{ fontSize: '24px', marginBottom: '8px' }} />
                  <div>No optional parameters defined</div>
                  <div style={{ fontSize: '12px' }}>Optional parameters have default values</div>
                </div>
              )}
            </Stack>
          </PivotItem>
        </Pivot>

        <Separator />

        <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 8 }}>
          <DefaultButton
            text="Reset Form"
            onClick={this._resetTemplateForm}
            disabled={savingTemplate}
          />
          <PrimaryButton
            text="Save Template"
            iconProps={{ iconName: 'Save' }}
            onClick={this._saveTemplate}
            disabled={savingTemplate || !this._isTemplateFormValid()}
          />
        </Stack>

        {savingTemplate && (
          <MessageBar messageBarType={MessageBarType.info}>
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
              <Spinner size={SpinnerSize.small} />
              <Text>Saving template to SharePoint...</Text>
            </Stack>
          </MessageBar>
        )}
      </Stack>
    );
  };

  private _renderParameterForm = (param: ITemplateParameterForm, index: number, isRequired: boolean): React.ReactElement => {
    const parameterTypeOptions: IDropdownOption[] = [
      { key: TemplateParameterType.Text, text: 'Text' },
      { key: TemplateParameterType.Number, text: 'Number' },
      { key: TemplateParameterType.Boolean, text: 'Boolean (Yes/No)' },
      { key: TemplateParameterType.Url, text: 'URL' },
      { key: TemplateParameterType.Code, text: 'Code/Script' },
      { key: TemplateParameterType.Color, text: 'Color' },
      { key: TemplateParameterType.Date, text: 'Date' }
    ];

    return (
      <Stack tokens={{ childrenGap: 12 }}>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
          <Text variant="medium" style={{ fontWeight: '600' }}>
            {isRequired ? 'Required' : 'Optional'} Parameter #{index + 1}
          </Text>
          <IconButton
            iconProps={{ iconName: 'Delete' }}
            title="Remove parameter"
            onClick={() => this._removeParameter(param.id, isRequired)}
          />
        </Stack>

        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <Stack.Item grow={1}>
            <TextField
              label="Parameter Name"
              required
              value={param.name}
              onChange={(_, newValue) => this._updateParameter(param.id, 'name', newValue || '', isRequired)}
              placeholder="e.g., trackingId, backgroundColor"
              description="Internal name used in {{parameterName}} placeholders"
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <TextField
              label="Display Name"
              required
              value={param.displayName}
              onChange={(_, newValue) => this._updateParameter(param.id, 'displayName', newValue || '', isRequired)}
              placeholder="e.g., Tracking ID, Background Color"
              description="User-friendly name shown in the form"
            />
          </Stack.Item>
        </Stack>

        <TextField
          label="Description"
          multiline
          rows={2}
          value={param.description}
          onChange={(_, newValue) => this._updateParameter(param.id, 'description', newValue || '', isRequired)}
          placeholder="Explain what this parameter does and provide examples"
          description="Help text shown to users"
        />

        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <Stack.Item grow={1}>
            <Dropdown
              label="Type"
              required
              selectedKey={param.type}
              options={parameterTypeOptions}
              onChange={(_, option) => this._updateParameter(param.id, 'type', option?.key as TemplateParameterType, isRequired)}
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <TextField
              label="Default Value"
              value={param.defaultValue}
              onChange={(_, newValue) => this._updateParameter(param.id, 'defaultValue', newValue || '', isRequired)}
              placeholder="Default value for this parameter"
              description={isRequired ? "Required parameters can have defaults" : "Default value if user doesn't specify"}
            />
          </Stack.Item>
        </Stack>

        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <Stack.Item grow={1}>
            <TextField
              label="Placeholder"
              value={param.placeholder}
              onChange={(_, newValue) => this._updateParameter(param.id, 'placeholder', newValue || '', isRequired)}
              placeholder="Placeholder text for the input field"
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <TextField
              label="Help Text"
              value={param.helpText}
              onChange={(_, newValue) => this._updateParameter(param.id, 'helpText', newValue || '', isRequired)}
              placeholder="Additional guidance for users"
            />
          </Stack.Item>
        </Stack>
      </Stack>
    );
  };

  private _updateTemplateForm = (field: keyof ICreateTemplateForm, value: any): void => {
    this.setState({
      createTemplateForm: {
        ...this.state.createTemplateForm,
        [field]: value
      }
    });
  };

  private _updateTemplateField = (field: string, value: any): void => {
    this.setState({
      createTemplateForm: {
        ...this.state.createTemplateForm,
        template: {
          ...this.state.createTemplateForm.template,
          [field]: value
        }
      }
    });
  };

  private _addParameter = (isRequired: boolean): void => {
    const newParam: ITemplateParameterForm = {
      id: `param-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: '',
      displayName: '',
      description: '',
      type: TemplateParameterType.Text,
      required: isRequired,
      defaultValue: '',
      placeholder: '',
      helpText: '',
      validation: {
        pattern: '',
        minLength: 0,
        maxLength: 0,
        min: 0,
        max: 0
      }
    };

    const field = isRequired ? 'requiredParameters' : 'optionalParameters';
    this.setState({
      createTemplateForm: {
        ...this.state.createTemplateForm,
        [field]: [...this.state.createTemplateForm[field], newParam]
      }
    });
  };

  private _removeParameter = (paramId: string, isRequired: boolean): void => {
    const field = isRequired ? 'requiredParameters' : 'optionalParameters';
    this.setState({
      createTemplateForm: {
        ...this.state.createTemplateForm,
        [field]: this.state.createTemplateForm[field].filter(p => p.id !== paramId)
      }
    });
  };

  private _updateParameter = (paramId: string, field: string, value: any, isRequired: boolean): void => {
    const paramField = isRequired ? 'requiredParameters' : 'optionalParameters';
    const parameters = [...this.state.createTemplateForm[paramField]];
    const paramIndex = parameters.findIndex(p => p.id === paramId);

    if (paramIndex >= 0) {
      parameters[paramIndex] = {
        ...parameters[paramIndex],
        [field]: value
      };

      this.setState({
        createTemplateForm: {
          ...this.state.createTemplateForm,
          [paramField]: parameters
        }
      });
    }
  };

  private _isTemplateFormValid = (): boolean => {
    const { createTemplateForm } = this.state;

    // Check basic required fields
    if (!createTemplateForm.name.trim() ||
        !createTemplateForm.description.trim() ||
        !createTemplateForm.category.trim() ||
        !createTemplateForm.template.title.trim()) {
      return false;
    }

    // Check that all required parameters have names and display names
    for (const param of createTemplateForm.requiredParameters) {
      if (!param.name.trim() || !param.displayName.trim()) {
        return false;
      }
    }

    // Check that all optional parameters have names and display names
    for (const param of createTemplateForm.optionalParameters) {
      if (!param.name.trim() || !param.displayName.trim()) {
        return false;
      }
    }

    return true;
  };

  private _resetTemplateForm = (): void => {
    this.setState({ createTemplateForm: this._getEmptyTemplateForm() });
  };

  private _saveTemplate = async (): Promise<void> => {
    const { createTemplateForm } = this.state;

    this.setState({ savingTemplate: true, error: null });

    try {
      // Convert form data to template format
      const template: Omit<ICustomActionTemplate, 'id' | 'createdDate' | 'modifiedDate' | 'usageCount' | 'rating'> = {
        name: createTemplateForm.name,
        description: createTemplateForm.description,
        category: createTemplateForm.category,
        tags: createTemplateForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        author: this.props.context.pageContext.user.displayName,
        version: '1.0.0',
        isBuiltIn: false,
        isActive: true,
        defaultScope: this.props.defaultScope || CustomActionScope.Web,
        template: {
          Title: createTemplateForm.template.title,
          Description: createTemplateForm.template.description,
          Location: createTemplateForm.template.location,
          Sequence: createTemplateForm.template.sequence,
          ScriptBlock: createTemplateForm.template.scriptBlock,
          ScriptSrc: createTemplateForm.template.scriptSrc,
          Url: createTemplateForm.template.url,
          CommandUIExtension: createTemplateForm.template.commandUIExtension,
          RegistrationType: createTemplateForm.template.registrationType,
          RegistrationId: createTemplateForm.template.registrationId,
          Rights: createTemplateForm.template.rights,
          Group: createTemplateForm.template.group,
          HostProperties: createTemplateForm.template.hostProperties,
          ClientSideComponentId: createTemplateForm.template.clientSideComponentId,
          ClientSideComponentProperties: createTemplateForm.template.clientSideComponentProperties,
          ImageUrl: createTemplateForm.template.imageUrl
        },
        requiredParameters: createTemplateForm.requiredParameters.map(p => ({
          name: p.name,
          displayName: p.displayName,
          description: p.description,
          type: p.type,
          required: true,
          defaultValue: p.defaultValue,
          placeholder: p.placeholder,
          helpText: p.helpText,
          validation: {
            pattern: p.validation.pattern || undefined,
            minLength: p.validation.minLength || undefined,
            maxLength: p.validation.maxLength || undefined,
            min: p.validation.min || undefined,
            max: p.validation.max || undefined
          }
        })),
        optionalParameters: createTemplateForm.optionalParameters.map(p => ({
          name: p.name,
          displayName: p.displayName,
          description: p.description,
          type: p.type,
          required: false,
          defaultValue: p.defaultValue,
          placeholder: p.placeholder,
          helpText: p.helpText,
          validation: {
            pattern: p.validation.pattern || undefined,
            minLength: p.validation.minLength || undefined,
            maxLength: p.validation.maxLength || undefined,
            min: p.validation.min || undefined,
            max: p.validation.max || undefined
          }
        })),
        icon: 'FabricFolder',
        previewUrl: '',
        documentationUrl: ''
      };

      const result = await this._templateService.saveTemplate(template);

      if (result.success) {
        this.setState({
          createTemplateForm: this._getEmptyTemplateForm(),
          savingTemplate: false
        });

        // Refresh templates list
        await this._searchTemplates();

        // Show success message
        this.setState({
          error: null
        });
      } else {
        this.setState({
          error: result.message || null,
          savingTemplate: false
        });
      }

    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Failed to save template',
        savingTemplate: false
      });
    }
  };
}

export default TemplateGallery;
