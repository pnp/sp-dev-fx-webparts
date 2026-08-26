import * as React from 'react';
import styles from './SPPermissionManager.module.scss';
import type { ISPPermissionManagerProps } from './ISPPermissionManagerProps';
import { SPPermissionManagerLayout } from './SPPermissionManagerLayout';
import { FluentProvider, IdPrefixProvider, webLightTheme } from '@fluentui/react-components';

export default class SPPermissionManager extends React.Component<ISPPermissionManagerProps> {
  public render(): React.ReactElement<ISPPermissionManagerProps> {
    const { hasTeamsContext, context, featureOptions, title } = this.props;

    return (
      <IdPrefixProvider value="App-FileTypeDistributionProvider">
        <FluentProvider id="FileTypeDistributionFluentProvider" theme={webLightTheme}>
          <section className={`${styles.SPPermissionManager} ${hasTeamsContext ? styles.teams : ""}`}>
            {title?.trim() && <h2 className={styles.webPartTitle}>{title.trim()}</h2>}
            <SPPermissionManagerLayout context={context} featureOptions={featureOptions} />
          </section>
        </FluentProvider>
      </IdPrefixProvider>
    );
  }
}
