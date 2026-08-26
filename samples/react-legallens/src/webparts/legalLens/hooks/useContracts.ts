import { useState, useEffect, useCallback } from 'react';
import { ISharePointService } from '../services/SharePointService';
import { IContract } from '../models/IContract';

export interface IUseContractsResult {
  contracts: IContract[];
  loading: boolean;
  error: string | null;
  selectedTag: string | null;
  filteredContracts: IContract[];
  topTags: Array<{ tag: string; count: number }>;
  stats: {
    total: number;
    compliant: number;
    warnings: number;
    alerts: number;
  };
  setSelectedTag: (tag: string | null) => void;
  loadContracts: () => Promise<void>;
  refreshContracts: () => Promise<void>;
}

export function useContracts(sharePointService: ISharePointService): IUseContractsResult {
  const [contracts, setContracts] = useState<IContract[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const loadContracts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('[useContracts] Loading contracts...');
      const data = await sharePointService.getContracts();
      setContracts(data);
      console.log('[useContracts] ✓ Loaded', data.length, 'contracts');
    } catch (err: any) {
      console.error('[useContracts] Error loading contracts:', err);
      setError(err.message || 'Failed to load contracts');
    } finally {
      setLoading(false);
    }
  }, [sharePointService]);

  const refreshContracts = useCallback(async () => {
    await loadContracts();
  }, [loadContracts]);

  useEffect(() => {
    loadContracts();
  }, [loadContracts]);

  const filteredContracts = selectedTag
    ? contracts.filter(c => c.tags.includes(selectedTag))
    : contracts;

  const tagCounts: { [tag: string]: number } = {};
  contracts.forEach(c => {
    c.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([tag, count]) => ({ tag, count }));

  const stats = {
    total: contracts.length,
    compliant: contracts.filter(c => c.status === 'compliant').length,
    warnings: contracts.filter(c => c.status === 'warning').length,
    alerts: contracts.filter(c => 
      c.flag === 'Expiring soon' || c.flag === 'Expired' || c.risk >= 70
    ).length
  };

  return {
    contracts,
    loading,
    error,
    selectedTag,
    filteredContracts,
    topTags,
    stats,
    setSelectedTag,
    loadContracts,
    refreshContracts
  };
}