import * as React from 'react';

export interface ITabsProps {
    name?: string;
    handleSelect?: (any) => void;
    selectedTab?: string;
    activeLinkStyle?: object;
    visibleTabStyle?: object;
    disableInlineStyles?: boolean;
    renderActiveTabContentOnly?: boolean;
    className?: string;
    style?:object;
    displayName?:string;
}
export interface ITabsState {
    selectedTab: any;
}

export default class Tabs extends React.Component<ITabsProps, ITabsState> {
    public defaultTab;

    constructor(props) {
      super(props); 
      this.state = {
        selectedTab: this.props.selectedTab,
      };
      this.findDefault(this.props.children);
      this.handleFocus = this.handleFocus.bind(this);
    }
    public handleSelect = tab => {
        this.setState({
          selectedTab: tab,
        });
    }

    public handleFocus(evt) { 
      
      if(evt.target.id === '')
      {
        /* see issue https://github.com/pnp/sp-dev-fx-webparts/issues/3292
        evt.target.children[0].children[0].focus();
        evt.target.children[0].children[0].click();
       */
       
      }
      else 
      {
        evt.target.click();
      }
  }

 

  
    
    public findDefault(children) {
        /*  if (this.defaultTab !== undefined) {
          return this.defaultTab;
        }*/
    
        let firstLink;
        let firstDefaultLink;
    
        const traverse = child => {
         
          if (!child || !child.props || firstDefaultLink) {
            return;
          }
         /* if (child.type.displayName === 'TabLink') {
            firstLink = firstLink || child.props.to;
            firstDefaultLink =
              firstDefaultLink || (child.props.default && child.props.to);
          }*/
    
          React.Children.forEach(child.props.children, traverse);
        };
    
        React.Children.forEach(children, traverse);
    
        this.defaultTab = firstDefaultLink || firstLink;
        return this.defaultTab;
      }
    
    public transformChildren(
        children,
        {
          handleSelect,
          selectedTab,
          activeLinkStyle,
          visibleTabStyle,
          disableInlineStyles,
          name,
        },
      ) {
         /* if (typeof children !== 'object') {
          return children;
        }*/
    
        return React.Children.map(children, (child, index) => {
          let childitem = child as React.ReactElement<any>;        
         /* if (!childitem) {
            return childitem;
          }*/
          if (childitem.props.displayName === 'TabLink') {
            return React.cloneElement(childitem, {
              handleSelect,
              isActive: childitem.props.to === this.state.selectedTab,
              activeStyle: activeLinkStyle,
              disableInlineStyles,
              namespace: name,
            });
          }
          if (childitem.props.displayName === 'TabContent') {
            return React.cloneElement(childitem, {
              isVisible: childitem.props.for === this.state.selectedTab,
              visibleStyle: visibleTabStyle,
              disableInlineStyles,
              renderActiveTabContentOnly: this.props.renderActiveTabContentOnly,
            });
          }
          
          
    
         
    
          return React.cloneElement(
            childitem,
            {},
            this.transformChildren(childitem.props && childitem.props.children, {
              handleSelect,
              selectedTab,
              activeLinkStyle,
              visibleTabStyle,
              disableInlineStyles,
              name,
            }),
          );
        });
      }

     public render() {
        const {
          handleSelect: handleSelectProp,
          selectedTab: selectedTabProp,
          activeLinkStyle,
          visibleTabStyle,
          disableInlineStyles,
          name,
          renderActiveTabContentOnly, // eslint-disable-line
          ...divProps
        } = this.props;
        const handleSelect = handleSelectProp || this.handleSelect;
        const selectedTab =  this.state.selectedTab ;
    
        const children = this.transformChildren(this.props.children, {
          handleSelect,
          selectedTab,
          activeLinkStyle,
          visibleTabStyle,
          disableInlineStyles,
          name: name,
        });
    
        return <div {...divProps} tabIndex={0} onFocus={this.handleFocus} ref="tabs">{children}</div>;
      }
}
