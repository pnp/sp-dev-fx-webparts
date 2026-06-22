import * as React from 'react';
import styles from './SampleRouter.module.scss';
import type { ISampleRouterProps } from './ISampleRouterProps';
import { MessageBar, MessageBarType, Link as FluentLink } from '@fluentui/react';

import {  Route, Routes, Link, HashRouter, useLocation } from 'react-router-dom';

import { Page1 } from './pages/page1';
import { Page2 } from './pages/page2';
import { GenericPage } from './pages/genericPage';

export interface IPageView {
  pageName: string;
  timestamp: Date;
}

export interface ISampleRouterState {
  pageViews: IPageView[];
}

export default class SampleRouter extends React.Component<ISampleRouterProps, ISampleRouterState> {
  constructor(props: ISampleRouterProps) {
    super(props);
    this.state = {
      pageViews: []
    };
  }

  private trackPageView = (pageName: string): void => {
    const newPageView: IPageView = {
      pageName,
      timestamp: new Date()
    };

    this.setState({
      pageViews: [newPageView, ...this.state.pageViews].slice(0, 15) // Keep last 15
    });
  }

  // Component to track route changes
  private RouteTracker: React.FC = () => {
    const location = useLocation();

    React.useEffect(() => {
      const pageName = location.pathname === '/' ? 'Home' : location.pathname.replace('/', '');
      this.trackPageView(pageName);
    }, [location]);

    return null;
  }

  public render(): React.ReactElement<ISampleRouterProps> {
    const {

      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
      isAppInsightsConfigured
    } = this.props;

    const RouteTracker = this.RouteTracker;

    return (
      <HashRouter>
        <RouteTracker />
      <section className={`${styles.sampleRouter} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {userDisplayName}!</h2>
          <div>{environmentMessage}</div>
          {isAppInsightsConfigured && (
            <MessageBar messageBarType={MessageBarType.success}>
              Application Insights is tracking page views and navigation for this web part. Check your Azure Portal to see the analytics.
            </MessageBar>
          )}
        </div>
        {!isAppInsightsConfigured && (
          <MessageBar messageBarType={MessageBarType.warning} isMultiline={true}>
            <strong>Application Insights Not Configured</strong>
            <br />
            This web part demonstrates Page View tracking and User Flow analysis with Application Insights. To start collecting telemetry data:
            <br />
            1. Edit this web part and find the &quot;Application Insights Configuration&quot; section
            <br />
            2. Paste your Azure Application Insights connection string
            <br />
            <FluentLink href="https://portal.azure.com" target="_blank">Open Azure Portal</FluentLink> to get your connection string.
          </MessageBar>
        )}
        <div>
          <h3>Sample Router - Page Navigation Tracking</h3>
          <p>This web part demonstrates how Application Insights tracks page views and user navigation flows. Click the links below to navigate between pages - each navigation is tracked as a separate page view event:</p>
             <ul className={styles.links}>
            <li><Link  to="/">Home</Link></li>
            <li><Link  to="/page1">Page 1</Link></li>
            <li><Link  to="/page2">Page 2</Link></li>
            <li><Link  to="/page3">Page 3</Link></li>
       </ul>
       {isAppInsightsConfigured && (
         <MessageBar messageBarType={MessageBarType.info} styles={{ root: { marginTop: '10px' } }}>
           Navigate between the pages above. Application Insights will track each page view and build a user flow diagram showing how users navigate through your application.
         </MessageBar>
       )}

          <Routes>
            <Route path="/page1" Component={Page1} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/page3" element={<GenericPage headline='Page3' />} />
            <Route path="/" element={<GenericPage headline='StartPage' />} />
          </Routes>

        </div>

        {isAppInsightsConfigured && this.state.pageViews.length > 0 && (
          <div style={{ marginTop: '20px', padding: '0 20px' }}>
            <h3>Navigation History (Page Views Tracked)</h3>
            <MessageBar messageBarType={MessageBarType.info}>
              Application Insights is recording these page views. In Azure Portal, you can see user flows showing how users navigate through pages.
            </MessageBar>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {this.state.pageViews.map((pageView, idx) => (
                <li key={idx} style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                  <span style={{ fontWeight: 'bold', color: '#0078d4' }}>
                    {pageView.pageName}
                  </span>
                  <span style={{ fontSize: '12px', color: '#666', marginLeft: '10px' }}>
                    - {pageView.timestamp.toLocaleTimeString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </section>
    </HashRouter>
    );
  }
}
