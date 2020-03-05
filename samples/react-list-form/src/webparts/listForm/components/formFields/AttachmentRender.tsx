import * as React from 'react';
import { ISPFormFieldProps } from './SPFormField';
import styles from './FormField.module.scss';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, Link, Label } from 'office-ui-fabric-react';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import * as strings from 'FormFieldStrings';
import { IconNames } from '@uifabric/icons';

interface IAttachmentProps {
    fieldProps: ISPFormFieldProps;
}

interface IAttachmentState {
    waitingImageUpload: boolean;
    fileBuffer: any;
    hideDialog: boolean;
    attachments: IAttachment[];
}

interface IAttachment {
    fileName: string;
    fileBuffer: ArrayBuffer;
    fileUrl?: string;
}

export class AttachmentRender extends React.Component<IAttachmentProps, IAttachmentState> {
    private inputRef;
    constructor(props: IAttachmentProps) {
        super(props);
        this.state = {
            waitingImageUpload: null,
            fileBuffer: null,
            hideDialog: true,
            attachments: new Array<IAttachment>()
        };
        this._handleFileSelect = this._handleFileSelect.bind(this);
        this._handleImageChange = this._handleImageChange.bind(this);
        this._deleteFileItem = this._deleteFileItem.bind(this);
        this.inputRef = React.createRef();
    }



    private _handleRemoveImage(ev) {

    }

    private _handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        const fileInformation = [];

        if (!event.target || !event.target.files) {
            return;
        }

        this.setState({ waitingImageUpload: true });
        const fileList = event.target.files;
        try {
            // Uploads will push to the file input's `.files` array. Get the last uploaded file.
            const latestUploadedFile = fileList.item(fileList.length - 1);
            let attachments = new Array<IAttachment>();
            for (var i = 0; i < fileList.length; i++) {
                let file = fileList.item(i);
                let contentsAsBuffer: any = await this.getFileAsBuffer(file);
                let attachment: IAttachment = {
                    fileBuffer: contentsAsBuffer,
                    fileName: file.name,
                    fileUrl: URL.createObjectURL(file)
                };
                attachments.push(attachment);
            }
            let allAttachments = this.state.attachments.concat(attachments);
            this.setState({
                attachments: allAttachments
            });


            const fileContentsAsBuffer: any = await this.getFileAsBuffer(latestUploadedFile);
            fileInformation.push({
                fileName: fileList[0].name,
                bufferLength: fileContentsAsBuffer.byteLength,
                buffer: fileContentsAsBuffer
            });
            this.props.fieldProps.valueChanged(fileInformation);
            //clearing input field
            this.inputRef.current.value = '';
        } catch (e) {
            this.setState({
                waitingImageUpload: false
            });
        }
    }
    public render() {
        let imagePreview = null;
        return (
            <div>
                {this._renderFilesList()}
                <Separator />
                <Link onClick={this._handleFileSelect}>Add Attachment</Link>
                <input id="inputFile1" ref={this.inputRef} type='file' onChange={this._handleImageChange} hidden />
            </div>
        )
    }

    private _handleFileSelect = (e) => {
        e.preventDefault();
        this.inputRef.current.click();
    }
    private _renderFilesList() {
        return this.state.attachments.map((attachment: IAttachment, index: number) => {
            let itemclass = mergeStyles({
                lineHeight: "32px"
            });
            let link = attachment.fileUrl ?
                <Link className={itemclass} href={attachment.fileUrl}>{attachment.fileName} </Link> :
                <Label className={itemclass}>{attachment.fileName}</Label>
            return (
                <div key={index}>
                    {link}
                    <IconButton iconProps={{ iconName: IconNames.Delete }} onClick={() => this._deleteFileItem(index)} />
                </div>
            )
        });
    }
    private _deleteFileItem(index: number): void {
        let attachments = new Array().concat(this.state.attachments);
        attachments.splice(index, 1);
        this.setState({ attachments });
    }
    private getFileAsDataURL = inputFile => {
        const temporaryFileReader = new FileReader();
        return new Promise((resolve, reject) => {
            temporaryFileReader.onerror = () => {
                temporaryFileReader.abort();
                reject(new DOMException("Problem parsing input file."));
            };
            temporaryFileReader.onload = () => {
                resolve(temporaryFileReader.result);
            };
            temporaryFileReader.readAsDataURL(inputFile);
        });
    }

    private getFileAsBuffer = inputFile => {
        const temporaryFileReader = new FileReader();
        return new Promise((resolve, reject) => {
            temporaryFileReader.onerror = () => {
                temporaryFileReader.abort();
                reject(new DOMException("Problem parsing input file."));
            };
            temporaryFileReader.onload = () => {
                resolve(temporaryFileReader.result);
            };
            temporaryFileReader.readAsArrayBuffer(inputFile);
        });
    }
}