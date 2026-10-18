import * as React from 'react';
import styles from './KnowledgeSourceHealth.module.scss';
import { IScanResult } from '../../../rules/evaluate';

export interface IScorecardProps {
  result: IScanResult;
}

interface ITileProps {
  value: string;
  label: string;
  className?: string;
}

const Tile: React.FC<ITileProps> = ({ value, label, className }) => (
  <div className={styles.tile}>
    <div className={`${styles.tileValue} ${className || ''}`}>{value}</div>
    <div className={styles.tileLabel}>{label}</div>
  </div>
);

export const Scorecard: React.FC<IScorecardProps> = ({ result }) => {
  const count = (severity: string): number =>
    result.findings.filter(f => f.severity === severity).length;

  return (
    <div className={styles.scorecard}>
      <Tile value={`${result.groundablePercent}%`} label="Groundable documents" />
      <Tile value={String(result.documentsScanned)} label="Documents scanned" />
      <Tile value={String(count('blocking'))} label="Blocking findings" className={styles.blocking} />
      <Tile value={String(count('degraded'))} label="Degraded findings" className={styles.degraded} />
      <Tile
        value={String(count('informational'))}
        label="Informational"
        className={styles.informational}
      />
    </div>
  );
};

export default Scorecard;
