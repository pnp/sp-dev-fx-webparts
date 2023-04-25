import { PivotItem, Pivot } from '@fluentui/react';
import * as React from 'react';
import styles from '../CommonControl.module.scss';

export interface IPivotProps {
    ShowLabel: boolean;
    LabelText: string;
    SelectedKey: string;
    Items: any[];   // eslint-disable-line @typescript-eslint/no-explicit-any
    OnMenuClick: (item: PivotItem) => void;
}

const CustomPivot: React.FunctionComponent<IPivotProps> = (props) => {

    return (
        <div style={{ display: 'flex', paddingRight: '10px' }}>
            {props.ShowLabel &&
                <label className={styles.dataLabel}>{props.LabelText}</label>
            }
            <Pivot selectedKey={props.SelectedKey} onLinkClick={props.OnMenuClick} aria-label="Pivot" className={styles.pivotControl}>
                {props.Items &&
                    props.Items.map(item => {
                        return (
                            <PivotItem headerText={item.text} itemKey={item.key} />
                        );
                    })
                }
            </Pivot>
        </div>
    );
};

export default CustomPivot;