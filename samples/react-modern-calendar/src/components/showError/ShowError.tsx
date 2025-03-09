import * as React from 'react';

import {
  Body1Strong,
  Subtitle1,
} from '@fluentui/react-components';

import { ErrorIcon } from '../errorSVG/ErrorSVG';
import { styles } from './styles';

interface IErrorDisplayProps {
  message: string;
}

export const ShowError: React.FC<IErrorDisplayProps> = ({ message }: IErrorDisplayProps) => {
  return (
    <div className={styles.container}>
      <Subtitle1>Calendar</Subtitle1>
      <ErrorIcon className={styles.icon} />
      <Body1Strong className={styles.message}>{message}</Body1Strong>
    </div>
  );
};

export default ShowError;
