import * as React from 'react';

import styles from '../ReactRedux.module.scss';

export interface IGreeterProps {
  name: string;
}

const Greeter = ({ name }: IGreeterProps) => (
  <div className={styles.greeter}>
    Hello {name}!
  </div>
);

export default Greeter;
