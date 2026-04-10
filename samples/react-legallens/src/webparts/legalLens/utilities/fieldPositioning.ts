import { ISigner, ISignatureField } from '../models/ISignature';
import { FIELD_SIZES, TABLE_LAYOUT } from '../constants/signatureConstants';

function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function generateTableFields(signers: ISigner[]): ISignatureField[] {
  const fields: ISignatureField[] = [];
  const { startY, rowHeight, nameColumnX } = TABLE_LAYOUT;
  
  signers.forEach((signer, index) => {
    const yPos = startY + (index * rowHeight);
    
    fields.push({
      id: makeId(),
      type: 'signature',
      signer: signer.id,
      x: nameColumnX,
      y: yPos,
      width: FIELD_SIZES.signature.width,
      height: FIELD_SIZES.signature.height,
    });
    
    fields.push({
      id: makeId(),
      type: 'date',
      signer: signer.id,
      x: nameColumnX,
      y: yPos + 55,
      width: FIELD_SIZES.date.width,
      height: FIELD_SIZES.date.height,
    });
  });
  
  return fields;
}

export function calculateDocumentMargin(signerCount: number): number {
  const { rowHeight, headerHeight } = TABLE_LAYOUT;
  return 30 + headerHeight + (signerCount * rowHeight) + 25;
}

export function getSignerRowY(signerIndex: number): number {
  return TABLE_LAYOUT.startY + (signerIndex * TABLE_LAYOUT.rowHeight);
}