import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn, CheckboxVisibility, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { IAppListItem, IAzureApp } from './IAppInterfaces';
import { ICommandBarItemProps, CommandBar, MessageBarType } from 'office-ui-fabric-react';
import styles from './AppStyles.module.scss';
import { AppDialog } from './AppDialog';
import { IObjectWithKey } from '@uifabric/utilities';
import * as strings from 'SitesSelectedManagerWebPartStrings';
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface IAppListProps {
    applications: Array<IAzureApp>;
    wpContext: WebPartContext;
    showMessage: (type: MessageBarType, message: string, autoDismiss: boolean, error?: any) => void;
}

interface IAppListState {
    items?: IAppListItem[];
    selectionDetails?: IAzureApp;
    menuItems?: ICommandBarItemProps[];
    dialogHidden?: boolean,
    isDeleteMode?: boolean;
    commandBarDisabled: boolean;
}

export const AppList: React.FunctionComponent<IAppListProps> = (props) => {
    const [state, setState] = React.useState<IAppListState>(
        { dialogHidden: true, isDeleteMode: false, commandBarDisabled: true, selectionDetails: {} as IAzureApp }
    );
    const [selectedApp, setSelectedApp] = React.useState<IObjectWithKey[]>();
    const [selection] = React.useState<Selection>(new Selection({
        onSelectionChanged: () => setSelectedApp(selection.getSelection()
        )
    }))

    React.useEffect(() => {
        if (selectedApp) {
            if (selectedApp.length === 0) {
                setState({ ...state, commandBarDisabled: true });
            } else {
                const app = selectedApp[0] as any;
                setState({ ...state, selectionDetails: { id: app.value, displayName: app.name }, commandBarDisabled: false });
            }
        }
    }, [selectedApp])

    const hideDialog = (hide: boolean) => {
        setState({ ...state, dialogHidden: hide });
    };

    return <div>
        <div>
            <CommandBar className={styles.commandBar}
                items={[
                    {
                        key: 'newItem',
                        text: strings.ListCommandBarAdd,
                        iconProps: { iconName: 'CloudAdd' },
                        split: false,
                        onClick: () => { setState({ ...state, dialogHidden: false, isDeleteMode: false }) },
                        disabled: state.commandBarDisabled,

                    },
                    {
                        key: 'upload',
                        text: strings.ListCommandBarDelete,
                        iconProps: { iconName: 'BlockedSiteSolid12' },
                        split: false,
                        onClick: () => { setState({ ...state, dialogHidden: false, isDeleteMode: true }) },
                        disabled: state.commandBarDisabled,

                    }
                ]}
            />
        </div>
        <MarqueeSelection className={styles.listMargin} selection={selection}>
            <DetailsList
                items={props.applications.map(app => ({
                    key: 0,
                    name: app.displayName,
                    value: app.appId

                }))}
                columns={[
                    { key: 'column1', name: strings.ListColAppName, fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
                    { key: 'column2', name: strings.ListColAppId, fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
                ]}
                setKey="set"
                layoutMode={DetailsListLayoutMode.justified}
                selection={selection}
                checkboxVisibility={CheckboxVisibility.onHover}
                selectionMode={SelectionMode.single}
                selectionPreservedOnEmptyClick={true}
            />
        </MarqueeSelection>
        <AppDialog {...
            {
                isHidden: state.dialogHidden,
                hideDialog: hideDialog,
                wpContext: props.wpContext,
                selectedApp: state.selectionDetails,
                isDeleteMode: state.isDeleteMode,
                showMessage: props.showMessage
            }} />
    </div>
}