import * as React from 'react';

export interface IAccordionProps {
    accordion?: boolean;
    children?: JSX.Element[]|object;
    className?: string;
    onChange?: (any) => void;
}
export interface IAccordionState {
    activeItems: any [];
    accordion: boolean;
}

export default class Accordion extends React.Component<IAccordionProps, IAccordionState> {
    public static defaultProps = {
        accordion: true,
        onChange: (any) => {},
        className: 'accordion',
    };
    constructor(props) {
        super(props);        
        const activeItems = this.preExpandedItems();
        this.state = {
            activeItems: activeItems,
            accordion: true,
        };
        this.renderItems = this.renderItems.bind(this);
    }
    public preExpandedItems() {
        const activeItems = [];
        React.Children.map(this.props.children, (item, index) => {
            let child = item as React.ReactElement<any>;
            if (child.props.expanded) {
                if (this.props.accordion) {
                    if (activeItems.length === 0) activeItems.push(index);
                } else {
                    activeItems.push(index);
                }
            }
        });
        return activeItems;
    }

    public handleClick(key) {
        let activeItems = this.state.activeItems;
        if (this.props.accordion) {
            activeItems = activeItems[0] === key ? [] : [key];
        } else {
            activeItems = [...activeItems];
            const index = activeItems.indexOf(key);
            const isActive = index > -1;
            if (isActive) {
                // remove active state
                activeItems.splice(index, 1);
            } else {
                activeItems.push(key);
            }
        }
        this.setState({
            activeItems: activeItems,
        });

        this.props.onChange(this.props.accordion ? activeItems[0] : activeItems);
    }

    public renderItems() {
        const { accordion, children } = this.props;

        return React.Children.map(children, (item, index) => {
            let child = item as React.ReactElement<any>;
            const key = index;
            const expanded = (this.state.activeItems.indexOf(key) !== -1) && (!child.props.disabled);

            return React.cloneElement(child, {
                disabled: child.props.disabled,
                accordion: accordion,
                expanded: expanded,
                key: `accordion__item-${key}`,
                onClick: this.handleClick.bind(this, key),
            });
        });
    }

    public render() {
        const { className } = this.props;
        return (
            <div className={className}>
                {this.renderItems()}
            </div>
        );
    }
}