import * as React from 'react';
import styles from './ReactYammer.module.scss';
import { IReactYammerProps } from './IReactYammerProps';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import LoadingImage from './loading';
import IPraise from '../interface/IPraise';
import badges from './badges';

const ReactYammer: React.SFC<IReactYammerProps> = (props) => {

  const [loading, setLoading] = React.useState(false);
  const [nominee, setNominee] = React.useState("");
  const [nomineeName, setNomineeName] = React.useState("");
  const [icon, setIcon] = React.useState("");
  const [groups, setGroups] = React.useState<IDropdownOption[]>([]);
  const [comment, setComment] = React.useState("");
  const [groupId, setGroupId] = React.useState("");
  const [threadId,setThreadId] = React.useState("");
  const [messageBarStatus, setMessageBarStatus] = React.useState({
    type: MessageBarType.info,
    message:<span></span>,
    show: false
  });


  React.useEffect(() => {
    props.yammerProvider.getGroups().then(grps => {
      const options: IDropdownOption[] = grps.data.map(g => ({ key: g.id, text: g.full_name }));
      setGroups(options);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  const _getPeoplePickerItems = (items: any[]) => {
    setNomineeName(items[0].text);
    setNominee(items[0].secondaryText);
  };

  const _onIconChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    setIcon(item.text);
  };

  const _onGroupChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    setGroupId(item.key.toString());
  };

  const _postPraise = () => {
    const objPraise: IPraise = {
      icon,
      nominee,
      comment,
      groupId
    };
    setLoading(true);
    props.yammerProvider.postPraise(objPraise).then(response => {
      const threadId = response.data.messages[0].thread_id;
      setThreadId(threadId);
      clearControls();
      setMessageBarStatus({
        type: MessageBarType.success,
        message: <span>Your praise now been successfully added.<a target="_blank" href={`https://www.yammer.com/messages/${threadId}`}>See the praise on Yammer.</a></span>,
        show: true
      });
      setLoading(false);

    }).catch(error => {
      setMessageBarStatus({
        type: MessageBarType.error,
        message: <span>"Unfortunately we could not post your praise. Please try again later."</span>,
        show: true
      });
      setLoading(false);
    });
  };
  const clearControls = () => {
    setNominee("");
    setIcon("");
    setComment("");
  };

  const _onRenderOption = (option: IDropdownOption): JSX.Element => {
    return (
      <div>
        <img style={{ marginRight: '8px' }} src={require(`./assets/${option.key}.png`)} width={24} height={24} />

      </div>
    );
  };

  const _onRenderTitle = (options: IDropdownOption[]): JSX.Element => {
    const option = options[0];

    return (
      <div>
        <img style={{ marginTop: '4px' }} src={require(`./assets/${option.key}.png`)} width={24} height={24} />

      </div>
    );
  };

  return (
    <div className={styles.reactYammer}>
      <div>
        {
          loading && <LoadingImage />
        }
      </div>
      <div>
        {
          (messageBarStatus.show && !loading) &&
          <MessageBar messageBarType={messageBarStatus.type}>{
            messageBarStatus.message
          }</MessageBar>
        }
      </div>
      {
        !loading &&
        <div>
          <div>
            <PeoplePicker isRequired
              context={props.context}
              titleText="Who do you want to praise?"
              ensureUser={true}
              personSelectionLimit={1}
              groupName=""
              selectedItems={_getPeoplePickerItems}
              defaultSelectedUsers={[nominee]}
              showHiddenInUI={false}
              principalTypes={[PrincipalType.User]}
              resolveDelay={1000} />
            <TextField required maxLength={250} placeholder="Describe what they've done." label="What they've done" value={comment} multiline={true} rows={6} onChanged={(value) => setComment(value)} />

            <Dropdown required label="Group"
              options={groups} onChange={_onGroupChange} />

            <Dropdown required label="Icon"
            style={{width:"70px"}}
              onRenderOption={_onRenderOption}
              onRenderTitle={_onRenderTitle}
              options={badges} onChange={_onIconChange} />
          </div>

          <div className={styles.previewContainer} hidden={comment === "" && icon === "" && nominee === ""}>
            <span>Preview:</span>
            <div className={styles.previewBox}>
              <div>
                <img className={styles.previewIcon} src={require(`./assets/${icon ? icon : "star"}.png`)} width={32} height={32} />
                <p className={styles.previewTitle}>
                  Praised {nomineeName}
                </p>
                <p className={styles.previewComment}>
                  {
                    comment
                  }
                </p>
              </div>
            </div>
          </div>
          <PrimaryButton className={styles.btnSubmit} text="Post" title="Please fill in all required fields" onClick={_postPraise} disabled={comment === "" || icon === "" || nominee === "" || groupId === ""} />

        </div>
      }
    </div>
  );
};

export default ReactYammer;
