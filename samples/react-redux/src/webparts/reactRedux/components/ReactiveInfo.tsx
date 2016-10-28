import * as React from 'react';

export interface IReactiveInfoProps {
  reactive: boolean;
}

const ReactiveInfo = ({ reactive }: IReactiveInfoProps) => (
  <pre>
    { JSON.stringify({ reactive }) }
  </pre>
);

export default ReactiveInfo;
