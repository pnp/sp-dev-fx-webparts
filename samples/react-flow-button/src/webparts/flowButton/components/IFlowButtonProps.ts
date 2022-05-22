import { DisplayMode } from '@microsoft/sp-core-library';
import FlowClientService from '../services/FlowClientService';
import GraphClientService from '../services/GraphClientService';

export interface IFlowButtonProps {
  flowService: FlowClientService;
  graphService: GraphClientService;
  displayMode: DisplayMode;
  environments: string[];
  title: string;
  setTitle: (value: string) => void;
}
