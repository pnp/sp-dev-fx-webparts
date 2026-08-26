import { useState, useEffect } from 'react';
import { ISharePointService } from '../services/SharePointService';

export interface ISignedDocument {
  contractName: string;
  signedAt: string;
  signerNames: string;
  fileRef: string; 
  fileName: string; 
}

export function useSignedDocuments(sharePointService: ISharePointService) {
  const [signedDocs, setSignedDocs] = useState<ISignedDocument[]>([]);
  const [signedContractNames, setSignedContractNames] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);

  const loadSignedDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      const docs = await sharePointService.getSignedDocuments();
      // Cast to our richer interface — SharePointService now returns fileRef + fileName
      setSignedDocs(docs as ISignedDocument[]);
      const names = new Set(docs.map(d => d.contractName));
      setSignedContractNames(names);
      console.log('[Signed] Loaded', docs.length, 'documents');
    } catch (err: any) {
      console.error('[Signed] Error:', err);
      setError(err.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  const viewDocument = (doc: ISignedDocument): void => {
    if (!doc.fileRef) {
      console.error('[Signed] No fileRef available for:', doc.contractName);
      return;
    }
    // Use SharePoint's built-in PDF viewer
    const viewerUrl = `${window.location.origin}${doc.fileRef}`;
    window.open(viewerUrl, '_blank', 'noopener,noreferrer');
  };

  const downloadDocument = async (doc: ISignedDocument): Promise<void> => {
    setDownloadingDoc(doc.fileName);
    try {
      console.log('[Signed] Downloading via fileRef:', doc.fileRef);

      // Use fileRef (server-relative path) directly — avoids the contractName search entirely
      const response = await fetch(doc.fileRef);
      if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
      const blob = await response.blob();

      const downloadName = doc.fileName || `signed_document.pdf`;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = downloadName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log('[Signed] Downloaded:', downloadName, blob.size, 'bytes');
    } catch (err: any) {
      console.error('[Signed] Download failed:', err);
      throw new Error(`Download failed: ${err.message}`);
    } finally {
      setDownloadingDoc(null);
    }
  };

  // Keep old signature for backward compat (accepts contractName string)
  const downloadDocumentByName = async (contractName: string): Promise<void> => {
    const doc = signedDocs.find(d => d.contractName === contractName);
    if (doc) {
      await downloadDocument(doc);
    } else {
      // Fallback — old behaviour
      const blob = await sharePointService.getSignedDocumentFile(contractName);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Signed_${contractName.replace(/\.[^.]+$/, '')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    loadSignedDocuments();
  }, []);

  return {
    signedDocs,
    signedContractNames,
    loading,
    error,
    downloadingDoc,
    refresh: loadSignedDocuments,
    viewDocument,
    downloadDocument,
    downloadDocumentByName,
  };
}