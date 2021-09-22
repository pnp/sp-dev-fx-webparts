import * as React from 'react';
import styles from './RemoteEventReceiverManager.module.scss';
import { cloneDeep, escape } from '@microsoft/sp-lodash-subset';
import { IEventReceiver } from '../models/IEventReceiver';
import { IList } from '../models/IList';
import { ISharePointProvider, SharePointProvider } from '../providers/SharePointProvider';
import { ActionButton, DialogFooter, Dropdown, IDropdownOption, PrimaryButton, Spinner, SpinnerSize, Stack, Text, TextField } from 'office-ui-fabric-react';
import { WebPartContext } from '@microsoft/sp-webpart-base';


const SynchronizationOptions: IDropdownOption[] = [
  { key: 0, text: "DefaultSynchronization" },
  { key: 1, text: "Synchronous" },
  { key: 2, text: "Asynchronous" }
];

const EventTypeOptionsAsync: IDropdownOption[] = [
  { key: 10001, text: "ItemAdded" },
  { key: 10002, text: "ItemUpdated" },
  { key: 10003, text: "ItemDeleted" },
  { key: 10004, text: "ItemCheckedIn" },
  { key: 10005, text: "ItemCheckedOut" },
  { key: 10006, text: "ItemUncheckedOut" },
  { key: 10007, text: "ItemAttachmentAdded" },
  { key: 10008, text: "ItemAttachmentDeleted" },
  { key: 10009, text: "ItemFileMoved" },
  { key: 10010, text: "ItemFileConverted" },
];

const EventTypeOptionsSync: IDropdownOption[] = [
  { key: 1, text: "ItemAdding" },
  { key: 2, text: "ItemUpdating" },
  { key: 3, text: "ItemDeleteing" },
  { key: 4, text: "ItemCheckingIn" },
  { key: 5, text: "ItemCheckingOut" },
  { key: 6, text: "ItemUncheckingOut" },
  { key: 7, text: "ItemAttachmentAdding" },
  { key: 8, text: "ItemAttachmentDeleting" },
  { key: 9, text: "ItemFileMoveing" }
];


const getEventTypeOptions: (SynchronizationOption: number) => IDropdownOption[] = (SynchronizationOption: number) => {
  switch (SynchronizationOption) {
    case 1: return EventTypeOptionsSync;
    case 2: return EventTypeOptionsAsync;
    default:
      return [...EventTypeOptionsAsync, ...EventTypeOptionsSync];
  }
};

const NewEventReciever: IEventReceiver = {
  ReceiverAssembly: "Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c",
  ReceiverClass: "Microsoft.SharePoint.Webhooks.SPWebhookItemEventReceiver",
  ReceiverId: "",
  ReceiverName: "",
  SequenceNumber: 10000,
  Synchronization: 2,
  EventType: 10001,
  ReceiverUrl: ""
};

export interface IRemoteEventReceiverManagerProps {
  context: WebPartContext;
}

export interface IRemoteEventReceiverManagerState {
  step: Step;

  lists: IList[];
  selectedList: IList;

  eventReceivers: IEventReceiver[];
  selectedEventReceiver: IEventReceiver;

  isSaving: boolean;
}

export enum Step {
  SelectList,
  SelectEventReceiver,
  EditEventReceiver
}



export default class RemoteEventReceiverManager extends React.Component<IRemoteEventReceiverManagerProps, IRemoteEventReceiverManagerState> {
  private provider: ISharePointProvider;

  constructor(props) {
    super(props);

    this.state = {
      lists: null,
      selectedList: null,
      eventReceivers: null,
      selectedEventReceiver: null,
      step: Step.SelectList,
      isSaving: false,
    };

    this.provider = new SharePointProvider(this.props.context);
    this.loadInitialData();
  }

  private async loadInitialData() {
    let lists = await this.provider.getLists();
    this.setState({ lists: lists });
  }

  private async loadEventReceivers(Id: string) {
    let EventReceivers = await this.provider.getEventReceivers(Id);
    this.setState({ eventReceivers: EventReceivers });
  }

  private async addEventReceiver() {
    this.setState({ isSaving: true });
    await this.provider.addEventReceiver(this.state.selectedEventReceiver, this.state.selectedList.Id);
    this.setState({ isSaving: false, selectedEventReceiver: null, step: Step.SelectEventReceiver });
    this.loadEventReceivers(this.state.selectedList.Id);
  }

  private async deleteEventReceiver() {
    this.setState({ isSaving: true });
    await this.provider.deleteEventReceiver(this.state.selectedEventReceiver, this.state.selectedList.Id);
    this.setState({ isSaving: false, selectedEventReceiver: null, step: Step.SelectEventReceiver });
    this.loadEventReceivers(this.state.selectedList.Id);
  }


  public render(): React.ReactElement<IRemoteEventReceiverManagerProps> {
    const { selectedEventReceiver } = this.state;

    return (
      <div className={styles.remoteEventReceiverManager}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>

              {this.state.step == Step.SelectList &&
                <div>
                  <Text variant={"large"}>Please select a list</Text>

                  {this.state.lists == null &&
                    <Spinner label={"Loading lists..."} size={SpinnerSize.large} />
                  }

                  {this.state.lists &&
                    <Stack tokens={{ childrenGap: 5 }} styles={{ root: { background: "white" } }}>
                      {this.state.lists.map((list, index) => {
                        return <ActionButton iconProps={{ iconName: "CustomList" }} text={list.Title} onClick={() => {
                          this.setState({ selectedList: { ...list }, step: Step.SelectEventReceiver });
                          this.loadEventReceivers(list.Id);
                        }} />;
                      })}
                    </Stack>
                  }

                </div>
              }

              {this.state.step == Step.SelectEventReceiver &&
                <div>
                  <ActionButton iconProps={{ iconName: "Back" }} text={"Go back"} styles={{ textContainer: { color: "white" } }} onClick={() => this.setState({ eventReceivers: null, step: Step.SelectList, selectedList: null })} />
                  <br />
                  <Text variant={"large"}>Please select a event receiver</Text>
                  <br />

                  {this.state.eventReceivers == null &&
                    <Spinner label={"Loading event receives..."} size={SpinnerSize.large} />
                  }

                  {this.state.eventReceivers &&
                    <div>
                      <Stack tokens={{ childrenGap: 5 }} styles={{ root: { background: "white" } }}>
                        {this.state.eventReceivers.map((eventReceiver, index) => {
                          return <ActionButton iconProps={{ iconName: "Remote" }} text={eventReceiver.ReceiverName} onClick={() => {
                            this.setState({ selectedEventReceiver: cloneDeep(eventReceiver), step: Step.EditEventReceiver });
                          }} />;
                        })}
                      </Stack>
                      <ActionButton iconProps={{ iconName: "Add" }} text={"Add new"} styles={{ textContainer: { color: "white" } }} onClick={() => this.setState({ selectedEventReceiver: cloneDeep(NewEventReciever), step: Step.EditEventReceiver })} />
                    </div>
                  }

                </div>
              }

              {this.state.step == Step.EditEventReceiver &&

                <div>
                  <ActionButton iconProps={{ iconName: "Back" }} text={"Go back"} styles={{ textContainer: { color: "white" } }} onClick={() => this.setState({ selectedEventReceiver: null, step: Step.SelectEventReceiver })} />
                  <br />
                  <TextField disabled={selectedEventReceiver.ReceiverId != ""} label={"ReceiverAssembly"} value={selectedEventReceiver.ReceiverAssembly} />
                  <TextField disabled={selectedEventReceiver.ReceiverId != ""} label={"ReceiverClass"} value={selectedEventReceiver.ReceiverClass} />
                  <TextField disabled label={"ReceiverId"} value={selectedEventReceiver.ReceiverId} />
                  <TextField disabled={selectedEventReceiver.ReceiverId != ""} label={"ReceiverName"} value={selectedEventReceiver.ReceiverName} onChange={(ev, val) => this.setState({ selectedEventReceiver: { ...selectedEventReceiver, ReceiverName: val } })} />
                  <TextField disabled={selectedEventReceiver.ReceiverId != ""} label={"SequenceNumber"} type={"number"} value={selectedEventReceiver.SequenceNumber + ""} onChange={(ev, val) => this.setState({ selectedEventReceiver: { ...selectedEventReceiver, SequenceNumber: val as any as number } })} />
                  <Dropdown disabled={selectedEventReceiver.ReceiverId != ""} label={"Synchronization"} selectedKey={selectedEventReceiver.Synchronization} onChange={(ev, val) => this.setState({ selectedEventReceiver: { ...selectedEventReceiver, Synchronization: val.key as number } })} options={SynchronizationOptions} />
                  <Dropdown disabled={selectedEventReceiver.ReceiverId != ""} label={"EventType"} selectedKey={selectedEventReceiver.EventType} onChange={(ev, val) => this.setState({ selectedEventReceiver: { ...selectedEventReceiver, EventType: val.key as number } })} options={getEventTypeOptions(selectedEventReceiver.Synchronization)} />
                  <TextField disabled={selectedEventReceiver.ReceiverId != ""} label={"ReceiverUrl"} value={selectedEventReceiver.ReceiverUrl} onChange={(ev, val) => this.setState({ selectedEventReceiver: { ...selectedEventReceiver, ReceiverUrl: val } })} />
                  <DialogFooter>
                    <div style={{ display: "flex", placeContent: "flex-end" }}>
                      {this.state.isSaving && <Spinner size={SpinnerSize.small} styles={{ root: { marginRight: 5 } }} />}
                      {selectedEventReceiver.ReceiverId == "" &&
                        <PrimaryButton text={"Save"} onClick={() => this.addEventReceiver()} />
                      }

                      {selectedEventReceiver.ReceiverId != "" &&
                        <PrimaryButton text={"Delete"} onClick={() => this.deleteEventReceiver()} styles={{ root: { background: "red" } }} />
                      }
                    </div>
                  </DialogFooter>
                </div>
              }


            </div>
          </div>
        </div>
      </div >
    );
  }
}


