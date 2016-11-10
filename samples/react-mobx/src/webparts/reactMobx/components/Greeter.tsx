import * as React from 'react';

import styles from '../ReactMobx.module.scss';

export interface IGreeterProps {
  name: React.ReactNode;
}

const Greeter = ({ name }: IGreeterProps) => (
  <div className={styles.greeter}>
    Hello {name}!
  </div>
);

export default Greeter;
