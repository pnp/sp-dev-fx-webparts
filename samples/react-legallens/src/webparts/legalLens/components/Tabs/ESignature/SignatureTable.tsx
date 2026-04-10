import * as React from 'react';
import { ISigner, ISignatureField } from '../../../models/ISignature';

export interface ISignatureTableProps {
  signers: ISigner[];
  fields?: ISignatureField[];
  mode: 'place' | 'sign';
  currentUser?: string;
  onFieldClick?: (field: ISignatureField) => void;
}

export const SignatureTable: React.FC<ISignatureTableProps> = ({
  signers,
  fields = [],
  mode,
  currentUser,
  onFieldClick,
}) => {
  
  const handleSignatureClick = (field: ISignatureField, signer: ISigner) => {
    const isCurrentUser = currentUser && signer.name === currentUser;
    const canSign = mode === 'sign' && !field.value && isCurrentUser;
    
    console.log('[SignatureTable] Click detected:', {
      mode,
      fieldId: field.id,
      signerName: signer.name,
      currentUser,
      isCurrentUser,
      canSign,
      fieldHasValue: !!field.value,
      onFieldClickExists: !!onFieldClick
    });
    
    if (canSign && onFieldClick) {
      console.log('[SignatureTable] ✓ Opening signature pad for:', signer.name);
      onFieldClick(field);
    } else {
      console.log('[SignatureTable] ✗ Click blocked - canSign:', canSign, 'onFieldClick:', !!onFieldClick);
    }
  };
  
  return (
    <div style={{
      border: '2px solid rgba(99,102,241,0.4)',
      borderRadius: 8,
      background: 'rgba(99,102,241,0.05)',
      marginBottom: 20,
    }}>
      {/* Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '150px 1fr',
        borderBottom: '2px solid rgba(99,102,241,0.4)',
        background: 'rgba(99,102,241,0.12)',
      }}>
        <div style={{
          padding: '10px 15px',
          fontWeight: 700,
          fontSize: 11,
          color: '#c7d2fe',
          borderRight: '2px solid rgba(99,102,241,0.4)',
        }}>
          NAME
        </div>
        <div style={{
          padding: '10px 15px',
          fontWeight: 700,
          fontSize: 11,
          color: '#c7d2fe',
        }}>
          SIGNATURE & DATE
        </div>
      </div>

      {/* Rows */}
      {signers.map((signer, index) => {
        const sigField = fields.find(f => f.type === 'signature' && f.signer === signer.id);
        const isCurrentUser = currentUser && signer.name === currentUser;

        return (
          <div
            key={signer.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '150px 1fr',
              minHeight: mode === 'place' ? 105 : 90,
              borderBottom: index < signers.length - 1 ? '1px solid rgba(99,102,241,0.25)' : 'none',
            }}
          >
            {/* Name Column */}
            <div style={{
              padding: '15px',
              borderRight: '2px solid rgba(99,102,241,0.4)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <div style={{ fontSize: 11, color: '#e2e8f0', fontWeight: 600 }}>
                {signer.name}
                {isCurrentUser && (
                  <span style={{
                    marginLeft: 6,
                    fontSize: 8,
                    padding: '2px 6px',
                    background: 'rgba(99,102,241,0.3)',
                    borderRadius: 4,
                    color: '#c7d2fe',
                  }}>
                    YOU
                  </span>
                )}
              </div>
              {signer.title && (
                <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 2 }}>
                  {signer.title}
                </div>
              )}
              {signer.email && (
                <div style={{ fontSize: 8, color: '#64748b', marginTop: 2 }}>
                  {signer.email}
                </div>
              )}
            </div>

            {/* Signature Column */}
            <div 
              style={{
                padding: mode === 'place' ? '10px 15px' : '15px',
                display: 'flex',
                flexDirection: 'column',
                gap: mode === 'place' ? 8 : 0,
                justifyContent: 'center',
                cursor: mode === 'sign' && sigField && !sigField.value && isCurrentUser ? 'pointer' : 'default',
                transition: 'background 0.2s',
                userSelect: 'none',
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (sigField) {
                  handleSignatureClick(sigField, signer);
                }
              }}
              onMouseEnter={(e) => {
                if (mode === 'sign' && sigField && !sigField.value && isCurrentUser) {
                  e.currentTarget.style.background = 'rgba(99,102,241,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (mode === 'sign') {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {mode === 'place' ? (
                <>
                  <div style={{
                    height: 55,
                    border: '2px dashed rgba(99,102,241,0.5)',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#818cf8',
                    fontSize: 10,
                    fontWeight: 500,
                    background: 'rgba(99,102,241,0.08)',
                  }}>
                    ✍️ Drop signature field here
                  </div>
                  <div style={{
                    height: 32,
                    border: '2px dashed rgba(8,145,178,0.5)',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0891b2',
                    fontSize: 9,
                    fontWeight: 500,
                    background: 'rgba(8,145,178,0.08)',
                  }}>
                    📅 Drop date field here
                  </div>
                </>
              ) : sigField?.value ? (
                <>
                  <img
                    src={sigField.value}
                    alt="signature"
                    style={{
                      maxWidth: '180px',
                      maxHeight: '40px',
                      marginBottom: 5,
                    }}
                  />
                  <div style={{ fontSize: 9, color: '#10b981', fontWeight: 600 }}>
                    ✓ Signed: {new Date().toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </>
              ) : (
                <div style={{
                  color: isCurrentUser ? '#818cf8' : '#64748b',
                  fontSize: 10,
                  fontWeight: isCurrentUser ? 600 : 400,
                  fontStyle: isCurrentUser ? 'normal' : 'italic',
                }}>
                  {isCurrentUser ? '✍️ Click here to sign' : '⏳ Awaiting signature'}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};