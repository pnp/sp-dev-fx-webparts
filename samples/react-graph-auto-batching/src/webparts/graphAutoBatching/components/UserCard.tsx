import { Spinner } from "office-ui-fabric-react";
import * as React from "react";
import { IHttpClient } from "../../../dal/http/IHttpClient";
import { IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from "office-ui-fabric-react";
import { StringUtilities } from "../../../utils/StringUtilities";

export interface IUserCardProps{
    graphClient: IHttpClient;
    userQuery: string;
}

export function UserCard(props: IUserCardProps){
    const [user, setUser] = React.useState<any>({});
    const [loading, setLoading] = React.useState(true);
    const getUserInfo = async ()=>{
        const [userInfoRequest, userPhotoRequest, presenceInfo] = await Promise.all([props.graphClient.get(props.userQuery),
            props.graphClient.get(props.userQuery + "/photo/$value"),
            props.graphClient.get(props.userQuery + "/presence")]);
            const [userResult, photo, presence] = await Promise.all([userInfoRequest.json(), userPhotoRequest.text(),presenceInfo.json()]);
        setUser({
            ...userResult,
            presence: presence.availability,
            photo: photo.replace("\"","").replace("\"","")
        });
        setLoading(false);
    };
    React.useEffect(() => {
        getUserInfo();
    }, [props.userQuery]);

    if(loading){
        return <Spinner />;
    }
    return (
        <Persona
            imageUrl={user.photo}
            imageInitials={StringUtilities.getInitials(user.displayName)}
            text={user.displayName}
            secondaryText={user.jobTitle}
            tertiaryText={user.presence}
            presence={StringUtilities.getPresence(user.presence)}
            size={PersonaSize.size100}
            imageAlt="Annie Lindqvist, status is blocked"
      />
    );
}