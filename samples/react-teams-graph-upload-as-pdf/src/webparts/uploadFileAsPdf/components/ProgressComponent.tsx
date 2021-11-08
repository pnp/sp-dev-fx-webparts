import * as React from 'react';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { IProgressComponentProps } from './IProgressComponentProps';

export const ProgressComponent: React.FunctionComponent<IProgressComponentProps> = (props) => {
  const [percentComplete, setPercentComplete] = React.useState(0);
  const intervalDelay = 1;
  const intervalIncrement = 0.01;

  React.useEffect(() => {
    if (percentComplete < 0.99) {
        setTimeout(() => {setPercentComplete((intervalIncrement + percentComplete) % 1);}, intervalDelay);
    }
  });

  return (
    <ProgressIndicator label={props.header} percentComplete={percentComplete} />
  );
};