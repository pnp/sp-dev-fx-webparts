import * as React from 'react';


export interface IContainerProps extends React.Props<any> {
    size: number;
    center: boolean;
    testid?: string;
}

export default function Container({
    size = 1,
    center = false,
    children = null,
    testid = ''
}: IContainerProps) {
    return (
        <div data-testid={testid} >
            {children}
        </div>
    );
}

