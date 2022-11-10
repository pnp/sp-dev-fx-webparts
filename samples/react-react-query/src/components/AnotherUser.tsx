import { Persona, PersonaSize, Spinner, Text } from "office-ui-fabric-react";
import * as React from "react";
import { useUserQuery } from "../queries/SampleQueries";
import { StringUtilities } from "../utils/StringUtilities";

export function AnotherUser(): React.ReactElement {
    const { isLoading, isError, data, error } = useUserQuery();
    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
        return <Text>{error}</Text>;
    }

    return <Persona
        text={data.displayName}
        tertiaryText={data.presence.availability}
        secondaryText={data.jobTitle}
        presence={StringUtilities.getPresence(data.presence.availability)}
        size={PersonaSize.size100}
        imageUrl={`data:image/png;base64,${data.photo.replace("\"", "").replace("\"", "")}`} />;
}