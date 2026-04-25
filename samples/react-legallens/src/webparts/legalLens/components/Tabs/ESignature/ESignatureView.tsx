import * as React from 'react';
import styles from './ESignature.module.scss';
import { IContract } from '../../../models/IContract';
import { ISharePointService } from '../../../services/SharePointService';
import { ISigner, ISignatureField } from '../../../models/ISignature';
import {
  PEN_COLORS,
  SIGNATURE_FONTS,
  FONTS_CDN_URL,
  FIELD_COLORS,
  FIELD_LABELS,
  CANVAS_SETTINGS,
} from '../../../constants/signatureConstants';
import { useSignatureWorkflow } from '../../../hooks/useSignatureWorkflow';
import { useDraftDocuments } from '../../../hooks/useDraftDocuments';
import { useSignedDocuments } from '../../../hooks/useSignedDocuments';
import { generateTableFields, calculateDocumentMargin } from '../../../utilities/fieldPositioning';
import { generateSignedPDF } from '../../../utilities/pdfGenerator';
import { StepHeader } from './StepHeader';
import { SignatureTable } from './SignatureTable';
import { useSignatureTokens } from '../../../hooks/useSignatureTokens';
import { DefaultButton, PrimaryButton, IconButton } from '@fluentui/react/lib/Button';
import { Icon } from '@fluentui/react/lib/Icon';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import * as QRCode from 'qrcode';

export interface IESignatureViewProps {
  contracts: IContract[];
  sharePointService: ISharePointService;
  userDisplayName: string;
  userEmail: string;
  context: any;
}

const AZURE_FUNCTION_URL = 'https://{AzureFunctionURL}';

const SIGNING_PAGE_URL = '../../../../sign.html';

// ─── Main Component ───────────────────────────────────────────────────────────
export const ESignatureView: React.FC<IESignatureViewProps> = ({
  contracts,
  sharePointService,
  userDisplayName,
  userEmail
}) => {
  // Initialize hooks
  const workflow = useSignatureWorkflow(userDisplayName);
  const drafts = useDraftDocuments();
  const signed = useSignedDocuments(sharePointService);
  const signatureTokens = useSignatureTokens(sharePointService); 
  // Destructure workflow state
  const {
    step,
    viewMode,
    contract,
    signers,
    fields,
    completed,
    saving,
    setStep,
    setViewMode,
    setFields,
    setCompleted,
    setSaving,
    selectContract,
    addSigner,
    removeSigner,
    updateSigner,
    reset
  } = workflow;

  // Signature pad state
  const [padField, setPadField] = React.useState<ISignatureField | null>(null);
  const [mode, setMode] = React.useState<'draw' | 'type' | 'upload'>('draw');
  const [penColor, setPenColor] = React.useState(PEN_COLORS[0]);
  const [sigFont, setSigFont] = React.useState(SIGNATURE_FONTS[0].css);
  const [typedName, setTypedName] = React.useState(userDisplayName);
  const [uploadImg, setUploadImg] = React.useState<string | null>(null);
  const [canvasEmpty, setCanvasEmpty] = React.useState(true);
  const [signedPdf, setSignedPdf] = React.useState<any>(null);

const [qrCodeData, setQrCodeData] = React.useState<string | null>(null);
const [showQRModal, setShowQRModal] = React.useState(false);


  // ─── PDF preview modal state ─────────────────────────────────────────────
  const [pdfPreview, setPdfPreview] = React.useState<{
    open: boolean;
    url: string;
    title: string;
  }>({ open: false, url: '', title: '' });

  // ─── Modal state (replaces all alert() calls) ──────────────────────────
  type ModalVariant = 'success' | 'error' | 'warning' | 'info';
  const [modal, setModal] = React.useState<{
    open: boolean;
    title: string;
    message: string;
    variant: ModalVariant;
    detail?: string;
    actions?: Array<{ label: string; primary?: boolean; onClick: () => void }>;
  }>({ open: false, title: '', message: '', variant: 'info' });

  const showModal = (
    title: string,
    message: string,
    variant: ModalVariant = 'info',
    detail?: string,
    actions?: Array<{ label: string; primary?: boolean; onClick: () => void }>
  ) => setModal({ open: true, title, message, variant, detail, actions });

  const closeModal = () => setModal(m => ({ ...m, open: false }));

  React.useEffect(() => {
    const interval = setInterval(() => {
      console.log('[ESignature] Auto-refreshing token status...');
      signatureTokens.refresh();
      signed.refresh();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [signatureTokens, signed]);


  // Refs
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const docRef = React.useRef<HTMLDivElement>(null);

  // Drag state
  const [dragField, setDragField] = React.useState<string | null>(null);
  const [dragStart, setDragStart] = React.useState<{ x: number; y: number } | null>(null);

  // Load Google Fonts
  React.useEffect(() => {
    const fontId = 'll-sig-fonts';
    if (!document.getElementById(fontId)) {
      const l = document.createElement('link');
      l.id = fontId;
      l.rel = 'stylesheet';
      l.href = FONTS_CDN_URL;
      document.head.appendChild(l);
    }
  }, []);

  
  // Canvas setup
  React.useEffect(() => {
    if (!canvasRef.current || mode !== 'draw') return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    canvas.width = canvas.offsetWidth * CANVAS_SETTINGS.scale;
    canvas.height = canvas.offsetHeight * CANVAS_SETTINGS.scale;
    ctx.scale(CANVAS_SETTINGS.scale, CANVAS_SETTINGS.scale);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = CANVAS_SETTINGS.lineWidth;
    ctx.strokeStyle = penColor;
    setCanvasEmpty(true);
  }, [canvasRef, mode, penColor, setCanvasEmpty]);

  /**
   * Invite external signer via email
   */
 const inviteExternalSigner = async (signer: ISigner) => {
  if (!contract || !signer.email || !signer.name) {
    showModal('Missing Information', 'Please enter signer name and email before sending the invitation.', 'warning'); return;
    return;
  }

  try {
    console.log('[ESignature] Inviting external signer:', signer.email);

    let driveItemId = '';
    try {
      if (contract.fileUrl) {
        driveItemId = await sharePointService.getContractDriveItemId(contract.fileUrl);
      }
    } catch (err) {
      console.warn('[ESignature] Could not get drive item ID:', err);
    }

    const tokenId = await sharePointService.createSignatureToken({
      contractId: contract.id,
      contractName: contract.name,
      fileName: contract.name,
      signerEmail: signer.email,
      signerName: signer.name,
      signerId: signer.id,
      driveItemId: driveItemId,
    });

    //  ADD THIS: Immediately refresh tokens so UI updates
    await signatureTokens.refresh();

    const signUrl = `${SIGNING_PAGE_URL}?token=${tokenId}`;

    try {
      const qrDataUrl = await QRCode.toDataURL(signUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#6366f1',
          light: '#ffffff',
        },
      });
      setQrCodeData(qrDataUrl);
      setShowQRModal(true);
    } catch (qrError) {
      console.error('[ESignature] QR generation error:', qrError);
    }

    console.log('[ESignature] ✓ Token created:', tokenId);
    console.log('[ESignature] Signing URL:', signUrl);

    const emailSent = await sendSignatureEmail({
      to: signer.email,
      name: signer.name,
      contractName: contract.name,
      signUrl: signUrl,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    });

    if (emailSent) {
      showModal('Invitation Sent', `Signature invitation sent to ${signer.email}. The vendor will receive an email with a secure signing link. This document has been moved to "In Progress".`, 'success');
    } else {
      await navigator.clipboard.writeText(signUrl);
      navigator.clipboard.writeText(signUrl); showModal('Link Copied to Clipboard', `The signing link for ${signer.name} has been copied. Share it with them directly. This link expires in 30 days.`, 'info', signUrl);
    }

  } catch (error: any) {
    console.error('[ESignature] Error:', error);
    showModal('Failed to Create Link', error.message, 'error');
  }
};


  /**
   * Send signature email via Azure Function (app-level Mail.Send).
   * Using me/sendMail from SPFx causes 403 — delegated auth is not available
   * in app-only context. The Azure Function uses Client Credentials which work.
   */
  async function sendSignatureEmail(params: {
    to: string;
    name: string;
    contractName: string;
    signUrl: string;
    expiresAt: string;
  }): Promise<boolean> {
    try {
      console.log('[Email] Calling Azure Function sendInvite for:', params.to);

      const response = await fetch(`${AZURE_FUNCTION_URL}/api/sendInvite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signerEmail:  params.to,
          signerName:   params.name,
          contractName: params.contractName,
          signingUrl:   params.signUrl,
          expiresAt:    params.expiresAt,
          // emailHtml intentionally omitted — sendInvite.ts builds the
          // Outlook-compatible template with QR code centered via CID attachment
        }),
      });

      if (response.ok) {
        console.log('[Email] ✓ Sent to:', params.to);
        return true;
      } else {
        const err = await response.text();
        console.error('[Email] Azure Function error:', err);
        return false;
      }
    } catch (error) {
      console.error('[Email] Network error calling sendInvite:', error);
      return false;
    }
  }

  /**
   * Generate HTML email content
   */
  function generateEmailHTML(params: {
    name: string;
    contractName: string;
    signUrl: string;
    expiresAt: string;
  }): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
          .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 40px 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
          .content { padding: 40px 30px; }
          .greeting { font-size: 16px; margin-bottom: 20px; color: #333; }
          .doc-box { background: #f8f9fa; padding: 25px; border-radius: 8px; border-left: 4px solid #6366f1; margin: 25px 0; }
          .doc-title { font-size: 20px; font-weight: 600; color: #6366f1; margin: 0; }
          .button-container { text-align: center; margin: 30px 0; }
          .button { display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(99,102,241,0.3); }
          .button:hover { transform: translateY(-2px); }
          .warning { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 6px; margin: 25px 0; }
          .warning-text { color: #856404; font-size: 14px; margin: 0; }
          .footer { padding: 30px; background: #f8f9fa; text-align: center; border-top: 1px solid #e5e7eb; }
          .footer-text { color: #6c757d; font-size: 12px; margin: 5px 0; }
          .security-note { background: #e7f3ff; border-left: 4px solid #0ea5e9; padding: 15px; margin: 25px 0; }
          .security-text { color: #0369a1; font-size: 14px; margin: 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✍️ Signature Required</h1>
          </div>
          
          <div class="content">
            <p class="greeting">Hello <strong>${params.name}</strong>,</p>
            
            <p>Please review and sign the following document:</p>
            
            <div class="doc-box">
              <p class="doc-title">📄 ${params.contractName}</p>
            </div>
            
            <div class="button-container">
              <a href="${params.signUrl}" class="button">
                Review & Sign Document →
              </a>
            </div>
            
            <div class="warning">
              <p class="warning-text">
                <strong>⏱️ Important:</strong> This link expires on <strong>${new Date(params.expiresAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
              </p>
            </div>
            
            <div class="security-note">
              <p class="security-text">
                <strong>🔒 Security Note:</strong> This is a one-time use link. Once you sign, the link will become invalid. Do not share this link with others.
              </p>
            </div>
            
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              The signing process is quick and easy:
              <br>1. Click the link above
              <br>2. Verify your email address
              <br>3. Review the document
              <br>4. Sign electronically
              <br>5. Done! The signed document will be automatically processed.
            </p>
          </div>
          
          <div class="footer">
            <p class="footer-text">This is an automated message from LegalLens E-Signature System</p>
            <p class="footer-text">If you have questions, please contact the sender</p>
            <p class="footer-text">© ${new Date().getFullYear()} LegalLens. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ─── Workflow Actions ─────────────────────────────────────────────────────

  const goToPlaceStep = () => {
    const newFields = generateTableFields(signers);
    setFields(newFields);
    setStep('place');
  };

  const goToSignStep = () => {
    setFields(prev =>
      prev.map(f => {
        if (f.type === 'date' && !f.value) {
          return { ...f, value: new Date().toLocaleDateString() };
        }
        if (f.type === 'name' && !f.value) {
          const signer = signers.find(s => s.id === f.signer);
          return { ...f, value: signer?.name || '' };
        }
        return f;
      })
    );
    setStep('sign');
  };

  const handleResumeInProgress = (contractId: number) => {
    const draft = drafts.getDraft(contractId);
    const contractData = contracts.find(c => c.id === contractId);

    if (!draft || !contractData) {
      showModal('Draft Not Found', 'Could not find the draft for this document.', 'error'); return;
      return;
    }

    workflow.resumeFromDraft(contractData, draft.signers, draft.fields);
  };

  // ─── Signature Actions ────────────────────────────────────────────────────

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d')!;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setCanvasEmpty(true);
  };

  const captureSignature = () => {
    let imgData: string | null = null;

    if (mode === 'draw') {
      if (!canvasRef.current || canvasEmpty) {
        showModal('No Signature', 'Please draw your signature in the canvas before applying.', 'warning'); return;
        return;
      }
      imgData = canvasRef.current.toDataURL('image/png');
    } else if (mode === 'type') {
      if (!typedName.trim()) {
        showModal('Name Required', 'Please type your name to generate a typed signature.', 'warning'); return;
        return;
      }
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 400;
      tempCanvas.height = 120;
      const ctx = tempCanvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 400, 120);
      ctx.fillStyle = '#000000';
      ctx.font = `48px ${sigFont}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(typedName, 200, 60);
      imgData = tempCanvas.toDataURL('image/png');
    } else if (mode === 'upload') {
      if (!uploadImg) {
        showModal('No Image', 'Please upload a signature image (PNG or JPG).', 'warning'); return;
        return;
      }
      imgData = uploadImg;
    }

    if (imgData && padField) {
      setFields(prev =>
        prev.map(f => (f.id === padField.id ? { ...f, value: imgData! } : f))
      );
      setPadField(null);
      setCanvasEmpty(true);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ev => {
      setUploadImg(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const ctx = canvasRef.current.getContext('2d')!;
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    canvasRef.current.onmousemove = draw;
    setCanvasEmpty(false);
  };

  const draw = (e: MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const ctx = canvasRef.current.getContext('2d')!;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (canvasRef.current) {
      canvasRef.current.onmousemove = null;
    }
  };

  // ─── Drag & Drop Handlers ─────────────────────────────────────────────────

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent, fieldId: string) => {
      e.preventDefault();
      setDragField(fieldId);
      setDragStart({ x: e.clientX, y: e.clientY });
    },
    []
  );

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!dragField || !dragStart) return;
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setFields(prev =>
        prev.map(f =>
          f.id === dragField ? { ...f, x: f.x + dx, y: f.y + dy } : f
        )
      );
      setDragStart({ x: e.clientX, y: e.clientY });
    },
    [dragField, dragStart]
  );

  const handleMouseUp = React.useCallback(() => {
    setDragField(null);
    setDragStart(null);
  }, []);

  React.useEffect(() => {
    if (dragField) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragField, handleMouseMove, handleMouseUp]);

  // ─── Save/Complete Actions ────────────────────────────────────────────────

  const handleSign = async () => {
    const allSignatures = fields.filter(f => f.type === 'signature').every(f => f.value);
    const anySignature = fields.filter(f => f.type === 'signature').some(f => f.value);

    if (!anySignature) {
      showModal('Signature Required', 'Please sign at least one signature field before completing.', 'warning'); return;
      return;
    }

    setSaving(true);
    try {
      if (allSignatures && contract) {
        // All signatures complete - save to SharePoint
        const pdf = await generateSignedPDF(contract, fields, signers);
        const pdfBlob = pdf.output('blob');
        const fileName = `${contract.name.replace(/\.[^.]+$/, '')}_signed_${Date.now()}.pdf`;

        await sharePointService.saveSignedDocument(fileName, pdfBlob, {
          contractName: contract.name,
          signerNames: signers.map(s => s.name).join('; '),
          signedAt: new Date().toISOString(),
        });

        // Refresh signed documents
        await signed.refresh();

        // Remove from drafts
        drafts.removeDraft(contract.id);

        // Store PDF and show success
        setSignedPdf(pdf);
        setCompleted(true);
      } else if (contract) {
        // Partial signatures - save as draft
        drafts.saveDraft(contract.id, contract.name, signers, fields);
        showModal('Progress Saved', 'Your progress has been saved. Other signers can continue later.', 'success');
        reset();
      }
    } catch (err: any) {
      console.error('[Sign] Error:', err);
      showModal('Error Saving Document', err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = () => {
    if (signedPdf && contract) {
      signedPdf.save(`${contract.name.replace(/\.[^.]+$/, '')}_signed.pdf`);
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  // ─── FLUENT UI MODAL (replaces all alert() calls) ────────────────────────
  const renderModal = () => {
    if (!modal.open) return null;
    const iconMap: Record<string, string> = {
      success: 'CompletedSolid',
      error: 'StatusErrorFull',
      warning: 'Warning',
      info: 'Info',
    };
    const colorMap: Record<string, string> = {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#6366f1',
    };
    const icon = iconMap[modal.variant];
    const color = colorMap[modal.variant];

    return (
      <div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', zIndex: 10000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'fadeIn 0.15s ease',
        }}
        onClick={closeModal}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: '#1e293b',
            borderRadius: 16,
            padding: '32px 28px 24px',
            width: '90%', maxWidth: 420,
            border: `1px solid ${color}44`,
            boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px ${color}22`,
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
            <Icon iconName={icon} style={{ fontSize: 28, color, flexShrink: 0, marginTop: 2 }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0', marginBottom: 6 }}>
                {modal.title}
              </div>
              <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>
                {modal.message}
              </div>
              {modal.detail && (
                <div style={{
                  marginTop: 10, padding: '8px 12px',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 8, fontSize: 11,
                  color: '#64748b', fontFamily: 'monospace',
                  wordBreak: 'break-all',
                }}>
                  {modal.detail}
                </div>
              )}
            </div>
            <IconButton
              iconProps={{ iconName: 'Cancel' }}
              onClick={closeModal}
              styles={{ root: { color: '#64748b', background: 'transparent' }, rootHovered: { color: '#e2e8f0', background: 'rgba(255,255,255,0.06)' } }}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            {modal.actions ? modal.actions.map((a, i) => (
              a.primary
                ? <PrimaryButton key={i} text={a.label} onClick={() => { a.onClick(); closeModal(); }} styles={{ root: { borderRadius: 8 } }}/>
                : <DefaultButton key={i} text={a.label} onClick={() => { a.onClick(); closeModal(); }} styles={{ root: { borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#94a3b8' } }}/>
            )) : (
              <PrimaryButton
                text="OK"
                onClick={closeModal}
                styles={{
                  root: { borderRadius: 8, background: color, border: 'none', minWidth: 80 },
                  rootHovered: { background: color, opacity: 0.9, border: 'none' },
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  // ─── PDF PREVIEW MODAL ────────────────────────────────────────────────────
  const renderPdfPreview = () => {
    if (!pdfPreview.open) return null;
    return (
      <div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.88)', zIndex: 10001,
          display: 'flex', flexDirection: 'column',
          animation: 'fadeIn 0.15s ease',
        }}
        onClick={() => setPdfPreview(p => ({ ...p, open: false }))}
      >
        {/* Header bar */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 20px',
            background: '#1e293b',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            flexShrink: 0,
          }}
        >
          <Icon iconName='PDF' style={{ fontSize: 22, color: '#ef4444' }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>{pdfPreview.title}</div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 1 }}>Signed Document — Read Only</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <DefaultButton
              text='Open in SharePoint'
              iconProps={{ iconName: 'OpenInNewWindow' }}
              onClick={() => window.open(pdfPreview.url, '_blank', 'noopener,noreferrer')}
              styles={{ root: { borderRadius: 8, fontSize: 11, height: 32, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)', color: '#818cf8' }, rootHovered: { background: 'rgba(99,102,241,0.25)', border: '1px solid rgba(99,102,241,0.5)', color: '#a5b4fc' } }}
            />
            <IconButton
              iconProps={{ iconName: 'Cancel' }}
              onClick={() => setPdfPreview(p => ({ ...p, open: false }))}
              styles={{ root: { color: '#64748b', background: 'rgba(255,255,255,0.04)', borderRadius: 8 }, rootHovered: { color: '#e2e8f0', background: 'rgba(255,255,255,0.1)' } }}
            />
          </div>
        </div>

        {/* PDF iframe */}
        <div
          onClick={e => e.stopPropagation()}
          style={{ flex: 1, overflow: 'hidden' }}
        >
          <iframe
            src={pdfPreview.url}
            style={{ width: '100%', height: '100%', border: 'none' }}
            title={pdfPreview.title}
          />
        </div>
      </div>
    );
  };

  // ─── SIGNATURE PAD MODAL (renders on top of everything) ───────────────────
  const renderSignaturePad = () => {
    if (!padField) return null;
    
    console.log('[ESignatureView] Rendering signature pad modal for field:', padField.id);
    
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.2s ease',
        }}
        onClick={() => setPadField(null)}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
            borderRadius: 16,
            padding: 30,
            width: '90%',
            maxWidth: 600,
            border: '1px solid rgba(99,102,241,0.3)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          <h3 style={{ margin: '0 0 20px', fontSize: 18, color: '#e2e8f0' }}>
            Add Your Signature
          </h3>

          {/* Mode tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {(['draw', 'type', 'upload'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: mode === m ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.03)',
                  color: mode === m ? '#818cf8' : '#94a3b8',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Draw mode */}
          {mode === 'draw' && (
            <>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                {PEN_COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => setPenColor(c)}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      border: penColor === c ? '3px solid #818cf8' : '2px solid rgba(255,255,255,0.2)',
                      background: c,
                      cursor: 'pointer',
                    }}
                  />
                ))}
                <button
                  onClick={clearCanvas}
                  style={{
                    marginLeft: 'auto',
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: '1px solid rgba(239,68,68,0.3)',
                    background: 'rgba(239,68,68,0.1)',
                    color: '#ef4444',
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Clear
                </button>
              </div>
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                style={{
                  width: '100%',
                  height: 200,
                  background: '#fff',
                  borderRadius: 8,
                  border: '2px solid rgba(99,102,241,0.3)',
                  cursor: 'crosshair',
                }}
              />
            </>
          )}

          {/* Type mode */}
          {mode === 'type' && (
            <>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                {SIGNATURE_FONTS.map(f => (
                  <button
                    key={f.name}
                    onClick={() => setSigFont(f.css)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: 6,
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: sigFont === f.css ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.03)',
                      color: sigFont === f.css ? '#818cf8' : '#94a3b8',
                      fontSize: 10,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={typedName}
                onChange={e => setTypedName(e.target.value)}
                placeholder="Type your name"
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: 8,
                  border: '2px solid rgba(99,102,241,0.3)',
                  background: '#fff',
                  fontSize: 32,
                  fontFamily: sigFont,
                  textAlign: 'center',
                }}
              />
            </>
          )}

          {/* Upload mode */}
          {mode === 'upload' && (
            <div
              style={{
                padding: 40,
                borderRadius: 8,
                border: '2px dashed rgba(99,102,241,0.3)',
                background: 'rgba(255,255,255,0.02)',
                textAlign: 'center',
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'block', margin: '0 auto', color: '#94a3b8', fontSize: 12 }}
              />
              {uploadImg && (
                <img
                  src={uploadImg}
                  alt="uploaded"
                  style={{ marginTop: 20, maxWidth: '100%', maxHeight: 150 }}
                />
              )}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button
              onClick={() => setPadField(null)}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
                color: '#94a3b8',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              onClick={captureSignature}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 8,
                border: 'none',
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                color: '#fff',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Apply Signature
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ─── STEP 1: SELECT DOCUMENT ──────────────────────────────────────────────
  if (step === 'select') {
  // Calculate counts including token status
  const unsignedContracts = contracts.filter(c => {
    const isSigned = signed.signedContractNames.has(c.name);
    const tokenStatus = signatureTokens.getTokenStatus(c.id);
    return !isSigned && (!tokenStatus || (tokenStatus.pendingTokens === 0 && tokenStatus.completedTokens === 0));
  });

  const inProgressContracts = contracts.filter(c => {
    const isInProgressDraft = drafts.inProgressContractNames.has(c.name);
    const tokenStatus = signatureTokens.getTokenStatus(c.id);
    return isInProgressDraft || (tokenStatus && tokenStatus.pendingTokens > 0);
  });

  const signedContracts = contracts.filter(c => {
    const isSignedDoc = signed.signedContractNames.has(c.name);
    const tokenStatus = signatureTokens.getTokenStatus(c.id);
    return isSignedDoc || (tokenStatus && tokenStatus.pendingTokens === 0 && tokenStatus.completedTokens > 0);
  });

  let displayContracts = contracts;
  if (viewMode === 'unsigned') {
    displayContracts = unsignedContracts;
  } else if (viewMode === 'inprogress') {
    displayContracts = inProgressContracts;
  } else if (viewMode === 'signed') {
    displayContracts = signedContracts;
  }

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      {/*  NEW: Header with refresh button */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        marginBottom: 20 
      }}>
        <div style={{ flex: 1 }}>
          <StepHeader
            title="Select Document"
            subtitle="Choose a contract to prepare for signature"
          />
        </div>
        
        {/*  REFRESH BUTTON */}
        <button
          onClick={async () => {
            console.log('[ESignature] Manual refresh triggered');
            await signatureTokens.refresh();
            await signed.refresh();

          }}
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            border: '1px solid rgba(99,102,241,0.3)',
            background: 'rgba(99,102,241,0.1)',
            color: '#818cf8',
            fontSize: 11,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'all 0.2s',
            marginTop: -10,
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(99,102,241,0.1)'}
        >
          <Icon iconName='Refresh' style={{marginRight:6}}/> Refresh
        </button>
      </div>

      {/* View mode tabs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button
          onClick={() => setViewMode('unsigned')}
          style={{
            flex: 1,
            padding: '10px 18px',
            borderRadius: 8,
            border: '1px solid rgba(99,102,241,0.3)',
            cursor: 'pointer',
            background: viewMode === 'unsigned' 
              ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' 
              : 'transparent',
            color: viewMode === 'unsigned' ? '#fff' : '#94a3b8',
            fontSize: 11,
            fontWeight: 600,
            transition: 'all 0.2s',
          }}
        >
          <Icon iconName='DocumentSet' style={{marginRight:5}}/> Unsigned ({unsignedContracts.length})
        </button>
        
        <button
          onClick={() => setViewMode('inprogress')}
          style={{
            flex: 1,
            padding: '10px 18px',
            borderRadius: 8,
            border: '1px solid rgba(245,158,11,0.3)',
            cursor: 'pointer',
            background: viewMode === 'inprogress' 
              ? 'linear-gradient(135deg,#f59e0b,#d97706)' 
              : 'transparent',
            color: viewMode === 'inprogress' ? '#fff' : '#94a3b8',
            fontSize: 11,
            fontWeight: 600,
            transition: 'all 0.2s',
          }}
        >
          <Icon iconName='Clock' style={{marginRight:5}}/> In Progress ({inProgressContracts.length})
        </button>
        
        <button
          onClick={() => setViewMode('signed')}
          style={{
            flex: 1,
            padding: '10px 18px',
            borderRadius: 8,
            border: '1px solid rgba(16,185,129,0.3)',
            cursor: 'pointer',
            background: viewMode === 'signed' 
              ? 'linear-gradient(135deg,#10b981,#059669)' 
              : 'transparent',
            color: viewMode === 'signed' ? '#fff' : '#94a3b8',
            fontSize: 11,
            fontWeight: 600,
            transition: 'all 0.2s',
          }}
        >
          <Icon iconName='CheckMark' style={{marginRight:5}}/> Signed ({signedContracts.length})
        </button>
      </div>

      {/* Document list */}
      <div className={styles.contractList}>
        {displayContracts.length === 0 && (
          <div className={styles.contractListEmpty}>
            {viewMode === 'unsigned'
              ? 'All documents have been signed!'
              : viewMode === 'inprogress'
              ? 'No documents in progress'
              : 'No signed documents yet'}
          </div>
        )}

        {displayContracts.map(c => {
          const isSigned = signed.signedContractNames.has(c.name);
          const isInProgressDraft = drafts.inProgressContractNames.has(c.name);
          const tokenStatus = signatureTokens.getTokenStatus(c.id);
          
          //  Combined status logic
          const hasActiveTokens = tokenStatus && tokenStatus.pendingTokens > 0;
          const allTokensCompleted = tokenStatus && tokenStatus.pendingTokens === 0 && tokenStatus.completedTokens > 0;
          
          const isInProgress = isInProgressDraft || hasActiveTokens;
          const isCompleted = isSigned || allTokensCompleted;
          
          const draft = drafts.getDraft(c.id);
          const progress = isInProgressDraft && draft ? drafts.getProgress(c.id) : null;

          // Find matching signed doc record (has fileRef + fileName)
          const signedDocRecord = isCompleted
            ? signed.signedDocs.find(d =>
                d.contractName === c.name ||
                d.contractName === c.name.replace(/\.[^.]+$/, '') ||
                (d.fileName && d.fileName.includes(c.name.replace(/\.[^.]+$/, '')))
              )
            : undefined;

          const isDownloading = !!(signedDocRecord && signed.downloadingDoc === signedDocRecord.fileName);

          return (
            <div
              key={c.id}
              className={[
                styles.contractCard,
                isCompleted ? styles.contractCardCompleted : '',
                isInProgress && !isCompleted ? styles.contractCardInProgress : '',
              ].filter(Boolean).join(' ')}
              onClick={() => {
                if (isCompleted) return; // actions handled by View/Download buttons
                if (isInProgress) {
                  if (isInProgressDraft) {
                    handleResumeInProgress(c.id);
                  } else if (hasActiveTokens) {
                    showModal('Pending Vendor Signatures', `This document has ${tokenStatus!.pendingTokens} pending signature(s) from external vendors. Total: ${tokenStatus!.totalTokens} | Completed: ${tokenStatus!.completedTokens} | Pending: ${tokenStatus!.pendingTokens}. The document will move to "Signed" when all vendors complete their signatures.`, 'warning');
                  }
                } else {
                  selectContract(c);
                }
              }}
            >
              {/* Status icon */}
              <Icon
                iconName={isCompleted ? 'CheckboxComposite' : isInProgress ? 'Clock' : 'Document'}
                className={styles.contractCardIcon}
                style={{ color: isCompleted ? '#10b981' : isInProgress ? '#f59e0b' : '#6366f1' }}
              />

              {/* Main info */}
              <div className={styles.contractCardInfo}>
                <div className={styles.contractCardNameRow}>
                  <div className={styles.contractCardName}>
                    {c.name}
                  </div>
                  {isCompleted && (
                    <span className={`${styles.contractBadge} ${styles.contractBadgeSigned}`}>
                      SIGNED
                    </span>
                  )}
                  {isInProgress && !isCompleted && (
                    <span className={`${styles.contractBadge} ${styles.contractBadgeInProgress}`}>
                      {hasActiveTokens && tokenStatus
                        ? `PENDING (${tokenStatus.pendingTokens} vendor${tokenStatus.pendingTokens > 1 ? 's' : ''})`
                        : progress ? `IN PROGRESS (${progress.signed}/${progress.total})` : 'IN PROGRESS'}
                    </span>
                  )}
                </div>
                <div className={styles.contractCardMeta}>
                  {c.type} · {c.parties.slice(0, 2).join(', ')}
                  {tokenStatus && (
                    <span className={tokenStatus.pendingTokens > 0 ? styles.contractMetaAmber : styles.contractMetaGreen}>
                      · {tokenStatus.completedTokens}/{tokenStatus.totalTokens} vendor signatures
                    </span>
                  )}
                  {isInProgressDraft && draft && (
                    <span className={styles.contractMetaAmber}>· Saved {new Date(draft.savedAt).toLocaleDateString()}</span>
                  )}
                  {isCompleted && signedDocRecord?.signedAt && (
                    <span className={styles.contractMetaGreen}>
                      · Signed {new Date(signedDocRecord.signedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  )}
                  {isCompleted && signedDocRecord?.signerNames && (
                    <span className={styles.contractMetaMuted}>· by {signedDocRecord.signerNames}</span>
                  )}
                </div>
              </div>

              {/* ── Action buttons ── */}
              {isCompleted && signedDocRecord ? (
                <div className={styles.contractCardActions} onClick={e => e.stopPropagation()}>

                  {/* VIEW */}
                  <button
                    title='View signed PDF'
                    onClick={() => setPdfPreview({
                      open: true,
                      url: `${window.location.origin}${signedDocRecord.fileRef}`,
                      title: signedDocRecord.fileName || c.name,
                    })}
                    className={`${styles.contractBtn} ${styles.contractBtnView}`}
                  >
                    <Icon iconName='View' style={{ fontSize: 13 }}/> View
                  </button>

                  {/* DOWNLOAD */}
                  <button
                    title='Download signed PDF'
                    disabled={isDownloading}
                    onClick={async (e) => {
                      e.stopPropagation();
                      try {
                        await signed.downloadDocument(signedDocRecord);
                      } catch (err: any) {
                        showModal('Download Failed', err.message, 'error');
                      }
                    }}
                    className={`${styles.contractBtn} ${styles.contractBtnDownload} ${isDownloading ? styles.contractBtnDownloadDisabled : ''}`}
                  >
                    {isDownloading
                      ? <><Spinner size={SpinnerSize.small} style={{ marginRight: 4 }}/> Downloading...</>
                      : <><Icon iconName='Download' style={{ fontSize: 13 }}/> Download</>
                    }
                  </button>
                </div>
              ) : !isCompleted && !isInProgress ? (
                <div className={styles.contractBadgeSelect}>
                  SELECT
                </div>
              ) : null}

            </div>
          );
        })}
      </div>
      {renderModal()}
      {renderPdfPreview()}
    </div>
  );
}

  // ─── STEP 2: ADD SIGNERS ──────────────────────────────────────────────────
  if (step === 'author' && contract) {
    return (
      <div style={{ animation: 'fadeIn 0.3s ease' }}>
        <StepHeader
          title="Add Signers"
          subtitle="Who needs to sign this document?"
          onBack={() => setStep('select')}
        />

        <div className={styles.signerList}>
          {signers.map((signer, index) => (
            <div
              key={signer.id}
              className={styles.signerCard}
            >
              <div className={styles.signerCardHeader}>
                <span className={styles.signerCardLabel}>
                  Signer #{index + 1}
                </span>
                {signers.length > 1 && (
                  <button
                    onClick={() => removeSigner(signer.id)}
                    className={styles.signerCardRemoveBtn}
                  >
                    <Icon iconName='Cancel' style={{fontSize:10}}/> Remove
                  </button>
                )}
              </div>

              <div className={styles.signerCardGrid}>
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={signer.name}
                  onChange={e => updateSigner(signer.id, { name: e.target.value })}
                  className={styles.signerInput}
                />
                <input
                  type="text"
                  placeholder="Title"
                  value={signer.title}
                  onChange={e => updateSigner(signer.id, { title: e.target.value })}
                  className={styles.signerInput}
                />
                <input
                  type="email"
                  placeholder="Email *"
                  value={signer.email}
                  onChange={e => updateSigner(signer.id, { email: e.target.value })}
                  className={`${styles.signerInput} ${styles.signerInputFull}`}
                />
              </div>

              {/* Send Signature Link Button */}
              {signer.email && signer.email !== userEmail && signer.name && (
                <button
                  onClick={() => inviteExternalSigner(signer)}
                  className={styles.signerSendBtn}
                >
                  <Icon iconName='Send' style={{marginRight:6}}/> Send Signature Link to {signer.name}
                </button>
              )}
              
              {signer.email && signer.email !== userEmail && !signer.name && (
                <div style={{
                  marginTop: 12,
                  padding: '8px 12px',
                  borderRadius: 6,
                  background: 'rgba(251,191,36,0.1)',
                  border: '1px solid rgba(251,191,36,0.2)',
                  fontSize: 11,
                  color: '#fbbf24',
                }}>
                  Enter name to send signature link
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addSigner}
          style={{
            padding: '10px 18px',
            borderRadius: 8,
            border: '1px solid rgba(99,102,241,0.3)',
            background: 'rgba(99,102,241,0.08)',
            color: '#818cf8',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: 20,
          }}
        >
          + Add Another Signer
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={() => setStep('select')}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.03)',
              color: '#94a3b8',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Back
          </button>
          <button
            disabled={signers.some(s => !s.name.trim())}
            onClick={goToPlaceStep}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: 'none',
              background: signers.some(s => !s.name.trim())
                ? 'rgba(255,255,255,0.05)'
                : 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              color: signers.some(s => !s.name.trim()) ? '#475569' : '#fff',
              fontSize: 12,
              fontWeight: 600,
              cursor: signers.some(s => !s.name.trim()) ? 'not-allowed' : 'pointer',
              opacity: signers.some(s => !s.name.trim()) ? 0.5 : 1,
            }}
          >
            Place Signature Fields
          </button>
        </div>
      {renderModal()}
      </div>
    );
  }

  // ─── STEP 3: PLACE FIELDS ─────────────────────────────────────────────────
  if (step === 'place' && contract) {
    return (
      <div style={{ animation: 'fadeIn 0.3s ease' }}>
        <StepHeader
          title="Place Signature Fields"
          subtitle="Signature table is auto-generated at the top"
          onBack={() => setStep('author')}
        />

        {/* Document preview with table */}
        <div
          ref={docRef}
          style={{
            position: 'relative',
            minHeight: 600,
            marginBottom: 16,
            background: 'rgba(15,23,42,0.95)',
            borderRadius: 12,
            padding: '30px 35px',
            border: '1px solid rgba(255,255,255,0.08)',
            overflow: 'hidden',
          }}
        >
          {/* Signature Table */}
          <div style={{ position: 'absolute', top: 30, left: 35, right: 35, zIndex: 1 }}>
            <SignatureTable signers={signers} mode="place" />
          </div>

          {/* Draggable fields */}
          <div style={{ position: 'relative', zIndex: 2, pointerEvents: 'auto' }}>
            {fields.map(f => (
              <DraggableField
                key={f.id}
                field={f}
                signers={signers}
                isDragging={dragField === f.id}
                onMouseDown={e => handleMouseDown(e, f.id)}
                onRemove={() => setFields(p => p.filter(x => x.id !== f.id))}
              />
            ))}
          </div>

          {/* Contract text */}
          <div
            style={{
              fontSize: 10.5,
              color: '#94a3b8',
              lineHeight: 1.9,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              pointerEvents: 'none',
              userSelect: 'none',
              marginTop: calculateDocumentMargin(signers.length),
              paddingTop: 25,
              borderTop: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: 15 }}>
              DOCUMENT CONTENT
            </div>
            {(contract as any).fullText
              ? (contract as any).fullText.slice(0, 2500) + '\n\n[Document continues…]'
              : contract.summary || '(No document text)'}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={() => setStep('author')}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.03)',
              color: '#94a3b8',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Back
          </button>
          <button
            disabled={fields.length === 0}
            onClick={goToSignStep}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: 'none',
              background:
                fields.length === 0
                  ? 'rgba(255,255,255,0.05)'
                  : 'linear-gradient(135deg,#10b981,#059669)',
              color: fields.length === 0 ? '#475569' : '#fff',
              fontSize: 12,
              fontWeight: 600,
              cursor: fields.length === 0 ? 'not-allowed' : 'pointer',
              opacity: fields.length === 0 ? 0.5 : 1,
            }}
          >
            Continue to Sign
          </button>
        </div>
      </div>
    );
  }

  // ─── STEP 4: SIGN DOCUMENT ────────────────────────────────────────────────
  if (step === 'sign' && contract) {
    // Success screen
    if (completed) {
      return (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'rgba(16,185,129,0.08)',
              borderRadius: 16,
              border: '2px solid rgba(16,185,129,0.3)',
            }}
          >
            <div style={{ marginBottom: 20 }}><Icon iconName='CompletedSolid' style={{fontSize:64, color:'#10b981'}}/></div>
            <h2 style={{ margin: '0 0 10px', fontSize: 22, color: '#10b981', fontWeight: 700 }}>
              Document Signed Successfully!
            </h2>
            <p style={{ margin: '0 0 30px', fontSize: 13, color: '#94a3b8' }}>
              Your signed document has been saved to SharePoint
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={handleDownload}
                style={{
                  padding: '12px 28px',
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg,#0891b2,#0e7490)',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 4px 20px rgba(8,145,178,0.4)',
                }}
              >
                <Icon iconName='Download' style={{marginRight:6}}/> Download PDF
              </button>

              <button
                onClick={reset}
                style={{
                  padding: '12px 28px',
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
                }}
              >
                <Icon iconName='Add' style={{marginRight:6}}/> Sign New Document
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Calculate status
    const currentUserFields = fields.filter(f => {
      const signer = signers.find(s => s.id === f.signer);
      return f.type === 'signature' && signer?.name === userDisplayName;
    });
    const currentUserSigned = currentUserFields.every(f => f.value);
    const allSignatureFields = fields.filter(f => f.type === 'signature');
    const allSigned = allSignatureFields.every(f => f.value);

    let statusMessage = '';
    if (currentUserSigned && !allSigned) {
      const pendingSigners = signers
        .filter(s => {
          const signerFields = allSignatureFields.filter(f => f.signer === s.id);
          return signerFields.some(f => !f.value);
        })
        .map(s => s.name);
      statusMessage = `You've signed. Waiting for: ${pendingSigners.join(', ')}`;
    } else if (!currentUserSigned) {
      statusMessage = `Please sign your ${currentUserFields.length} signature field${
        currentUserFields.length > 1 ? 's' : ''
      }`;
    } else if (allSigned) {
      statusMessage = 'All signatures complete. Ready to save.';
    }

    return (
      <div style={{ animation: 'fadeIn 0.3s ease' }}>
        <StepHeader
          title="Sign Document"
          subtitle={
            statusMessage ||
            `${fields.filter(f => f.value).length} / ${allSignatureFields.length} signatures completed`
          }
          onBack={() => setStep('place')}
        />

        {/* Document with table */}
        <div
          style={{
            position: 'relative',
            minHeight: 520,
            marginBottom: 16,
            background: 'rgba(15,23,42,0.95)',
            borderRadius: 12,
            padding: '30px 35px',
            border: '1px solid rgba(255,255,255,0.08)',
            overflow: 'auto',
          }}
        >
          <SignatureTable
            signers={signers}
            fields={fields}
            mode="sign"
            currentUser={userDisplayName}
            onFieldClick={field => {
              console.log('[ESignatureView] Opening signature pad for field:', field);
              setPadField(field);
            }}
          />

          <div
            style={{
              fontSize: 10.5,
              color: '#94a3b8',
              lineHeight: 1.9,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {(contract as any).fullText
              ? (contract as any).fullText.slice(0, 2500) + '\n\n[Document continues…]'
              : contract.summary}
          </div>
        </div>

        {/* Info & action */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
          {signers.length > 1 && !allSigned && (
            <div
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                background: 'rgba(245,158,11,0.08)',
                border: '1px solid rgba(245,158,11,0.2)',
                fontSize: 11,
                color: '#fbbf24',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Icon iconName='Info' style={{marginRight:8, color:'#fbbf24'}}/>
              <div>
                {currentUserSigned
                  ? 'Document requires all signers to complete. Share this link with other signers.'
                  : 'You can only sign fields assigned to you.'}
              </div>
            </div>
          )}

          <button
            onClick={handleSign}
            disabled={!currentUserSigned || saving}
            style={{
              padding: '12px 32px',
              borderRadius: 10,
              border: 'none',
              cursor: currentUserSigned && !saving ? 'pointer' : 'not-allowed',
              background:
                !currentUserSigned || saving
                  ? 'rgba(255,255,255,0.05)'
                  : 'linear-gradient(135deg,#10b981,#059669)',
              color: !currentUserSigned || saving ? '#475569' : '#fff',
              fontSize: 13,
              fontWeight: 700,
              opacity: !currentUserSigned || saving ? 0.55 : 1,
              boxShadow:
                currentUserSigned && !saving ? '0 4px 20px rgba(16,185,129,0.4)' : 'none',
            }}
          >
            {saving
              ? <><Spinner size={SpinnerSize.small} style={{marginRight:6}}/> Saving...</>
              : allSigned
              ? 'Complete & Save to SharePoint'
              : currentUserSigned
              ? 'Waiting for Other Signers'
              : 'Complete & Save to SharePoint'}
          </button>
        </div>
        
        {/* Signature pad modal overlay */}
        {renderSignaturePad()}
        {renderModal()}
      </div>
    );
  }

  // Default return
  return (
    <>
      <div>Component error - invalid step: {step}</div>
      {renderSignaturePad()}
    </>
  );
};
// ─── DraggableField Component ─────────────────────────────────────────────────
function DraggableField({
  field,
  isDragging,
  onMouseDown,
  onRemove,
  signers,
}: {
  field: ISignatureField;
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onRemove: () => void;
  signers: ISigner[];
}): React.ReactElement {
  const signer = signers.find(s => s.id === field.signer);

  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        position: 'absolute',
        left: field.x,
        top: field.y,
        width: field.width,
        height: field.height,
        background: isDragging ? `${FIELD_COLORS[field.type]}33` : `${FIELD_COLORS[field.type]}22`,
        border: `2px dashed ${FIELD_COLORS[field.type]}`,
        borderRadius: 6,
        cursor: isDragging ? 'grabbing' : 'grab',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 10,
        color: FIELD_COLORS[field.type],
        fontWeight: 700,
        userSelect: 'none',
        transition: 'all 0.15s',
        padding: '4px',
      }}
    >
      <div>{FIELD_LABELS[field.type]}</div>
      {signer && (
        <div style={{ fontSize: 8, marginTop: 2, opacity: 0.7 }}>{signer.name}</div>
      )}
      <button
        onClick={e => {
          e.stopPropagation();
          onRemove();
        }}
        style={{
          position: 'absolute',
          top: -8, right: -8,
          width: 18, height: 18,
          borderRadius: '50%',
          background: '#ef4444',
          border: 'none',
          color: '#fff',
          fontSize: 9,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon iconName='Cancel' style={{fontSize:9,color:'#fff'}}/>
      </button>
    </div>
  );
}