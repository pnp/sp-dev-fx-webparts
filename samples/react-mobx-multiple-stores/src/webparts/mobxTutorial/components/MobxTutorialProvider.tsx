import { Provider } from "mobx-react";
import * as React from 'react';
import { RootStore } from '../../../stores/RootStore';
import { MobxTutorial } from './MobxTutorial';

export default class MobxTutorialProvider extends React.Component<{}, {}> {
  private readonly dependencies = { rootStore: new RootStore() };

  public render(): React.ReactElement<{}> {
    return (
      <Provider {...this.dependencies.rootStore}>
        <MobxTutorial></MobxTutorial>
      </Provider>
    );
  }
}
