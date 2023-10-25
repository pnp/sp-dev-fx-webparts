import React from "react";
import { DefaultButton, PrimaryButton, Dialog, DialogFooter, IModalProps } from "@fluentui/react";
import { IButtonStrings, IDialogStrings } from "../Localization";

import * as strings from "CommonStrings";

export interface IConfirmDialogProps {
    show: boolean;
    onAccept: () => void;
    onReject: () => void;
    disabled?: boolean;
    strings?: IDialogStrings;
    headingTextOverride?: string;
    messageTextOverride?: string;
    acceptButtonStringsOverride?: IButtonStrings;
    rejectButtonStringsOverride?: IButtonStrings;
    hideRejectButton?: boolean;
}

export const ConfirmDialog: React.FC<IConfirmDialogProps> = (props: IConfirmDialogProps) => {
    const dialogStrings = props.strings || strings.ConfirmDialogDefaults;
    const heading = props.headingTextOverride || dialogStrings.HeadingText;
    const message = props.messageTextOverride || dialogStrings.MessageText;
    const acceptButtonStrings = props.acceptButtonStringsOverride || dialogStrings.AcceptButton;
    const rejectButtonStrings = props.rejectButtonStringsOverride || dialogStrings.RejectButton;
    const disabled = props.disabled || false;

    return (
        <Dialog
            hidden={!props.show}
            modalProps={{
                isBlocking: true
            } as IModalProps}
            dialogContentProps={{
                showCloseButton: false,
                title: heading,
                subText: message
            }}>

            <DialogFooter>
                <PrimaryButton
                    disabled={disabled}
                    text={acceptButtonStrings.Text}
                    secondaryText={acceptButtonStrings.Description}
                    onClick={props.onAccept} />
                {!props.hideRejectButton &&
                    <DefaultButton
                        disabled={disabled}
                        text={rejectButtonStrings.Text}
                        secondaryText={rejectButtonStrings.Description}
                        onClick={props.onReject} />
                }
            </DialogFooter>
        </Dialog>
    );
};