export type FieldType      = 'signature' | 'initials' | 'date' | 'fullname';
export type EnvelopeStatus = 'pending' | 'completed' | 'voided';

export interface ISignatureField {
  id:        string;
  type:      FieldType;
  xPct:      number;   
  yPct:      number;   
  widthPct:  number;
  heightPct: number;
  label:     string;
  value?:    string;   
  signedAt?: string;
}

export interface ISigner {
  id:        string;
  name:      string;
  title:     string;
  signedAt?: string;
  note?:     string;
}

export interface IAuditEntry {
  timestamp: string;
  actor:     string;
  action:    string;
  detail:    string;
}

export interface IEnvelope {
  id:           string;
  contractId:   number;
  contractName: string;
  contractText: string;
  status:       EnvelopeStatus;
  createdAt:    string;
  createdBy:    string;
  signers:      ISigner[];
  fields:       ISignatureField[];
  completedAt?: string;
  auditLog:     IAuditEntry[];
}

export function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export const FIELD_META: Record<FieldType, {
  label: string; icon: string; color: string; w: number; h: number;
}> = {
  signature: { label: 'Signature', icon: '✍️', color: '#6366f1', w: 22, h: 9  },
  initials:  { label: 'Initials',  icon: '✦',  color: '#8b5cf6', w: 10, h: 6  },
  date:      { label: 'Date',      icon: '📅',  color: '#0891b2', w: 15, h: 5  },
  fullname:  { label: 'Full Name', icon: '👤',  color: '#059669', w: 18, h: 5  },
};

export function statusColor(s: EnvelopeStatus): string {
  return s === 'completed' ? '#10b981' : s === 'voided' ? '#ef4444' : '#0891b2';
}
export function statusBg(s: EnvelopeStatus): string {
  return s === 'completed' ? 'rgba(16,185,129,0.12)'
    : s === 'voided' ? 'rgba(239,68,68,0.1)' : 'rgba(8,145,178,0.12)';
}