import * as React from 'react';
import styles from './SpSiteErDiagram.module.scss';
import { ReactDiagram } from 'gojs-react';
import getSPSiteData from './helpers/SPSiteData';
import { initDiagram } from './helpers/GoJSHelper';
import getGoJSNodesFromSPSiteData from './helpers/SPSiteDataToGoJSER';
import { CommandBar, ProgressIndicator } from 'office-ui-fabric-react';

export interface ISpSiteDiagramProps { 
  context: any 
}
const SpSiteErDiagram: React.FC<ISpSiteDiagramProps> = (props: ISpSiteDiagramProps) => {
  // State: Data
  const [loadingProgress, setLoadingProgress] = React.useState(0);
  const [nodeDataArray, setNodeDataArray] = React.useState([]);
  const [linkDataArray, setLinkDataArray] = React.useState([]);
  // State: Options
  const [optionRelationOnly, setOptionRelationOnly] = React.useState(false);

  const loadDiagram = async (refresh: boolean) => {
    if(refresh) { setLoadingProgress(0); setNodeDataArray([]); }
    // Get SP SiteData for ER Diagram
    let spSiteData = await getSPSiteData(props.context, refresh, (progress) => {setLoadingProgress(progress);});
    console.log("SPSiteData", spSiteData);
    // Transform to GoJS Model
    let goJSNodes = getGoJSNodesFromSPSiteData(spSiteData);
    // Set State
    setNodeDataArray(goJSNodes.nodeDataArray.filter((n) => 
      optionRelationOnly && goJSNodes.linkDataArray.some(l => l.from == n.key || l.to == n.key) || !optionRelationOnly // Filter optionRelationOnly
    ));
    setLinkDataArray(goJSNodes.linkDataArray);
  }

  // "ComponentDitMount"
  React.useEffect(() => {
    loadDiagram(false);
  }, [optionRelationOnly]);


  return (
    <div style={{height: "100%", padding: "0px"}}>
      <CommandBar items={[
        {key: '1', text: 'Refresh', iconProps: { iconName: 'Refresh' }, onClick: () => { loadDiagram(true); }},
        {key: '2', text: 'Only Lists with Relations', iconProps: { iconName: optionRelationOnly ? 'CheckboxComposite' : 'Checkbox' }, onClick: () => { setOptionRelationOnly(!optionRelationOnly); }}
      ]} />
      <div className={styles.spSiteErDiagram} style={{height: "calc(100% - 44px)", padding: "0px"}}>
        { loadingProgress != 100 && nodeDataArray.length == 0 ?
        <div style={{ padding: "8%" }}>
          <ProgressIndicator label={`Loading Lists and Columns ${loadingProgress.toFixed(0)}%`} percentComplete={loadingProgress/100} />
        </div> : 
        <ReactDiagram //ref={diagramRef} 
          divClassName='diagram-component'
          style={{ backgroundColor: '#eee' }}
          initDiagram={initDiagram}
          nodeDataArray={nodeDataArray}
          linkDataArray={linkDataArray}
        />
        }
      </div>
    </div>
  );
}

export default SpSiteErDiagram;
