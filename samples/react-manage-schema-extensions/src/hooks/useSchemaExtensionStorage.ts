/* eslint-disable @typescript-eslint/no-floating-promises */

/* eslint-disable require-atomic-updates */
import * as React from "react";

import { useLogging } from "@spteck/m365-hooks";

import { BaseComponentContext } from "@microsoft/sp-component-base";
import { SPHttpClient } from "@microsoft/sp-http";
import { MSGraphClientV3 } from "@microsoft/sp-http";

export interface IStorageProperty {
  Key: string;
  Value: string;
  Description?: string;
}

export interface IUseSchemaExtensionStorageResult {
  loading: boolean;
  error: string | undefined;
  isListReady: boolean;
  getProperty: (key: string) => Promise<IStorageProperty | undefined>;
  setProperty: (key: string, value: string, description?: string) => Promise<void>;
  removeProperty: (key: string) => Promise<void>;
  ensureList: () => Promise<boolean>;
  getAppCatalogUrl: () => Promise<string | undefined>;
}

// Hidden list configuration
const LIST_TITLE = "SchemaExtensionsConfig";
const LIST_DESCRIPTION = "Hidden configuration list for Schema Extensions management";

/**
 * Custom hook for managing schema extension configuration using a hidden SharePoint list.
 * This replaces tenant properties with a list-based approach that works with Site Collection Admin permissions.
 * 
 * The list is automatically provisioned on the App Catalog site if it doesn't exist.
 * All operations use Microsoft Graph API for better compatibility and reliability.
 */
export const useSchemaExtensionStorage = (
  context: BaseComponentContext
): IUseSchemaExtensionStorageResult => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [isListReady, setIsListReady] = React.useState<boolean>(false);
  const appCatalogUrlRef = React.useRef<string | undefined>(undefined);
  const siteIdRef = React.useRef<string | undefined>(undefined);
  const listIdRef = React.useRef<string | undefined>(undefined);
  const listEnsuredRef = React.useRef<boolean>(false);

  const { logError, logInfo, logWarning } = useLogging();

  /**
   * Get the tenant App Catalog URL
   */
  const getAppCatalogUrl = React.useCallback(async (): Promise<string | undefined> => {
    if (appCatalogUrlRef.current) {
      return appCatalogUrlRef.current;
    }

    try {
      const siteUrl = context.pageContext.site.absoluteUrl;
      const response = await context.spHttpClient.get(
        `${siteUrl}/_api/SP_TenantSettings_Current`,
        SPHttpClient.configurations.v1
      );

      if (!response.ok) {
        throw new Error(`Failed to get tenant settings: ${response.status}`);
      }

      const data = await response.json();
      appCatalogUrlRef.current = data.CorporateCatalogUrl;
      return appCatalogUrlRef.current;
    } catch (err) {
      logError("getAppCatalogUrl", "Failed to get App Catalog URL", { error: (err as Error).message });
      setError(`Failed to get App Catalog URL: ${(err as Error).message}`);
      return undefined;
    }
  }, [context, logError]);

  /**
   * Get the site ID for the App Catalog using Graph API
   */
  const getSiteId = React.useCallback(async (appCatalogUrl: string): Promise<string | undefined> => {
    if (siteIdRef.current) {
      return siteIdRef.current;
    }

    try {
      // Extract hostname and site path from URL
      const url = new URL(appCatalogUrl);
      const hostname = url.hostname;
      const sitePath = url.pathname;

      const graphClient: MSGraphClientV3 = await context.msGraphClientFactory.getClient("3");
      const site = await graphClient
        .api(`/sites/${hostname}:${sitePath}`)
        .version("v1.0")
        .get();

      siteIdRef.current = site.id;
      return site.id;
    } catch (err) {
      logError("getSiteId", "Failed to get site ID", { error: (err as Error).message });
      return undefined;
    }
  }, [context, logError]);

  /**
   * Get list ID by title using Graph API
   */
  const getListId = React.useCallback(async (siteId: string): Promise<string | undefined> => {
    if (listIdRef.current) {
      return listIdRef.current;
    }

    try {
      const graphClient: MSGraphClientV3 = await context.msGraphClientFactory.getClient("3");
      const lists = await graphClient
        .api(`/sites/${siteId}/lists`)
        .version("v1.0")
        .filter(`displayName eq '${LIST_TITLE}'`)
        .get();

      if (lists.value && lists.value.length > 0) {
        listIdRef.current = lists.value[0].id;
        return listIdRef.current;
      }
      return undefined;
    } catch (err) {
      logError("getListId", "Failed to get list ID", { error: (err as Error).message });
      return undefined;
    }
  }, [context, logError]);

  /**
   * Check if the hidden list exists using Graph API
   */
  const checkListExists = React.useCallback(async (siteId: string): Promise<boolean> => {
    const listId = await getListId(siteId);
    return listId !== undefined;
  }, [getListId]);

  /**
   * Create the hidden list with required columns using Microsoft Graph API
   */
  const createList = React.useCallback(async (siteId: string): Promise<boolean> => {
    try {
      const graphClient: MSGraphClientV3 = await context.msGraphClientFactory.getClient("3");

      // Create the list using Graph API
      const listDefinition = {
        displayName: LIST_TITLE,
        description: LIST_DESCRIPTION,
        list: {
          template: "genericList",
          hidden: false // Create visible first, hide later if needed
        },
        columns: [
          {
            name: "Value",
            text: {
              allowMultipleLines: true,
              maxLength: 0 // Unlimited for multi-line
            }
          },
          {
            name: "Description",
            text: {
              allowMultipleLines: false,
              maxLength: 255
            }
          }
        ]
      };

      logInfo("createList", "Creating list via Graph API...");
      const createdList = await graphClient
        .api(`/sites/${siteId}/lists`)
        .version("v1.0")
        .post(listDefinition);

      logInfo("createList", "List created successfully", { listId: createdList.id });
      listIdRef.current = createdList.id;

      logInfo("createList", `Successfully created and configured list '${LIST_TITLE}' on App Catalog`);
      return true;
    } catch (err) {
      logError("createList", "Failed to create list", { error: (err as Error).message });
      setError(`Failed to create configuration list: ${(err as Error).message}`);
      return false;
    }
  }, [context, logInfo, logError]);

  /**
   * Ensure the list exists, creating it if necessary
   */
  const ensureList = React.useCallback(async (): Promise<boolean> => {
    if (listEnsuredRef.current) {
      return true;
    }

    setLoading(true);
    setError(undefined);

    try {
      const appCatalogUrl = await getAppCatalogUrl();
      if (!appCatalogUrl) {
        throw new Error("App Catalog URL not available");
      }

      const siteId = await getSiteId(appCatalogUrl);
      if (!siteId) {
        throw new Error("Could not get site ID for App Catalog");
      }

      const exists = await checkListExists(siteId);
      if (!exists) {
        const created = await createList(siteId);
        if (!created) {
          // Try checking again - maybe it was created by someone else or the creation partially succeeded
          const existsAfterCreate = await checkListExists(siteId);
          if (!existsAfterCreate) {
            logError("ensureList", "List creation failed and list does not exist");
            return false;
          }
        }
      }

      listEnsuredRef.current = true;
      setIsListReady(true);
      return true;
    } catch (err) {
      logError("ensureList", "Failed to ensure list", { error: (err as Error).message });
      setError(`Failed to ensure configuration list: ${(err as Error).message}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, [getAppCatalogUrl, getSiteId, checkListExists, createList, logError]);

  /**
   * Get a property value from the list using Graph API
   * Note: We get all items and filter client-side since Title is not indexed by default
   */
  const getProperty = React.useCallback(async (key: string): Promise<IStorageProperty | undefined> => {
    try {
      const appCatalogUrl = await getAppCatalogUrl();
      if (!appCatalogUrl) {
        throw new Error("App Catalog URL not available");
      }

      await ensureList();

      const siteId = await getSiteId(appCatalogUrl);
      if (!siteId) {
        throw new Error("Could not get site ID");
      }

      const listId = await getListId(siteId);
      if (!listId) {
        throw new Error("Could not get list ID");
      }

      const graphClient: MSGraphClientV3 = await context.msGraphClientFactory.getClient("3");
      
      // Get all items and filter client-side (small config list, no need for server-side filter on non-indexed column)
      const items = await graphClient
        .api(`/sites/${siteId}/lists/${listId}/items`)
        .version("v1.0")
        .expand("fields($select=Title,Value,Description)")
        .get();

      if (!items.value || items.value.length === 0) {
        return undefined;
      }

      // Filter client-side by Title
      const matchingItem = items.value.find((item: { fields: { Title: string } }) => item.fields?.Title === key);
      if (!matchingItem) {
        return undefined;
      }

      const fields = matchingItem.fields;
      return {
        Key: fields.Title,
        Value: fields.Value || "",
        Description: fields.Description || ""
      };
    } catch (err) {
      logError("getProperty", `Failed to get property '${key}'`, { error: (err as Error).message });
      return undefined;
    }
  }, [context, getAppCatalogUrl, getSiteId, getListId, ensureList, logError]);

  /**
   * Set a property value in the list using Graph API (creates or updates)
   * Note: We get all items and filter client-side since Title is not indexed by default
   */
  const setProperty = React.useCallback(async (
    key: string,
    value: string,
    description?: string
  ): Promise<void> => {
    setLoading(true);
    setError(undefined);

    try {
      const appCatalogUrl = await getAppCatalogUrl();
      if (!appCatalogUrl) {
        throw new Error("App Catalog URL not available");
      }

      await ensureList();

      const siteId = await getSiteId(appCatalogUrl);
      if (!siteId) {
        throw new Error("Could not get site ID");
      }

      const listId = await getListId(siteId);
      if (!listId) {
        throw new Error("Could not get list ID");
      }

      const graphClient: MSGraphClientV3 = await context.msGraphClientFactory.getClient("3");
      
      // Get all items and filter client-side (small config list)
      const existingItems = await graphClient
        .api(`/sites/${siteId}/lists/${listId}/items`)
        .version("v1.0")
        .expand("fields($select=Title)")
        .get();

      // Find existing item by Title client-side
      const matchingItem = existingItems.value?.find((item: { fields: { Title: string } }) => item.fields?.Title === key);

      if (matchingItem) {
        // Update existing item
        const itemId = matchingItem.id;
        await graphClient
          .api(`/sites/${siteId}/lists/${listId}/items/${itemId}/fields`)
          .version("v1.0")
          .patch({
            Value: value,
            Description: description || ""
          });
        logInfo("setProperty", `Updated property '${key}'`);
      } else {
        // Create new item
        await graphClient
          .api(`/sites/${siteId}/lists/${listId}/items`)
          .version("v1.0")
          .post({
            fields: {
              Title: key,
              Value: value,
              Description: description || ""
            }
          });
        logInfo("setProperty", `Created property '${key}'`);
      }

      logInfo("setProperty", `Successfully set property '${key}'`);
    } catch (err) {
      logError("setProperty", `Failed to set property '${key}'`, { error: (err as Error).message });
      setError(`Failed to set property: ${(err as Error).message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [context, getAppCatalogUrl, getSiteId, getListId, ensureList, logInfo, logError]);

  /**
   * Remove a property from the list using Graph API
   * Note: We get all items and filter client-side since Title is not indexed by default
   */
  const removeProperty = React.useCallback(async (key: string): Promise<void> => {
    setLoading(true);
    setError(undefined);

    try {
      const appCatalogUrl = await getAppCatalogUrl();
      if (!appCatalogUrl) {
        throw new Error("App Catalog URL not available");
      }

      await ensureList();

      const siteId = await getSiteId(appCatalogUrl);
      if (!siteId) {
        throw new Error("Could not get site ID");
      }

      const listId = await getListId(siteId);
      if (!listId) {
        throw new Error("Could not get list ID");
      }

      const graphClient: MSGraphClientV3 = await context.msGraphClientFactory.getClient("3");
      
      // Get all items and filter client-side (small config list)
      const items = await graphClient
        .api(`/sites/${siteId}/lists/${listId}/items`)
        .version("v1.0")
        .expand("fields($select=Title)")
        .get();

      // Find item by Title client-side
      const matchingItem = items.value?.find((item: { fields: { Title: string } }) => item.fields?.Title === key);

      if (!matchingItem) {
        logWarning("removeProperty", `Property '${key}' not found, nothing to delete`);
        return;
      }

      // Delete the item
      const itemId = matchingItem.id;
      await graphClient
        .api(`/sites/${siteId}/lists/${listId}/items/${itemId}`)
        .version("v1.0")
        .delete();

      logInfo("removeProperty", `Successfully removed property '${key}'`);
    } catch (err) {
      logError("removeProperty", `Failed to remove property '${key}'`, { error: (err as Error).message });
      setError(`Failed to remove property: ${(err as Error).message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [context, getAppCatalogUrl, getSiteId, getListId, ensureList, logInfo, logWarning, logError]);

  return {
    loading,
    error,
    isListReady,
    getProperty,
    setProperty,
    removeProperty,
    ensureList,
    getAppCatalogUrl
  };
};
