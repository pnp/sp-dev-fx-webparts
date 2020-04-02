import * as React from 'react';
import { MSGraphClientFactory, MSGraphClient } from '@microsoft/sp-http';
import { useEffect, useState, useContext } from 'react';
import AppContext from '../common/AppContext';

const HelloUser: React.FunctionComponent = () => {

    /* Sets the initial state value and function to update state */
    const [name, setName] = useState('');

    /* Returns the serviceScope from the "global" AppContext, which is provided by 
    <AppContext.Provider> component above and is consumed using the useContext React Hook */
    const { serviceScope } = useContext(AppContext);

    /* Executes once on componentMount */
    useEffect(() => {

        /* Create a Microsoft Graph client factory using the serviceScope provided by AppContext */
        const msGraphClientFactory = serviceScope.consume(MSGraphClientFactory.serviceKey);

        /* Create Microsoft Graph Client from factory and call "Me" endpoint */
        msGraphClientFactory.getClient()
            .then((client: MSGraphClient): void => {
                client
                    .api('/me')
                    .get((error, user: any, rawResponse?: any) => {
                        
                        /* Update state by calling update function passing the new state value */
                        setName(user.displayName);
                    });
            });

    }, []);

    /* Display name when state value has been set */
    return (
        <div>
            {name &&
                <span>Hello {name}</span>
            }
        </div>
    );
};

export default HelloUser;