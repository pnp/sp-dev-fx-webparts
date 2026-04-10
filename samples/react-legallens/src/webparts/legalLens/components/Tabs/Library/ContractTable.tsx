import * as React from 'react';
import { Stack, Text, DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from '@fluentui/react';
import { DocumentRegular, OpenRegular } from '@fluentui/react-icons';
import { IContract } from '../../../models/IContract';
import { riskScoreTextColor } from '../../../utilities/colorUtils';
import styles from './Library.module.scss';

export interface IContractTableProps {
  contracts: IContract[];
  onSelect: (contract: IContract) => void;
}

export const ContractTable: React.FC<IContractTableProps> = ({ contracts, onSelect }) => {
  const statusColor = (status: string): string => {
    if (status === 'critical') return '#ef4444';
    if (status === 'warning') return '#f59e0b';
    return '#10b981';
  };

  const columns: IColumn[] = [
    {
      key: 'open',
      name: '',
      minWidth: 36,
      maxWidth: 36,
      onRender: (item: IContract) => (
        <button
          className={styles.openBtn}
          onClick={() => onSelect(item)}
        >
          <OpenRegular />
        </button>
      )
    },
    {
      key: 'name',
      name: 'Contract',
      fieldName: 'name',
      minWidth: 200,
      maxWidth: 350,
      isResizable: true,
      onRender: (item: IContract) => (
        <Stack>
          <Text className={styles.contractName}>{item.name}</Text>
          <Text className={styles.contractExpiry}>Expires: {item.expiry}</Text>
        </Stack>
      )
    },
    {
      key: 'type',
      name: 'Type',
      fieldName: 'type',
      minWidth: 120,
      maxWidth: 150,
      isResizable: true,
      onRender: (item: IContract) => (
        <Text className={styles.metaText}>{item.type}</Text>
      )
    },
    {
      key: 'jurisdiction',
      name: 'Jurisdiction',
      fieldName: 'jurisdiction',
      minWidth: 100,
      maxWidth: 130,
      isResizable: true,
      onRender: (item: IContract) => (
        <Text className={styles.metaText}>{item.jurisdiction}</Text>
      )
    },
    {
      key: 'risk',
      name: 'Risk',
      fieldName: 'risk',
      minWidth: 70,
      maxWidth: 90,
      isResizable: true,
      onRender: (item: IContract) => (
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 5 }}>
          <div className={styles.riskTrack}>
            <div style={{ width: `${item.risk}%`, height: '100%', background: riskScoreTextColor(item.risk), borderRadius: '2px' }} />
          </div>
          <Text className={styles.riskScore} style={{ color: riskScoreTextColor(item.risk) }}>{item.risk}</Text>
        </Stack>
      )
    },
    {
      key: 'status',
      name: 'Status',
      fieldName: 'status',
      minWidth: 90,
      maxWidth: 120,
      isResizable: true,
      onRender: (item: IContract) => (
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 4 }}>
          <div className={styles.statusDot} style={{ background: statusColor(item.status) }} />
          <Text className={styles.statusText} style={{ color: statusColor(item.status) }}>{item.status}</Text>
          {item.flag && <Text className={styles.flagBadge}>{item.flag}</Text>}
        </Stack>
      )
    }
  ];

  if (contracts.length === 0) {
    return (
      <Stack horizontalAlign="center" className={styles.emptyState}>
        <DocumentRegular className={styles.emptyIcon} />
        <Text className={styles.emptyText}>No contracts match this filter</Text>
      </Stack>
    );
  }

  return (
    <div className={styles.tableWrap}>
      <DetailsList
        items={contracts}
        columns={columns}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible={true}
      />
    </div>
  );
};
