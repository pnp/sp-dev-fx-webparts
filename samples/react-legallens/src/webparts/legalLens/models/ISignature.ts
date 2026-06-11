export interface ISigner {
  id: string;
  name: string;
  title: string;
  email: string;
}

export interface ISignatureField {
  id: string;
  type: 'signature' | 'date' | 'name';
  x: number;
  y: number;
  width: number;
  height: number;
  signer: string; // Signer ID
  value?: string; // Base64 image or text value
}

export interface IDraftDocument {
  contractId: number;
  contractName: string;
  signers: ISigner[];
  fields: ISignatureField[];
  savedAt: string;
}

export interface ISignedDocMetadata {
  contractName: string;
  signerNames: string;
  signedAt: string;
}

export interface ISignedDocument {
  contractName: string;
  signedAt: string;
  signerNames: string;
}

export type SignatureStep = 'select' | 'author' | 'place' | 'sign';
export type SignMode = 'draw' | 'type' | 'upload';
export type ViewMode = 'unsigned' | 'inprogress' | 'signed';