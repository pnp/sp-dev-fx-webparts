import * as React from 'react';
import styles from './Error.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export interface IErrorProps {
    erroMessage: string;
}

export default class ErrorComponent extends React.Component<IErrorProps, {}> {

    public render(): React.ReactElement<IErrorProps> {
        return (
            <div className={styles.error}>
                <div className={styles.container}>
                    <div className={styles.errorIconContainer}>
                        <Icon iconName={'ErrorBadge'} />
                    </div>
                    <div className={styles.errorTextContainer}>
                        {this.props.erroMessage}
                    </div>
                </div>
            </div>
        );
    }
}