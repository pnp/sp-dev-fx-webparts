import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'ReferenceInjectorApplicationCustomizerStrings';

const LOG_SOURCE: string = 'ReferenceInjectorApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IReferenceInjectorApplicationCustomizerProperties {
  // This is an example; replace with your own property
  jsfiles:any[];
  cssfiles:any[];
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class ReferenceInjectorApplicationCustomizer
  extends BaseApplicationCustomizer<IReferenceInjectorApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    if(this.properties.jsfiles)
    {
      this.properties.jsfiles.forEach(element => {
        let JsTag: HTMLScriptElement = document.createElement("script");
         JsTag.src = element.FilePath;
         
        JsTag.type = "text/javascript";
       document.body.appendChild(JsTag);  
      });
      
    }

    if(this.properties.cssfiles){

      this.properties.cssfiles.forEach(element => {
        let cssLink: HTMLLinkElement = document.createElement("link");
        cssLink.href = element.FilePath;
        cssLink.type = "text/css";
        cssLink.rel = "stylesheet";
        document.body.appendChild(cssLink);
      });
     
    }
    return Promise.resolve();
  }
}
