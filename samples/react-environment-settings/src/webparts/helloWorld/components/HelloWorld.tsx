import * as React from 'react';

export interface IHelloWorldProps { }

export const HelloWorld: React.FunctionComponent<IHelloWorldProps> = (props: React.PropsWithChildren<IHelloWorldProps>) => {
  return (
    <>
      Hello world
    </>
  );
};