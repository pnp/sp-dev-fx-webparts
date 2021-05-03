import {
  Stack,
  DocumentCard,
  DocumentCardDetails,
  PersonaSize,
  DocumentCardActions,
  IButtonProps,
} from "office-ui-fabric-react";
import * as React from "react";
import { Person } from "../Person/Person";
import { ICompactCardProps } from "./ICompactCardProps";
import { useHoverCardStyles } from "./useHoverCardStyles";

export const CompactCard: React.FunctionComponent<ICompactCardProps> = (
  props: ICompactCardProps
) => {
  const { user } = props;
  const {
    stackPersonaStyles,
    hoverCardStyles,
    buttonStylesHouver,
    documentCardActionStyles
  } = useHoverCardStyles();

  const documentCardActionsHouver: IButtonProps[] = React.useMemo(() =>{
    const actions:IButtonProps[] = [] ;
    actions.push(
      {
        iconProps: { iconName: "Chat" },
        title: "Chat",
        styles: buttonStylesHouver,
        onClick: (ev)=>{
          ev.preventDefault();
          ev.stopPropagation();
          window.open(`https://teams.microsoft.com/l/chat/0/0?users=${user.email}&message=Hi ${user.displayName} `,"_blank");
        }
      }
    );

    if (user?.workPhone){
      actions.push(
        {
          iconProps: { iconName: "Phone" },
          title: "Call",
          styles: buttonStylesHouver,
          onClick: (ev)=> {
            ev.preventDefault();
            ev.stopPropagation();
            window.open(`CALLTO:${user.workPhone}`,"_blank");
          }
        }
      )

    }
    return actions;
  },[buttonStylesHouver, user.displayName, user.email, user.workPhone]);


  return (
    <>
      <Stack
        tokens={{ childrenGap: 10 }}
        horizontalAlign="start"
        verticalAlign="center"

      >
        <DocumentCard className={hoverCardStyles.hoverHeader}>
          <DocumentCardDetails>
            <Stack
              horizontal
              horizontalAlign="space-between"
              styles={stackPersonaStyles}
            >
              <Person
                text={user.displayName}
                secondaryText={user.title}
                tertiaryText={user.department}
                userEmail={user.email}
                pictureUrl={user.pictureUrl}
                size={PersonaSize.size72}
              />
            </Stack>
            <DocumentCardActions actions={documentCardActionsHouver}  styles={documentCardActionStyles} />
          </DocumentCardDetails>
        </DocumentCard>
      </Stack>
    </>
  );
};
