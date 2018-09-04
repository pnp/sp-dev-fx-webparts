import * as React from 'react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

/**
 * Interface to implement the MessageComponent Webpart
 *
 * @export
 * @interface IMessageComponentProps
 */
export interface IMessageComponentProps {
  Message: string;
  Type: MessageBarType;
  Display: boolean;
}

/**
 * React MessageComponent for displaying the messages
 *
 * @export
 * @class MessageComponent
 * @extends {React.Component<IMessageComponentProps, any>}
 */
export default class MessageComponent extends React.Component<IMessageComponentProps, any> {

  /**
   *Creates an instance of MessageComponent.
   * @param {IMessageComponentProps} props
   * @memberof MessageComponent
   */
  public constructor(props: IMessageComponentProps) {
    super(props);
  }

  /**
   * Render method of the Message Component
   *
   * @returns {React.ReactElement<IMessageComponentProps>}
   * @memberof MessageComponent
   */
  public render(): React.ReactElement<IMessageComponentProps> {

    return (
      <div className={`ms-Grid-row`}>
        <div className={`ms-Grid-col ms-sm12`}>
          {
            this.props.Display &&
            <div>
              <MessageBar
                messageBarType={MessageBarType.error}
                isMultiline={false}
                dismissButtonAriaLabel="Close">
                {this.props.Message}
              </MessageBar>
            </div>
          }
        </div>
      </div>
    );
  }
}
