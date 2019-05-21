import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppStore } from '../../../stores/AppStore';
import { Stores } from '../../../stores/RootStore';
import { ProgressIndicator } from './ProgressIndicator';

export type MobxTutorialStoreProps = {
  appStore: AppStore;
};

export type MobxTutorialProps = Partial<MobxTutorialStoreProps>;

@inject(Stores.AppStore)
@observer
export class MobxTutorial extends React.Component<MobxTutorialProps, {}> {
  public render(): React.ReactElement<MobxTutorialProps> {
    const { appStore } = this.props;

    return (
      <div>
        {appStore.isLoading ? "LOADING" : null}
        <ProgressIndicator></ProgressIndicator>
      </div>
    );
  }
}
