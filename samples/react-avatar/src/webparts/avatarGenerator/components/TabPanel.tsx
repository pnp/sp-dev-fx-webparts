import * as React from 'react';
import Box from '@material-ui/core/Box';

export interface ITabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

export const TabPanel: React.FunctionComponent<ITabPanelProps> = (props: ITabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
};