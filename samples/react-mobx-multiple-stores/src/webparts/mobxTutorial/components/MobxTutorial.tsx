import { inject, observer } from 'mobx-react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import * as React from 'react';
import { AppStore } from '../../../stores/AppStore';
import { ConfigStore } from '../../../stores/ConfigStore';
import { Stores } from '../../../stores/RootStore';
import { FakeItemContainer } from './FakeItemContainer';
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

    if (appStore.isLoading)
      return (<Spinner size={SpinnerSize.large} label="Loading... please hodl" ariaLive="assertive" labelPosition="left" />);

    return (
      <div>
        <h1>{configStore.applicationTitle}</h1>
        <ProgressIndicator></ProgressIndicator>
        <FakeItemContainer></FakeItemContainer>
      </div>
    );
  }
}
