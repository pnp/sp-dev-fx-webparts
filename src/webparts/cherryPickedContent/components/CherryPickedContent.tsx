import * as React from 'react';
import styles from './CherryPickedContent.module.scss';
import { ICherryPickedContentProps } from './ICherryPickedContentProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import PortalIframe from './PortalIframe';

const CherryPickedDiv = ({ htmlFragment }) =>
  <div ref={ref => { if (ref) { ref.innerHTML = ""; ref.appendChild(document.createRange().createContextualFragment(htmlFragment)); } }}>
  </div>;

const MemoDiv = React.memo(CherryPickedDiv);

const CherryPickedContent: React.FunctionComponent<ICherryPickedContentProps> = (props) => {

  const message = "Loading...";
  const [htmlFragment, setHtmlFragment] = React.useState(message);

  // Get the file content
  React.useEffect(() => {
    async function fetchSnippet() {

      // Validate that the library is in the approved list
      let filteredApprovedLibraries = props.approvedLibraries.filter(lib => lib.key == props.libraryPicker);
      if ((filteredApprovedLibraries.length > 0) && (props.libraryItemPicker)) {

        let fileURL = props.libraryPicker + "/" + props.libraryItemPicker;

        const webURLQuery = props.context.pageContext.web.absoluteUrl + `/_api/sp.web.getweburlfrompageurl(@v)?@v=%27${window.location.origin}${fileURL}%27`;

        let webURL = await props.context.spHttpClient.get(webURLQuery, SPHttpClient.configurations.v1)
          .then((response: SPHttpClientResponse) => response.json())
          .then(data => data.value);
        const snippetURLQuery = webURL + `/_api/web/getFileByServerRelativeUrl('${fileURL}')/$value`;

        const fragment = await props.context.spHttpClient.get(snippetURLQuery, SPHttpClient.configurations.v1)
          .then((response: SPHttpClientResponse) => response.text());
        setHtmlFragment(fragment);
      }
      else {
        setHtmlFragment(message);
      }
    }
    fetchSnippet();
  }, [props.libraryItemPicker]);

  if (!props.libraryItemPicker) {
    return (
      <section className={`${styles.cherryPickedContent} ${props.hasTeamsContext ? styles.teams : ''}`}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: "50%" }}>
            <h3>Edit Web Part properties to select a file.</h3>
            <h3>Approved libraries:</h3>
            <p>
              <ul>
                {props.approvedLibraries.map(lib => <li>{lib.text}</li>)}
              </ul>
            </p>
          </div>
          <div style={{ flex: "50%" }} className={styles.welcome}>
            <img alt="" src={props.isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
            <h2>Welcome, {escape(props.userDisplayName)}!</h2>
            <div>{props.environmentMessage}</div>
          </div>
        </div>
      </section>
    );
  }
  else if (props.isolated) {
    return (
      <PortalIframe {...props}>
        <MemoDiv htmlFragment={htmlFragment} />
      </PortalIframe>
    );
  }
  else {
    return (
      <MemoDiv htmlFragment={htmlFragment} />
    );
  }
};

export default CherryPickedContent;
