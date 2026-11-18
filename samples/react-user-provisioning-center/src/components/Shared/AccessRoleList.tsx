import * as React from 'react';
import { Dropdown, Option, Text, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  roleList: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXXS
  },
  roleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2
  },
  roleRowName: {
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  roleDropdown: {
    minWidth: '120px',
    flexShrink: 0
  }
});

export interface IAccessRoleListItem<TRole extends string> {
  id: string;
  title: string;
  role: TRole;
}

export interface IAccessRoleOption<TRole extends string> {
  value: TRole;
  label: string;
}

export interface IAccessRoleListProps<TRole extends string> {
  items: IAccessRoleListItem<TRole>[];
  roleOptions: IAccessRoleOption<TRole>[];
  onRoleChange: (id: string, role: TRole) => void;
}

export function AccessRoleList<TRole extends string>({
  items,
  roleOptions,
  onRoleChange
}: IAccessRoleListProps<TRole>): React.ReactElement | null {
  const styles = useStyles();
  if (items.length === 0) {
    return null;
  }
  const labelOf = (role: TRole): string => roleOptions.filter((o) => o.value === role)[0]?.label ?? role;

  return (
    <div className={styles.roleList}>
      {items.map((item) => (
        <div key={item.id} className={styles.roleRow}>
          <Text size={200} className={styles.roleRowName}>
            {item.title}
          </Text>
          <Dropdown
            size="small"
            className={styles.roleDropdown}
            value={labelOf(item.role)}
            selectedOptions={[item.role]}
            onOptionSelect={(_, data) => onRoleChange(item.id, (data.optionValue as TRole) ?? item.role)}
          >
            {roleOptions.map((option) => (
              <Option key={option.value} value={option.value} text={option.label}>
                {option.label}
              </Option>
            ))}
          </Dropdown>
        </div>
      ))}
    </div>
  );
}
