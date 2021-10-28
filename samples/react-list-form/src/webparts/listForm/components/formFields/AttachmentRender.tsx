import * as React from 'react';
import { Link, Label } from 'office-ui-fabric-react';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { IconNames } from '@uifabric/icons';
import { isEqual } from '@microsoft/sp-lodash-subset';
import { IAttachment } from "../../../../types/IAttachment";
import { ControlMode } from '../../../../common/datatypes/ControlMode';

interface IAttachmentProps {
    controlMode: ControlMode;
    value: any;
    valueChanged(newValue: any): void;
}

interface IAttachmentState {
    waitingImageUpload: boolean;
    fileBuffer: any;
    hideDialog: boolean;
    attachments: IAttachment[];
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
        this._handleFileInputChange = this._handleFileInputChange.bind(this);
        this._deleteFileItem = this._deleteFileItem.bind(this);
        this.inputRef = React.createRef();
    }

    public componentDidUpdate(prevProps: IAttachmentProps, prevState: IAttachmentState) {
        switch (this.props.controlMode) {
            case ControlMode.New:
                if (!isEqual(prevProps.value, this.props.value)) {
                    this.setState({
                        attachments: this.props.value || [],
                    });
                }
                break;
            case ControlMode.Display:
            case ControlMode.Edit:
                //Component Value property got updated from List State
                if (this.props.value
                    && this.props.value.Attachments
                    && this.props.value.Attachments.length > 0
                    && this.state.attachments.length == 0
                    && prevState.attachments.length == 0) {
                    this.setState({ attachments: this.props.value.Attachments });
                }
                break;
        }

        if (this.state.attachments.length < prevState.attachments.length) {
            this.props.valueChanged(this.state.attachments);
        }
    }
    public render() {
        return (
            <div>
                {this._renderFilesList()}
                {this.props.controlMode != ControlMode.Display &&
                    <React.Fragment>
                        <Separator />
                        <Link onClick={this._handleFileSelect}>Add Attachment</Link>
                        <input id="inputFile1" ref={this.inputRef} type='file' onChange={this._handleFileInputChange} hidden />
                    </React.Fragment>
                }
            </div>
        );
    }

    private _handleFileSelect = (e) => {
        e.preventDefault();
        this.inputRef.current.click();
    }
    private _handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        if (!event.target || !event.target.files) {
            return;
        }
        let attachments = new Array<IAttachment>();
        for (var i = 0; i < event.target.files.length; i++) {
            let file = event.target.files.item(i);
            if (!this.state.attachments.some(attachment => attachment.FileName == file.name)) {
                let contentsAsBuffer: any = await this._getFileAsBuffer(file);
                let attachment: IAttachment = {
                    FileBuffer: contentsAsBuffer,
                    FileName: file.name,
                    RedirectUrl: URL.createObjectURL(file)
                };
                attachments.push(attachment);
            }
        }
        let allAttachments = this.state.attachments.concat(attachments);
        this.setState({
            attachments: allAttachments
        });
        this.props.valueChanged(allAttachments);
        //Clear Input field
        this.inputRef.current.value = '';
    }
    private _renderFilesList() {
        return this.state.attachments.map((attachment: IAttachment, index: number) => {
            let itemclass = mergeStyles({
                lineHeight: "32px"
            });
            let link = attachment.RedirectUrl ?
                <Link className={itemclass} target="_blank" href={attachment.RedirectUrl.replace("1https://", "https://")}>{attachment.FileName} </Link> :
                <Label className={itemclass}>{attachment.FileName}</Label>;
            return (
                <div key={index}>
                    {link}
                    {this.props.controlMode != ControlMode.Display &&
                        <IconButton iconProps={{ iconName: IconNames.Delete }} onClick={() => this._deleteFileItem(index)} />}
                </div>
            );
        });
    }
    private _deleteFileItem(index: number): void {
        let attachments = new Array().concat(this.state.attachments);
        attachments.splice(index, 1);
        this.setState({ attachments });
    }
    private _getFileAsBuffer = inputFile => {
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