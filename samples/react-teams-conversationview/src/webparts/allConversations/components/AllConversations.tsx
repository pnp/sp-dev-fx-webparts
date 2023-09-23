import 'office-ui-fabric-react/dist/css/fabric.css';
import { PrimaryButton } from 'office-ui-fabric-react';
import { User } from "@microsoft/microsoft-graph-types";
import * as React from 'react';
import { ITeamsMessage } from '../../../model/ITeamsMessage';
import styles from './AllConversations.module.scss';
import { IAllConversationsProps } from './IAllConversationsProps';
import { IAllConversationsState, ViewName } from './IAllConversationsState';
import { ArrowLeftIcon, Button, Provider, teamsTheme } from '@fluentui/react-northstar';
import { Filter } from './filter/Filter';
import { MessageView } from './messageView/MessageView';
import { TableView } from './tableView/TableView';
import { HeaderButton } from './headerButton/HeaderButton';


export default class AllConversations extends React.Component<IAllConversationsProps, IAllConversationsState> {

  /**
   * constructor
   */
  public constructor(props: IAllConversationsProps) {
    super(props);
    // eslint-disable-next-line no-void
    void this.getTeamsMessages();
    this.state={
      allChatMessage:[],
      filteredMessage:[],
      nextLink:'',
      expandedMessageId:'',
      allRepliedMessage:[],
      filteredRepliedMessage:[],
      isFilterOpen: true,
      viewName: ViewName.Grid,
      isLoading: true
    }
  }

  /**
   * function to set the view name
   * @param viewName name of the view to be set
   */
  public setView = (viewName:ViewName):void =>{
    this.setState({viewName:viewName});
  }

  /**
   * To open close the filter panel 
  */
  public flipFilterPanel = (isOpen:boolean):void => {
    this.setState({isFilterOpen: isOpen});
  }

  /**
   * Fetch the Messages when clicked on load more
   */
  private getLoadMoreData = async (): Promise<void> => {
    try {
      const initialMessage:ITeamsMessage = await this.props.graphService.getNextData(this.state.nextLink);
      console.log(initialMessage);
      if(!!initialMessage['@odata.nextLink']){
        this.setState({nextLink:initialMessage['@odata.nextLink']});
        await this.getLoadMoreData();
      }else{
        this.setState({nextLink:'', isLoading:false});
      }
      if(initialMessage.value.length > 0){
        let tempAllChatMessage = this.state.allChatMessage;
        tempAllChatMessage = tempAllChatMessage.concat(initialMessage.value);
        this.setState({allChatMessage:tempAllChatMessage});
      }
    } catch (error) {
      console.error(error);
    }
  }
 
  /**
   * Fetch the initial Message and not on load more
   */
  private getTeamsMessages = async (): Promise<void> => {
    try {
      const groupId = this.props.graphService.spcontext.sdks.microsoftTeams.context.groupId;
      const channelId = this.props.graphService.spcontext.sdks.microsoftTeams.context.channelId;
      const initialMessage:ITeamsMessage = await this.props.graphService.getMessages(groupId, channelId);
      console.log(initialMessage);
      if(!!initialMessage['@odata.nextLink']){
        this.setState({nextLink:initialMessage['@odata.nextLink']});
        await this.getLoadMoreData();
      }else{
        this.setState({nextLink:'', isLoading: false})
      }
      if(initialMessage.value.length > 0){
        this.setState({allChatMessage:initialMessage.value, filteredMessage: initialMessage.value});
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Fetch the replies for the selected message
   * @param messageId selected message to get replies
   */
  private getMessageReply = async (messageId:string): Promise<void> => {
    try {
      const groupId = this.props.graphService.spcontext.sdks.microsoftTeams.context.groupId;
      const channelId = this.props.graphService.spcontext.sdks.microsoftTeams.context.channelId;
      const initialReplies:ITeamsMessage = await this.props.graphService.getMessagesReplies(groupId, channelId, messageId);
      console.log(initialReplies);
      this.setState({expandedMessageId:messageId,allRepliedMessage:initialReplies.value, filteredRepliedMessage: initialReplies.value})
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * For filtering the data based on the selected filters
   * @param searchText 
   */
  private onFilter = (searchText:string,fromDate: Date, toDate: Date, onlyAttachment: boolean,
    fromUser:Array<User>, mentionedUser:Array<User>):void => {
    let tempMessages = !!this.state.expandedMessageId ? this.state.allRepliedMessage : this.state.allChatMessage;
    if(!!searchText){
      tempMessages = tempMessages.filter(t=>t.body.content.includes(searchText));
    }
    if(!!fromDate){
      tempMessages = tempMessages.filter(t=>new Date(t.createdDateTime) >= fromDate);
    }
    if(!!toDate){
      tempMessages = tempMessages.filter(t=>new Date(t.createdDateTime) <= toDate);
    }
    if(onlyAttachment){
      tempMessages = tempMessages.filter(t=>t.attachments.length > 0);
    }
    if(fromUser.length > 0){
      fromUser.map(u=>{
        tempMessages = tempMessages.filter(t=> t.from && t.from.user && t.from.user.id===u.id);
      });
    }
    if(mentionedUser.length > 0){
      mentionedUser.map(u=>{
        tempMessages = tempMessages.filter(t=> t.mentions.length > 0 && t.mentions.findIndex(m=> m.mentioned && m.mentioned.user 
          && m.mentioned.user.id===u.id) > -1);
      });
    }
    if(!!this.state.expandedMessageId){
      this.setState({filteredRepliedMessage:tempMessages});
    }else{
    this.setState({filteredMessage:tempMessages});
    }
  }

  public render(): React.ReactElement<IAllConversationsProps> {
    const {
      hasTeamsContext
    } = this.props;

    const dtaaFilteredMessage = !!this.state.expandedMessageId ? this.state.filteredRepliedMessage : this.state.filteredMessage;
    const dtaaFilteredMessageData = !!this.state.expandedMessageId ? 
    this.state.allChatMessage.filter(t=>t.id===this.state.expandedMessageId) : [];

    return (
      <Provider theme={teamsTheme}>
        <section className={`${styles.allConversations} ${hasTeamsContext ? styles.teams : ''}`} >
          <HeaderButton flipFilterPanel={this.flipFilterPanel} setView={this.setView} />
          <Filter allChatMessage={dtaaFilteredMessage} onFilter={this.onFilter} 
          isOpen={this.state.isFilterOpen} flipFilterPanel={this.flipFilterPanel} />
          {!!this.state.expandedMessageId && 
            <Button icon={<ArrowLeftIcon />} content="Back" 
              onClick={()=>this.setState({expandedMessageId:'',allRepliedMessage:[],filteredRepliedMessage:[]})} text />}
         {this.state.viewName === ViewName.Grid && <MessageView dtaaFilteredMessage={dtaaFilteredMessage} 
          dtaaFilteredMessageData={dtaaFilteredMessageData} graphService={this.props.graphService} expandedMessageId={this.state.expandedMessageId}
          getMessageReply={this.getMessageReply} />}
          {this.state.viewName === ViewName.Table && <TableView dtaaFilteredMessage={dtaaFilteredMessage} 
          dtaaFilteredMessageData={dtaaFilteredMessageData} graphService={this.props.graphService} expandedMessageId={this.state.expandedMessageId}
          getMessageReply={this.getMessageReply}/>}
        {!!this.state.nextLink && !this.state.expandedMessageId && !this.state.isLoading &&
        <div className={styles.loadMoreWrapper}>
          <PrimaryButton text="Load More" onClick={() => this.getLoadMoreData()} className={styles.PrimaryButtonNext} />
          </div>
          }
        </section>
      </Provider>
    );
  }
}
