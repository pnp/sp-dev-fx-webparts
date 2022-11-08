import { ServiceScope } from '@microsoft/sp-core-library';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CopyViewsContainer } from '../../shared/components';
import { IDefaults } from '../../shared/interfaces';

export default class CopyViewsDialog extends BaseDialog {
    private _serviceScope: ServiceScope;
    private _resultSourceId?: string;
    private _defaultValues: IDefaults;
       
    public constructor(serviceScope: ServiceScope, defaultValues: IDefaults, resultSourceId?: string) {
      super({ isBlocking: true });
      
      this._serviceScope = serviceScope;
      this._resultSourceId = resultSourceId;      
      this._defaultValues = defaultValues;
    }
  
    public render(): void {
      
      const element = <div style={{ width: 1000, padding: 20 }}>
        <CopyViewsContainer serviceScope={this._serviceScope} showCancel={true} defaultValues={this._defaultValues} resultSourceId={this._resultSourceId} onCopied={this._onCopied} onCancel={this.close} />
      </div>;

      
      ReactDOM.render(element, this.domElement);
    }
    
    private _onCopied = async (): Promise<void> => {
      await this.close();
    }
  
    public getConfig(): IDialogConfiguration {
      return { isBlocking: false };
    }
  
    protected onAfterClose(): void {
      super.onAfterClose();
  
      // Clean up the element for the next dialog
      ReactDOM.unmountComponentAtNode(this.domElement);
    }  
  }