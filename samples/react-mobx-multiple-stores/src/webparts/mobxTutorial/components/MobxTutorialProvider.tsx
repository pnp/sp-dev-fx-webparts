import { Provider } from "mobx-react";
import * as React from 'react';
import { MobxTutorial } from './MobxTutorial';

type MobxTutorialProviderOwnProps = {
  stores: {};
};

export default class MobxTutorialProvider extends React.Component<MobxTutorialProviderOwnProps, {}> {

  public render(): React.ReactElement<{}> {
    return (
      <Provider {...this.props.stores}>
        <MobxTutorial></MobxTutorial>
      </Provider>
    );
  }
}
