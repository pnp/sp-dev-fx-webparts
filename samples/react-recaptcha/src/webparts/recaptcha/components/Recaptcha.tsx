import * as React from 'react';
import styles from './Recaptcha.module.scss';
import { IRecaptchaProps } from './IRecaptchaProps';
import { escape } from '@microsoft/sp-lodash-subset';
import ReCAPTCHA from 'react-google-recaptcha';
import * as ReactDom from 'react-dom';
import { TextField, MaskedTextField,PrimaryButton,MessageBar, MessageBarType   } from 'office-ui-fabric-react';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder"
import { DisplayMode } from '@microsoft/sp-core-library';  
import * as strings from 'RecaptchaWebPartStrings';

export default class Recaptcha extends React.Component<IRecaptchaProps, {}> {

  public captcha:any;
  public _messageContainer:HTMLElement = undefined;
  
  public render(): React.ReactElement<IRecaptchaProps> {
    return (
      
      <div className={ styles.recaptcha }>
     {/* Show Placeholder control, when description web part property is not set */}  
     {this.props.sitekey == "" &&  
                <Placeholder iconName='Edit'  
                  iconText='Configure your web part'  
                  description='Please configure the web part.'  
                  buttonLabel='Configure'  
                  hideButton={this.props.displayMode === DisplayMode.Read}  
                  onConfigure={() => this._onConfigure()} /> 
              }  
  

      {/* Show description web part property, when set */} 
      {this.props.sitekey  &&  
        <div>
           <p>
        <TextField label="Enter your name" styles={{ fieldGroup: { width: 300 } }} />
        </p>
        <ReCAPTCHA ref={ (el) => { this.captcha = el; } }
        sitekey={escape(this.props.sitekey)}
        onChange={this.onChange} />
        <p>
            <p ref={(elm) => { this._messageContainer = elm; }}>
          </p>
        </p>

        <PrimaryButton text={strings.SubmitButtonLabel}  onClick={() => this.buttonClicked()}   />
          </div> 
      }
      </div>
    );
  }

  private _onConfigure() {
    // Context of the web part
    this.props.context.propertyPane.open();
  }

  public buttonClicked(): void {
    if(this.captcha.getValue())
    {

      ReactDom.unmountComponentAtNode(this._messageContainer);
      const element2 = React.createElement(
        MessageBar,
        {
          messageBarType:MessageBarType.success,
          isMultiline:false,
          dismissButtonAriaLabel:"Close"
        },
        "You data has been saved sucessfully"
      );
      //const camContainer = document.getElementById("camContainer")
      ReactDom.render(element2, this._messageContainer);     
    }
    
    else{
      const element2 = React.createElement(
        MessageBar,
        {
          messageBarType:MessageBarType.error,
          isMultiline:false,
          dismissButtonAriaLabel:"Close"
        },
        "Please select captcha."
      );
      //const camContainer = document.getElementById("camContainer")
      ReactDom.render(element2, this._messageContainer);     
    }
  }

  public onChange(value){
    console.log("Captcha value:", value);
  }
}
