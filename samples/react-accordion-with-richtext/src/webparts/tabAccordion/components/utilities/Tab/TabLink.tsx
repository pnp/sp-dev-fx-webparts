import * as React from 'react';

export interface ITabLinkProps {
    id?:string;
    to: string|number;
    handleSelect?: (to,namespace) => void;
    isActive?: boolean;
    namespace?: string;
    activeStyle?: object;
    disableInlineStyles?: boolean;
    className?: string;
    activeClassName?: string;
    style?: object;
    onClick?: (any) => void;
    displayName?: string;

}


export const defaultActiveStyle = {
    fontWeight: 'bold',
};

export default class TabLink extends React.Component<ITabLinkProps, {}> {
    public static defaultProps = {
        displayName: 'TabLink'
    };
    public handleClick = e => {
      
    this.props.handleSelect(this.props.to, this.props.namespace);
     if(this.props.onClick)
     {
       this.props.onClick(e);
     }
     else 
     {
       
     }
    }

   

    public handleKeyPress = e => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
    
          this.handleClick(e);
        }
        if(e.key === 'Tab')
        {
          this.handleClick(e);
        }
        
    }

    public render() {
        const {
          id,
          to,
          handleSelect,
          isActive,
          namespace,
          activeStyle,
          disableInlineStyles,
          className,
          activeClassName,
          style,
          displayName,
          ...passedProps
        } = this.props;
    
        const _className = className;
        const _activeClassName = activeClassName;
       
        const _style = {
          ...style,
          ...((isActive && (activeStyle || defaultActiveStyle)) || {}),
        };
      
        if(isActive)
        {
            return (
                <div
                  id={id}
                  className={_activeClassName}
                  style={_style}
                  tabIndex={0}
                  {...passedProps}
                  onKeyPress={this.handleKeyPress}
                  onKeyDown={this.handleKeyPress}
                  onClick={this.handleClick}
                >
                  {this.props.children}
                </div>
              );
        }
        else
        {
            return (
                <div
                  id={id}
                  className={_className}
                  style={_style}
                  tabIndex={0}
                  {...passedProps}
                  onKeyPress={this.handleKeyPress}
                  onKeyDown={this.handleKeyPress}
                  onClick={this.handleClick}
                 
                >
                  {this.props.children}
                </div>
              );
        }
        
      }
}