import * as React from 'react';
import { IContract } from '../../../models/IContract';
import { IEnvelope, ISigner, ISignatureField, FieldType, makeId, FIELD_META } from './IEnvelope';


export interface IEnvelopeCreatorProps {
  contracts: IContract[];
  userDisplayName: string;
  onCreate: (env: IEnvelope) => void;
  onBack: () => void;
}

type Step = 'contract' | 'signers' | 'fields';
const FIELD_TYPES: FieldType[] = ['signature', 'initials', 'date', 'fullname'];

const input: React.CSSProperties = {
  width: '100%', padding: '9px 12px', borderRadius: 8, border: 'none',
  background: 'rgba(255,255,255,0.06)', color: '#e2e8f0', fontSize: 12.5,
  outline: 'none', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
  boxSizing: 'border-box',
};
const lbl: React.CSSProperties = {
  display: 'block', fontSize: 10, color: '#64748b', fontWeight: 600,
  letterSpacing: '0.5px', marginBottom: 5, textTransform: 'uppercase',
};

export const EnvelopeCreator: React.FC<IEnvelopeCreatorProps> = ({
  contracts, userDisplayName, onCreate, onBack,
}) => {
  const [step, setStep] = React.useState<Step>('contract');
  const [selId, setSelId] = React.useState<number>(-1);
  const [signers, setSigners] = React.useState<ISigner[]>([
    { id: makeId(), name: userDisplayName, title: '' },
  ]);
  const [fields, setFields] = React.useState<ISignatureField[]>([]);
  const [activeTool, setActiveTool] = React.useState<FieldType>('signature');
  const docRef = React.useRef<HTMLDivElement>(null);

  const contract = contracts.find(c => c.id === selId);

  React.useEffect(() => {
    if (step !== 'fields' || fields.length > 0) return;
    const seeded: ISignatureField[] = [
      ...signers.map((s, i) => ({
        id: makeId(), type: 'signature' as FieldType,
        xPct: 5, yPct: 72 + i * 12,
        widthPct: FIELD_META.signature.w, heightPct: FIELD_META.signature.h,
        label: `${s.name} — Signature`,
      })),
      {
        id: makeId(), type: 'date' as FieldType,
        xPct: 60, yPct: 72,
        widthPct: FIELD_META.date.w, heightPct: FIELD_META.date.h,
        label: 'Date Signed',
      },
    ];
    setFields(seeded);
  }, [step]);

  function handleDocClick(e: React.MouseEvent<HTMLDivElement>): void {
    if (!docRef.current) return;
    const r = docRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - r.left) / r.width) * 100;
    const yPct = ((e.clientY - r.top) / r.height) * 100;
    const m = FIELD_META[activeTool];
    setFields(prev => [...prev, {
      id: makeId(), type: activeTool,
      xPct: Math.min(xPct, 100 - m.w),
      yPct: Math.min(yPct, 100 - m.h),
      widthPct: m.w, heightPct: m.h,
      label: m.label,
    }]);
  }

  function addSigner(): void {
    setSigners(p => [...p, { id: makeId(), name: '', title: '' }]);
  }
  function updateSigner(id: string, k: 'name' | 'title', v: string): void {
    setSigners(p => p.map(s => s.id === id ? { ...s, [k]: v } : s));
  }
  function removeSigner(id: string): void {
    setSigners(p => p.filter(s => s.id !== id));
  }

  function handleCreate(): void {
    if (!contract) return;
    const env: IEnvelope = {
      id: makeId(),
      contractId: contract.id,
      contractName: contract.name,
      contractText: (contract as any).fullText || contract.summary || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      createdBy: userDisplayName,
      signers,
      fields,
      auditLog: [],
    };
    onCreate(env);
  }

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>


      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button onClick={onBack} style={{
          padding: '6px 13px', borderRadius: 8, border: 'none', cursor: 'pointer',
          background: 'rgba(255,255,255,0.06)', color: '#94a3b8', fontSize: 11,
        }}>← Back</button>
        <div>
          <div style={{
            fontFamily: "'Cinzel',Georgia,serif", fontSize: 19, fontWeight: 600,
            background: 'linear-gradient(135deg,#fff,#a5b4fc)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>New Envelope</div>
          <div style={{ fontSize: 10, color: '#64748b', marginTop: 1 }}>
            Select document → add signers → place fields
          </div>
        </div>
      </div>


      <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderRadius: 10, overflow: 'hidden' }}>
        {(['contract', 'signers', 'fields'] as Step[]).map((s, i) => {
          const labels = ['1  Select Document', '2  Add Signers', '3  Place Fields'];
          const cur = ['contract', 'signers', 'fields'].indexOf(step);
          return (
            <div key={s} style={{
              flex: 1, padding: '8px 6px', fontSize: 10, fontWeight: 700,
              textAlign: 'center', letterSpacing: '0.4px',
              background: i <= cur
                ? 'linear-gradient(135deg,rgba(99,102,241,0.18),rgba(139,92,246,0.18))'
                : 'rgba(255,255,255,0.03)',
              color: i <= cur ? '#a5b4fc' : '#475569',
              borderBottom: i <= cur ? '2px solid #6366f1' : '2px solid transparent',
            }}>{labels[i]}</div>
          );
        })}
      </div>


      {step === 'contract' && (
        <>
          <p style={{ fontSize: 11, color: '#64748b', marginBottom: 14, marginTop: 0 }}>
            Choose a document from your SharePoint Contracts library.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 360, overflowY: 'auto', marginBottom: 20 }}>
            {contracts.length === 0 && (
              <div style={{ padding: 24, textAlign: 'center', color: '#475569', fontSize: 11 }}>
                No contracts found in library.
              </div>
            )}
            {contracts.map(c => (
              <div key={c.id} onClick={() => setSelId(c.id)} style={{
                padding: '13px 16px', borderRadius: 12, cursor: 'pointer',
                border: selId === c.id
                  ? '1px solid rgba(99,102,241,0.55)' : '1px solid rgba(255,255,255,0.07)',
                background: selId === c.id
                  ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.02)',
                display: 'flex', alignItems: 'center', gap: 14, transition: 'all 0.18s',
              }}>
                <span style={{ fontSize: 26, flexShrink: 0 }}>📄</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 12.5, color: '#e2e8f0', fontWeight: 600, marginBottom: 2,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>{c.name}</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>
                    {c.type} · {c.parties.slice(0, 2).join(', ')} · {c.jurisdiction}
                  </div>
                </div>
                {selId === c.id && (
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%', background: '#6366f1', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 11, fontWeight: 800,
                  }}>✓</div>
                )}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Btn disabled={selId < 0} onClick={() => setStep('signers')} primary>
              Add Signers →
            </Btn>
          </div>
        </>
      )}


      {step === 'signers' && (
        <>
          <p style={{ fontSize: 11, color: '#64748b', marginBottom: 14, marginTop: 0 }}>
            Add everyone who needs to sign this document.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
            {signers.map((s, i) => (
              <div key={s.id} style={{
                padding: '14px 16px', borderRadius: 12,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{
                    fontSize: 10, color: '#6366f1', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.5px'
                  }}>Signer {i + 1}</span>
                  {signers.length > 1 && (
                    <button onClick={() => removeSigner(s.id)} style={{
                      padding: '3px 8px', borderRadius: 6, border: 'none', cursor: 'pointer',
                      background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontSize: 10,
                    }}>Remove</button>
                  )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={lbl}>Full Name *</label>
                    <input value={s.name} onChange={e => updateSigner(s.id, 'name', e.target.value)}
                      placeholder="Full legal name" style={input} />
                  </div>
                  <div>
                    <label style={lbl}>Title / Role</label>
                    <input value={s.title} onChange={e => updateSigner(s.id, 'title', e.target.value)}
                      placeholder="e.g. Chief Technology Officer" style={input} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={addSigner} style={{
            width: '100%', padding: '9px', borderRadius: 9, cursor: 'pointer',
            border: '1.5px dashed rgba(99,102,241,0.3)',
            background: 'rgba(99,102,241,0.04)', color: '#818cf8', fontSize: 11,
            marginBottom: 20,
          }}>+ Add Another Signer</button>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Btn onClick={() => setStep('contract')}>← Back</Btn>
            <Btn disabled={signers.some(s => !s.name.trim())} onClick={() => setStep('fields')} primary>
              Place Signature Fields →
            </Btn>
          </div>
        </>
      )}


      {step === 'fields' && contract && (
        <>
          <p style={{ fontSize: 11, color: '#64748b', marginBottom: 12, marginTop: 0 }}>
            Click anywhere on the document below to place a field. Click a placed field's × to remove it.
          </p>


          <div style={{
            display: 'flex', gap: 7, marginBottom: 12, padding: '10px 14px',
            background: 'rgba(255,255,255,0.02)', borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.07)', flexWrap: 'wrap', alignItems: 'center',
          }}>
            <span style={{ fontSize: 10, color: '#64748b', marginRight: 2 }}>Place:</span>
            {FIELD_TYPES.map(ft => {
              const m = FIELD_META[ft];
              return (
                <button key={ft} onClick={() => setActiveTool(ft)} style={{
                  padding: '6px 13px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: activeTool === ft ? m.color : 'rgba(255,255,255,0.05)',
                  color: activeTool === ft ? '#fff' : '#94a3b8',
                  fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5,
                  boxShadow: activeTool === ft ? `0 2px 10px ${m.color}55` : 'none',
                  transition: 'all 0.18s',
                }}>
                  <span>{m.icon}</span>{m.label}
                </button>
              );
            })}
            <span style={{ marginLeft: 'auto', fontSize: 10, color: '#475569' }}>
              {fields.length} field{fields.length !== 1 ? 's' : ''} placed
            </span>
          </div>


          <div style={{ position: 'relative', marginBottom: 14 }}>

            <div style={{
              position: 'absolute', top: -11, right: 0, zIndex: 10,
              fontSize: 9.5, color: '#6366f1',
              background: 'rgba(99,102,241,0.1)', padding: '3px 9px', borderRadius: 99,
            }}>
              Click to place {FIELD_META[activeTool].label}
            </div>


            <div
              ref={docRef}
              onClick={handleDocClick}
              style={{
                position: 'relative', cursor: 'crosshair',
                background: 'rgba(15,23,42,0.9)',
                border: '1px solid rgba(99,102,241,0.25)', borderRadius: 12,
                padding: '28px 32px', minHeight: 440, overflow: 'hidden',
                userSelect: 'none',
              }}
            >

              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%) rotate(-28deg)',
                fontSize: 40, fontWeight: 900, color: 'rgba(99,102,241,0.05)',
                letterSpacing: 6, pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap',
              }}>AWAITING SIGNATURE</div>


              <div style={{
                fontSize: 10.5, color: '#94a3b8', lineHeight: 1.9, whiteSpace: 'pre-wrap',
                wordBreak: 'break-word', maxHeight: 380, overflowY: 'auto', pointerEvents: 'none',
              }}>
                {(contract as any).fullText
                  ? ((contract as any).fullText as string).slice(0, 2200)
                  + ((contract as any).fullText.length > 2200 ? '\n\n[Document continues…]' : '')
                  : contract.summary || '(No document text available)'}
              </div>

              {fields.map(f => (
                <PlacedFieldChip key={f.id} field={f} onRemove={() => setFields(p => p.filter(x => x.id !== f.id))} />
              ))}
            </div>
          </div>

          {fields.length === 0 && (
            <div style={{
              padding: '9px 13px', borderRadius: 8, marginBottom: 14,
              background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.22)',
              fontSize: 10.5, color: '#f59e0b',
            }}>⚠ Place at least one signature field before sending.</div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Btn onClick={() => { setStep('signers'); setFields([]); }}>← Back</Btn>
            <Btn disabled={fields.length === 0} onClick={handleCreate} primary green>
              Create Envelope &amp; Sign →
            </Btn>
          </div>
        </>
      )}
    </div>
  );
};

function PlacedFieldChip({ field, onRemove }: { field: ISignatureField; onRemove: () => void }): React.ReactElement {
  const m = FIELD_META[field.type];
  return (
    <div
      onClick={e => { e.stopPropagation(); onRemove(); }}
      title={`Click to remove ${m.label}`}
      style={{
        position: 'absolute',
        left: `${field.xPct}%`, top: `${field.yPct}%`,
        width: `${field.widthPct}%`, height: `${field.heightPct}%`,
        background: `${m.color}20`, border: `1.5px dashed ${m.color}99`,
        borderRadius: 5, cursor: 'pointer', zIndex: 5,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
        overflow: 'hidden',
      }}
    >
      <span style={{ fontSize: 9 }}>{m.icon}</span>
      <span style={{ fontSize: 8.5, color: m.color, fontWeight: 700 }}>{m.label}</span>
      <div style={{
        position: 'absolute', top: -6, right: -6, width: 14, height: 14, borderRadius: '50%',
        background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 8, color: '#fff', fontWeight: 800, lineHeight: 1,
      }}>×</div>
    </div>
  );
}

function Btn({
  children, onClick, disabled, primary, green,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  primary?: boolean;
  green?: boolean;
}): React.ReactElement {
  const bg = disabled ? 'rgba(255,255,255,0.04)'
    : green ? 'linear-gradient(135deg,#10b981,#059669)'
      : primary ? 'linear-gradient(135deg,#6366f1,#8b5cf6)'
        : 'rgba(255,255,255,0.07)';
  const shadow = disabled ? 'none'
    : green ? '0 4px 14px rgba(16,185,129,0.35)'
      : primary ? '0 4px 14px rgba(99,102,241,0.35)' : 'none';
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: '9px 20px', borderRadius: 9, border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      background: bg, color: disabled ? '#475569' : '#fff',
      fontSize: 11.5, fontWeight: 700, opacity: disabled ? 0.55 : 1,
      boxShadow: shadow, transition: 'all 0.2s',
    }}>{children}</button>
  );
}