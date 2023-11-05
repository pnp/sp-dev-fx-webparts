import * as React from 'react';

import { Subtitle1 } from '@fluentui/react-components';
import { Icon } from '@iconify/react';

import { useCompanyInfoStyles } from './useCompanyInfoStyles';

export interface ICompanyInfoProps {}

export const CompanyInfo: React.FunctionComponent<ICompanyInfoProps> = (
  props: React.PropsWithChildren<ICompanyInfoProps>
) => {
  const styles = useCompanyInfoStyles();
  return (
    <>
      <div className={styles.infoContainer}>
        <Icon icon="mdi:company" width={36} height={36} />
        <Subtitle1  className={styles.headerTitle}>{"My Company"}</Subtitle1>
      </div>
    </>
  );
};
