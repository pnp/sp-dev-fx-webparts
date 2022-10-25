/* eslint-disable react/jsx-no-bind */
import { CheckMarkIcon, DecreaseIndentArrowMirroredIcon, ErrorBadgeIcon } from '@fluentui/react-icons-mdl2';
import * as strings from 'CopyViewsSharedStrings';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import * as React from 'react';
import { CopyTaskState } from '../enums';
import { ICopyTask } from '../interfaces';
import styles from '../SharedStyles.module.scss';

interface ICopyStatusProps {
    copyTasks: ICopyTask[];
    onRetry: (copyTask: ICopyTask) => Promise<void>;
}

interface ICopyStatusState {
    showErrors: number[];
}

export class CopyStatus extends React.Component<ICopyStatusProps, ICopyStatusState> {

    public constructor(props: ICopyStatusProps) {
        super(props);

        this.state = {
            showErrors: []
        };
    }

    public render(): React.ReactElement<ICopyStatusProps> {
        const { copyTasks } = this.props;
        const { showErrors } = this.state;

        const busy = copyTasks.some(t => t.state === CopyTaskState.Busy);

        return <div className={styles.copyStatusContainer}>
            {
                busy 
                    ? <ProgressIndicator label={strings.BusyCopyingViews} />
                    : <MessageBar messageBarType={MessageBarType.info}>
                        { strings.DoneCopyingViews }
                        </MessageBar>
            }
            <br/>
            {                
                copyTasks.map((copyTask) => {
                    return <div key={copyTask.index} className={styles.copyTaskLine}>
                        <Stack tokens={{ childrenGap: 5 }} horizontal>
                            <span>{copyTask.index}.</span>
                            <Link href={copyTask.sourceView.viewUrl} target='_blank'>{copyTask.sourceView.title}</Link>
                            <DecreaseIndentArrowMirroredIcon style={{ fontSize: 25, marginRight: 15 }} />
                            <Link href={copyTask.targetList.listUrl} target='_blank'>{copyTask.targetList.title}</Link>
                        </Stack>

                        <div className={styles.copyTaskIcon}>
                            {
                                copyTask.state === CopyTaskState.Busy && <Spinner />
                            }
                            {
                                copyTask.state === CopyTaskState.Done && <CheckMarkIcon style={{ color: 'green' }} />
                            }
                            {
                                copyTask.state === CopyTaskState.Error && <ErrorBadgeIcon style={{ color: 'indianred' }} />
                            }
                        </div>

                        {copyTask.state === CopyTaskState.Error &&
                            <MessageBar
                                messageBarType={MessageBarType.error}
                                isMultiline={false}
                                actions={
                                    <div>
                                        <Link onClick={() => this._toggleErrorDetails(copyTask)}>{strings.SeeMore}</Link>
                                        <Link onClick={() => this._retry(copyTask)}>{strings.Retry}</Link>
                                    </div>
                                }
                                overflowButtonAriaLabel={strings.SeeMore}>
                                {strings.ErrorOccurred}
                                { showErrors.some(i => copyTask.index === i) && <><br />{copyTask.error}</> }
                            </MessageBar>
                        }
                    </div>
                })
            }

        </div>;
    }

    private _toggleErrorDetails = (copyTask: ICopyTask): void => {
        const { showErrors } = this.state;
        
        if (showErrors.some(i => i === copyTask.index)) {
            const newShowErrors = showErrors.filter(i => i !== copyTask.index);
            this.setState({ showErrors: newShowErrors});
        }
        else {
            const newShowErrors = [...showErrors, copyTask.index];
            this.setState({ showErrors: newShowErrors});
        }
    }

    private _retry = async (copyTask: ICopyTask): Promise<void> => {
        await this.props.onRetry(copyTask);
    }
}