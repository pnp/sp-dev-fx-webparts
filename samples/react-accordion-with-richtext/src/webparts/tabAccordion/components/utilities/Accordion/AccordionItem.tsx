import * as React from 'react';
import { IAccordionItemTitleProps } from './AccordionItemTitle';
import { IAccordionItemBodyProps } from './AccordionItemBody';

export interface IAccordionItemProps {
    accordion?: boolean;
    onClick?: () => void;
    expanded?: boolean;
    children?: JSX.Element[];
    className?: string;
    hideBodyClassName?: string;
    id?:string;
}


export default class AccordionItem extends React.Component<IAccordionItemProps, {}> {
    public static defaultProps = {
        accordion: true,
        expanded: false,
        onClick: () => {},
        className: 'accordion__item',
        hideBodyClassName: null,
    };
    constructor(props) {
        super(props);        
        this.renderChildren = this.renderChildren.bind(this);
    }
    public renderChildren() {
        const { accordion, expanded, onClick, children } = this.props;
        const itemUuid = this.props.id;

        return React.Children.map(children, (item) => {
            
           
            var child = item as React.ReactElement<any>;
            if (child.props.accordionElementName === 'AccordionItemTitle') {
                const itemProps : IAccordionItemTitleProps = {};
                itemProps.expanded = expanded;
                itemProps.key = 'title';
                itemProps.id = `accordion__title-${itemUuid}`;
                itemProps.ariaControls = `accordion__body-${itemUuid}`;
                itemProps.onClick = onClick;
                itemProps.role = accordion ? 'tab' : 'button';

                return React.cloneElement(child, itemProps);
            } else if (child.props.accordionElementName === 'AccordionItemBody') {
                const itemProps : IAccordionItemBodyProps = {};
                itemProps.expanded = expanded;
                itemProps.key = 'body';
                itemProps.id = `accordion__body-${itemUuid}`;
                itemProps.role = accordion ? 'tabpanel' : '';

                return React.cloneElement(child, itemProps);
            }

            return item;
        });
    }

    public render() {
        const { expanded, className } = this.props;

        return (            
            <div className={className}>
                {this.renderChildren()}
            </div>
        );
        
    }
}