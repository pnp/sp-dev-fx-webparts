import { BaseApplication } from '@microsoft/sp-application-base';
import { PageStore } from './stores/PageStore';
import './workbench.module.scss';
/**
 * Web part workbench.
 *
 * The application class here is exported as default so that the framework knows how to start the application
 */
export default class SpWebpartWorkbench extends BaseApplication {
    protected _pageStore: PageStore;
    private _errorDialog;
    protected onLoad(): Promise<void>;
    protected onRender(): void;
    private _renderErrorDialog;
}
//# sourceMappingURL=spWebpartWorkbench.d.ts.map