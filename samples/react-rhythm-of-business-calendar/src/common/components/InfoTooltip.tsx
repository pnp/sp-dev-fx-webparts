import React, { CSSProperties, FC, ReactNode } from 'react';
import { TooltipHost, ITooltipHostProps, Text } from '@fluentui/react';
import { InfoIcon } from '@fluentui/react-icons-mdl2';

const infoIconStyle: CSSProperties = {
    fontSize: 12,
    marginLeft: 4
};

interface IProps extends ITooltipHostProps {
    text: string;
    hideIcon?: boolean;
    tooltipHostProps?: ITooltipHostProps;
    children: ReactNode;
}

export const InfoTooltip: FC<IProps> = ({
    text,
    hideIcon = false,
    tooltipHostProps,
    children
}: IProps) =>
    <TooltipHost {...tooltipHostProps} content={text}>
        {children}
        {text && !hideIcon && <Text><InfoIcon style={infoIconStyle} tabIndex={0} /></Text>}
    </TooltipHost>
