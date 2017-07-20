import * as React from 'react';
import { Layer, IconButton, IButtonProps } from 'office-ui-fabric-react';
import * as classnames from 'classnames';

import styles from './Panel.module.scss';

export enum PanelPosition {
    Left,
    Right
}

export interface IPanelProps {
    isOpen?: boolean;
    position?: PanelPosition;
    onDismiss?: () => void;
}

export interface IPanelState {
    isOpen?: boolean;
    isVisible?: boolean;
}

export default class Panel extends React.Component<IPanelProps, IPanelState> {
    private _onCloseTimer: number;
    private _onOpenTimer: number;

    public constructor(props: IPanelProps, state: IPanelState) {
        super(props, state);

        this.state = {
            isOpen: this.props.isOpen
        };
    }

    public componentWillReceiveProps(newProps: IPanelProps) {
        if (newProps.isOpen === this.props.isOpen)
            return;
        //
        // From https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/Modal/Modal.tsx
        //
        clearTimeout(this._onCloseTimer);

        if (newProps.isOpen) {
            if (!this.state.isOpen) {
                this.setState({
                    isOpen: true
                });
            }
            else {
                this.setState({
                    isVisible: true
                });
            }
        }

        if (!newProps.isOpen && this.state.isOpen) {
            this._close();
        }
    }

    public componentDidUpdate(prevProps: IPanelProps, prevState: IPanelState) {
        if (!prevProps.isOpen && !prevState.isVisible && this.state.isOpen) {
            setTimeout(this._onOpen.bind(this), 45); // just to set open class a little bit later to have animation
        }
    }

    public render(): JSX.Element {
        if (!this.state.isOpen)
            return null;

        const optionalClasses: any = {};
        optionalClasses[styles.visible] = this.state.isVisible;
        optionalClasses[styles.left] = this.props.position === PanelPosition.Left;
        optionalClasses[styles.right] = this.props.position === PanelPosition.Right;
        const className = classnames(styles.panel, optionalClasses);

        return (
            <Layer>
                <div className={className}>
                    <div className={styles.header}>
                        <div className={styles.closeButton}>
                            <IconButton
                                iconProps={{ iconName: 'Cancel' }}
                                onClick={this.onDismiss.bind(this)} />
                        </div>
                        <div className={styles.clear}></div>
                    </div>
                    <div className={styles.content}>
                        {this.props.children}
                    </div>
                </div>
            </Layer>);
    }

    private onDismiss() {
        this._close();
    }

    private _close() {
        this._onCloseTimer = setTimeout(this._onClose.bind(this), parseFloat(styles.duration));
        this.setState({
            isVisible: false
        });
    }

    private _onOpen() {
        this.setState({
            isVisible: true
        });
    }

    private _onClose() {
        this.setState({
            isOpen: false
        });

        if (this.props.onDismiss)
            this.props.onDismiss();
    }
}