import * as React from 'react';
import "@pnp/polyfill-ie11";
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { IContainerProps } from './IContainerProps';
import { useConstCallback } from '@uifabric/react-hooks';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
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
  //This is for IE 11 "find" issue
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
      value: function(predicate) {
      // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If IsCallable(predicate) is false, throw a TypeError exception.
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }

        // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
        // tslint:disable-next-line: use-named-parameter
        var thisArg = arguments[1];

        // 5. Let k be 0.
        var k = 0;

        // 6. Repeat, while k < len
        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kValue be ? Get(O, Pk).
          // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
          // d. If testResult is true, return kValue.
          var kValue = o[k];
          if (predicate.call(thisArg, kValue, k, o)) {
            return kValue;
          }
          // e. Increase k by 1.
          k++;
        }

        // 7. Return undefined.
        return undefined;
      }
    });
  }

  let defaultCategoryValue = DropdownOptions.Options.find(o => o.key === props.selectedCategory);
  const feedbackService = new FeedbackService();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  const [pageTitle, setPageTitle] = React.useState("");
  const [articleInfo, setArticleInfo] = React.useState<IArticleInfo>();
  const [txtValue, setTxtValue] = React.useState("");
  const [categoryValue, setCategoryValue] = React.useState((defaultCategoryValue) ? defaultCategoryValue.text : "");

  React.useEffect(()=>{

    feedbackService.getTitle(props.listitemid).then((res) => {
      setPageTitle(res);
    });
   feedbackService.getArticleInfo(props.listitemid).then((res) => {
    setArticleInfo(res);
  });
  }, []);


  const openPanel = React.useCallback(() => setIsOpen(true), [isOpen]);
  const dismissPanel = React.useCallback(() => setIsOpen(false), [isOpen]);

  const hideDialog = React.useCallback(() => setIsDialogVisible(false), [isDialogVisible]);
  const hideDialogAndPanel = () => {
    setIsOpen(false);
    setIsDialogVisible(false);
  };

   const handleSubmit = (event) => {
    event.preventDefault();
    let newDefaultCategory;
    if (!props.showCategory){
      newDefaultCategory = DropdownOptions.Options.find(o => o.key === props.selectedCategory);
    }
    if (props.listitemid == null){
      console.log("List item ID is null. Please run this on a site page.");
    }
    feedbackService.sendEmailToOwnerGroup(txtValue, props.listitemid, (newDefaultCategory) ? newDefaultCategory.text : categoryValue, props.currentUser.displayName, props.currentUser.email);
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
          <br></br>
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
