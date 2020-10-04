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
import { IPropertyPaneConfiguration, PropertyPaneSlider, PropertyPaneDropdown, PropertyPaneToggle, PropertyPaneLabel, PropertyPaneButton, PropertyPaneButtonType, IPropertyPaneField } from '@microsoft/sp-property-pane';
import * as strings from 'QuestionsWebPartStrings';
import BaseWebPart from 'webparts/BaseWebPart';
import DefaultContainerComponent, { IDefaultContainerProps } from './components/DefaultContainer/DefaultContainer';
import { IQuestionsWebPartProps } from './IQuestionsWebPartProps';
import { PermissionService } from '../../services/permission.service';
import { ThemeProvider, IReadonlyTheme, ThemeChangedEventArgs } from '@microsoft/sp-component-base';
import { UserService } from 'services/user.service';

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

  public render(): void {
    let queryParms = new URLSearchParams(window.location.search);
    let questionId: any;
    if(queryParms.has(Parameters.QUESTIONID)) {
      questionId = Number(queryParms.get(Parameters.QUESTIONID));
    }
    else {
      questionId = null;
    }

    const containerComponent: React.ReactElement<IDefaultContainerProps> = React.createElement(
      DefaultContainerComponent,
      {
        selectedQuestionId: questionId ,
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
      this.store.dispatch(getPagedQuestions(false));
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
      strings.PropertyPane_Label_CanVisitorsAskQuestionsDetails : strings.PropertyPane_Label_CanVisitorsAskQuestionsDisabled;


    let layoutGroupFields: IPropertyPaneField<any>[] = [];
    let permissionGroupFields: IPropertyPaneField<any>[] = [];
    let aboutGroupFields: IPropertyPaneField<any>[] = [];

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
      this.properties.webPartRenderMode !== WebPartRenderMode.AnsweredQuestions) {
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
      label: strings.PropertyPane_Lable_CanVisitorsAskQuestions,
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
      text: strings.PropertyPane_Label_VersionInfo + this.manifest.version
    }));



    let config: IPropertyPaneConfiguration = {
      pages: [
        {
          header: {
            description: strings.PropertyPane_Description
          },
          groups: [
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
