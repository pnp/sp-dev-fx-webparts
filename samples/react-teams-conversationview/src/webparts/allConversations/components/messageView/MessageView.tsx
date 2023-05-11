import * as React from 'react';
import { ViewType } from '@microsoft/mgt-spfx';
import { Person } from '@microsoft/mgt-react/dist/es6/spfx';
import { ChatMessage as GraphChatMessage, ChatMessageAttachment } from "@microsoft/microsoft-graph-types";
import { Chat, ChatItem, ChatMessage, ExpandIcon,
    MentionIcon, ReplyIcon} from '@fluentui/react-northstar';
import { IGraphService } from '../../../../service/GraphService';
import styles from '.././AllConversations.module.scss';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReadMoreAndLess from 'react-read-more-less';

export interface IMessageViewProps {
    expandedMessageId:string;
    graphService : IGraphService;
    getMessageReply: (messageId: string) => Promise<void>;
    dtaaFilteredMessage: GraphChatMessage[];
    dtaaFilteredMessageData: GraphChatMessage[];
}

export const MessageView: React.FunctionComponent<IMessageViewProps> = (props: React.PropsWithChildren<IMessageViewProps>) => {
  
    /**
   * converts message body to string
   * @param html input body of message
   * @returns string formated text
   */
  const convertToPlain = (html:string):string => {
    const tempDivElement = document.createElement("div");
    tempDivElement.innerHTML = html;
    return tempDivElement.textContent || tempDivElement.innerText || "";
  }

  return (
    <div className='ms-Grid'>
            <div className="ms-Grid-row">
              {!!props.expandedMessageId &&
              props.dtaaFilteredMessageData.map((chatMessage:GraphChatMessage,index:number)=>
              chatMessage.from && chatMessage.from.user && <Chat>
              <ChatItem
                key={index}
                message={
                <ChatMessage
                actionMenu={{
                  iconOnly: true,
                  items: [
                    {
                      key: 'naviagateToMessage',
                      icon: <ExpandIcon onClick={()=> props.graphService.spcontext
                        .sdks.microsoftTeams.teamsJs.app.openLink(chatMessage.webUrl)} />,
                      title: 'naviagateToMessage',
                    },
                    {
                      key: 'viewReplies',
                      icon: <ReplyIcon onClick={()=>props.getMessageReply(chatMessage.id)} />,
                      title: 'viewReplies',
                    },
                  ].filter(t=>!!props.expandedMessageId ? t.key!=='viewReplies' : true)
                }}
                author={chatMessage.from.user.displayName}
                content={
                <div><ReadMoreAndLess
                            className="read-more-content"
                            charLimit={100}
                            readMoreText="Read more"
                            readLessText=" Read less"
                          >
                  {convertToPlain(chatMessage.body.content)}
                </ReadMoreAndLess>
                  <div className={styles.docWrapper}>
                    {
                      chatMessage.attachments && chatMessage.attachments.map((at:ChatMessageAttachment,
                        attachmentIndex:number) => 
                          <a key ={`attachment${index}-${attachmentIndex}`} style={{cursor:'pointer'}} onClick={() => 
                            props.graphService.spcontext.sdks.microsoftTeams.teamsJs.app.openLink(at.contentUrl)} >{at.name}</a>
                      )
                    }
                  </div>
                </div>} timestamp={chatMessage.createdDateTime} badge={chatMessage.mentions.length > 0 &&
                 {icon: <MentionIcon />}} />
                }
                gutter={<Person userId={chatMessage.from.user.id} view={ViewType.image} />}
                />
              </Chat>)}
              {props.dtaaFilteredMessage.map((chatMessage:GraphChatMessage,index:number)=>
            chatMessage.from && chatMessage.from.user && <Chat density="compact">
              <ChatItem
                key={index}
                message={
                <ChatMessage
                actionMenu={{
                  iconOnly: true,
                  items: [
                    {
                      key: 'naviagateToMessage',
                      icon: <ExpandIcon onClick={()=> props.graphService.spcontext
                        .sdks.microsoftTeams.teamsJs.app.openLink(chatMessage.webUrl)} />,
                      title: 'naviagateToMessage',
                    },
                    {
                      key: 'viewReplies',
                      icon: <ReplyIcon onClick={()=>props.getMessageReply(chatMessage.id)} />,
                      title: 'viewReplies',
                    },
                  ].filter(t=>!!props.expandedMessageId ? t.key!=='viewReplies' : true)
                }}
                author={chatMessage.from.user.displayName}
                content={
                <div><ReadMoreAndLess
                            className="read-more-content"
                            charLimit={100}
                            readMoreText="Read more"
                            readLessText=" Read less"
                          >
                  {convertToPlain(chatMessage.body.content)}
                </ReadMoreAndLess>
                  <div className={styles.docWrapper}>
                    {
                      chatMessage.attachments && chatMessage.attachments.map((at:ChatMessageAttachment,
                        attachmentIndex:number) => 
                          <a key ={`attachment${index}-${attachmentIndex}`} style={{cursor:'pointer'}} onClick={() => 
                            props.graphService.spcontext.sdks.microsoftTeams.teamsJs.app.openLink(at.contentUrl)} >{at.name}</a>
                      )
                    }
                  </div>
                </div>} 
                timestamp={new Date(chatMessage.createdDateTime).toLocaleString("en-us")} 
                badge={chatMessage.mentions.length > 0 && chatMessage.mentions.filter(t=>t.mentioned && t.mentioned.user &&
                   t.mentioned.user.id===props.graphService.spcontext.sdks.microsoftTeams.context.userObjectId).length > 0 &&
                 {icon: <MentionIcon />}} />
                }
                gutter={<Person key={`personKey${index}`} userId={chatMessage.from.user.id} view={ViewType.image} />}
                />
              </Chat>
              )}
            </div>
          </div>
  );
};