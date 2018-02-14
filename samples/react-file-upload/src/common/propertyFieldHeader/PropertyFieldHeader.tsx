import * as React from 'react';
import { IconButton, Callout, DirectionalHint } from 'office-ui-fabric-react';
import { IPropertyFieldHeaderProps, IPropertyFieldHeaderState, CalloutTriggers } from './IPropertyFieldHeader';

import styles from './PropertyFieldHeader.module.scss';

/**
 * PropertyFieldHeader component.
 * Displays a label and a callout
 */
export default class PropertyFieldHeader extends React.Component<IPropertyFieldHeaderProps, IPropertyFieldHeaderState> {
    
        private _infoIcon: HTMLElement;
    
        public constructor(props: IPropertyFieldHeaderProps, state: IPropertyFieldHeaderState) {
            super(props, state);
            this._onCalloutDismiss = this._onCalloutDismiss.bind(this);
            this.state = {
                isCalloutVisible: false
            };
        }
    
        public render(): JSX.Element {
            return (
                <div className={styles.headerBar}>
                    <div className={styles.header}>
                        {this.props.label}
                    </div>
                    <div className={styles.info}>
                        <i className={'ms-Icon ms-Icon--Info'} ref={(infoIcon) => { this._infoIcon = infoIcon; }}
                            onMouseOver={this.props.calloutTrigger === CalloutTriggers.Hover ? this._onInfoIconMouseOver.bind(this) : null} 
                            onMouseOut={this.props.calloutTrigger === CalloutTriggers.Hover ? this._onInfoIconMouseOut.bind(this) : null}
                            onClick={this.props.calloutTrigger === CalloutTriggers.Click ? this._onInfoIconClick.bind(this) : null}></i>
                    </div>
                    {this.state.isCalloutVisible && (
                        <Callout
                            className={styles.headerCallout}
                            target={this._infoIcon}
                            isBeakVisible={true}
                            directionalHint={DirectionalHint.leftCenter}
                            directionalHintForRTL={DirectionalHint.rightCenter}
                            onDismiss={this._onCalloutDismiss}
                            gapSpace={this.props.gapSpace !== undefined ? this.props.gapSpace : 5}
                            calloutWidth={this.props.calloutWidth}>
                            {this.props.calloutContent}
                        </Callout>
                    )
                    }
                </div>);
        }
    
    
        private _onCalloutDismiss() {
            if (this.state.isCalloutVisible) {
                this.setState({
                    isCalloutVisible: false
                });
            }
        }
        
        private _onInfoIconMouseOver(): void {
            if (this.props.calloutTrigger !== CalloutTriggers.Hover) {
                return;
            }

            if (!this.state.isCalloutVisible) {
                this.setState({
                    isCalloutVisible: true
                });
            }
        }
    
        private _onInfoIconMouseOut(e: MouseEvent): void {
            if (this.props.calloutTrigger !== CalloutTriggers.Hover) {
                return;
            }

            if (e.relatedTarget) {
    
                let relatedTarget: HTMLElement = (e.relatedTarget as HTMLElement);
                if (relatedTarget && relatedTarget.closest('.ms-Callout-container')) {
                    return;
                }
            }
    
            this.setState({
                isCalloutVisible: false
            });
    
        }

        private _onInfoIconClick(): void {
            if (this.props.calloutTrigger !== CalloutTriggers.Click) {
                return;
            }

            this.setState({
                isCalloutVisible: !this.state.isCalloutVisible
            });
        }
    }