

import * as React from 'react';
import { IReactFlagTemplateProps } from './IReactFlagTemplateProps';
import styles from './ReactFlagTemplate.module.scss';
const sx = styles as unknown as Record<string, string>;


const flags = [
  {
    colorClass: sx.flagColor1,
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="12" width="40" height="40" rx="8" stroke="white" strokeWidth="4" fill="none" />
        <path d="M32 20L44 28V44H20V28L32 20Z" stroke="white" strokeWidth="3" fill="none" />
      </svg>
    ),
    title: 'Codepen',
    descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, impedit?'
  },
  {
    colorClass: sx.flagColor2,
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 16H48L44 48L32 52L20 48L16 16Z" fill="white" fillOpacity="0.1" />
        <path d="M32 44V36H40L41 28H32V24H44L43 32L40 44L32 48L24 44L21 32H32V36H24L25 44L32 48L39 44L40 36H32Z" fill="white" />
        <rect x="20" y="20" width="24" height="24" rx="4" stroke="white" strokeWidth="2" fill="none" />
      </svg>
    ),
    title: 'HTML 5',
    descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  },
  {
    colorClass: sx.flagColor3,
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="16" y="16" width="32" height="32" rx="6" stroke="white" strokeWidth="4" fill="none" />
        <path d="M24 40L32 24L40 40H24Z" fill="white" />
      </svg>
    ),
    title: 'CSS 3',
    descr: 'Lorem ipsum dolor sit.'
  },
  {
    colorClass: sx.flagColor4,
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="16" y="16" width="32" height="32" rx="6" stroke="white" strokeWidth="4" fill="none" />
        <rect x="24" y="24" width="16" height="16" fill="white" />
        <text x="32" y="38" textAnchor="middle" fontSize="12" fill="#DA611E" fontWeight="bold">JS</text>
      </svg>
    ),
    title: 'Javascript',
    descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor laboriosam odio alias.'
  },
  {
    colorClass: sx.flagColor5,
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="24" stroke="white" strokeWidth="4" fill="none" />
        <path d="M40 36C40 38.2091 36.4183 40 32 40C27.5817 40 24 38.2091 24 36" stroke="white" strokeWidth="3" />
        <circle cx="32" cy="28" r="6" stroke="white" strokeWidth="2" />
      </svg>
    ),
    title: 'Github',
    descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  }
];

export default class ReactFlagTemplate extends React.Component<IReactFlagTemplateProps> {
  render() {
    return (
      <div className={styles.flagBannerRoot}>
        <h1>UL banner cards</h1>
        <div className={styles.bannerBar}></div>
        <ul className={styles.flagList}>
          {flags.map((flag, idx) => (
            <li key={idx} className={`${styles.flagListItem} ${flag.colorClass}`}>
              <div className={styles.flag}>
                <div className={styles.icon}>{flag.icon}</div>
                <div className={styles.title}>{flag.title}</div>
                <div className={styles.descr}>{flag.descr}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
