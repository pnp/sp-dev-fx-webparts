import * as React from 'react';
import styles from './RomanNumerals.module.scss';
import { IRomanNumeralsProps } from '../RomanNumeralsWebPart';
import { escape } from '@microsoft/sp-lodash-subset';
import * as Fabric from 'office-ui-fabric-react';
import { romanToString } from '../RomanToString';

export default function RomanNumerals(props: IRomanNumeralsProps) {

  // Use React Hooks to manage state - useState returns value and setter as array...
  const [value, setValue] = React.useState(parseInt(props.initialValue));

  function onChange(event) {
    setValue(parseInt(event.target.value));
  }

  var updownButtons = null;
  if (props.showUpdownButtons) updownButtons = (
    <div className={styles.column}>
      <br />
      <Fabric.PrimaryButton onClick={() => setValue(value + 1)}>+</Fabric.PrimaryButton>
      &nbsp;
      <Fabric.PrimaryButton onClick={() => setValue(value - 1)}>-</Fabric.PrimaryButton>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.column}>
          <span className={styles.title}>{props.title}</span>
          <p>{escape(props.description)}</p>
        </div>
        <div className={styles.column}>
          {props.inputCaption}<br />
          <input type="number" min="0" max="9999999" value={value} onChange={onChange} />
        </div>
        {updownButtons}
        <div className={styles.column}>
          <br />
          <h3>{props.resultCaption} {romanToString(value)}</h3>
          <br />
        </div>
      </div>
    </div>
  );
}