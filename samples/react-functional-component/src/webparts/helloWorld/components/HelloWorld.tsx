import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from '../HelloWorldWebPart';
import { escape } from '@microsoft/sp-lodash-subset';
import * as Fabric from 'office-ui-fabric-react';

export default function HelloWorld(props: IHelloWorldProps) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.column}>
          <span className={styles.title}>Welcome to SharePoint!</span>
          <p>Customize SharePoint experiences using Web Parts.</p>
          <p>{escape(props.description)}</p>
          <Fabric.PrimaryButton href="https://aka.ms/spfx">Learn more</Fabric.PrimaryButton>
        </div>
      </div>
    </div>
  );
}
