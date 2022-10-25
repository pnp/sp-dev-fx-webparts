import * as React from 'react';

import {
  ActionButton,
  IIconProps,
} from 'office-ui-fabric-react';

export interface IShowParticipantsProps {
  showParticipants: boolean;
  onClick : React.MouseEventHandler<HTMLButtonElement>
}

export const ShowParticipantsButton: React.FunctionComponent<IShowParticipantsProps> = (
  props: React.PropsWithChildren<IShowParticipantsProps>
) => {
  const { showParticipants, onClick } = props;
  const contactListIcon: IIconProps = React.useMemo(() => {
    return { iconName: "ContactList" };
  }, []);
  const lbuttonLabel: string = React.useMemo(() => {
    return showParticipants ?"Hide participants" : "Show participants"  ;
  }, [showParticipants]);

  return (
    <>
      <ActionButton iconProps={contactListIcon} allowDisabledFocus onClick={ onClick }>
        {lbuttonLabel}
      </ActionButton>
    </>
  );
};
