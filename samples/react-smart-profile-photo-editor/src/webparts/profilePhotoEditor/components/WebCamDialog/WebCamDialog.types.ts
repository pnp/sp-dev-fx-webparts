export interface IWebCamDialogProps {
  /**
   * The DOM element to attach the dialog to
   */
  //domElement: any;
  //hidden: boolean;

  /**
   * Dismiss handler
   */
  onDismiss: () => void;
  onCapture: (string) => void;
}

export interface IWebCamDialogState {}
