import * as React from 'react';
import styles from './SpSiteErDiagram.module.scss';
import { ISpSiteErDiagramProps } from './ISpSiteErDiagramProps';
import { ReactDiagram } from 'gojs-react';
import getSiteData from './helpers/SPSiteData';
import { initDiagram } from './helpers/GoJSHelper';

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
    let a = await getSiteData(this.props.context);
    this.setState({nodeDataArray: a.nodeDataArray, linkDataArray: a.linkDataArray});
  }

  public render(): React.ReactElement<ISpSiteErDiagramProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <div className={styles.spSiteErDiagram} style={{height: "400px"}}>
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
