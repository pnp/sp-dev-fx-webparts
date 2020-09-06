import { IFilePickerResult } from "@pnp/spfx-controls-react/lib/FilePicker";
import {labelImage} from './IReactLabelImage';

export interface IReactZplViewerState {
  selectedFile?: IFilePickerResult;
  showSelectedFile?: boolean;
  zpl?: string;
  width?: number;
  height?: number;
  labelImage?: labelImage;
}
