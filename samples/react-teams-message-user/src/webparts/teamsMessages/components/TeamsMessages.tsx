import * as React from 'react';
import styles from './TeamsMessages.module.scss';
import { ITeamsMessagesProps } from './ITeamsMessagesProps';
import { escape } from '@microsoft/sp-lodash-subset';
import useMsGraphProvider, { IMSGraphInterface } from '../../services/msGraphProvider';

import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { BaseButton, Button, IPersonaProps, MessageBar, MessageBarType, PrimaryButton, TextField } from 'office-ui-fabric-react';


export const TeamsMessages: React.FunctionComponent<ITeamsMessagesProps> = (
  props: ITeamsMessagesProps
) => {
  const [user, setUser] = React.useState<IPersonaProps[]>();
  const [text, setText] = React.useState<string>("");
  const [success, setSuccess] = React.useState<boolean>(false);

  const [msGraphProvider, setMSGraphProvider] = React.useState<IMSGraphInterface>();


  const fetchMsGraphProvider = async () => {
    setMSGraphProvider(await useMsGraphProvider(props.webPartContext.msGraphClientFactory));
  };

  const _getPeoplePickerItems = (item: IPersonaProps[]) => {
    setUser(item);
  };

  const _onChangeFirstTextFieldValue = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setText(newValue);
  };

  const onClickSubmit = async (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button, MouseEvent>) => {
    event.preventDefault();
    let currentUserId = await msGraphProvider.getCurrentUserId();
    let userIdToSendMessage = await msGraphProvider.getUserId(user[0].secondaryText);
    let chatOfUser = await msGraphProvider.createUsersChat(userIdToSendMessage, currentUserId);
    let result = await msGraphProvider.sendMessage(chatOfUser, text);
    if (result) {
      setSuccess(true);
    }
  };

  React.useEffect(() => {
    fetchMsGraphProvider();
  }, []);

  return (
    <>
      {success &&
        <MessageBar
          messageBarType={MessageBarType.success}
          isMultiline={false}
        >
         Message send with success.
        </MessageBar>
      }
      <PeoplePicker
        context={props.webPartContext}
        titleText="People to send message"
        personSelectionLimit={1}
        onChange={_getPeoplePickerItems}
        principalTypes={[PrincipalType.User]}
        resolveDelay={1000} />
      <TextField
        label="Message to send"
        value={text}
        onChange={_onChangeFirstTextFieldValue}
      />
      <PrimaryButton
        style={{ marginTop: 10 }}
        onClick={onClickSubmit}>
        Submit
      </PrimaryButton>
    </>
  );
};
