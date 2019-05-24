import { inject, observer } from 'mobx-react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import * as React from 'react';
import { ApplicationStatus, AppStore } from '../../../stores/AppStore';
import { ConfigStore } from '../../../stores/ConfigStore';
import { Stores } from '../../../stores/RootStore';
import { DetailedFakeItemViewer } from './DetailedFakeItemViewer';
import { FakeItemContainer } from './FakeItemContainer';
import { ListCreator } from './ListCreator';
import styles from './MobxTutorial.module.scss';
import { ProgressIndicator } from './ProgressIndicator';

export type MobxTutorialStoreProps = {
  appStore: AppStore;
  configStore: ConfigStore;
};

export type MobxTutorialProps = Partial<MobxTutorialStoreProps>;

@inject(Stores.AppStore, Stores.ConfigurationStore)
@observer
export class MobxTutorial extends React.Component<MobxTutorialProps, {}> {
  public render(): React.ReactElement<MobxTutorialProps> {
    const { appStore, configStore } = this.props;

    if (appStore.isInitializing)
      return (<Spinner size={SpinnerSize.large} label="Initializing... please hodl" ariaLive="assertive" labelPosition="left" />);

    return (
      <div className={styles.mobxTutorial}>
        <div className={styles.row}>
          <div className={styles.title}>{configStore.applicationTitle}</div>
          <ProgressIndicator></ProgressIndicator>
        </div>

        {appStore.status === ApplicationStatus.CreateList ?
          <div className={styles.row}>
            <div className={styles.subTitle}>1) Create List</div>
            <ListCreator></ListCreator>
          </div>
          : null
        }

        {appStore.status === ApplicationStatus.CreateItems ?
          <div className={styles.row}>
            <div className={styles.subTitle}>2) Create Items</div>
            <FakeItemContainer></FakeItemContainer>
          </div>
          : null
        }

        {appStore.status === ApplicationStatus.Completed ?
          <div className={styles.row}>
            <DetailedFakeItemViewer items={appStore.items}></DetailedFakeItemViewer>
          </div>
          :
          null
        }

      </div>
    );
  }
}
