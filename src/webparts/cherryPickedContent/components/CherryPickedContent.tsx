import * as React from 'react';
import styles from './CherryPickedContent.module.scss';
import { ICherryPickedContentProps } from './ICherryPickedContentProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

const CherryPickedContent: React.FunctionComponent<ICherryPickedContentProps> = (props) => {

  const message = props.libraryItemPicker? "Loading...":"Edit Web Part properties to select a file.";
  const defaultNode = document.createRange().createContextualFragment("<div><h3>" + message + "</h3></div>");

  const [appendedNode, setAppendedNode] = React.useState(defaultNode);

  React.useEffect(() => {
    async function fetchSnippet() {

      // Validate that the library is approved
      let filteredApprovedLibraries = props.approvedLibraries.filter(lib => lib.key == props.libraryPicker);
      if ((filteredApprovedLibraries.length > 0) && (props.libraryItemPicker)) {

        let fileURL = props.libraryPicker + "/" + props.libraryItemPicker;

        const webURLQuery = props.context.pageContext.web.absoluteUrl + `/_api/sp.web.getweburlfrompageurl(@v)?@v=%27${window.location.origin}${fileURL}%27`;

        // if (props.url)
        // const htmlFragment: string = (props.url) ?
        let webURL = await props.context.spHttpClient.get(webURLQuery, SPHttpClient.configurations.v1)
          .then((response: SPHttpClientResponse) => response.json())
          .then(data => data.value);
        const snippetURLQuery = webURL + `/_api/web/getFileByServerRelativeUrl('${fileURL}')/$value`;

        const htmlFragment = await props.context.spHttpClient.get(snippetURLQuery, SPHttpClient.configurations.v1)
          .then((response: SPHttpClientResponse) => response.text());
        // : "<div>No content loaded.</div>";
        const node = document.createRange().createContextualFragment(htmlFragment);
        setAppendedNode(node);
      }
      else {
        setAppendedNode(defaultNode);
      }
    }
    fetchSnippet();
  }, [props.libraryPicker, props.libraryItemPicker]);

  return (
      <section className={`${styles.cherryPickedContent} ${props.hasTeamsContext ? styles.teams : ''}`}>
        <div ref={ref => { if (ref) { ref.innerHTML = ""; ref.appendChild(appendedNode); } }}>
        </div>
        <div>
          <h3>Approved libraries:</h3>
          <p>
            <ul>
            {props.approvedLibraries.map(lib => <li>{lib.text}</li>)}
            </ul>
          </p>
        </div>
        <div className={styles.welcome}>
          <img alt="" src={props.isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Welcome, {escape(props.userDisplayName)}!</h2>
          <div>{props.environmentMessage}</div>
        </div>

        <div>
          <h3>Welcome to SharePoint Framework!</h3>
          <p>
            The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It's the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
          </p>
          <h4>Learn more about SPFx development:</h4>
          <ul className={styles.links}>
            <li><a href="https://aka.ms/spfx" target="_blank">SharePoint Framework Overview</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank">Use Microsoft Graph in your solution</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank">Build for Microsoft Teams using SharePoint Framework</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank">Publish SharePoint Framework applications to the marketplace</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank">SharePoint Framework API reference</a></li>
            <li><a href="https://aka.ms/m365pnp" target="_blank">Microsoft 365 Developer Community</a></li>
          </ul>
        </div>
      </section>
  );
};

export default CherryPickedContent;
