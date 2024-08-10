import * as React from 'react';


export const Page1: React.FC = () => {
    React.useEffect(() => {
        document.title = 'Page1';
        }, []);
    return (
        <div>
            <h1>Welcome To Page1</h1>
            <div>
            This is a sample page with a simple message.
            </div>
        </div>
    );
};