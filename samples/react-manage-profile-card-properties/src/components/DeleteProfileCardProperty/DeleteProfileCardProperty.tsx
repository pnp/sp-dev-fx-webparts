import { AppContext, IAppContextProps } from "../../Common/AppContextProps";
import {
  DefaultButton,
  PrimaryButton,
} from "office-ui-fabric-react/lib/Button";
import { useConstCallback } from "@uifabric/react-hooks";
import React, { useContext, useEffect } from "react";
import { useProfileCardProperties } from "../../hooks/useProfileCardProperties";
import { IDeleteProfileCardPropertyProps } from "./IDeleteProfileCardPropertyProps";
import { IDeleteProfileCardPropertyState } from "./IDeleteProfileCardPropertyState";
import * as _ from "lodash";
import {
  Label,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  Dialog,
  DialogType,
  DialogFooter,
  IDialogContentProps,
} from "office-ui-fabric-react";
import strings from "ManageProfileCardPropertiesWebPartStrings";

// Component
// Delete Profile Property Component

export const DeleteProfileCardProperty: React.FunctionComponent<IDeleteProfileCardPropertyProps> = (
  props: IDeleteProfileCardPropertyProps
) => {
  const applicationContext: IAppContextProps = useContext(AppContext); // Get React Context
  const { displayPanel, onDismiss } = props;
  const { deleteProfileCardProperty } = useProfileCardProperties(); // Get method from hook

  const [state, setState] = React.useState<IDeleteProfileCardPropertyState>({
    isloading: true,
    hasError: false,
    errorMessage: "",
    isDeleting: false,
    displayPanel: displayPanel,
    disableDelete: false,
  });

  // On dismiss Panel
  const dismissPanel = useConstCallback(() => {
    setState({ ...state, displayPanel: false });
    onDismiss(false);
  });

  // Delete Profile Card Property
  const _onDelete = async (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    const { msGraphClient, organizationId } = applicationContext;
    setState({ ...state, isDeleting: true, disableDelete: true });
    try {
      await deleteProfileCardProperty(
        msGraphClient,
        organizationId,
        props.directoryPropertyName
      );
      // Return to list and refresh indicator true
      onDismiss(true);
    } catch (error) {
      const _errorMessage: string = error.message
        ? error.message
        : strings.DefaultErrorMessageText;
      setState({
        ...state,
        hasError: true,
        errorMessage: _errorMessage,
        isDeleting: false,
        disableDelete: false,
      });
      console.log(error);
    }
  };

  const dialogContentProps:IDialogContentProps = {
    type: DialogType.normal,
    title: "Delete Profile Card Property",
    // subText: `Do you want delete the Directory Property ${props.directoryPropertyName} from Card Profile ?`,
  };
  //************************************************************************************************* */
  // Render Control
  //************************************************************************************************* */
  return (
    <>
      <Dialog
        hidden={!state.displayPanel}
        onDismiss={dismissPanel}
        dialogContentProps={dialogContentProps}
        modalProps={{ isBlocking: true }}
      >
        {state.hasError ? (
          <MessageBar messageBarType={MessageBarType.error} isMultiline>
           Error on delete <strong>{props.directoryPropertyName} </strong>
            {state.errorMessage}
          </MessageBar>
        ) : (
          <Label>
            Do you want delete the Directory Property<strong> {props.directoryPropertyName} </strong> from Profile Card ?
          </Label>
        )}
        <DialogFooter>
          <PrimaryButton disabled={state.disableDelete} onClick={_onDelete}>
            {state.isDeleting ? (
              <Spinner size={SpinnerSize.xSmall}></Spinner>
            ) : (
              "Delete"
            )}
          </PrimaryButton>
          <DefaultButton onClick={dismissPanel} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  );
};
