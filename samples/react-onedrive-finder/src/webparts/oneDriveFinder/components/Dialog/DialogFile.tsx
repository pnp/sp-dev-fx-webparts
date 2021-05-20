import * as React from 'react';
import { IDialogFileProps } from './IDialogFileProps';
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { File, ViewType, Person, PersonViewType } from '@microsoft/mgt-react';

export function DialogFile(props: IDialogFileProps) {
    let _queryString = "";
    const { className, open, fileItem, onClose } = props;

    const dialogStyles = { main: { maxWidth: 800 } };

    const dialogContentProps = {
        type: DialogType.normal,
        title: 'File Details',
    };

    const handleClose = () => () => {
        onClose();
    };

    const modalProps = {
        isBlocking: true,
    };

    const checkLink = () => {
        if (fileItem != null) {
            window.open(fileItem.webUrl, '_blank');
        }
    };
    if (fileItem != null) {
        _queryString = "/drives/" + fileItem.parentReference.driveId + "/items/" + fileItem.id;

    }

    return (
        <Dialog
            hidden={!open}
            onDismiss={handleClose()}
            dialogContentProps={dialogContentProps}
            styles={dialogStyles}
            modalProps={modalProps}>
            <File
                view={ViewType.threelines}
                fileQuery={_queryString}
                className={className}
            ></File>
            <Link onClick={checkLink} >File link</Link>
            <DialogFooter>
                <DefaultButton onClick={handleClose()} text="Close" />
            </DialogFooter>
        </Dialog>
    );
} 
