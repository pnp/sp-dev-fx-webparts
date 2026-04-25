import { useState, useMemo } from 'react';
import { IDraftDocument, ISigner, ISignatureField } from '../models/ISignature';
import { STORAGE_KEY_DRAFTS } from '../constants/signatureConstants';

export function useDraftDocuments() {
  const [draftDocs, setDraftDocs] = useState<IDraftDocument[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_DRAFTS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const inProgressContractNames = useMemo(() => {
    return new Set(draftDocs.map(d => d.contractName));
  }, [draftDocs]);

  const saveDraft = (
    contractId: number,
    contractName: string,
    signers: ISigner[],
    fields: ISignatureField[]
  ) => {
    const draftDoc: IDraftDocument = {
      contractId,
      contractName,
      signers,
      fields,
      savedAt: new Date().toISOString(),
    };

    const existingIndex = draftDocs.findIndex(d => d.contractId === contractId);
    const newDrafts = existingIndex >= 0
      ? draftDocs.map((d, i) => i === existingIndex ? draftDoc : d)
      : [...draftDocs, draftDoc];

    setDraftDocs(newDrafts);
    localStorage.setItem(STORAGE_KEY_DRAFTS, JSON.stringify(newDrafts));
    console.log('[Draft] Saved:', contractName);
  };

  const getDraft = (contractId: number): IDraftDocument | undefined => {
    return draftDocs.find(d => d.contractId === contractId);
  };

  const removeDraft = (contractId: number) => {
    const newDrafts = draftDocs.filter(d => d.contractId !== contractId);
    setDraftDocs(newDrafts);
    localStorage.setItem(STORAGE_KEY_DRAFTS, JSON.stringify(newDrafts));
    console.log('[Draft] Removed contract:', contractId);
  };

  const getProgress = (contractId: number): { signed: number; total: number } | null => {
    const draft = getDraft(contractId);
    if (!draft) return null;

    const signatureFields = draft.fields.filter(f => f.type === 'signature');
    const signedFields = signatureFields.filter(f => f.value);

    return {
      signed: signedFields.length,
      total: signatureFields.length,
    };
  };

  return {
    draftDocs,
    inProgressContractNames,
    saveDraft,
    getDraft,
    removeDraft,
    getProgress,
  };
}