import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';

import { IPropertyPaneConfiguration, PropertyPaneCheckbox, PropertyPaneSlider } from '@microsoft/sp-property-pane';
import * as microsoftTeams from '@microsoft/teams-js';
import * as strings from 'GraphCalendarWebPartStrings';
import { initializeIcons } from 'office-ui-fabric-react';
import GraphCalendar from './components/GraphCalendar';
import { IGraphCalendarProps } from './components/IGraphCalendarProps';

import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { IPropertyFieldGroupOrPerson, PrincipalType, PropertyFieldPeoplePicker } from '@pnp/spfx-property-controls';

export interface IGraphCalendarWebPartProps {
  limit: number;
  showRecurrence: boolean;
  group: IPropertyFieldGroupOrPerson[];
}

export default class GraphCalendarWebPart extends BaseClientSideWebPart<IGraphCalendarWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _teamsContext: microsoftTeams.app.Context;

  public render(): void {
    const element: React.ReactElement<IGraphCalendarProps> = React.createElement(
      GraphCalendar,
      {
        limit: this.properties.limit,
        showRecurrence: this.properties.showRecurrence,
        group: this.properties.group,
        isDarkTheme: this._isDarkTheme,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        context: this.context,
        teamsContext: this._teamsContext
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    // create a new promise
    return new Promise<void>((resolve, _reject) => {

      // Sets a default if limit has not been defined
      if (this.properties.limit === undefined) {
        this.properties.limit = 100;
      }

      if (this.properties.showRecurrence === undefined) {
        this.properties.showRecurrence = true;
      }

      // Sets the Teams context if in Teams
      if (this.context.sdks.microsoftTeams) {
        microsoftTeams.app.initialize().then(() => {
          microsoftTeams.app.getContext().then(context => {
            this._teamsContext = context;
          
            // Initialize the OUIF icons if in Teams
            initializeIcons();
            
            // resolve the promise
            resolve(undefined);
          });
        });
      } else {
        // resolve the promise
        resolve(undefined);
      }
    });
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneSlider('limit', {
                  label: strings.EventsPerView,
                  max: 500,
                  min: 50
                }),
                PropertyPaneCheckbox('showRecurrence', {
                  text: strings.ShowRecurringEvents,
                  checked: true
                }),
                PropertyFieldPeoplePicker('group', {
                  label: 'Group',
                  initialData: this.properties.group,
                  allowDuplicate: false,
                  multiSelect: false,
                  principalType: [PrincipalType.Security],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context as any,
                  properties: this.properties,
                  onGetErrorMessage: (value) => {
                    return '';
                  },
                  deferredValidationTime: 0,
                  key: 'peopleFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
