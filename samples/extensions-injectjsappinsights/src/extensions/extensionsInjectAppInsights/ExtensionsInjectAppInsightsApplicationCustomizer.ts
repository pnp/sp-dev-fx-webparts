import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';

import * as strings from 'extensionsInjectAppInsightsStrings';

const LOG_SOURCE: string = 'ExtensionsInjectAppInsightsApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IExtensionsInjectAppInsightsApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class ExtensionsInjectAppInsightsApplicationCustomizer
  extends BaseApplicationCustomizer<IExtensionsInjectAppInsightsApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    return Promise.resolve<void>();
  }

  @override
  public onRender(): void {
   let html: string = '';
    html+= `var appInsights=window.appInsights||function(config){
              function i(config){t[config]=function(){var i=arguments;t.queue.push(function(){t[config].apply(t,i)})}}var t={config:config},u=document,e=window,o="script",s="AuthenticatedUserContext",h="start",c="stop",l="Track",a=l+"Event",v=l+"Page",y=u.createElement(o),r,f;y.src=config.url||"https://az416426.vo.msecnd.net/scripts/a/ai.0.js";u.getElementsByTagName(o)[0].parentNode.appendChild(y);try{t.cookie=u.cookie}catch(p){}for(t.queue=[],t.version="1.0",r=["Event","Exception","Metric","PageView","Trace","Dependency"];r.length;)i("track"+r.pop());return i("set"+s),i("clear"+s),i(h+a),i(c+a),i(h+v),i(c+v),i("flush"),config.disableExceptionTracking||(r="onerror",i("_"+r),f=e[r],e[r]=function(config,i,u,e,o){var s=f&&f(config,i,u,e,o);return s!==!0&&t["_"+r](config,i,u,e,o),s}),t
              }({
                  instrumentationKey:"b4cf6d1c-5d38-48ce-ac4e-8a7802f2a1a0",
                  enableDebug: true,
              })
              window.appInsights=appInsights;
              appInsights.trackPageView();`;
    let head: any = document.getElementsByTagName("head")[0] || document.documentElement,
    script = document.createElement("script");
    script.type = "text/javascript";

    try {
        // doesn't work on ie...
        console.log('Append child');
        script.appendChild(document.createTextNode(html));
    } 
    catch (e) {
        // IE has funky script nodes
        console.log('Append child catch');
        script.text = html;
    }

    console.log('Right before inserting');
    head.insertBefore(script, head.firstChild);
    console.log('Before executing');
    head.removeChild(script);
  }
}
