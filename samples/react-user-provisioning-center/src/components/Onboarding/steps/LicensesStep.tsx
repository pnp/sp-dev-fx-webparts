import * as React from 'react';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Text,
  makeStyles,
  shorthands,
  tokens
} from '@fluentui/react-components';
import * as strings from 'UpcStrings';
import { useWizard } from '../../../contexts/WizardContext';
import { useLicenseOptions } from '../../../hooks/useReferenceData';
import type { ILicenseOption } from '../../../models';
import { DataState } from '../../Shared/DataState';
import { StepShell } from '../StepShell';
import { WizardFooter } from '../WizardFooter';

const useStyles = makeStyles({
  tableWrap: {
    overflowX: 'auto',
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke2),
    borderRadius: tokens.borderRadiusMedium
  },
  table: {

    tableLayout: 'fixed',
    width: '100%'
  },
  colCheckbox: {
    width: '44px'
  },
  colAvailable: {
    width: '110px',
    whiteSpace: 'nowrap'
  },
  colCost: {
    width: '130px',
    textAlign: 'right',
    whiteSpace: 'nowrap'
  },
  row: {
    cursor: 'pointer',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover
    }
  },
  exhausted: {
    color: tokens.colorNeutralForeground3
  },
  total: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: tokens.spacingVerticalM
  }
});

function costLabel(option: ILicenseOption): string {
  if (option.monthlyCost === null) {
    return strings.LicenseNoCost;
  }
  return `${option.monthlyCost.toFixed(2)} ${option.currency ?? ''}`.trim();
}

export const LicensesStep: React.FC = () => {
  const styles = useStyles();
  const { state, dispatch } = useWizard();
  const licenses = useLicenseOptions();

  const selectedIds: Set<string> = new Set(state.draft.licenses.map((l) => l.skuId));
  const options: ILicenseOption[] = licenses.data ?? [];

  const totalCost: number = options
    .filter((o) => selectedIds.has(o.skuId) && o.monthlyCost !== null)
    .reduce((sum, o) => sum + (o.monthlyCost ?? 0), 0);
  const currency: string =
    options.filter((o) => selectedIds.has(o.skuId) && o.currency)[0]?.currency ?? '';

  const toggle = (option: ILicenseOption): void => {
    dispatch({
      type: 'toggleLicense',
      license: {
        skuId: option.skuId,
        skuPartNumber: option.skuPartNumber,
        displayName: option.displayName
      }
    });
  };

  return (
    <div>
      <StepShell
        title={strings.WizardStepLicenses}
        description={strings.WizardStepDescLicenses}
        wide
      >
      <DataState
        isLoading={licenses.isLoading}
        error={licenses.error}
        isEmpty={!licenses.isLoading && options.length === 0}
        onRetry={() => {
          void licenses.refetch();
        }}
      >
        <div className={styles.tableWrap}>
          <Table aria-label={strings.WizardStepLicenses} size="small" className={styles.table}>
            <TableHeader>
              <TableRow>
                <TableHeaderCell className={styles.colCheckbox} />
                <TableHeaderCell>{strings.LicenseColumnProduct}</TableHeaderCell>
                <TableHeaderCell className={styles.colAvailable}>
                  {strings.LicenseColumnAvailable}
                </TableHeaderCell>
                <TableHeaderCell className={styles.colCost}>
                  {strings.LicenseColumnCost}
                </TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {options.map((option) => {
                const exhausted: boolean = option.availableUnits === 0;
                const selected: boolean = selectedIds.has(option.skuId);
                const locked: boolean = exhausted && !selected;
                return (
                  <TableRow
                    key={option.skuId}
                    className={locked ? undefined : styles.row}
                    onClick={locked ? undefined : () => toggle(option)}
                  >
                    <TableCell className={styles.colCheckbox}>
                      <Checkbox
                        aria-label={option.displayName}
                        checked={selected}
                        disabled={locked}
                        onClick={(ev) => ev.stopPropagation()}
                        onChange={() => toggle(option)}
                      />
                    </TableCell>
                    <TableCell className={exhausted ? styles.exhausted : undefined}>
                      <TableCellLayout
                        truncate
                        description={option.skuPartNumber}
                      >
                        {option.displayName}
                      </TableCellLayout>
                    </TableCell>
                    <TableCell
                      className={
                        exhausted
                          ? `${styles.colAvailable} ${styles.exhausted}`
                          : styles.colAvailable
                      }
                    >
                      {exhausted
                        ? strings.LicenseExhausted
                        : `${option.availableUnits} / ${option.enabledUnits}`}
                    </TableCell>
                    <TableCell
                      className={
                        exhausted ? `${styles.colCost} ${styles.exhausted}` : styles.colCost
                      }
                    >
                      {costLabel(option)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className={styles.total}>
          <Text weight="semibold">
            {strings.LicenseTotalPerMonth}: {totalCost.toFixed(2)} {currency}
          </Text>
        </div>
      </DataState>
      </StepShell>
      <WizardFooter
        onBack={() => dispatch({ type: 'back' })}
        onNext={() => dispatch({ type: 'next' })}
      />
    </div>
  );
};
