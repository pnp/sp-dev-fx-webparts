import * as React from 'react';
import styles from './SpSiteErDiagram.module.scss';
import { ISpSiteErDiagramProps } from './ISpSiteErDiagramProps';
import { ReactDiagram } from 'gojs-react';
import getSPSiteData from './helpers/SPSiteData';
import { initDiagram } from './helpers/GoJSHelper';
import getGoJSNodesFromSPSiteData from './helpers/SPSiteDataToGoJSER';

interface SpSiteDiagramState {
  nodeDataArray: any,
  linkDataArray: any
}
export default class SpSiteErDiagram extends React.Component<ISpSiteErDiagramProps, SpSiteDiagramState> {

  constructor(props: any) {
    super(props);
    this.state = {nodeDataArray: [], linkDataArray: []};
  }

  public async componentDidMount() {
    // Get SP SiteData for ER Diagram
    let spSiteData = await getSPSiteData(this.props.context);
    // Transform to GoJS Model
    let goJSNodes = getGoJSNodesFromSPSiteData(spSiteData);
    // Set State
    this.setState({nodeDataArray: goJSNodes.nodeDataArray, linkDataArray: goJSNodes.linkDataArray});
  }

  public render(): React.ReactElement<ISpSiteErDiagramProps> {
    return (
      <div className={styles.spSiteErDiagram} style={{height: "calc(100% - 0px)", padding: "0px"}}>
        <ReactDiagram //ref={diagramRef} 
          divClassName='diagram-component'
          style={{ backgroundColor: '#eee' }}
          initDiagram={initDiagram}
          nodeDataArray={this.state.nodeDataArray}
          linkDataArray={this.state.linkDataArray}
        />
      </div>
    );
  }
}
