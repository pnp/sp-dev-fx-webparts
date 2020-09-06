import * as React from 'react';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

import styles from './ConfigureWebPart.module.scss';

export interface IConfigureWebPartProps {
  webPartContext: IWebPartContext;
  title: string;
  description?: string;
  buttonText?: string;
}

const ConfigureWebPart: React.SFC<IConfigureWebPartProps> = (props) => {
  const {
    webPartContext,
    title,
    description,
    buttonText,
  } = props;
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>
        <MessageBar messageBarType={MessageBarType.info} >
          {description ? description : 'Please configure this web part\'s properties first.'}
        </MessageBar>
      </div>
      <div className={styles.button}>
        <PrimaryButton iconProps={{ iconName: 'Edit' }} onClick={(e) => { e.preventDefault(); webPartContext.propertyPane.open(); }}>
          {buttonText ? buttonText : 'Configure Web Part'}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ConfigureWebPart;
