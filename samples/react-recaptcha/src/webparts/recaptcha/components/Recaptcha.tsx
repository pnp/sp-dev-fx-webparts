import * as React from 'react';
import styles from './Recaptcha.module.scss';
import { IRecaptchaProps } from './IRecaptchaProps';
import { escape } from '@microsoft/sp-lodash-subset';
import ReCAPTCHA from 'react-google-recaptcha';
import * as ReactDom from 'react-dom';
import { TextField, MaskedTextField,PrimaryButton,MessageBar, MessageBarType   } from 'office-ui-fabric-react';


export default class Recaptcha extends React.Component<IRecaptchaProps, {}> {

  public captcha:any;
  public _messageContainer:HTMLElement = undefined;
  
  public render(): React.ReactElement<IRecaptchaProps> {
    return (
      <div className={ styles.recaptcha }>
      <p>
        <TextField label="Enter your name" styles={{ fieldGroup: { width: 300 } }} />
        </p>
        <ReCAPTCHA ref={ (el) => { this.captcha = el; } }
        sitekey="6LeZV7oUAAAAALiIfCUnnrlXE0fYrcyvM9JHVN72"
        onChange={this.onChange} />
        <p>
       <div id="messageContainer"   ref={(elm) => { this._messageContainer = elm; }}>
        </div>
        </p>

        <PrimaryButton text="Submit"  onClick={() => this.buttonClicked()}   />
      </div>
    );
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
