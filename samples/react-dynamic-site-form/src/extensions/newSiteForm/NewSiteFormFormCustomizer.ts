import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Log } from '@microsoft/sp-core-library';
import { BaseFormCustomizer } from '@microsoft/sp-listview-extensibility';
import NewSiteForm, { INewSiteFormProps } from './components/NewSiteForm';

/**
 * If your form customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface INewSiteFormFormCustomizerProperties {
  emailDomain?: string;
  managedPath?: string;
}

const LOG_SOURCE: string = 'NewSiteFormFormCustomizer';

export default class NewSiteFormFormCustomizer
  extends BaseFormCustomizer<INewSiteFormFormCustomizerProperties> {

  public onInit(): Promise<void> {
    // Add your custom initialization to this method. The framework will wait
    // for the returned promise to resolve before rendering the form.
    Log.info(LOG_SOURCE, 'Activated NewSiteFormFormCustomizer with properties:');
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    return Promise.resolve();
  }

  public render(): void {
    // Use this method to perform your custom rendering.

    const newSiteForm: React.ReactElement<{}> =
      React.createElement(NewSiteForm, {
        context: this.context,
        displayMode: this.displayMode,
        emailDomain: this.properties.emailDomain,
        managedPath: this.properties.managedPath,
        onSave: this._onSave,
        onClose: this._onClose
       } as INewSiteFormProps);

    ReactDOM.render(newSiteForm, this.domElement);
  }

  public onDispose(): void {
    // This method should be used to free any resources that were allocated during rendering.
    ReactDOM.unmountComponentAtNode(this.domElement);
    super.onDispose();
  }

  private _onSave = (): void => {

    // You MUST call this.formSaved() after you save the form.
    this.formSaved();
  }

  private _onClose =  (): void => {
    // You MUST call this.formClosed() after you close the form.
    this.formClosed();
  }
}
