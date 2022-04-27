import * as React from 'react';


export interface IAccordionItemTitleProps {
    id?: string;
    expanded?: boolean;
    onClick?: () => void;
    ariaControls?: string;
    children?: JSX.Element|JSX.Element[];
    className?: string;
    hideBodyClassName?: string;
    role?: string;
    key?: string;
    accordionElementName?: string;
}

export default class AccordionItemTitle extends React.Component<IAccordionItemTitleProps, {}> {
    public static defaultProps = {
        id: '',
        expanded: false,
        onClick: () => {},
        ariaControls: '',
        className: 'accordion__title',
        hideBodyClassName: null,
        role: '',
        accordionElementName: 'AccordionItemTitle',
    };
    constructor(props) {
        super(props);        
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    public handleKeyPress(evt) {
        const { onClick } = this.props;
        if (evt.charCode === 13 || evt.charCode === 32) {
            onClick();
        }
    }
    public render() {
        const { id, expanded, ariaControls, onClick, children, className, role, hideBodyClassName } = this.props;
       
        return (
            <div // eslint-disable-line jsx-a11y/no-static-element-interactions
                id={id}
                aria-expanded={expanded}
                aria-controls={ariaControls}
                className={className}
                onClick={onClick}
                role={role}
                tabIndex={0}
                onKeyPress={this.handleKeyPress}
            >
                {children}
            </div>
        );
    }
}