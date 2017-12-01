import {CommunicationServiceConfiguration } from "./";

export interface ICommunicationConfigurationService {
    getCurrentConfiguration(): Promise<CommunicationServiceConfiguration>;
}
