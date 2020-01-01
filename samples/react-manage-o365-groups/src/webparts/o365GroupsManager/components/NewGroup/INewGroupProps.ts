import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface INewGroupProps {
    returnToMainPage: () => void;
    context: WebPartContext;
}