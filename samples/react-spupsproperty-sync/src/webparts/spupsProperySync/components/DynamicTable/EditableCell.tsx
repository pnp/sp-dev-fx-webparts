import * as React from 'react';
import styles from './DynamicTable.module.scss';

export interface IEditableCellProps {
    cellData: any;
    onTableUpdate?: (event: any) => void;
    isReadOnly?: boolean;
}

export interface IEditableCellState {
    inputtext: string;
}

export default class EditableCell extends React.Component<IEditableCellProps, IEditableCellState> {
    constructor(props: IEditableCellProps) {
        super(props);
        this.state = {
            inputtext: ""
        };
    }

    private handleTextChange = (e) => {
        this.setState({ inputtext: e.target.value });
        this.props.onTableUpdate(e);
    }

    public render(): JSX.Element {
        const { cellData, isReadOnly } = this.props;
        return (
            <td>
                {isReadOnly ? (
                    <>
                        {!cellData.label ? (
                            <div>{cellData.value ? cellData.value : " - "}</div>
                        ) : (
                                <div className={styles.divusername}>
                                    <img src={`/_layouts/15/userphoto.aspx?accountname=${cellData.id}&size=M`} />
                                    <label>{cellData.value}</label>
                                </div>
                            )}
                    </>
                ) : (
                        <>
                            {!cellData.label ? (
                                <input type='text' className={styles.textInput} name={cellData.type} id={cellData.id} value={this.state.inputtext} onChange={this.handleTextChange} />
                            ) : (
                                    <div className={styles.divusername}>
                                        <img src={cellData.ImageUrl} />
                                        <label>{cellData.value}</label>
                                    </div>
                                )}
                        </>
                    )
                }
            </td>
        );
    }

}