import * as React from 'react';


export const Page2: React.FC = () => {
    React.useEffect(() => {
        document.title = 'Page2';
        }, []);
    return (
        <div>
            <h1>Welcome To Page2</h1>
            <div>
            The page 2 is a simple page with a simple message.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nisl ac justo lacinia ultricies.
           
            </div>
        </div>
    );
};