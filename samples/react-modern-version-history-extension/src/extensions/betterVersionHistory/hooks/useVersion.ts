import { useState, useEffect } from 'react';
import { IDataProvider } from '../providers/DataProvider';
import { IVersion } from '../models/IVersion';
import { IVersionsFilter } from '../models/IVersionsFilter';

export default function useVersions(provider: IDataProvider, filters: IVersionsFilter = {}): { versions: IVersion[], isLoading: boolean } {
    const [versions, setVersions] = useState<IVersion[]>(null);

    async function fetchData(): Promise<void> {
        let result = await provider.GetVersions(filters);
        // as the provider does NOT filter by 'Editor' (aka Contributor) we will do this on client side
        if (filters.Author) { 
            result = result.filter(v => v.Author.Email === filters.Author?.secondaryText);
        }
        setVersions(result);
    }

    useEffect(() => {
        fetchData();
    }, [filters]);

    return {
        versions, isLoading: versions === null,
    };
}