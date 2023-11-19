import * as React from 'react';
import * as settings from '../../../settings/settings.json';

export interface IHelloWorldProps { }

export const HelloWorld: React.FunctionComponent<IHelloWorldProps> = (props: React.PropsWithChildren<IHelloWorldProps>) => {
  return (
    <>
      <b>Message of the day:</b> {settings.MessageOfTheDay}
    </>
  );
};