import * as React from 'react';

import styles from './EnhancedPageProperties.module.scss';
import { IEnhancedPagePropertiesProps } from './IEnhancedPagePropertiesProps';

export default function EnhancedPageProperties(
  props: IEnhancedPagePropertiesProps
): JSX.Element {
  return (
    <section className={styles.enhancedPageProperties}>
      <h2>{props.title}</h2>
      <div className={styles.content}>
        {props.items.map((item) => (
          <div key={item.field} className={styles.item}>
            <h3>{item.label}</h3>
            {item.isAvailable ? (
              <span>{item.value || "-"}</span>
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
