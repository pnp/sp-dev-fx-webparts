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
  DialogFooter
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
}

export class TemplateGallery extends React.Component<ITemplateGalleryProps, ITemplateGalleryState> {
  private _templateService: TemplateService;

  constructor(props: ITemplateGalleryProps) {
    super(props);

    this._templateService = new TemplateService(props.context);

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
      operationInProgress: false
    };
  }

  public componentDidMount(): void {
    this._searchTemplates();
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
          <Icon iconName="CustomList" className={styles.emptyIcon} />
          <Text variant="xLarge" className={styles.emptyTitle}>No templates found</Text>
          <Text className={styles.emptyText}>
            Try adjusting your search criteria or browse by category.
          </Text>
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
            <Icon iconName={template.icon || 'CustomList'} />
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
      description: param.helpText,
      placeholder: param.placeholder,
      onChange: (ev: any, newValue: any) => this._onParameterChanged(param.name, newValue)
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
          <div>
            {/* Checkbox implementation would go here */}
          </div>
        );
      
      default:
        return (
          <div>
            {/* TextField implementation would go here */}
          </div>
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
}