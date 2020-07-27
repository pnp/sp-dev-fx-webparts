import * as React from 'react';
import styles from './EnhancedPowerApps.module.scss';
import { IEnhancedPowerAppsProps } from './IEnhancedPowerAppsProps';
import * as strings from 'EnhancedPowerAppsWebPartStrings';

/**
 * We use the placeholder to tell people they haven't configured the web part yet
 * */
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

/**
 * Used to provide support for theme variants
 */
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { IEnhancedPowerAppsState } from './IEnhancedPowerAppsState';

export default class EnhancedPowerApps extends React.Component<IEnhancedPowerAppsProps, IEnhancedPowerAppsState> {

  public render(): React.ReactElement<IEnhancedPowerAppsProps> {
    const {
      dynamicProp,
      themeVariant,
      themeValues,
      appWebLink,
      useDynamicProp,
      dynamicPropName,
      locale,
      border,
      height,
      width
     }  = this.props;

    // The only thing we need for this web part to be configured is an app link or app id
    const needConfiguration: boolean = !appWebLink;

    const { semanticColors }: IReadonlyTheme = themeVariant;

    // If we passed a dynamic property, add it as a query string parameter
    const dynamicPropValue: string = useDynamicProp && dynamicProp !== undefined ? `&${encodeURIComponent(dynamicPropName)}=${encodeURIComponent(dynamicProp)}`:'';
    
    // We can take an app id or a full link. We'll assume (for now) that people are passing a valid app URL
    // would LOVE to find an API to retrieve list of valid apps
    const appUrl: string = appWebLink && appWebLink.indexOf('https://') != 0 ? `https://apps.powerapps.com/play/${appWebLink}` : appWebLink;
    
    // Build the portion of the URL where we're passing theme colors
    let themeParams: string = "";

    if (themeValues && themeValues.length > 0) {
      themeValues.forEach((themeValue: string) => {
        try {
          
          const themeColor: string = semanticColors[themeValue];
          themeParams = themeParams + `&${themeValue}=${encodeURIComponent(themeColor)}`;
        } catch (e) {
          console.log(e);
        }  
      });
    }


    // Build the frame url
    const frameUrl: string = `${appUrl}?source=SPClient-EnhancedPowerAppsWebPart&amp;locale=${locale}&amp;enableOnBehalfOf=true&amp;authMode=onbehalfof&amp;hideNavBar=true&amp;${dynamicPropValue}${themeParams}&locale=${locale}`;

    console.log("URL", frameUrl);

    return (
      <div className={ styles.enhancedPowerApps } style={{height:`${height}px`}}>
        {needConfiguration &&
         <Placeholder
         iconName='PowerApps'
         iconText={strings.PlaceholderIconText}
         description={strings.PlaceholderDescription}
         buttonLabel={strings.PlaceholderButtonLabel}
         onConfigure={this.props.onConfigure} />}
         {!needConfiguration &&
         <>
        { this.props.appWebLink &&
        <iframe src={frameUrl} scrolling="no" allow="geolocation *; microphone *; camera *; fullscreen *;" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-forms allow-orientation-lock allow-downloads" width={this.props.width} height={height}
        frameBorder={border ? "1": "0"}
        ></iframe>
        }
         </>
         }
      </div>
    );
  }
}
