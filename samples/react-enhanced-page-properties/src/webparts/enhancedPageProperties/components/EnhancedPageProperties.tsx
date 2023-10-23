import * as React from 'react';

import styles from './EnhancedPageProperties.module.scss';
import { IEnhancedPagePropertiesProps } from './IEnhancedPagePropertiesProps';
import Value from './Value/Value';

export default function EnhancedPageProperties(
  props: IEnhancedPagePropertiesProps
): JSX.Element {
  return (
    <section className={styles.enhancedPageProperties}>
      <h2>{props.title}</h2>
      <div className={styles.content}>
        {props.items.map((item) => (
          <div key={item.field?.Id} className={styles.item}>
            <h3>{item.label}</h3>
            {item.field ? (
              <Value field={item.field} value={item.value} />
            ) : (
              <span className={styles.errorMessage}>
                Field not available in the Library metadata. Please check again the
                web part configuration.
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
