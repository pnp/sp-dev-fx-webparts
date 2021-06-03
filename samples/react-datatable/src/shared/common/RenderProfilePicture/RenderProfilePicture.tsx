import * as React from 'react';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';

interface IProfilePicProps {
    loginName: string;
    displayName: string;
    getUserProfileUrl: () => Promise<string>;
}

export function RenderProfilePicture(props: IProfilePicProps) {

    const [profileUrl, setProfileUrl] = React.useState<string>();
    let { displayName, getUserProfileUrl } = props;

    React.useEffect(() => {
        getUserProfileUrl().then(url => {
            setProfileUrl(url);
        });
    }, [props]);

    return (
        <Persona
            imageUrl={profileUrl}
            text={displayName}
            size={PersonaSize.size32}
            imageAlt={displayName}
            styles={{ primaryText: { fontSize: '12px' } }}
        />);
}
