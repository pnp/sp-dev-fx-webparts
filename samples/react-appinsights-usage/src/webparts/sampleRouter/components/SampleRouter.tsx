import * as React from 'react';
import styles from './SampleRouter.module.scss';
import type { ISampleRouterProps } from './ISampleRouterProps';
import { escape } from '@microsoft/sp-lodash-subset';

import {  Route, Routes,Link, HashRouter } from 'react-router-dom';

import { Page1 } from './pages/page1';
import { Page2 } from './pages/page2';
import { GenericPage } from './pages/genericPage';


export default class SampleRouter extends React.Component<ISampleRouterProps, {}> {
  public render(): React.ReactElement<ISampleRouterProps> {
    const {

      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <HashRouter>
      <section className={`${styles.sampleRouter} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
        </div>
        
        <div>
          <h3>Sample Router!</h3>
             <ul className={styles.links}>
            <li><Link  to="/">Home</Link>   </li>
            <li><Link  to="/page1">Page1</Link>   </li>
            <li><Link  to="/page2">Page2</Link>   </li>
            <li><Link  to="/page3">Page3</Link>   </li>
       </ul>

          <Routes>
            <Route path="/page1" Component={Page1} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/page3" element={<GenericPage headline='Page3' />} />
            <Route path="/" element={<GenericPage headline='StartPage' />} />
          </Routes>



        </div>
      </section>
    </HashRouter>
    );
  }
}
