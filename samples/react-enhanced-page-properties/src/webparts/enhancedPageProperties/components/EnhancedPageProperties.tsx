import * as React from "react";
import styles from "./EnhancedPageProperties.module.scss";

export default function EnhancedPageProperties(): JSX.Element {
  return (
    <section className={styles.enhancedPageProperties}>
      <h2>Site Scope</h2>
      <div className={styles.content}>
        <div className={styles.item}>
          <h3>Function</h3>
          <span>COMMUNICAITONS AND STAKEHOLDER</span>
        </div>
        <div className={styles.item}>
          <h3>Activity</h3>
          <span>Advertising and Communications</span>
        </div>
      </div>
    </section>
  );
}
