import * as React from "react";
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import styles from "../App/App.module.scss";
import { IHandlers } from "../../../../models/Handlers";

interface IHandlerProps {
    onHandlerChange: (ev: React.FormEvent<HTMLElement>, isChecked: boolean) => void;
    values: IHandlers;
    disabled:boolean;
}

const Handlers: React.FC<IHandlerProps> = (props) => {
    const { values } = props;
    const allHandlers = Object.keys(values);
    const checkboxes = allHandlers.map((value) =>
        <Checkbox disabled={props.disabled} key={value} className={styles.handlerCheckbox} checked={values.All || values[value]} name={value} label={value} onChange={props.onHandlerChange} />
    );
    return (
        <div className="ms-Grid">
            <div className={styles.row}>
                <div className={styles.column}>
                    {
                        checkboxes.slice(0, 15)
                    }
                </div>
                <div className={styles.column}>
                    {
                        checkboxes.slice(15, 30)
                    }
                </div>
            </div>
        </div>
    );
};

export default Handlers;