import * as React from 'react';
import { IEnvelope } from './IEnvelope';
import { ISharePointService } from '../../../services/SharePointService';

export interface IDocumentSignerProps {
  envelope: IEnvelope;
  userDisplayName: string;
  sharePointService: ISharePointService;
  onSigned: (updated: IEnvelope) => void;
  onBack: () => void;
}

type SignMode = 'draw' | 'type' | 'upload';

const PEN_COLORS = ['#1e293b', '#1d4ed8', '#15803d', '#7c2d12'];
const SIG_FONTS = [
  { name: 'Elegant', css: "'Dancing Script', cursive" },
  { name: 'Classic', css: "'Pinyon Script', cursive" },
  { name: 'Refined', css: "'Great Vibes', cursive" },
  { name: 'Bold', css: "'Satisfy', cursive" },
];

function typeSigToDataUrl(text: string, fontCss: string, color: string): string {
  const c = document.createElement('canvas');
  c.width = 420; c.height = 100;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, 420, 100);
  ctx.font = `52px ${fontCss}`;
  ctx.fillStyle = color;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(text, 210, 52);
  return c.toDataURL('image/png');
}

export const DocumentSigner: React.FC<IDocumentSignerProps> = ({
  envelope, sharePointService, onSigned, onBack,
}) => {
  const [activeSigner, setActiveSigner] = React.useState<number>(0);
  const [signatures, setSignatures] = React.useState<Record<number, string>>({});
  const [dateSigned, setDateSigned] = React.useState<string>('');
  const [showPad, setShowPad] = React.useState(false);
  const [mode, setMode] = React.useState<SignMode>('draw');
  const [penColor, setPenColor] = React.useState(PEN_COLORS[0]);
  const [sigFont, setSigFont] = React.useState(SIG_FONTS[0].css);
  const [typedName, setTypedName] = React.useState('');
  const [uploadImg, setUploadImg] = React.useState<string | null>(null);
  const [drawEmpty, setDrawEmpty] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  const [sigPositions, setSigPositions] = React.useState<Record<number, { x: number; y: number }>>({});
  const [dragging, setDragging] = React.useState<number | null>(null);
  const [dragStart, setDragStart] = React.useState<{ x: number; y: number } | null>(null);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const padRef = React.useRef<any>(null);
  const sigPageRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!(window as any).SignaturePad) {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/signature_pad@4.2.0/dist/signature_pad.umd.min.js';
      s.async = true;
      document.head.appendChild(s);
    }
    const id = 'll-sig-fonts';
    if (!document.getElementById(id)) {
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Pinyon+Script&family=Great+Vibes&family=Satisfy&display=swap';
      document.head.appendChild(l);
    }
  }, []);

  React.useEffect(() => {
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    setDateSigned(today);
  }, []);

  React.useEffect(() => {
    if (!sigPageRef.current || Object.keys(sigPositions).length > 0) return;
    const defaultPos: Record<number, { x: number; y: number }> = {};
    envelope.signers.forEach((s, i) => {
      defaultPos[i] = { x: 60 + (i % 2) * 350, y: 40 + Math.floor(i / 2) * 140 };
    });
    setSigPositions(defaultPos);
  }, [envelope.signers, sigPositions]);

  React.useEffect(() => {
    if (!showPad || mode !== 'draw') return;
    const timer = setTimeout(() => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const SP = (window as any).SignaturePad;
      if (!SP) return;
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext('2d')!.scale(ratio, ratio);
      const pad = new SP(canvas, { minWidth: 1.2, maxWidth: 3.5, penColor, backgroundColor: 'rgba(0,0,0,0)' });
      pad.addEventListener('endStroke', () => setDrawEmpty(pad.isEmpty()));
      padRef.current = pad;
      setDrawEmpty(true);
    }, 80);
    return () => clearTimeout(timer);

  }, [showPad, mode]);

  React.useEffect(() => {
    if (padRef.current) padRef.current.penColor = penColor;
  }, [penColor]);

  function openPadForSigner(idx: number): void {
    const signer = envelope.signers[idx];
    setActiveSigner(idx);
    setTypedName(signer.name);
    setDrawEmpty(true);
    setUploadImg(null);
    setMode('draw');
    setShowPad(true);
  }

  function canApply(): boolean {
    if (mode === 'draw') return !drawEmpty;
    if (mode === 'type') return typedName.trim().length > 0;
    if (mode === 'upload') return !!uploadImg;
    return false;
  }

  function applySignature(): void {
    let val: string | null = null;
    if (mode === 'draw' && padRef.current && !padRef.current.isEmpty()) {
      val = padRef.current.toDataURL('image/png');
    } else if (mode === 'type' && typedName.trim()) {
      val = typeSigToDataUrl(typedName.trim(), sigFont, penColor);
    } else if (mode === 'upload' && uploadImg) {
      val = uploadImg;
    }
    if (val) setSignatures(v => ({ ...v, [activeSigner]: val! }));
    setShowPad(false);
  }


  const allSigned = envelope.signers.every((_, i) => signatures[i]);

  async function handleComplete(): Promise<void> {
    setSaving(true);
    try {
      const now = new Date().toISOString();

      const signedEnvelope = {
        ...envelope,
        status: 'completed' as const,
        completedAt: now,
        signers: envelope.signers.map((s, i) => ({
          ...s,
          signedAt: now,
          signatureDataUrl: signatures[i],
          signaturePosition: sigPositions[i],
        })),
        dateSigned,
      };


      const payload = JSON.stringify(signedEnvelope, null, 2);
      const blob = new Blob([payload], { type: 'application/json' });
      const fname = `${envelope.contractName.replace(/\.[^.]+$/, '')}_signed_${envelope.id}.json`;

      await (sharePointService as any).saveSignedEnvelope(fname, blob, {
        contractName: envelope.contractName,
        signers: envelope.signers.map(s => s.name).join('; '),
        signedAt: now,
      });

      onSigned(signedEnvelope);
    } catch (err) {
      console.error('[ESignature] Save failed:', err);
      alert('Failed to save signature to SharePoint. Please try again.');
    } finally {
      setSaving(false);
    }
  }


  function handleMouseDown(idx: number, e: React.MouseEvent): void {
    if (signatures[idx]) return;

    setDragging(idx);
    setDragStart({ x: e.clientX, y: e.clientY });
  }

  function handleMouseMove(e: React.MouseEvent): void {
    if (dragging === null || !dragStart) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setSigPositions(p => ({
      ...p,
      [dragging]: {
        x: (p[dragging]?.x || 0) + dx,
        y: (p[dragging]?.y || 0) + dy,
      },
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  }

  function handleMouseUp(): void {
    setDragging(null);
    setDragStart(null);
  }

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={onBack} style={{
            padding: '6px 13px', borderRadius: 8, border: 'none', cursor: 'pointer',
            background: 'rgba(255,255,255,0.06)', color: '#94a3b8', fontSize: 11,
          }}>← Back</button>
          <div>
            <div style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 600 }}>{envelope.contractName}</div>
            <div style={{ fontSize: 10, color: '#64748b' }}>
              Sign at bottom · {envelope.signers.map(s => s.name).join(' · ')}
            </div>
          </div>
        </div>

        <div style={{
          padding: '5px 14px', borderRadius: 99, fontSize: 10.5, fontWeight: 700,
          background: allSigned ? 'rgba(16,185,129,0.12)' : 'rgba(99,102,241,0.12)',
          color: allSigned ? '#10b981' : '#818cf8',
          border: `1px solid ${allSigned ? 'rgba(16,185,129,0.3)' : 'rgba(99,102,241,0.3)'}`,
        }}>
          {Object.keys(signatures).length} / {envelope.signers.length} signed
        </div>
      </div>


      <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 99, marginBottom: 16 }}>
        <div style={{
          height: '100%', borderRadius: 99,
          width: `${envelope.signers.length ? (Object.keys(signatures).length / envelope.signers.length) * 100 : 0}%`,
          background: 'linear-gradient(90deg,#6366f1,#10b981)', transition: 'width 0.4s',
        }} />
      </div>


      <div style={{
        background: '#fff', borderRadius: 12, padding: 0, marginBottom: 16,
        border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        maxHeight: 600, overflowY: 'auto',
      }}>

        <div style={{
          padding: '32px 48px', fontSize: 11, color: '#1e293b', lineHeight: 1.9,
          whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: "'Georgia', serif",
          minHeight: 400,
        }}>
          {envelope.contractText
            ? envelope.contractText.slice(0, 4000)
            + (envelope.contractText.length > 4000 ? '\n\n[Document continues…]' : '')
            : '(No document text — scroll to signature page below)'}
        </div>


        <div
          ref={sigPageRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{
            position: 'relative',
            borderTop: '2px dashed #cbd5e1',
            background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
            padding: '32px 48px 48px',
            minHeight: 320,
            userSelect: dragging !== null ? 'none' : 'auto',
          }}
        >

          <div style={{
            fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 6,
            fontFamily: "'Cinzel', Georgia, serif", letterSpacing: '0.5px',
          }}>
            SIGNATURE PAGE
          </div>
          <div style={{ fontSize: 11, color: '#64748b', marginBottom: 24 }}>
            {envelope.contractName} · {dateSigned}
          </div>


          {envelope.signers.map((signer, idx) => {
            const pos = sigPositions[idx] || { x: 0, y: 0 };
            const sig = signatures[idx];
            return (
              <div
                key={idx}
                onMouseDown={e => handleMouseDown(idx, e)}
                style={{
                  position: 'absolute',
                  left: pos.x, top: pos.y,
                  width: 280, cursor: sig ? 'default' : 'move',
                  background: sig ? '#fff' : 'rgba(255,255,255,0.7)',
                  border: sig ? '2px solid #10b981' : '2px dashed #6366f1',
                  borderRadius: 10, padding: '14px 16px',
                  boxShadow: sig ? '0 4px 16px rgba(16,185,129,0.2)' : '0 2px 10px rgba(99,102,241,0.15)',
                  transition: 'box-shadow 0.2s',
                }}
              >

                <div style={{
                  fontSize: 9, color: '#64748b', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.6px', marginBottom: 8,
                }}>
                  {signer.name}{signer.title ? ` · ${signer.title}` : ''}
                </div>


                {sig ? (
                  <div style={{
                    background: '#fff', borderRadius: 6, padding: '8px 4px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    minHeight: 64, border: '1px solid #e2e8f0',
                  }}>
                    <img src={sig} alt={`${signer.name} signature`} style={{ maxHeight: 56, maxWidth: '100%' }} />
                  </div>
                ) : (
                  <div
                    onClick={() => openPadForSigner(idx)}
                    style={{
                      background: 'rgba(99,102,241,0.05)', borderRadius: 6, padding: 16,
                      border: '1.5px dashed #6366f1', cursor: 'pointer', textAlign: 'center',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(99,102,241,0.1)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(99,102,241,0.05)')}
                  >
                    <div style={{ fontSize: 24, marginBottom: 4 }}>✍️</div>
                    <div style={{ fontSize: 11, color: '#6366f1', fontWeight: 600 }}>Click to Sign</div>
                  </div>
                )}


                <div style={{
                  marginTop: 10, paddingTop: 8, borderTop: '1px solid #e2e8f0',
                  fontSize: 9.5, color: '#64748b', display: 'flex', justifyContent: 'space-between',
                }}>
                  <span>Date:</span>
                  <span>{sig ? dateSigned : '_______________'}</span>
                </div>


                {!sig && (
                  <div style={{
                    position: 'absolute', top: 6, right: 6,
                    fontSize: 9, color: '#94a3b8', background: 'rgba(255,255,255,0.8)',
                    padding: '2px 6px', borderRadius: 4,
                  }}>⋮⋮ Drag to reposition</div>
                )}
              </div>
            );
          })}
        </div>
      </div>


      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleComplete}
          disabled={!allSigned || saving}
          style={{
            padding: '11px 28px', borderRadius: 10, border: 'none',
            cursor: allSigned && !saving ? 'pointer' : 'not-allowed',
            fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8,
            background: !allSigned || saving ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg,#10b981,#059669)',
            color: !allSigned || saving ? '#475569' : '#fff',
            opacity: !allSigned || saving ? 0.55 : 1,
            boxShadow: allSigned && !saving ? '0 4px 20px rgba(16,185,129,0.4)' : 'none',
            transition: 'all 0.2s',
          }}
        >
          {saving ? (
            <>
              <span style={{
                width: 13, height: 13, borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff',
                animation: 'spin 0.7s linear infinite', display: 'inline-block',
              }} />
              Saving to SharePoint…
            </>
          ) : '✓ Complete & Save to Signatures Library'}
        </button>
      </div>


      {showPad && (
        <PadModal
          signerName={envelope.signers[activeSigner].name}
          mode={mode} onMode={m => { setMode(m); setDrawEmpty(true); padRef.current = null; }}
          penColor={penColor} onPenColor={setPenColor}
          canvasRef={canvasRef} drawEmpty={drawEmpty}
          onClear={() => { padRef.current?.clear(); setDrawEmpty(true); }}
          typedName={typedName} onTypedName={setTypedName}
          sigFont={sigFont} onFont={setSigFont}
          uploadImg={uploadImg}
          onUpload={e => {
            const file = e.target.files?.[0];
            if (!file) return;
            const r = new FileReader();
            r.onload = ev => setUploadImg(ev.target?.result as string);
            r.readAsDataURL(file);
          }}
          canApply={canApply()}
          onApply={applySignature}
          onClose={() => setShowPad(false)}
        />
      )}
    </div>
  );
};

interface IPadProps {
  signerName: string;
  mode: SignMode; onMode: (m: SignMode) => void;
  penColor: string; onPenColor: (c: string) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  drawEmpty: boolean; onClear: () => void;
  typedName: string; onTypedName: (v: string) => void;
  sigFont: string; onFont: (f: string) => void;
  uploadImg: string | null;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  canApply: boolean; onApply: () => void; onClose: () => void;
}

function PadModal(p: IPadProps): React.ReactElement {
  const modes: { key: SignMode; label: string }[] = [
    { key: 'draw', label: '✏️  Draw' },
    { key: 'type', label: 'Aa  Type' },
    { key: 'upload', label: '⬆  Upload' },
  ];
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(6,9,18,0.88)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={p.onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 520, background: '#0f172a',
          border: '1px solid rgba(255,255,255,0.13)', borderRadius: 18,
          padding: 24, boxShadow: '0 28px 64px rgba(0,0,0,0.7)',
          animation: 'slideUp 0.22s ease',
        }}
      >

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 15, color: '#e2e8f0', fontWeight: 700 }}>Sign for: {p.signerName}</div>
            <div style={{ fontSize: 10, color: '#64748b', marginTop: 2 }}>Choose how you want to sign</div>
          </div>
          <button onClick={p.onClose} style={{
            background: 'none', border: 'none', color: '#64748b', fontSize: 20, cursor: 'pointer',
          }}>×</button>
        </div>


        <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
          {modes.map(m => (
            <button key={m.key} onClick={() => p.onMode(m.key)} style={{
              flex: 1, padding: '8px 10px', borderRadius: 8, cursor: 'pointer',
              background: p.mode === m.key ? 'rgba(99,102,241,0.18)' : 'rgba(255,255,255,0.04)',
              color: p.mode === m.key ? '#a5b4fc' : '#64748b',
              border: p.mode === m.key ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.07)',
              fontSize: 11, fontWeight: 600,
            }}>{m.label}</button>
          ))}
        </div>


        {p.mode === 'draw' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 10, color: '#64748b' }}>Pen:</span>
              {PEN_COLORS.map(c => (
                <div key={c} onClick={() => p.onPenColor(c)} style={{
                  width: 20, height: 20, borderRadius: '50%', background: c, cursor: 'pointer',
                  border: p.penColor === c ? '2px solid #a5b4fc' : '2px solid transparent',
                  transition: 'all 0.15s',
                }} />
              ))}
              <button onClick={p.onClear} style={{
                marginLeft: 'auto', padding: '4px 10px', borderRadius: 6, border: 'none',
                background: 'rgba(255,255,255,0.06)', color: '#94a3b8', fontSize: 10, cursor: 'pointer',
              }}>Clear</button>
            </div>
            <div style={{ position: 'relative' }}>
              <canvas ref={p.canvasRef} style={{
                width: '100%', height: 150, borderRadius: 10, cursor: 'crosshair',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                touchAction: 'none', display: 'block',
              }} />
              {p.drawEmpty && (
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
                  fontSize: 12, color: 'rgba(148,163,184,0.25)', letterSpacing: '0.5px',
                }}>Draw your signature here</div>
              )}
            </div>
            <div style={{ marginTop: 6, fontSize: 9.5, color: '#475569', textAlign: 'center' }}>
              Mouse · touch · or stylus supported
            </div>
          </div>
        )}

        {p.mode === 'type' && (
          <div>
            <input
              value={p.typedName}
              onChange={e => p.onTypedName(e.target.value)}
              placeholder="Type your full name…"
              style={{
                width: '100%', padding: '10px 13px', borderRadius: 8, border: 'none',
                background: 'rgba(255,255,255,0.06)', color: '#e2e8f0', fontSize: 15,
                outline: 'none', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
                boxSizing: 'border-box', marginBottom: 14,
              }}
            />
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 12 }}>
              {SIG_FONTS.map(f => (
                <button key={f.css} onClick={() => p.onFont(f.css)} style={{
                  padding: '6px 14px', borderRadius: 8, cursor: 'pointer',
                  fontFamily: f.css, fontSize: 18,
                  background: p.sigFont === f.css ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
                  color: p.sigFont === f.css ? '#a5b4fc' : '#94a3b8',
                  border: p.sigFont === f.css ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.06)',
                }}>
                  {p.typedName || f.name}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 10, color: '#64748b' }}>Color:</span>
              {PEN_COLORS.map(c => (
                <div key={c} onClick={() => p.onPenColor(c)} style={{
                  width: 18, height: 18, borderRadius: '50%', background: c, cursor: 'pointer',
                  border: p.penColor === c ? '2px solid #a5b4fc' : '2px solid transparent',
                }} />
              ))}
            </div>
            {p.typedName && (
              <div style={{
                height: 80, borderRadius: 10, background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: p.sigFont, fontSize: 36, color: p.penColor,
              }}>{p.typedName}</div>
            )}
          </div>
        )}

        {p.mode === 'upload' && (
          <label style={{
            display: 'block', padding: 30, borderRadius: 10, cursor: 'pointer',
            border: '1.5px dashed rgba(99,102,241,0.3)', background: 'rgba(99,102,241,0.04)',
            textAlign: 'center',
          }}>
            <input type="file" accept="image/*" onChange={p.onUpload} style={{ display: 'none' }} />
            {p.uploadImg ? (
              <img src={p.uploadImg} alt="signature" style={{ maxHeight: 100, maxWidth: '100%', borderRadius: 6 }} />
            ) : (
              <>
                <div style={{ fontSize: 32, marginBottom: 8 }}>⬆️</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>Click to upload signature image</div>
                <div style={{ fontSize: 10, color: '#475569', marginTop: 4 }}>PNG or JPG · transparent background recommended</div>
              </>
            )}
          </label>
        )}


        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          <button onClick={p.onClose} style={{
            flex: 1, padding: '10px', borderRadius: 9, border: 'none', cursor: 'pointer',
            background: 'rgba(255,255,255,0.06)', color: '#94a3b8', fontSize: 12, fontWeight: 600,
          }}>Cancel</button>
          <button onClick={p.onApply} disabled={!p.canApply} style={{
            flex: 2, padding: '10px', borderRadius: 9, border: 'none',
            cursor: p.canApply ? 'pointer' : 'not-allowed', fontSize: 12, fontWeight: 700,
            background: p.canApply ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'rgba(255,255,255,0.04)',
            color: p.canApply ? '#fff' : '#475569',
            boxShadow: p.canApply ? '0 4px 14px rgba(99,102,241,0.35)' : 'none',
          }}>Apply Signature</button>
        </div>
      </div>
    </div>
  );
}