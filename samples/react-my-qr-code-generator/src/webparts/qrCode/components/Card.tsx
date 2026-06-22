import * as React from 'react';
import { Stack, IStackProps } from '@fluentui/react';
import styles from './Card.module.scss';

export interface ICardProps extends IStackProps {
  title?: string;
  className?: string;
}

export const Card: React.FunctionComponent<ICardProps> = (props) => {
  const { title, children, className, ...stackProps } = props;

  return (
    <Stack className={`${styles.card} ${className || ''}`} {...stackProps}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {children}
    </Stack>
  );
};
