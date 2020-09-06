import * as React from 'react';
import * as strings from 'SpupsProperySyncWebPartStrings';
import styles from './SpupsProperySync.module.scss';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import EditableTable from './DynamicTable/EditableTable';
import MessageContainer from './MessageContainer';
import { MessageScope } from '../../../Common/IModel';

export interface IManualPropertyUpdateProps {
    userProperties: any;
    showProgress: boolean;
    UpdateSPUserWithManualProps: (data: any) => void;
}

export interface IManualPropertyUpdateState {
    data: any;
}

export default class ManualPropertyUpdate extends React.Component<IManualPropertyUpdateProps, IManualPropertyUpdateState> {
    constructor(props: IManualPropertyUpdateProps) {
        super(props);
        this.state = {
            data: []
        };
    }

    public componentDidMount = async () => {
        this.setState({ data: this.props.userProperties });
    }

    public componentDidUpdate = (prevProps: IManualPropertyUpdateProps) => {
        if (prevProps.userProperties !== this.props.userProperties) {
            this.setState({ data: this.props.userProperties });
        }
    }

    private handleRowDel = (item) => {
        var index = this.state.data.indexOf(item);
        this.state.data.splice(index, 1);
        this.setState(this.state.data);
    }

    private handlePropertyTable = (evt) => {
        var newProp = {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
        };
        var upProperties = this.state.data.slice();
        var newitem = upProperties.map((item) => {
            for (var key in item) {
                if (key == newProp.name && item.UserID == newProp.id) {
                    item[key] = newProp.value;
                }
            }
            return item;
        });
        this.setState({ data: newitem });
    }

    private updateWithManualProperty = () => {
        this.props.UpdateSPUserWithManualProps(this.state.data);
    }

    public render(): JSX.Element {
        const { data } = this.state;
        const { showProgress } = this.props;
        return (
            <div>
                {(data && data.length > 0) ? (
                    <>
                        <EditableTable onTableUpdate={this.handlePropertyTable.bind(this)} onRowDel={this.handleRowDel.bind(this)}
                            data={data} />
                        <div style={{ marginTop: "5px" }}>
                            <PrimaryButton text={strings.BtnUpdateUserProps} onClick={this.updateWithManualProperty} style={{ marginRight: '5px' }} disabled={showProgress} />
                            {showProgress && <Spinner className={styles.generateTemplateLoader} label={strings.PropsUpdateLoader} ariaLive="assertive" labelPosition="right" />}
                        </div>
                    </>
                ) : (
                        <div><MessageContainer MessageScope={MessageScope.Info} Message={strings.EmptyTable} /></div>
                    )
                }
            </div>
        );
    }
}