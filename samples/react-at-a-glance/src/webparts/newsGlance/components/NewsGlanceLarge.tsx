import * as React from 'react';
import styles from './NewsGlanceLarge.module.scss';
import { INewsGlanceLargeProps } from '../../../interfaces';
import NewsGlanceTitle from './NewsGlanceTitle';


const NewsGlanceLarge: React.FunctionComponent<INewsGlanceLargeProps> = (props) => {

  return (
    <div className={styles.newsGlanceLarge}>
      <NewsGlanceTitle title="At a glance" />
      <div className={styles.container}>
        {/* <div className={styles.row}> */}
        {
          props.showImage &&
          <div className={`${styles.item} ${styles.leftItem}`}>
            <img className={styles.articleImage} src={props.imageUrl} />
          </div>
        }
        <div className={`${styles.item} ${styles.rightItem}`}>
          <ul className={styles.ulGlance}>
            {
              props.sentences.map((s) => {
                return <li className={styles.liGlance}>{s}</li>;
              })
            }
          </ul>
        </div>
        {/* </div> */}
      </div>
    </div>
  );

};

export default NewsGlanceLarge;
