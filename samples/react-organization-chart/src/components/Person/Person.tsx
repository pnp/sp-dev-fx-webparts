import * as React from "react";
import {
  IPersonaSharedProps,
  Persona,
  PersonaSize,
} from "office-ui-fabric-react/lib/Persona";
import { Text } from "office-ui-fabric-react/lib/Text";
import { IPersonProps } from "./IPersonProps";

export const Person: React.FunctionComponent<IPersonProps> = (
  props: IPersonProps
) => {
  const { text, secondaryText, userEmail, size, tertiaryText , pictureUrl} = props;

  const personProps: IPersonaSharedProps = React.useMemo(() => {
    return {
       imageUrl: pictureUrl ? `/_layouts/15/userphoto.aspx?size=M&accountname=${userEmail}` : undefined,
      text: text,
      secondaryText: secondaryText,
      tertiaryText: tertiaryText,
    };
  }, [pictureUrl, userEmail, text, secondaryText, tertiaryText]);

  const _onRenderPrimaryText = React.useCallback(() => {
    return (
      <>
        <Text
          title={text}
          variant="mediumPlus"
          block
          nowrap
          styles={{ root: { fontWeight: 600 } }}
        >
          {text}
        </Text>
      </>
    );
  }, [text]);

  const _onRenderSecondaryText = React.useCallback(() => {
    return (
      <>
        <Text
          title={secondaryText}
          variant="smallPlus"
          block
          nowrap
          styles={{ root: { fontWeight: 400 } }}
        >
          {secondaryText}
        </Text>
      </>
    );
  }, [secondaryText]);



  return (
    <>
      <Persona
        {...personProps}
        size={size || PersonaSize.size40}
        onRenderPrimaryText={_onRenderPrimaryText}
        onRenderSecondaryText={_onRenderSecondaryText}
        styles={{
          secondaryText: { maxWidth: 230 },
          primaryText: { maxWidth: 230 },
        }}
      />
    </>
  );
};
