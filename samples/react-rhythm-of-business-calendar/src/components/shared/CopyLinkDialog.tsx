import React, { FC, FocusEvent, useState, RefObject, useEffect, MutableRefObject, useCallback, useMemo } from "react";
import { Dialog, format, IDialogContentProps, TextField } from "@fluentui/react";
import { useConst, useBoolean } from "@fluentui/react-hooks";

import { CopyLinkDialog as strings } from "ComponentStrings";

export interface ICopyLinkDialog {
    open(link: string, itemTitle: string): void;
}

interface IProps {
    componentRef: RefObject<ICopyLinkDialog>;
}

export const CopyLinkDialog: FC<IProps> = ({ componentRef }) => {
    const [isOpen, { setTrue: show, setFalse: hide }] = useBoolean(false);
    const [itemTitle, setItemTitle] = useState("");
    const [link, setLink] = useState("");

    const open = useCallback((link: string, itemTitle: string) => {
        setItemTitle(itemTitle);
        setLink(link);
        show();
    }, [setItemTitle, setLink]);

    useEffect(() => {
        (componentRef as MutableRefObject<ICopyLinkDialog>).current = { open };
        return () => { (componentRef as MutableRefObject<ICopyLinkDialog>).current = undefined; };
    }, [componentRef, open]);

    const onLinkTextFieldFocus = useCallback((event: FocusEvent<HTMLInputElement>) => {
        // event properties must be copied to use async
        const target = event.target;
        setTimeout(() => target.select(), 0);
    }, []);

    const onLinkTextFieldCopy = useCallback(() => setTimeout(hide, 0), []);

    const dialogContentProps = useMemo(() => {
        return {
            title: format(strings.Title, itemTitle),
            subText: strings.SubText
        } as IDialogContentProps;
    }, [itemTitle])

    return (
        <Dialog
            hidden={!isOpen}
            dialogContentProps={dialogContentProps}
            modalProps={useConst({
                isBlocking: false
            })}
            onDismiss={hide}
        >
            <TextField
                autoFocus
                readOnly
                defaultValue={link}
                ariaLabel={strings.Field_Url.AriaLabel}
                onFocus={onLinkTextFieldFocus}
                onCopy={onLinkTextFieldCopy}
            />
        </Dialog >
    );
};