import { useState, useEffect } from 'react';
import { ISharePointService } from '../services/SharePointService';

export interface ISignatureToken {
  id: string;
  tokenId: string;
  contractId: number;
  contractName: string;
  signerEmail: string;
  signerName: string;
  used: boolean;
  expires: string;
  signedDate?: string;
}

export interface ITokenStatus {
  contractId: number;
  contractName: string;
  totalTokens: number;
  pendingTokens: number;
  completedTokens: number;
  status: 'pending' | 'partial' | 'completed';
}

export function useSignatureTokens(sharePointService: ISharePointService) {
  const [tokens, setTokens] = useState<ISignatureToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTokens = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('[useSignatureTokens] Loading tokens...');
      const data = await sharePointService.getSignatureTokens();
      setTokens(data);
      console.log('[useSignatureTokens] ✓ Loaded', data.length, 'tokens');
    } catch (err: any) {
      console.error('[useSignatureTokens] Error:', err);
      setError(err.message || 'Failed to load tokens');
      // Don't throw - just set empty array
      setTokens([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTokens();
  }, []);

  // Group tokens by contract
  const tokensByContract = tokens.reduce((acc, token) => {
    const key = token.contractId;
    if (!acc[key]) acc[key] = [];
    acc[key].push(token);
    return acc;
  }, {} as Record<number, ISignatureToken[]>);

  // Get token status for a contract
  const getTokenStatus = (contractId: number): ITokenStatus | null => {
    const contractTokens = tokensByContract[contractId];
    if (!contractTokens || contractTokens.length === 0) return null;

    const now = new Date();
    const pending = contractTokens.filter(t => !t.used && new Date(t.expires) > now);
    const completed = contractTokens.filter(t => t.used);

    let status: 'pending' | 'partial' | 'completed';
    if (completed.length === contractTokens.length) {
      status = 'completed';
    } else if (completed.length > 0) {
      status = 'partial';
    } else {
      status = 'pending';
    }

    return {
      contractId,
      contractName: contractTokens[0].contractName,
      totalTokens: contractTokens.length,
      pendingTokens: pending.length,
      completedTokens: completed.length,
      status,
    };
  };

  // Check if contract has any active (pending) tokens
  const hasActiveTokens = (contractId: number): boolean => {
    const contractTokens = tokensByContract[contractId];
    if (!contractTokens) return false;
    const now = new Date();
    return contractTokens.some(t => !t.used && new Date(t.expires) > now);
  };

  // Check if all tokens for contract are completed
  const allTokensCompleted = (contractId: number): boolean => {
    const contractTokens = tokensByContract[contractId];
    if (!contractTokens || contractTokens.length === 0) return false;
    return contractTokens.every(t => t.used);
  };

  return {
    tokens,
    loading,
    error,
    tokensByContract,
    getTokenStatus,
    hasActiveTokens,
    allTokensCompleted,
    refresh: loadTokens,
  };
}