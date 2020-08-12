import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

import * as strings from 'ProfilePhotoEditorWebPartStrings';

import { IWebCamDialogProps, IWebCamDialogState } from './WebCamDialog.types';

import styles from './WebCamDialog.module.scss';

import Webcam from "react-webcam";

const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: "user"
};


export class WebCamDialog extends React.Component<IWebCamDialogProps, IWebCamDialogState> {
  private webcamRef: Webcam = undefined;

  public render(): React.ReactElement<IWebCamDialogProps> {
    return (
      <Dialog
        className={styles.webcamdialog}
        hidden={false}
        onDismiss={this.onDismiss}
        dialogContentProps={{
          type: DialogType.normal,
          title: strings.WebCamDialogTitle,
        }}
        maxWidth={'356px'}
        modalProps={{
          isBlocking: false
        }}
      >
          <Webcam
            audio={false}
            ref={(elm) => this.webcamRef = elm}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            imageSmoothing={true}
            onUserMedia={() => console.log("OnUserMedia")}
            onUserMediaError={() => console.log("OnUserMediaError")}
            screenshotQuality={0.92}
          />

        <DialogFooter>
          <PrimaryButton onClick={() => this.onCapture()} text={strings.CaptureButtonLabel} />
          <DefaultButton onClick={() => this.onDismiss()} text={strings.CancelButtonLabel} />
        </DialogFooter>
      </Dialog>
    );
  }

  private onCapture = () => {
    const imageSrc = this.webcamRef.getScreenshot();
    console.log("ImageSrc", imageSrc);
    this.props.onCapture(imageSrc);
  }

  private onDismiss = (_ev?: React.SyntheticEvent<HTMLElement, Event>) => {
    this.props.onDismiss();
  }
}
