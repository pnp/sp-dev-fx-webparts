import GraphController from '../../../controller/GraphController';
import { IMail } from '../../../model/IMail';


export interface ITeamsProps {
  graphController: GraphController;
  mail: IMail;
  successCallback: (msg: string) => void;
  errorCallback: (msg: string) => void;
}