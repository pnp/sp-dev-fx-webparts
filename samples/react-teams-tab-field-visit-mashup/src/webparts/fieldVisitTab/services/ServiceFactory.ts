import { IVisitService } from './VisitService/IVisitService';
import VisitService from './VisitService/VisitService';
import { ICustomerService } from './CustomerService/ICustomerService';
import CustomerService from './CustomerService/CustomerService';
import CustomerServiceMock from './CustomerService/CustomerServiceMock';
import { ICalendarService } from './CalendarService/ICalendarService';
import CalendarService from './CalendarService/CalendarService';
import CalendarServiceMock from './CalendarService/CalendarServiceMock';
import { IWeatherService } from './WeatherService/IWeatherService';
import WeatherService from './WeatherService/WeatherService';
import WeatherServiceMock from './WeatherService/WeatherServiceMock';
import { IMapService } from './MapService/IMapService';
import MapService from './MapService/MapService';
import MapServiceMock from './MapService/MapServiceMock';
import { IDocumentService } from './DocumentService/IDocumentService';
import DocumentService from './DocumentService/DocumentService';
import DocumentServiceMock from './DocumentService/DocumentServiceMock';
import { IActivityService } from './ActivityService/IActivityService';
import ActivityServiceMock from './ActivityService/ActivityServiceMock';
import { IConversationService } from './ConversationService/IConversationService';
import ConversationServiceMock from './ConversationService/ConversationServiceMock';
import ConversationServiceTeams from './ConversationService/ConversationServiceTeams';
import { IPhotoService } from './PhotoService/IPhotoService';
import PhotoServiceMock from './PhotoService/PhotoServiceMock';
import PhotoService from './PhotoService/PhotoService';

import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { EnvironmentType } from '@microsoft/sp-core-library';

export default class ServiceFactory {

    public static getVisitService(
        environmentType: EnvironmentType,
        context: WebPartContext,
        serviceScope: ServiceScope): IVisitService {

        var calendarService: ICalendarService;
        var customerService: ICustomerService;

        if (environmentType === EnvironmentType.Local) {
            calendarService = new CalendarServiceMock();
            customerService = new CustomerServiceMock();
        } else {
            calendarService = new CalendarService(context, serviceScope);
            customerService = new CustomerService(context, serviceScope);
        }

        return new VisitService(calendarService, customerService);
    }

    public static getWeatherService(
        environmentType: EnvironmentType,
        context: WebPartContext,
        serviceScope: ServiceScope): IWeatherService {

            return (environmentType === EnvironmentType.Local) ?
                new WeatherServiceMock() :
                new WeatherService(context, serviceScope);
    }

    public static getMapService(
        environmentType: EnvironmentType,
        context: WebPartContext,
        serviceScope: ServiceScope): IMapService {

        return (environmentType === EnvironmentType.Local) ?
            new MapServiceMock() :
            new MapService(context, serviceScope);
    }

    public static getDocumentService(
        environmentType: EnvironmentType,
        context: WebPartContext,
        serviceScope: ServiceScope): IDocumentService {

        return (environmentType === EnvironmentType.Local) ?
            new DocumentServiceMock() :
            new DocumentService(context, serviceScope);
    }

    public static getActivityService(
        environmentType: EnvironmentType,
        context: WebPartContext,
        serviceScope: ServiceScope): IActivityService {

        return (environmentType === EnvironmentType.Local) ?
            new ActivityServiceMock() :
            new ActivityServiceMock();
    }

    public static getConversationService(
        environmentType: EnvironmentType,
        context: WebPartContext,
        serviceScope: ServiceScope,
        teamId?: string,
        channelId?: string): IConversationService {

        return (environmentType === EnvironmentType.Local ||
                !teamId || !channelId ) ?
            new ConversationServiceMock() :
            new ConversationServiceTeams(context, serviceScope, teamId, channelId);
    }

    public static getPhotoService(
        environmentType: EnvironmentType,
        context: WebPartContext,
        serviceScope: ServiceScope): IPhotoService {

        return (environmentType === EnvironmentType.Local) ?
            new PhotoServiceMock() :
            new PhotoService(context, serviceScope);
    }
}