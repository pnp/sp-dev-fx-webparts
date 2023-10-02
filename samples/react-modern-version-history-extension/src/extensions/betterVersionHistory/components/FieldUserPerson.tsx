import * as React from 'react';
import { IFieldUserValue } from '../models/FieldValues';
import { Persona, PersonaSize } from '@fluentui/react';
import { LivePersona } from "@pnp/spfx-controls-react/lib/LivePersona";
import { SPFxContext } from '../contexts/SPFxContext';

export interface IFieldUserProps {
    user: IFieldUserValue;
    size?: PersonaSize;
    hidePersonaDetails?: boolean;
}

export const FieldUser: React.FunctionComponent<IFieldUserProps> = (props: React.PropsWithChildren<IFieldUserProps>) => {
    const { user, size } = props;
    const { context } = React.useContext(SPFxContext)

    return (
        <>
            <LivePersona upn={user.Email}
                template={
                    <>
                        <Persona
                            size={size ?? PersonaSize.size32}
                            hidePersonaDetails={props.hidePersonaDetails}
                            text={user.LookupValue}
                            secondaryText={user.Email}
                            showInitialsUntilImageLoads={true}
                            imageUrl={`/_layouts/15/userphoto.aspx?Size=M&AccountName=${user.Email}`}
                        />
                    </>
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                serviceScope={context.serviceScope as any}
            />
        </>
    );
};