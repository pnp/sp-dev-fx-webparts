import { INavLink, INavLinkGroup } from '../../../components/Nav/index';
export declare enum ExampleStatus {
    placeholder = 0,
    started = 1,
    beta = 2,
    release = 3,
}
export interface IAppState {
    appTitle: string;
    testPages: any[];
    examplePages: INavLinkGroup[];
    headerLinks: INavLink[];
}
export declare const AppState: IAppState;
