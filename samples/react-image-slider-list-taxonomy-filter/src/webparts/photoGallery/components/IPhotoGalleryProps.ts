import { IPickerTerms } from '@pnp/spfx-property-controls/lib/PropertyFieldTermPicker';
import { SPHttpClient } from '@microsoft/sp-http';  
import {IPhotoGallery} from '../model/IPhotoGallery'
export interface IPhotoGalleryProps {
  description: string;
  tagkeywords: IPickerTerms;
  siteurl:string;
  spHttpClient:SPHttpClient;

}
