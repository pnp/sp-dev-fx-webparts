import * as React from 'react';
import { IEnvelope } from './IEnvelope';

export interface IEnvelopeAuditTrailProps {
  envelope: IEnvelope;
  onBack: () => void;
  onNew: () => void;
}

export const EnvelopeAuditTrail: React.FC<IEnvelopeAuditTrailProps> = ({
  envelope, onBack, onNew,
}) => {
  const mainSig = envelope.fields.find(f => f.type === 'signature' && f.value);

  function downloadReceipt(): void {
    const lines = [
      '══════════════════════════════════════════════════════',
      '           LEGALLENS — E-SIGNATURE RECEIPT',
      '══════════════════════════════════════════════════════',
      '',
      `Document    : ${envelope.contractName}`,
      `Envelope ID : ${envelope.id.toUpperCase()}`,
      `Status      : ${envelope.status.toUpperCase()}`,
      `Created     : ${new Date(envelope.createdAt).toLocaleString()}`,
      `Completed   : ${envelope.completedAt ? new Date(envelope.completedAt).toLocaleString() : '—'}`,
      `Created by  : ${envelope.createdBy}`,
      '',
      '── SIGNERS ────────────────────────────────────────────',
      ...envelope.signers.map((s, i) =>
        `Signer ${i + 1}   : ${s.name}${s.title ? ` · ${s.title}` : ''}${s.signedAt ? `\n             Signed: ${new Date(s.signedAt).toLocaleString()}` : ''}`
      ),
      '',
      '── FIELDS ─────────────────────────────────────────────',
      ...envelope.fields.map(f =>
        `${f.label.padEnd(20)} [${f.type.toUpperCase()}] ${f.value ? '✓ Completed' : '○ Pending'}${f.signedAt ? `  ${new Date(f.signedAt).toLocaleString()}` : ''}`
      ),
      '',
      '── AUDIT LOG ──────────────────────────────────────────',
      ...envelope.auditLog.map(e =>
        `[${new Date(e.timestamp).toLocaleString()}]\n  ${e.actor} · ${e.action}${e.detail ? `\n  ${e.detail}` : ''}`
      ),
      '',
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${envelope.contractName.replace(/\.[^.]+$/, '')}_receipt_${envelope.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>

      <div style={{ textAlign: 'center', padding: '28px 0 24px' }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%', margin: '0 auto 18px',
          background: 'linear-gradient(135deg,rgba(16,185,129,0.2),rgba(5,150,105,0.15))',
          border: '2px solid rgba(16,185,129,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36, boxShadow: '0 0 40px rgba(16,185,129,0.25)',
        }}>✓</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#10b981', marginBottom: 6 }}>
          Envelope Complete
        </div>
        <div style={{ fontSize: 11.5, color: '#64748b' }}>
          All signatures collected · Saved to SharePoint
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>

        <div style={{
          padding: '18px 20px', borderRadius: 14,
          background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)',
        }}>
          <div style={{
            fontSize: 10, color: '#10b981', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.6px', marginBottom: 12,
          }}>Signature</div>
          <div style={{
            background: '#fff', borderRadius: 8, padding: '12px 8px', marginBottom: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 76,
          }}>
            {mainSig?.value
              ? <img src={mainSig.value} alt="Signature" style={{ maxHeight: 68, maxWidth: '100%' }} />
              : <span style={{ fontSize: 11, color: '#aaa' }}>No signature image</span>
            }
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {envelope.fields.map(f => (
              <span key={f.id} style={{
                fontSize: 9, padding: '2px 8px', borderRadius: 99, fontWeight: 600,
                background: f.value ? 'rgba(16,185,129,0.12)' : 'rgba(100,116,139,0.1)',
                color: f.value ? '#10b981' : '#64748b',
              }}>
                {f.value ? '✓' : '○'} {f.label}
              </span>
            ))}
          </div>
        </div>

        <div style={{
          padding: '18px 20px', borderRadius: 14,
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{
            fontSize: 10, color: '#64748b', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.6px', marginBottom: 12,
          }}>Envelope Details</div>
          {[
            { label: 'Document', value: envelope.contractName },
            { label: 'Envelope ID', value: envelope.id.toUpperCase() },
            { label: 'Created by', value: envelope.createdBy },
            { label: 'Created', value: new Date(envelope.createdAt).toLocaleString() },
            { label: 'Completed', value: envelope.completedAt ? new Date(envelope.completedAt).toLocaleString() : '—' },
            { label: 'Signers', value: envelope.signers.map(s => s.name).join(', ') },
          ].map(r => (
            <div key={r.label} style={{
              display: 'flex', justifyContent: 'space-between', gap: 10,
              padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              <span style={{ fontSize: 9.5, color: '#64748b', flexShrink: 0 }}>{r.label}</span>
              <span style={{
                fontSize: 10.5, color: '#e2e8f0', textAlign: 'right',
                overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 160, whiteSpace: 'nowrap',
              }}>{r.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        padding: '16px 18px', borderRadius: 14, marginBottom: 14,
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{
          fontSize: 10, color: '#64748b', fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.6px', marginBottom: 12,
        }}>Signers</div>
        {envelope.signers.map(s => (
          <div key={s.id} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
              background: s.signedAt ? 'rgba(16,185,129,0.18)' : 'rgba(100,116,139,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: s.signedAt ? '#10b981' : '#64748b',
            }}>
              {s.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: '#e2e8f0', fontWeight: 600 }}>
                {s.name}{s.title ? ` · ${s.title}` : ''}
              </div>
              {s.signedAt && (
                <div style={{ fontSize: 9.5, color: '#64748b' }}>
                  Signed {new Date(s.signedAt).toLocaleString()}
                  {s.note ? ` · ${s.note}` : ''}
                </div>
              )}
            </div>
            <span style={{
              fontSize: 9, padding: '2px 9px', borderRadius: 99, fontWeight: 700,
              background: s.signedAt ? 'rgba(16,185,129,0.12)' : 'rgba(100,116,139,0.1)',
              color: s.signedAt ? '#10b981' : '#64748b',
            }}>
              {s.signedAt ? '✓ Signed' : 'Pending'}
            </span>
          </div>
        ))}
      </div>

      <div style={{
        padding: '16px 18px', borderRadius: 14, marginBottom: 20,
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{
          fontSize: 10, color: '#64748b', fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.6px', marginBottom: 12,
        }}>Audit Trail</div>
        {envelope.auditLog.map((entry, i) => (
          <div key={i} style={{
            display: 'flex', gap: 12, padding: '7px 0',
            borderBottom: i < envelope.auditLog.length - 1
              ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: 3 }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: i === envelope.auditLog.length - 1 ? '#10b981' : '#6366f1',
              }} />
              {i < envelope.auditLog.length - 1 && (
                <div style={{ width: 1, flex: 1, minHeight: 12, background: 'rgba(255,255,255,0.06)', marginTop: 3 }} />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                <span style={{ fontSize: 11, color: '#e2e8f0', fontWeight: 600 }}>{entry.action}</span>
                <span style={{ fontSize: 9.5, color: '#475569' }}>
                  {new Date(entry.timestamp).toLocaleString()}
                </span>
              </div>
              <div style={{ fontSize: 10, color: '#64748b' }}>
                {entry.actor}{entry.detail ? ` — ${entry.detail}` : ''}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <button onClick={onBack} style={{
          padding: '9px 18px', borderRadius: 9, border: 'none', cursor: 'pointer',
          background: 'rgba(255,255,255,0.06)', color: '#94a3b8', fontSize: 11, fontWeight: 600,
        }}>← All Envelopes</button>
        <button onClick={downloadReceipt} style={{
          padding: '9px 18px', borderRadius: 9, cursor: 'pointer',
          background: 'rgba(8,145,178,0.1)', color: '#0891b2',
          border: '1px solid rgba(8,145,178,0.25)', fontSize: 11, fontWeight: 600,
        }}>⬇ Download Receipt</button>
        <button onClick={onNew} style={{
          padding: '9px 22px', borderRadius: 9, border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff',
          fontSize: 11, fontWeight: 700, boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
        }}>+ New Envelope</button>
      </div>
    </div>
  );
};