import * as React from 'react';
import styles from './ChatWithSk.module.scss';
import type { IChatWithSkProps } from './IChatWithSkProps';

import { AZURE_FUNCTION_APP_ID } from '../../../globalConfig';
import { AadTokenProvider } from '@microsoft/sp-http';
import { ChatInterface } from '../../../components/ChatInterface';

interface IChatWithSkState {
  tokenProvider: AadTokenProvider | undefined;
}

export default class ChatWithSk extends React.Component<IChatWithSkProps, IChatWithSkState> {
  
  constructor(props: IChatWithSkProps) {
    super(props);
    
    this.state = {
      tokenProvider: undefined
    };
  }

  public componentDidMount(): void {
    this.props.wpcontext.aadTokenProviderFactory.getTokenProvider().then(provider => {
      this.setState({ tokenProvider: provider });
    });
  }

  public render(): React.ReactElement<IChatWithSkProps> {
    const {
      azFunctionUrl,
      hasTeamsContext,
    } = this.props;
    const { tokenProvider } = this.state;

    return (
      <section className={`${styles.chatWithSk} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          {(!azFunctionUrl || azFunctionUrl.length === 0) && (
            <div>Please configure the Azure Function URL in the web part properties.</div>
          )}
        </div>
        {(azFunctionUrl && azFunctionUrl.length > 0 && tokenProvider) && (
          <ChatInterface 
            azFunctionUrl={azFunctionUrl}
            azureFunctionAppId={AZURE_FUNCTION_APP_ID}
            tokenProvider={tokenProvider}
          />
        )}
      </section>
    );
  }
  
}
