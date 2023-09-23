import { MSGraphClientV3 } from '@microsoft/sp-http';

export interface IRegisterAppProps {
    graphClient: MSGraphClientV3,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    modal: () => any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callBack: (latestapp: any) => any,
}