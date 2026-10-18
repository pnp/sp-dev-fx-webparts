import { IListViewColumn } from '../../../../../components/ListView';
import { IPersonInfo } from '../../../../../common/types';

/** Shared columns for the owners and members lists in the People drawer. */
export const PERSON_COLUMNS: IListViewColumn<IPersonInfo>[] = [
  {
    key: 'displayName',
    header: 'Name',
    dataType: 'text',
    getValue: (item) => item.displayName,
    isSortable: true,
    isFlexibleWidth: true,
    width: 220
  },
  {
    key: 'email',
    header: 'Email',
    dataType: 'text',
    getValue: (item) => item.email ?? item.userPrincipalName,
    isSortable: true,
    format: { text: { emptyText: '—' } },
    isFlexibleWidth: true
  },
  {
    key: 'jobTitle',
    header: 'Job title',
    dataType: 'text',
    getValue: (item) => item.jobTitle,
    isSortable: true,
    format: { text: { emptyText: '—' } },
    width: 200
  }
];
