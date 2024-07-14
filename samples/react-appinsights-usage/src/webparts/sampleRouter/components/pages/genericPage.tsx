
import * as React from 'react';

export interface IGenericPageProps { 
    headline: string;
    children?: React.ReactNode;
}

export const GenericPage: React.FC<IGenericPageProps> = ({headline, children}) => {
    React.useEffect(() => {
        document.title = headline;
        }, []);
    return (
        <div>
            <h1>{headline}</h1>
            <div>
            {children}
            </div>
        </div>
    );
};