import { useState, useCallback, useRef } from 'react';
import { ICustomActionOperationResult, CustomActionScope } from '../models';
import { CustomActionService } from '../services';
import { ErrorHandler } from '../utils/ErrorHandler';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IUseCustomActionOperationsResult {
  operationInProgress: boolean;
  createCustomAction: (formData: any, scope: CustomActionScope) => Promise<{ success: boolean; message?: string }>;
  updateCustomAction: (id: string, formData: any, scope: CustomActionScope) => Promise<{ success: boolean; message?: string }>;
  deleteCustomAction: (id: string, scope: CustomActionScope) => Promise<{ success: boolean; message?: string }>;
}

export function useCustomActionOperations(
  context: WebPartContext,
  onOperationComplete?: () => Promise<void>,
  targetSiteUrls?: string[]
): IUseCustomActionOperationsResult {
  const [operationInProgress, setOperationInProgress] = useState(false);

  const serviceCacheRef = useRef<Map<string, CustomActionService>>(new Map());

  const normalizeUrl = useCallback((url?: string): string => {
    const base = url && url.length > 0 ? url : context.pageContext.web.absoluteUrl;
    return base.replace(/\/$/, '');
  }, [context.pageContext.web.absoluteUrl]);

  const getService = useCallback((siteUrl?: string): CustomActionService => {
    const normalized = normalizeUrl(siteUrl);
    const cacheKey = normalized || '__current';
    const cache = serviceCacheRef.current;
    let service = cache.get(cacheKey);

    if (!service) {
      service = new CustomActionService(context, normalized);
      cache.set(cacheKey, service);
    } else {
      service.setTargetSite(normalized);
    }

    return service;
  }, [context, normalizeUrl]);

  const createCustomAction = useCallback(async (
    formData: any,
    scope: CustomActionScope
  ): Promise<{ success: boolean; message?: string }> => {
    setOperationInProgress(true);

    try {
      const targetUrls = (targetSiteUrls && targetSiteUrls.length > 0
        ? Array.from(new Set(targetSiteUrls.map(normalizeUrl)))
        : [normalizeUrl()]);

      const results = [] as { site: string; result: ICustomActionOperationResult }[];
      for (const url of targetUrls) {
        try {
          const service = getService(url);
          const result = await service.createCustomAction(formData, scope);
          results.push({ site: url, result });
        } catch (error) {
          const errorInfo = ErrorHandler.handleError(error);
          ErrorHandler.logError(errorInfo, 'useCustomActionOperations.createCustomAction');
          results.push({
            site: url,
            result: {
              success: false,
              message: errorInfo.userFriendlyMessage
            }
          });
        }
      }

      const successCount = results.filter(r => r.result.success).length;
      const allSuccess = successCount === results.length;

      if (allSuccess && onOperationComplete) {
        await onOperationComplete();
      }

      return {
        success: allSuccess,
        message: allSuccess
          ? `Custom action created on ${results.length} site(s)`
          : `Custom action created on ${successCount}/${results.length} site(s)`
      };
    } catch (error) {
      const errorInfo = ErrorHandler.handleError(error);
      ErrorHandler.logError(errorInfo, 'useCustomActionOperations.createCustomAction');
      return {
        success: false,
        message: errorInfo.userFriendlyMessage
      };
    } finally {
      setOperationInProgress(false);
    }
  }, [getService, onOperationComplete, targetSiteUrls, normalizeUrl]);

  const updateCustomAction = useCallback(async (
    id: string,
    formData: any,
    scope: CustomActionScope
  ): Promise<{ success: boolean; message?: string }> => {
    setOperationInProgress(true);

    try {
      const primarySiteUrl = targetSiteUrls && targetSiteUrls.length > 0 ? targetSiteUrls[0] : undefined;
      const result = await getService(primarySiteUrl).updateCustomAction(id, formData, scope);

      if (result.success && onOperationComplete) {
        await onOperationComplete();
      }

      return result;
    } catch (error) {
      const errorInfo = ErrorHandler.handleError(error);
      ErrorHandler.logError(errorInfo, 'useCustomActionOperations.updateCustomAction');
      return {
        success: false,
        message: errorInfo.userFriendlyMessage
      };
    } finally {
      setOperationInProgress(false);
    }
  }, [getService, onOperationComplete, targetSiteUrls]);

  const deleteCustomAction = useCallback(async (
    id: string,
    scope: CustomActionScope
  ): Promise<{ success: boolean; message?: string }> => {
    setOperationInProgress(true);

    try {
      const primarySiteUrl = targetSiteUrls && targetSiteUrls.length > 0 ? targetSiteUrls[0] : undefined;
      const result = await getService(primarySiteUrl).deleteCustomAction(id, scope);

      if (result.success && onOperationComplete) {
        await onOperationComplete();
      }

      return result;
    } catch (error) {
      const errorInfo = ErrorHandler.handleError(error);
      ErrorHandler.logError(errorInfo, 'useCustomActionOperations.deleteCustomAction');
      return {
        success: false,
        message: errorInfo.userFriendlyMessage
      };
    } finally {
      setOperationInProgress(false);
    }
  }, [getService, onOperationComplete, targetSiteUrls]);

  return {
    operationInProgress,
    createCustomAction,
    updateCustomAction,
    deleteCustomAction
  };
}
