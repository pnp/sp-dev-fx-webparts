import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { usePageVisible } from './usePageVisible';
import { useServices } from '../contexts/ServicesContext';
import {
  QK_APP_ROLES,
  QK_APPLICATION_CATALOG,
  QK_APPLICATION_CATALOG_ALL,
  QK_AUDIT_SEARCH,
  QK_DELEGATIONS,
  QK_JOB_CHANGE_TOKEN,
  QK_JOB_DETAIL,
  QK_JOB_SUMMARIES,
  QK_LICENSE_COSTS_ALL,
  QK_PREFLIGHT,
  QK_ROLES,
  QK_SITE_CATALOG,
  QK_SUBSCRIBED_SKUS,
  QK_TASKS,
  QK_TEAMS_CATALOG,
  QK_TEMPLATES,
  QK_TEMPLATES_ALL,
  QK_VERIFIED_DOMAINS
} from '../constants/queryKeys';
import type {
  IApplicationCatalogItem,
  IApprovalDelegation,
  IAuditEntry,
  IAuditQuery,
  IJobQuery,
  IJobSummary,
  ILicenseCostItem,
  ILicenseOption,
  IPreflightResult,
  IProvisioningJob,
  IResolvedRoles,
  IRoleManagementItem,
  IServiceDeskTask,
  ISiteCatalogItem,
  ITeamsCatalogItem,
  ITemplateListItem
} from '../models';
import type { IPagedResult } from '../services/util/pagedQuery';
import type { IVerifiedDomain } from '../services/users/UserService';

const STATIC_STALE_MS: number = 15 * 60 * 1000;
const OPERATIONAL_STALE_MS: number = 60 * 1000;
const CHANGE_TOKEN_POLL_MS: number = 5 * 1000;

export function usePreflight(): UseQueryResult<IPreflightResult> {
  const services = useServices();
  return useQuery(QK_PREFLIGHT, ({ signal }) => services.preflight.run(signal), {
    staleTime: STATIC_STALE_MS,
    retry: false
  });
}

export function useAppRoles(): UseQueryResult<IResolvedRoles> {
  const services = useServices();
  return useQuery(QK_APP_ROLES, () => services.roles.getResolvedRoles(), {
    staleTime: STATIC_STALE_MS
  });
}

export function useLicenseOptions(): UseQueryResult<ILicenseOption[]> {
  const services = useServices();
  return useQuery(QK_SUBSCRIBED_SKUS, ({ signal }) => services.licenses.getLicenseOptions(signal), {
    staleTime: STATIC_STALE_MS
  });
}

export function useVerifiedDomains(): UseQueryResult<IVerifiedDomain[]> {
  const services = useServices();
  return useQuery(QK_VERIFIED_DOMAINS, ({ signal }) => services.users.getVerifiedDomains(signal), {
    staleTime: STATIC_STALE_MS
  });
}

export function useActiveTemplates(): UseQueryResult<ITemplateListItem[]> {
  const services = useServices();
  return useQuery(QK_TEMPLATES, () => services.data.getActiveTemplates(), {
    staleTime: STATIC_STALE_MS
  });
}

export function useAllTemplates(): UseQueryResult<ITemplateListItem[]> {
  const services = useServices();
  return useQuery(QK_TEMPLATES_ALL, () => services.data.getAllTemplates(), {
    staleTime: STATIC_STALE_MS
  });
}

export function useTasks(): UseQueryResult<IPagedResult<IServiceDeskTask>> {
  const services = useServices();
  return useQuery(QK_TASKS, () => services.data.getTasksPaged(), {
    staleTime: OPERATIONAL_STALE_MS
  });
}

export function useTeamsCatalog(): UseQueryResult<ITeamsCatalogItem[]> {
  const services = useServices();
  return useQuery(QK_TEAMS_CATALOG, () => services.data.getTeamsCatalog(), {
    staleTime: STATIC_STALE_MS
  });
}

export function useSiteCatalog(): UseQueryResult<ISiteCatalogItem[]> {
  const services = useServices();
  return useQuery(QK_SITE_CATALOG, () => services.data.getSiteCatalog(), {
    staleTime: STATIC_STALE_MS
  });
}

export function useApplicationCatalog(): UseQueryResult<IApplicationCatalogItem[]> {
  const services = useServices();
  return useQuery(QK_APPLICATION_CATALOG, () => services.data.getApplicationCatalog(), {
    staleTime: STATIC_STALE_MS
  });
}

/** Every application row, including deactivated ones — for the Catalogs tab. */
export function useApplicationCatalogAll(): UseQueryResult<IApplicationCatalogItem[]> {
  const services = useServices();
  return useQuery(QK_APPLICATION_CATALOG_ALL, () => services.data.getApplicationCatalogAll(), {
    staleTime: OPERATIONAL_STALE_MS
  });
}

export function useLicenseCostsForManagement(): UseQueryResult<ILicenseCostItem[]> {
  const services = useServices();
  return useQuery(QK_LICENSE_COSTS_ALL, () => services.data.getLicenseCostsForManagement(), {
    staleTime: OPERATIONAL_STALE_MS
  });
}

export function useRoleDefinitionsForManagement(): UseQueryResult<IRoleManagementItem[]> {
  const services = useServices();
  return useQuery(QK_ROLES, () => services.data.getRoleDefinitionsForManagement(), {
    staleTime: OPERATIONAL_STALE_MS
  });
}

export function useAllDelegations(): UseQueryResult<IApprovalDelegation[]> {
  const services = useServices();
  return useQuery(QK_DELEGATIONS, () => services.data.getAllDelegations(), {
    staleTime: OPERATIONAL_STALE_MS
  });
}

export function useJobSummaries(query: IJobQuery, enablePolling: boolean): UseQueryResult<IPagedResult<IJobSummary>> {
  const services = useServices();
  const visible = usePageVisible();
  return useQuery(
    [...QK_JOB_SUMMARIES, JSON.stringify(query)],
    () => services.data.getJobSummariesPaged(query),
    {
      staleTime: OPERATIONAL_STALE_MS,
      refetchInterval: enablePolling && visible ? CHANGE_TOKEN_POLL_MS : false
    }
  );
}

export function useJobsChangeToken(enabled: boolean): UseQueryResult<{ latestModifiedUtc: string; runningCount: number }> {
  const services = useServices();
  const visible = usePageVisible();
  return useQuery(QK_JOB_CHANGE_TOKEN, () => services.data.getJobsChangeToken(), {
    enabled,
    staleTime: 0,
    refetchInterval: enabled && visible ? CHANGE_TOKEN_POLL_MS : false
  });
}

export function useJobDetail(itemId: number | null, pollWhileRunning: boolean): UseQueryResult<IProvisioningJob> {
  const services = useServices();
  const visible = usePageVisible();
  return useQuery(
    [...QK_JOB_DETAIL, itemId ?? 0],
    () => services.data.getJob(itemId as number),
    {
      enabled: itemId !== null && itemId !== undefined,
      refetchInterval:
        pollWhileRunning && visible ? (_data, query) => (query.state.error ? false : CHANGE_TOKEN_POLL_MS) : false
    }
  );
}

export function useAuditSearch(query: IAuditQuery, enabled: boolean): UseQueryResult<IPagedResult<IAuditEntry>> {
  const services = useServices();
  return useQuery(
    [...QK_AUDIT_SEARCH, JSON.stringify(query)],
    () => services.data.searchAuditEntries(query),
    {
      enabled,
      staleTime: OPERATIONAL_STALE_MS
    }
  );
}
