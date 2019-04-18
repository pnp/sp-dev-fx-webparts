
import {  panelMode } from '../../webparts/siteDesigns/components/IEnumPanel';
import { SiteDesignInfo, SiteScriptInfo } from '@pnp/sp';
import { ISiteScript } from '../../types/ISiteScript';
export interface IAddSiteScriptState{
 title:string;
 description:string;
 showError: boolean;
 errorMessage: string;
 readOnly: boolean;
 disableSaveButton: boolean;
 currentSiteScript: ISiteScript;
 hideDialog:boolean;
 saving:boolean;
}


