import { DisplayMode } from '@microsoft/sp-core-library';
import FlowService from '../../services/FlowService';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import GraphService from '../../services/GraphService';
import { AadTokenProvider } from '@microsoft/sp-http';


export interface IReactFlowDashboardProps {
  displayMode: DisplayMode;
  flowService: FlowService;
  graphService: GraphService;
  provider : AadTokenProvider;
  context : WebPartContext;
  webpartTitle: string;
  environments: string[];
  setWebPartTitle: (value: string) => void;
}

export interface Items{
  id: string;
  environment : string;
  flowName : string;
  flowDisplayName : string;
  flowState : string;
  flowAuthor : string;
  flowTriggerUrl : string;
}


export interface IFlow {
  name: string;
  id: string;
  type: string;
  properties: any;
}