import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as microsoftTeams from '@microsoft/teams-js';
import * as strings from 'FieldVisitTabWebPartStrings';
import { IFieldVisitsProps, FieldVisits }
  from './components/FieldVisits';

import ServiceFactory from './services/ServiceFactory';

export interface IFieldVisitTabWebPartProps {
  groupName: string;
  groupId: string;
  channelId: string;
}

export default class FieldVisitTabWebPart extends BaseClientSideWebPart<IFieldVisitTabWebPartProps> {

  private teamsContext?: microsoftTeams.Context;
  private groupName?: string;
  private groupId?: string;
  private channelId?: string;

  protected onInit(): Promise<any> {

    let p: Promise<any> = Promise.resolve();

    if (this.context.microsoftTeams &&
      this.context.microsoftTeams.getContext) {

      // Get configuration from the Teams SDK
      p = new Promise((resolve, reject) => {
        if (this.context.microsoftTeams &&
          this.context.microsoftTeams.getContext) {
          this.context.microsoftTeams.getContext(context => {
            this.teamsContext = context;
            this.groupName = context.teamName;
            this.groupId = context.groupId;
            this.channelId = context.channelId;
            resolve();
          });
        }
      });

    } else {

      // Get configuration from web part settings
      this.groupName = this.properties.groupName;
      this.groupId = this.properties.groupId;
      this.channelId = this.properties.channelId;

    }

    return p;
  }

  public render(): void {

    // Get services needed for the mashup
    const visitService = ServiceFactory.getVisitService(
      Environment.type, this.context, this.context.serviceScope
    );
    const weatherService = ServiceFactory.getWeatherService(
      Environment.type, this.context, this.context.serviceScope);

    const mapService = ServiceFactory.getMapService(
      Environment.type, this.context, this.context.serviceScope);

    const documentService = ServiceFactory.getDocumentService(
      Environment.type, this.context, this.context.serviceScope
    );
    const activityService = ServiceFactory.getActivityService(
      Environment.type, this.context, this.context.serviceScope
    );
    const conversationService = ServiceFactory.getConversationService(
      Environment.type, this.context, this.context.serviceScope,
      this.groupId, this.channelId
    );
    const photoService = ServiceFactory.getPhotoService(
      Environment.type, this.context, this.context.serviceScope
    );

    // Render the mashup
    const element: React.ReactElement<IFieldVisitsProps> = React.createElement(
      FieldVisits,
      {
        visitService: visitService,
        weatherService: weatherService,
        mapService: mapService,
        documentService: documentService,
        activityService: activityService,
        conversationService: conversationService,
        photoService: photoService,
        groupName: this.groupName,
        groupId: this.groupId,
        channelId: this.channelId,
        entityId: this.teamsContext ? this.teamsContext.entityId : "",
        subEntityId: this.teamsContext ? this.teamsContext.subEntityId : "",
        teamsApplicationId: 'ed686d10-9382-4c3b-be6b-1957d4ec9692',
        currentUserEmail: this.context.pageContext.user.email
      }
    );

    ReactDom.render(element, this.domElement);
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
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('groupName', {
                  label: strings.GroupNameLabel
                }),
                PropertyPaneTextField('groupId', {
                  label: strings.GroupIdLabel
                }),
                PropertyPaneTextField('channelId', {
                  label: strings.ChannelIdLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
