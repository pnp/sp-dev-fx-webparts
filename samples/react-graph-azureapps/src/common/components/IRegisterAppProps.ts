import { MSGraphClientV3 } from '@microsoft/sp-http';

export interface IRegisterAppProps{
    graphClient: MSGraphClientV3,
    modal:() => any,
    callBack:(latestapp: any) => any,
}