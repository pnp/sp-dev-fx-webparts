import * as React from 'react';
import { IEditLinkProps } from './IEditLinkProps';
import { IEditLinkState } from './IEditLinkState';
import {
	Stack,
	TextField,
	Dialog,
	DialogType,
	DialogFooter,
	PrimaryButton,
	DefaultButton,

} from 'office-ui-fabric-react';
import * as tsStyles from './EditLinkStyles';
import { ITaskExternalReference } from '../../services/ITaskExternalReference';
import { ITaskDetails } from '../../services/ITaskDetails';
import { utilities } from '../../utilities';
import  *  as strings from 'MyTasksWebPartStrings';

export class EditLink extends React.Component<IEditLinkProps, IEditLinkState> {
 private  _newReferences: ITaskExternalReference = {} as ITaskExternalReference;
 private _taskDetails:ITaskDetails = {} as ITaskDetails;
 private _originalReferenceKey:string = '';
 private _util = new utilities();
	constructor(props: IEditLinkProps) {
		super(props);

		this.state = {
			hideDialog: !this.props.displayDialog,
      disableSaveButton: true,
      link:'',
      linkLabel:'',

    };

    this._taskDetails = this.props.taskDetails;

	}

public componentWillMount(): void {
    const  link = this.props.link;
    const fileFullUrl: string =(`${link}`).replace(/\./g, '%2E').replace(/\:/g, '%3A');
    const  reference  =  this._taskDetails.references[fileFullUrl];
    this._originalReferenceKey = fileFullUrl;
    this.setState({link: link.replace('https%3A//','').replace('https://',''), linkLabel:reference.alias, disableSaveButton:false});
}

	private _closeDialog = (ev?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		this.setState({ hideDialog: true });
		this.props.onDismiss(this._taskDetails);
  }


  private _onSave =  async (ev?: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    try {
      let { link, linkLabel } = this.state;
      const hasHttps = link.indexOf('https://') !== -1 ? true : false;
      if (!hasHttps){
        link = `https://${link}`;
      }

      const fileFullUrl: string =
        (`${decodeURIComponent(link)}`).replace(/\./g, '%2E').replace(/\:/g, '%3A')+ '?web=1';
        if (  this._originalReferenceKey !== fileFullUrl){
          delete this._taskDetails.references[this._originalReferenceKey];
          this._newReferences[this._originalReferenceKey] = null;
        }

        this._taskDetails.references[fileFullUrl] = {
        alias: linkLabel ? linkLabel : link,
        '@odata.type': '#microsoft.graph.plannerExternalReference',
        type:  await this._util.getFileType(link),
        previewPriority: ' !'
      };

      for (const referenceKey of Object.keys(this._taskDetails.references)) {
        const originalReference = this._taskDetails.references[referenceKey];
        this._newReferences[referenceKey] = {
          alias: originalReference.alias,
          '@odata.type': '#microsoft.graph.plannerExternalReference',
          type: originalReference.type,
          previewPriority: ' !'
        };
      }

      const updateTaskDetails = await this.props.spservice.updateTaskDetailsProperty(
        this.props.taskDetails.id,
        'References',
        this._newReferences,
        this.props.taskDetails['@odata.etag']
      );
      this._taskDetails = updateTaskDetails;
     // this._taskDetails.references = this._newReferences;
      this._closeDialog();
    } catch (error) {
      console.log(error);
    }
  }

  private _onUrlCHange =  (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue:string) => {
    this.setState({disableSaveButton :   newValue.length > 0 ? false : true, link: newValue});
  }

  private _onChangeLabel =  (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue:string) => {
    this.setState({ linkLabel: newValue});
  }

	public render(): React.ReactElement<IEditLinkProps> {
		return (
			<div>
				<Dialog
					hidden={this.state.hideDialog}
					onDismiss={this._closeDialog}
					minWidth={430}
					maxWidth={430}
					dialogContentProps={{
						type: DialogType.normal,
						title: strings.AddLinkLabel
					}}
					modalProps={{
						isBlocking: true,
						styles: tsStyles.modalStyles
						//  topOffsetFixed: true
					}}>
					<Stack gap='20'>
						<TextField // prettier-ignore
							label={strings.AddressLabel}
              placeholder={strings.LinkWebAddressPlaceHolder}
              value={this.state.link}
							prefix='https://'
							borderless
              ariaLabel='Url'
              onChange={this._onUrlCHange}
							styles={tsStyles.textFielUrlStyles}
						/>
						<TextField // prettier-ignore
							label={strings.TextToDisplayLabel}
							placeholder={strings.LinkNameHerePlaceHolder}

              value={this.state.linkLabel}
              borderless
              onChange={this._onChangeLabel}
							styles={tsStyles.textFielUrlStyles}
						/>
					</Stack>
					<div style={{ marginTop: 45 }}>
						<DialogFooter>
							<PrimaryButton onClick={this._onSave} text={strings.SaveLabel}  disabled={this.state.disableSaveButton} />
							<DefaultButton onClick={this._closeDialog} text={strings.CancelLabel} />
						</DialogFooter>
					</div>
				</Dialog>
			</div>
		);
	}
}
