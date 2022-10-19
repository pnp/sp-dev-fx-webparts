import { ServiceScope } from '@microsoft/sp-core-library';
import * as React from 'react';
import styles from './CopyViews.module.scss';
import { CopyViewsContainer } from '../../../shared/components';
import { IDefaults } from '../../../shared/interfaces';

export interface ICopyViewsProps {
  resultSourceId?: string;
  serviceScope: ServiceScope;
  defaultValues?: IDefaults;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

export default class CopyViews extends React.Component<ICopyViewsProps, {}> {
  
  public render(): React.ReactElement<ICopyViewsProps> {
    const { serviceScope, resultSourceId, hasTeamsContext, defaultValues } = this.props;

    return (
      <div className={hasTeamsContext ? styles.teams : ''}>
        <CopyViewsContainer serviceScope={serviceScope} defaultValues={defaultValues} resultSourceId={resultSourceId} onCopied={this._onCopied} />
      </div>
    );
  }
  
  private _onCopied = ():void => {
    //
  }
}
