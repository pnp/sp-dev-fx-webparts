import * as React from 'react';
import styles from './SpSiteErDiagram.module.scss';
import { ReactDiagram } from 'gojs-react';
import getSPSiteData from './helpers/SPSiteData';
import { initDiagram } from './helpers/GoJSHelper';
import getGoJSNodesFromSPSiteData from './helpers/SPSiteDataToGoJSER';
import { CommandBar, ProgressIndicator } from 'office-ui-fabric-react';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface ISpSiteDiagramProps { 
  context: WebPartContext 
}
const SpSiteErDiagram: React.FC<ISpSiteDiagramProps> = (props: ISpSiteDiagramProps) => {
  // Refs
  const diagramRef = React.useRef();
  // State: Data
  const [loadingProgress, setLoadingProgress] = React.useState(0);
  const [nodeDataArray, setNodeDataArray] = React.useState([]);
  const [linkDataArray, setLinkDataArray] = React.useState([]);
  // State: Options
  const [optionRelationOnly, setOptionRelationOnly] = React.useState(true);
  const [useInternalName, setUseInternalName] = React.useState(true);
  const [alertsActive, setAlertsActive] = React.useState(true);
  const [fieldsActive, setFieldsActive] = React.useState(true);

  const loadDiagram = async (refresh: boolean):Promise<void> => {
    if(refresh) { setLoadingProgress(0); setNodeDataArray([]); }
    // Get SP SiteData for ER Diagram
    const spSiteData = await getSPSiteData(props.context, refresh, (progress) => {setLoadingProgress(progress);});
    console.log("SPSiteData", spSiteData);
    // Transform to GoJS Model
    const goJSNodes = getGoJSNodesFromSPSiteData(spSiteData, useInternalName ? "name" : "displayName", alertsActive, fieldsActive);
    // Set State
    setNodeDataArray(goJSNodes.nodeDataArray.filter((n) => 
      optionRelationOnly && goJSNodes.linkDataArray.some(l => l.from === n.key || l.to === n.key) || !optionRelationOnly // Filter optionRelationOnly
    ));
    setLinkDataArray(goJSNodes.linkDataArray);
  }

  // "ComponentDitMount"
  React.useEffect(() => {
    loadDiagram(false);
  }, [optionRelationOnly, useInternalName, alertsActive, fieldsActive]);

  const downloadAsImage = ():void => {
    if(diagramRef && diagramRef.current) {
      const canvas = (diagramRef.current as any).divRef.current.firstChild;
      console.log((diagramRef.current as any).divRef.current);
      const link = document.createElement('a');
      link.download = props.context.pageContext.web.title + '_ERDiagram.png';
      link.href = canvas.toDataURL()
      link.click();
    }
  }

  return (
    <div style={{height: "100%", padding: "0px"}}>
      <CommandBar items={[
        {key: '1', text: 'Refresh', iconProps: { iconName: 'Refresh' }, onClick: () => { loadDiagram(true); }},
        {key: '2', text: 'Only lists with relations', iconProps: { iconName: optionRelationOnly ? 'CheckboxComposite' : 'Checkbox' }, onClick: () => { setOptionRelationOnly(!optionRelationOnly); }},
        {key: '2', text: 'Show alerts', iconProps: { iconName: alertsActive ? 'CheckboxComposite' : 'Checkbox' }, onClick: () => { setAlertsActive(!alertsActive); }},
        {key: '2', text: 'Show fields', iconProps: { iconName: fieldsActive ? 'CheckboxComposite' : 'Checkbox' }, onClick: () => { setFieldsActive(!fieldsActive); }},
        {key: '3', text: useInternalName ? "InternalName" : "DisplayName", iconProps: { iconName: useInternalName ? 'ToggleLeft' : 'ToggleRight' }, onClick: () => { setUseInternalName(!useInternalName); }},
        {key: '4', text: "Download as image", iconProps: { iconName: 'Share' }, onClick: () => { downloadAsImage() }}
      ]} />
      <div className={styles.spSiteErDiagram} style={{height: "calc(100% - 44px)", padding: "0px"}}>
        { loadingProgress !== 100 && nodeDataArray.length === 0 ?
        <div style={{ padding: "8%" }}>
          <ProgressIndicator label={`Loading Lists and Columns ${loadingProgress.toFixed(0)}%`} percentComplete={loadingProgress/100} />
        </div> : 
        <ReactDiagram ref={diagramRef} 
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
