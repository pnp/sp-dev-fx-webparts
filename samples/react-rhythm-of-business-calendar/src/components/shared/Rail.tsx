import React, { CSSProperties, FC, ReactElement } from "react"
import { ActionButton, IIconProps, useTheme } from "@fluentui/react"
import { useBoolean } from "@fluentui/react-hooks";

interface IProps {
    name: string;
    initiallyExpanded?: boolean;
    expandIconProps?: IIconProps;
    children: (collapseRail: () => void) => ReactElement;
}

export const Rail: FC<IProps> = ({
    name,
    initiallyExpanded = true,
    expandIconProps = { iconName: 'ChevronDown' },
    children
}) => {
    const [expanded, {
        setTrue: expandRail,
        setFalse: collapseRail
    }] = useBoolean(window.innerWidth > 1024 && initiallyExpanded);

    const { palette: { neutralLight, neutralLighterAlt } } = useTheme();

    if (expanded) {
        return (
            <div className='ms-motion-slideRightIn'>
                {children(collapseRail)}
            </div>
        );
    } else {
        const railStyle: CSSProperties = {
            height: '100%',
            width: 40,
            backgroundColor: neutralLighterAlt,
            borderRight: '1px solid ' + neutralLight
        };

        const expandButtonStyle: CSSProperties = {
            transform: 'rotate(-90deg)',
            transformOrigin: 'top left',
            marginTop: Math.round(16 /*icon width*/ + 16 /*button padding*/ + ((name?.length || 0) * 6.25) /*text size*/ + 20 /*top margin*/)
        };

        return (
            <div className='ms-motion-fadeIn' style={railStyle}>
                <ActionButton autoFocus style={expandButtonStyle} iconProps={expandIconProps} onClick={expandRail}>
                    {name}
                </ActionButton>
            </div>
        )
    }
}