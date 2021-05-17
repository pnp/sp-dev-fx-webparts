import * as React from 'react';
import { FormMode } from 'utilities';
import styles from './ReplyList.module.scss';
// models
import { IReplyItem, IQuestionItem } from 'models';
// controls
import { List } from 'office-ui-fabric-react/lib/List';
import ReplyComponent from '../Reply/Reply';

export interface IReplyListProps {
    parentQuestion: IQuestionItem;
    replies: IReplyItem[];
}

export default class ReplyListComponent extends React.Component<IReplyListProps, {}> {
    public render(): React.ReactElement<IReplyListProps> {
        const { replies, parentQuestion } = this.props;

        if (replies && replies.length > 0) {
            return (
                <div id={`replies-${parentQuestion.id}`} className={styles.replyList}>
                    <div className={styles.container}>
                        <List items={replies} onRenderCell={this.onRenderCell}></List>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div id={`replies-${parentQuestion.id}`}></div>
            );
        }
    }

    private onRenderCell = (reply: IReplyItem, index: number | undefined): JSX.Element | undefined => {
        const { parentQuestion } = this.props;
        if (reply) {
            return (
                <ReplyComponent
                    show={true}
                    reply={reply}
                    formMode={FormMode.View}
                    parentQuestion={parentQuestion} />
            );
        }
    }
}
