import * as React from 'react';


export interface IAccordionItemBodyProps {
    id?: string;
    expanded?: boolean;
    ariaControls?: string;
    children?: JSX.Element|JSX.Element[];
    className?: string;
    hideBodyClassName?: string;
    role?: string;
    key?: string;
}

export default class AccordionItemBody extends React.Component<IAccordionItemBodyProps, {}> {
    public static defaultProps = {
        id: '',
        expanded: false,
        className: 'accordion__body',
        hideBodyClassName: 'accordion__body--hidden',
        role: '',
        accordionElementName: 'AccordionItemBody',
    };
    constructor(props) {
        super(props);       
        
    }
    public render() {
        const { id, expanded, children, className, hideBodyClassName, role } = this.props;
        const ariaHidden = !expanded;
        if(expanded)
        {
            return (
                <div // eslint-disable-line jsx-a11y/no-static-element-interactions
                    id={id}
                    className={className}
                    aria-hidden={ariaHidden}
                    role={role}
                >
                    {children}
                </div>
            );
        }
        else 
        {
            return (
                <div // eslint-disable-line jsx-a11y/no-static-element-interactions
                    id={id}
                    className={hideBodyClassName}
                    aria-hidden={ariaHidden}
                    role={role}
                >
                    {children}
                </div>
            );
        }

    }
}