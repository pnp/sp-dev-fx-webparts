import * as React from 'react';

export interface ITabContentProps {
    for: string|number;
    visibleStyle?: object;
    isVisible?: boolean;
    renderActiveTabContentOnly?: boolean;
    disableInlineStyles?: boolean;
    className?: string;
    visibleClassName?: string;
    style?: string;
    displayName?: string;
    itemKey?:string;
}


export const styles = {
    hidden: {
      display: 'none',
    },
};

export default class TabContent extends React.Component<ITabContentProps, {}> {
    public static defaultProps = {
        displayName: 'TabContent'
    };

    public canRenderChildren() {
        return this.props.isVisible || !this.props.renderActiveTabContentOnly;
    }

    public render() {
        const visibleStyle = this.props.visibleStyle || {};
        const displayStyle = this.props.isVisible ? visibleStyle : styles.hidden;
        const disableInlineStyles = this.props.disableInlineStyles;
        const className = this.props.className;
        const visibleClassName =
          this.props.visibleClassName;
        const style = this.props.style;
   
        return (
          <div
            className={className}
            style={{...displayStyle } }
          >
            {this.canRenderChildren() && this.props.children}
          </div>
        );
      }
}