import { IColumn, SelectionMode, DetailsList } from 'office-ui-fabric-react';
import * as React from 'react';
import { ChatMessage as GraphChatMessage, ChatMessageAttachment } from "@microsoft/microsoft-graph-types";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReadMoreAndLess from 'react-read-more-less';
import { ViewType } from '@microsoft/mgt-spfx';
import { Person } from '@microsoft/mgt-react/dist/es6/spfx';
import { IGraphService } from '../../../../service/GraphService';
import styles from '.././AllConversations.module.scss';
import { ExpandIcon, ReplyIcon } from '@fluentui/react-northstar';

export interface ITableViewProps {
    expandedMessageId:string;
    graphService : IGraphService;
    getMessageReply: (messageId: string) => Promise<void>;
    dtaaFilteredMessage: GraphChatMessage[];
    dtaaFilteredMessageData: GraphChatMessage[];
}

export const TableView: React.FunctionComponent<ITableViewProps> = (props: React.PropsWithChildren<ITableViewProps>) => {

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

const columns: IColumn[] = [
    {
        key: 'column1',
        name: 'From',
        minWidth: 200,
        maxWidth: 200,
        isResizable: true,
        isCollapsible: true,
        onRender: (chatMessage: GraphChatMessage) => (
            <Person userId={chatMessage.from.user.id} view={ViewType.oneline} />
        )
    },
    {
        key: 'column2',
        name: 'Message',
        minWidth: 300,
        maxWidth: 300,
        
        isResizable: false,
        isCollapsible: true,
        onRender: (chatMessage: GraphChatMessage) => (
        <ReadMoreAndLess
            className="read-more-content"
            charLimit={50}
            readMoreText="Read more"
            readLessText=" Read less"
            >
            {convertToPlain(chatMessage.body.content)}
        </ReadMoreAndLess>
        )
    },
    {
        key: 'column3',
        name: 'Message Date',
        fieldName: 'createdDateTime',
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        isCollapsible: true,
        onRender :(chatMessage: GraphChatMessage) => (
            <div>{new Date(chatMessage.createdDateTime).toLocaleString("en-us")}</div>
        )
    },
    {
        key: 'column4',
        name: 'Attachment',
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        isCollapsible: true,
        onRender: (chatMessage: GraphChatMessage) => (
            <div className={styles.docWrapper}>
                {
                    chatMessage.attachments && chatMessage.attachments.map((at:ChatMessageAttachment,
                    attachmentIndex:number) => 
                        <a key ={`attachment${attachmentIndex}`} style={{cursor:'pointer', 
                        textDecoration:'underline', color:'blue'}} onClick={() => 
                        props.graphService.spcontext.sdks.microsoftTeams.teamsJs.app.openLink(at.contentUrl)} >{at.name}</a>
                    )
                }
            </div>
        )
    },
    {
        key: 'column5',
        name: 'View Replies',
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        isCollapsible: true,
        onRender: (chatMessage: GraphChatMessage) => (
            !props.expandedMessageId && <ReplyIcon onClick={()=>props.getMessageReply(chatMessage.id)} />
        )
    },
    {
        key: 'column6',
        name: 'Go to Message',
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        isCollapsible: true,
        onRender: (chatMessage: GraphChatMessage) => (
            <ExpandIcon onClick={()=> props.graphService.spcontext
                .sdks.microsoftTeams.teamsJs.app.openLink(chatMessage.webUrl)} />
        )
    }
];

  return (
    <>
    {!!props.expandedMessageId && props.dtaaFilteredMessageData.length > 0 && <DetailsList 
      items={props.dtaaFilteredMessageData} 
      columns={columns} selectionMode={SelectionMode.none} />}
      {props.dtaaFilteredMessage.length > 0 && 
      <DetailsList 
      items={props.dtaaFilteredMessage.filter(t=>t.from && t.from.user)} 
      columns={columns} selectionMode={SelectionMode.none} />}
    </>
  );
};