import { GraphHelper } from "../../../services/GraphHelper";
import { IMail } from "../../../models/IMail";

export interface ISaveAttachmentsProps {
  description: string;
  mail: IMail;
  graphHelper: GraphHelper;
}
