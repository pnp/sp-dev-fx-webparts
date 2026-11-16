import * as React from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Dialog, DialogFooter, DialogType } from '@fluentui/react/lib/Dialog';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { IContainerProps } from './IContainerProps';
import { TextField } from '@fluentui/react/lib/TextField';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { FeedbackService } from '../../../../services/feedback.service';
import { DropdownOptions } from '../../DropdownOptions';
import * as strings from 'FeedbackWebPartStrings';
import { IArticleInfo } from '../../../../models/IArticleInfo';

const buttonStyles = { root: { marginRight: 8 } };
const dialogContentProps = {
  type: DialogType.normal,
  title: 'Feedback successfully submitted.',
};
const dialogModalProps = {
  isBlocking: false,
  styles: { main: { maxWidth: 450 } },
};
const options: IDropdownOption[] = DropdownOptions.Options;


export const Container: React.FunctionComponent<IContainerProps> = props => {
  const defaultCategoryValue = DropdownOptions.Options.find(o => o.key === props.selectedCategory);
  const feedbackService = new FeedbackService();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  const [pageTitle, setPageTitle] = React.useState("");
  const [, setArticleInfo] = React.useState<IArticleInfo>();
  const [txtValue, setTxtValue] = React.useState("");
  const [categoryValue, setCategoryValue] = React.useState((defaultCategoryValue) ? defaultCategoryValue.text : "");

  React.useEffect(()=>{

    feedbackService.getTitle(props.listitemid).then((res) => {
      setPageTitle(res);
    }).catch(() => undefined);
   feedbackService.getArticleInfo(props.listitemid).then((res) => {
    setArticleInfo(res);
  }).catch(() => undefined);
  }, []);


  const openPanel = React.useCallback((): void => setIsOpen(true), [isOpen]);
  const dismissPanel = React.useCallback((): void => setIsOpen(false), [isOpen]);

  const hideDialog = React.useCallback((): void => setIsDialogVisible(false), [isDialogVisible]);
  const hideDialogAndPanel = (): void => {
    setIsOpen(false);
    setIsDialogVisible(false);
  };

   const handleSubmit = (event): void => {
    event.preventDefault();
    let newDefaultCategory;
    if (!props.showCategory){
      newDefaultCategory = DropdownOptions.Options.find(o => o.key === props.selectedCategory);
    }
    if (props.listitemid === null){
      console.log("List item ID is null. Please run this on a site page.");
    }
    feedbackService.sendEmailToOwnerGroup(txtValue, props.listitemid, (newDefaultCategory) ? newDefaultCategory.text : categoryValue, props.currentUser.displayName, props.currentUser.email).catch(() => undefined);
    dismissPanel();
    setIsDialogVisible(true);
    setCategoryValue(defaultCategoryValue.text);
    setTxtValue("");
  };

  return (
    <div>
      <DefaultButton style={{
                color: props.themeVariant.semanticColors.buttonText
              }} text={unescape(props.buttonLabel)} onClick={openPanel} />
      <Panel
        isLightDismiss
        isOpen={isOpen}
        type={PanelType.medium}
        onDismiss={dismissPanel}
        headerText={strings.PanelHeaderText + pageTitle}
        closeButtonAriaLabel="Close"
      >
        <form onSubmit={handleSubmit}>
          <p>{strings.Feedback_Instructions}</p>
          <Dropdown label={(props.showCategory) ? strings.FeedbackCategory_Label : ""} options={options} defaultSelectedKey={props.selectedCategory} hidden={(!props.showCategory)}
          onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {setCategoryValue(option.text);}}/>
          <TextField name="feedbackTxt" multiline rows={8} value={txtValue} label={strings.FeedbackBox_Label}
          onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) =>
          {setTxtValue(newValue);}}/>
          <br />
          <div>
          <PrimaryButton type="submit" styles={buttonStyles} disabled={(txtValue.length > 10) ? false : true}>
            {strings.ButtonText_Submit}
          </PrimaryButton>
          <DefaultButton onClick={dismissPanel}>{strings.ButtonText_Cancel}</DefaultButton>
          </div>
          </form>
      </Panel>
      <Dialog
        hidden={!isDialogVisible}
        onDismiss={hideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={dialogModalProps}
      >
        <DialogFooter>
          <PrimaryButton onClick={hideDialogAndPanel} text={strings.ButtonText_Ok} />
        </DialogFooter>
      </Dialog>
    </div>
  );
};
