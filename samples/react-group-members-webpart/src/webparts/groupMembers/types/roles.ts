import { IGroupMembersProps } from '../components/IGroupMembersProps';
import * as strings from 'GroupMembersWebPartStrings';

export type AccessRole = 'owner' | 'admin' | 'member' | 'visitor';

export const rolePriority: Record<AccessRole, number> = {
  owner: 4,
  admin: 3,
  member: 2,
  visitor: 1
};

export const roleLabelMap = (props: Pick<IGroupMembersProps,
  'ownerLabel' | 'adminLabel' | 'memberLabel' | 'visitorLabel'>): Record<AccessRole, string> => ({
  owner: props.ownerLabel || strings.OwnersDefaultLabel,
  admin: props.adminLabel || strings.AdminsDefaultLabel,
  member: props.memberLabel || strings.MembersDefaultLabel,
  visitor: props.visitorLabel || strings.VisitorsDefaultLabel
});
