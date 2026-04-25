import { useState, useCallback } from 'react';
import { SignatureStep, ViewMode, ISigner, ISignatureField } from '../models/ISignature';
import { IContract } from '../models/IContract';

function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function useSignatureWorkflow(userDisplayName: string) {
  const [step, setStep] = useState<SignatureStep>('select');
  const [viewMode, setViewMode] = useState<ViewMode>('unsigned');
  const [contract, setContract] = useState<IContract | null>(null);
  const [signers, setSigners] = useState<ISigner[]>([
    { id: makeId(), name: userDisplayName, title: '', email: '' },
  ]);
  const [fields, setFields] = useState<ISignatureField[]>([]);
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);

  const selectContract = useCallback((selectedContract: IContract) => {
    setContract(selectedContract);
    setStep('author');
  }, []);

  const resumeFromDraft = useCallback((
    draftContract: IContract,
    draftSigners: ISigner[],
    draftFields: ISignatureField[]
  ) => {
    setContract(draftContract);
    setSigners(draftSigners);
    setFields(draftFields);
    setStep('sign');
  }, []);

  const addSigner = useCallback(() => {
    setSigners(prev => [...prev, { id: makeId(), name: '', title: '', email: '' }]);
  }, []);

  const removeSigner = useCallback((id: string) => {
    setSigners(prev => prev.filter(s => s.id !== id));
  }, []);

  const updateSigner = useCallback((id: string, updates: Partial<ISigner>) => {
    setSigners(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  }, []);

  const reset = useCallback(() => {
    setStep('select');
    setContract(null);
    setSigners([{ id: makeId(), name: userDisplayName, title: '', email: '' }]);
    setFields([]);
    setCompleted(false);
    setSaving(false);
    setViewMode('unsigned');
  }, [userDisplayName]);

  return {
    step,
    viewMode,
    contract,
    signers,
    fields,
    completed,
    saving,
    setStep,
    setViewMode,
    setContract,
    setSigners,
    setFields,
    setCompleted,
    setSaving,
    selectContract,
    resumeFromDraft,
    addSigner,
    removeSigner,
    updateSigner,
    reset,
    makeId,
  };
}