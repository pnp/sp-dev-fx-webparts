import * as React from 'react';
import * as ReactDom from 'react-dom';
// redux related
import { Store } from 'redux';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import { updateThemeVariant, updateWebPartProperty, updateWebPartContext, updateWebPartDisplayMode, getPagedQuestions, getCurrentUser, updateShowQuestionsOption } from './redux/actions/actions';
import { IApplicationState } from './redux/reducers/appReducer';
// other
import { Parameters, SortOption, WebPartRenderMode, ShowQuestionsOption } from 'utilities';
import { IPropertyPaneConfiguration, PropertyPaneSlider, PropertyPaneDropdown, PropertyPaneToggle, PropertyPaneLabel, PropertyPaneButton, PropertyPaneButtonType, IPropertyPaneField  } from '@microsoft/sp-property-pane';
import { CategoryLabelComboBoxProperty } from './components/CategoryLabelComboBox/CategoryLabelComboBoxProperty';
import * as strings from 'QuestionsWebPartStrings';
import BaseWebPart from 'webparts/BaseWebPart';
import DefaultContainerComponent, { IDefaultContainerProps } from './components/DefaultContainer/DefaultContainer';
import { IQuestionsWebPartProps } from './IQuestionsWebPartProps';
import { PermissionService } from '../../services/permission.service';
import { ThemeProvider, IReadonlyTheme, ThemeChangedEventArgs } from '@microsoft/sp-component-base';
import { UserService } from 'services/user.service';
import { DisplayMode } from '@microsoft/sp-core-library';
// import to get 4 part version number
const packageSolution: any = require("../../../config/package-solution.json");

export default class QuestionsWebPart extends BaseWebPart<IQuestionsWebPartProps> {

  private store: Store<IApplicationState, any>;
  // private AppContext: React.Context<any>;

  private permissionService: PermissionService;
  private userService: UserService;
  private canVisitorsAskQuestions: boolean;
  protected themeProvider: ThemeProvider;
  protected themeVariant: IReadonlyTheme | undefined;

  protected onInit(): Promise<void> {
    this.store = configureStore();
    // this.AppContext = React.createContext({ store: this.store });

    // Consume the new ThemeProvider service
    this.themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    this.themeVariant = this.themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this.themeProvider.themeChangedEvent.add(this, this.handleThemeChangedEvent);

    return super.onInit().then(_ => {
      this.permissionService = new PermissionService();
      this.userService = new UserService();

      if (!this.properties.webPartRenderMode) {
        this.properties.webPartRenderMode = WebPartRenderMode.Standard;
      }

      // initialize the store with web part property values
      this.store.dispatch(updateWebPartProperty('webPartRenderMode', this.properties.webPartRenderMode));
      this.store.dispatch(updateWebPartProperty('pageSize', this.properties.pageSize));
      this.store.dispatch(updateWebPartProperty('hideViewAllButton', this.properties.hideViewAllButton));
      this.store.dispatch(updateWebPartProperty('showQuestionAnsweredDropDown', this.properties.showQuestionAnsweredDropDown));
      this.store.dispatch(updateWebPartProperty('loadInitialPage', this.properties.loadInitialPage));
      this.store.dispatch(updateWebPartProperty('sortOption', this.properties.sortOption));
      this.store.dispatch(updateWebPartProperty('applicationPage', this.properties.applicationPage));
      this.store.dispatch(updateWebPartProperty('title', this.properties.title));
      this.store.dispatch(updateWebPartProperty('useApplicationPage', this.properties.useApplicationPage));
      this.store.dispatch(updateWebPartProperty('category', this.properties.category));
      this.store.dispatch(updateWebPartProperty('showCategory', this.properties.showCategory));
      this.store.dispatch(updateWebPartProperty('stateLabel', this.properties.stateLabel));
      this.store.dispatch(updateWebPartProperty('discussionType', this.properties.discussionType));

      // initialize the store with web part context
      this.store.dispatch(updateWebPartContext(this.context));

      // initialize the store for the current user
      this.store.dispatch(getCurrentUser());

      // initialize the store with display mode
      this.store.dispatch(updateWebPartDisplayMode(this.displayMode));

      this.store.dispatch(updateThemeVariant(this.themeVariant));

      switch (this.properties.webPartRenderMode) {
        case WebPartRenderMode.OpenQuestions:
          this.store.dispatch(updateShowQuestionsOption(ShowQuestionsOption.Open));
          break;
        case WebPartRenderMode.AnsweredQuestions:
          this.store.dispatch(updateShowQuestionsOption(ShowQuestionsOption.Answered));
          break;
      }

    });
  }

  /*
   when page edit goes from edit to read we start a timer so that we can wait for the save to occur
   Things like the page title and page parent page property changing affect us
  */
  protected onDisplayModeChanged(oldDisplayMode: DisplayMode) {
    if (oldDisplayMode === DisplayMode.Edit) {
      this.store.dispatch(getPagedQuestions(false, this.properties.category));
    }
  }

  public render(): void {
    //Grab any query string params and set them as parameters for the Default Container
    let queryParms = new URLSearchParams(window.location.search);

    //Question ID
    let questionId: any;
    if(queryParms.has(Parameters.QUESTIONID)) {
      questionId = Number(queryParms.get(Parameters.QUESTIONID));
    }
    else {
      questionId = null;
    }
    //Category
    let category: any;
    if(queryParms.has(Parameters.CATEGORY)) {
      category = String(queryParms.get(Parameters.CATEGORY));
    }
    else {
      category = null;
    }

    const containerComponent: React.ReactElement<IDefaultContainerProps> = React.createElement(
      DefaultContainerComponent,
      {
        selectedQuestionId: questionId,
        selectedCategory: category,
        updateTitle: (value: string) => {
          this.properties.title = value;
        }
      }
    );

    const provider: React.ReactElement<any> = React.createElement(
      Provider, {
        store: this.store
      },
      containerComponent
    );

    /*
      <Provider store={store}>
        <DefaultContainerComponent {...} />
      </Provider>
    */
    ReactDom.render(provider, this.domElement);
  }

  private handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this.themeVariant = args.theme;
    this.store.dispatch(updateThemeVariant(this.themeVariant));
    this.render();
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any) {
    this.store.dispatch(updateWebPartProperty(propertyPath, newValue));

    if (propertyPath === 'pageSize' || propertyPath === 'sortOption' || propertyPath === 'loadInitialPage') {
      this.store.dispatch(getPagedQuestions(false, this.properties.category));
    }

    if (propertyPath === 'canVisitorsAskQuestions') {
      this.permissionService.toggleVisitorCanAskQuestions();
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  private async manageNotificationGroup(): Promise<void> {
    let notificationGroup = await this.userService.getNotificationGroup();
    if (!notificationGroup) {
      notificationGroup = await this.userService.createNotificationGroup();
    }

    window.open(`${this.context.pageContext.web.absoluteUrl}/_layouts/15/people.aspx?MembershipGroupId=${notificationGroup.Id}`, '_blank');
  }

  private async manageCategories(): Promise<void> {
    window.open(`${this.context.pageContext.web.absoluteUrl}/Lists/QuestionCategoryLabeling/AllItems.aspx`, '_blank');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const { currentUser } = this.store.getState();

    if (currentUser && currentUser.canManagePermissions && this.canVisitorsAskQuestions === undefined) {
      this.permissionService.canVisitorsAskQuestions().then(c => {
        this.canVisitorsAskQuestions = c;
        this.context.propertyPane.refresh();
      });
    }

    let showManageNotificationGroup: boolean = false;
    if (currentUser && currentUser.canManagePermissions) {
      showManageNotificationGroup = true;
    }

    let canVisitorsAskQuestionsDetails = currentUser && currentUser.canManagePermissions ?
      strings.PropertyPane_Label_CanVisitorsParticipateDetails : strings.PropertyPane_Label_CanVisitorsParticipateDisabled;

    let setupGroupFields: IPropertyPaneField<any>[] = [];
    let layoutGroupFields: IPropertyPaneField<any>[] = [];
    let permissionGroupFields: IPropertyPaneField<any>[] = [];
    let aboutGroupFields: IPropertyPaneField<any>[] = [];

    //Show in Standard, Application, OpenQuestions, AnsweredQuestions
    setupGroupFields.push(new CategoryLabelComboBoxProperty('category', {
      key: "CATEGORY PICKER",
      label: strings.PropertyPane_Label_Category,
      category: this.properties.category,
      showTooltip: true,
      tooltipText: "Either select a category from the drop down or type in the box and hit Enter to create a new category.",
      onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
      properties: this.properties,
      onRender: this.render.bind(this)
    }));
    if (currentUser && currentUser.canManagePermissions) {
      setupGroupFields.push(PropertyPaneButton('editCategories', {
        onClick: (value) => this.manageCategories(),
        text: "Manage Categories",
        buttonType: PropertyPaneButtonType.Normal
      }));
    }
    //Show in Standard, Application, OpenQuestions, AnsweredQuestions
    setupGroupFields.push(PropertyPaneToggle('showCategory', {
      label: strings.PropertyPane_Label_ShowCategory,
      onText: strings.PropertyPaneText_Yes,
      offText: strings.PropertyPaneText_No,
      checked: this.properties.showCategory
    }));

    // Show in Standard, Application, OpenQuestions, AnsweredQuestions
    layoutGroupFields.push(PropertyPaneSlider('pageSize', {
      label: strings.PropertyPane_Label_PageSize,
      min: 5,
      max: 50,
      step: 5,
      value: this.properties.pageSize,
      showValue: true
    }));
    // Show in Standard, Application, OpenQuestions, AnsweredQuestions
    layoutGroupFields.push(PropertyPaneDropdown('sortOption', {
      label: strings.PropertyPane_Label_SortOption,
      options: [
        {
          key: SortOption.Title,
          text: strings.PropertyPane_SortOption_Title,
        },
        {
          key: SortOption.MostRecent,
          text: strings.PropertyPane_SortOption_MostRecent
        },
        {
          key: SortOption.MostLiked,
          text: strings.PropertyPane_SortOption_MostLiked
        }
      ],
      selectedKey: this.properties.sortOption
    }));

    // Show in Standard, Application
    if (this.properties.webPartRenderMode !== WebPartRenderMode.OpenQuestions &&
      this.properties.webPartRenderMode !== WebPartRenderMode.AnsweredQuestions &&
      this.properties.webPartRenderMode !== WebPartRenderMode.ConversationsList) {
      layoutGroupFields.push(PropertyPaneToggle('loadInitialPage', {
        label: strings.PropertyPane_Label_LoadInitialPage,
        onText: strings.PropertyPaneText_Yes,
        offText: strings.PropertyPaneText_No,
        checked: this.properties.loadInitialPage
      }));
      layoutGroupFields.push(PropertyPaneToggle('hideViewAllButton', {
        label: strings.PropertyPane_Label_HideViewAllButton,
        onText: strings.PropertyPaneText_Yes,
        offText: strings.PropertyPaneText_No,
        checked: this.properties.hideViewAllButton
      }));
    }

    // Show in Standard, Application, OpenQuestions, AnsweredQuestions
    layoutGroupFields.push(PropertyPaneToggle('useApplicationPage', {
      label: strings.PropertyPane_Label_UseApplicationPage,
      onText: strings.PropertyPaneText_Yes,
      offText: strings.PropertyPaneText_No,
      checked: this.properties.useApplicationPage
    }));
    // Show in Standard, Application, OpenQuestions, AnsweredQuestions
    layoutGroupFields.push(PropertyPaneLabel('useApplicationPage', {
      text: strings.PropertyPane_Label_UseApplicationPageDetails
    }));

    //Permission Group Fields

    // Show in Standard, Application, OpenQuestions, AnsweredQuestions
    permissionGroupFields.push(PropertyPaneToggle('canVisitorsAskQuestions', {
      label: strings.PropertyPane_Label_CanVisitorsParticipate,
      checked: this.canVisitorsAskQuestions,
      onText: strings.PropertyPaneText_Yes,
      offText: strings.PropertyPaneText_No,
      disabled: !currentUser || !currentUser.canManagePermissions
    }));
    // Show in Standard, Application, OpenQuestions, AnsweredQuestions
    permissionGroupFields.push(PropertyPaneLabel('canVisitorsAskQuestions', {
      text: canVisitorsAskQuestionsDetails
    }));


    if (showManageNotificationGroup === true) {
      permissionGroupFields.push(PropertyPaneButton('notificationGroup', {
        text: strings.PropertyPage_ButtonText_ManageNotificationGroup,
        buttonType: PropertyPaneButtonType.Primary,
        onClick: (value) => this.manageNotificationGroup()
      }));
      permissionGroupFields.push(PropertyPaneLabel('notificationGroup', {
        text: strings.PropertyPage_Label_ManageNotificationGroupDetails
      }));

    }

    // Show in Standard, Application, OpenQuestions, AnsweredQuestions
    aboutGroupFields.push(PropertyPaneLabel('versionNumber', {
      text: strings.PropertyPane_Label_VersionInfo + packageSolution.solution.version
    }));



    let config: IPropertyPaneConfiguration = {
      pages: [
        {
          groups: [
            {
              groupName: strings.PropertyPane_GroupName_Setup,
              groupFields: setupGroupFields
            },
            {
              groupName: strings.PropertyPane_GroupName_LayoutSettings,
              groupFields: layoutGroupFields
            },
            {
              groupName: strings.PropertyPane_GroupName_Permissions,
              groupFields: permissionGroupFields
            },
            {
              groupName: strings.PropertyPane_GroupName_About,
              groupFields: aboutGroupFields
            },
          ]
        }
      ]
    };

    return config;
  }
}
