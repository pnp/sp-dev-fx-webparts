/* eslint-disable @typescript-eslint/no-floating-promises */

/* eslint-disable require-atomic-updates */
import * as React from "react";

import { BaseComponentContext } from "@microsoft/sp-component-base";
import { SPHttpClient, ISPHttpClientOptions } from "@microsoft/sp-http";

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
 */
export const useSchemaExtensionStorage = (
  context: BaseComponentContext
): IUseSchemaExtensionStorageResult => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [isListReady, setIsListReady] = React.useState<boolean>(false);
  const appCatalogUrlRef = React.useRef<string | undefined>(undefined);
  const listEnsuredRef = React.useRef<boolean>(false);

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
      console.error("Failed to get App Catalog URL:", err);
      setError(`Failed to get App Catalog URL: ${(err as Error).message}`);
      return undefined;
    }
  }, [context]);

  /**
   * Check if the hidden list exists
   */
  const checkListExists = React.useCallback(async (appCatalogUrl: string): Promise<boolean> => {
    try {
      const response = await context.spHttpClient.get(
        `${appCatalogUrl}/_api/web/lists/getbytitle('${LIST_TITLE}')`,
        SPHttpClient.configurations.v1
      );
      return response.ok;
    } catch {
      return false;
    }
  }, [context]);

  /**
   * Create the hidden list with required columns
   */
  const createList = React.useCallback(async (appCatalogUrl: string): Promise<boolean> => {
    try {
      // Create the list
      const listCreationBody = JSON.stringify({
        __metadata: { type: "SP.List" },
        Title: LIST_TITLE,
        Description: LIST_DESCRIPTION,
        BaseTemplate: 100, // Generic list
        Hidden: true,
        NoCrawl: true
      });

      const listOptions: ISPHttpClientOptions = {
        headers: {
          "Content-Type": "application/json;odata=verbose",
          Accept: "application/json;odata=verbose"
        },
        body: listCreationBody
      };

      const createListResponse = await context.spHttpClient.post(
        `${appCatalogUrl}/_api/web/lists`,
        SPHttpClient.configurations.v1,
        listOptions
      );

      if (!createListResponse.ok) {
        const errorData = await createListResponse.json();
        throw new Error(errorData?.error?.message?.value || `Failed to create list: ${createListResponse.status}`);
      }

      // Add Value column (Note/Multi-line text for large JSON values)
      const valueColumnBody = JSON.stringify({
        __metadata: { type: "SP.FieldCreationInformation" },
        Title: "Value",
        FieldTypeKind: 3, // Note (multi-line text)
        Required: false
      });

      const valueColumnOptions: ISPHttpClientOptions = {
        headers: {
          "Content-Type": "application/json;odata=verbose",
          Accept: "application/json;odata=verbose"
        },
        body: valueColumnBody
      };

      await context.spHttpClient.post(
        `${appCatalogUrl}/_api/web/lists/getbytitle('${LIST_TITLE}')/fields`,
        SPHttpClient.configurations.v1,
        valueColumnOptions
      );

      // Add Description column
      const descriptionColumnBody = JSON.stringify({
        __metadata: { type: "SP.FieldCreationInformation" },
        Title: "Description",
        FieldTypeKind: 2, // Single line text
        Required: false
      });

      const descriptionColumnOptions: ISPHttpClientOptions = {
        headers: {
          "Content-Type": "application/json;odata=verbose",
          Accept: "application/json;odata=verbose"
        },
        body: descriptionColumnBody
      };

      await context.spHttpClient.post(
        `${appCatalogUrl}/_api/web/lists/getbytitle('${LIST_TITLE}')/fields`,
        SPHttpClient.configurations.v1,
        descriptionColumnOptions
      );

      console.log(`Successfully created hidden list '${LIST_TITLE}' on App Catalog`);
      return true;
    } catch (err) {
      console.error("Failed to create list:", err);
      setError(`Failed to create configuration list: ${(err as Error).message}`);
      return false;
    }
  }, [context]);

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

      const exists = await checkListExists(appCatalogUrl);
      if (!exists) {
        const created = await createList(appCatalogUrl);
        if (!created) {
          return false;
        }
      }

      listEnsuredRef.current = true;
      setIsListReady(true);
      return true;
    } catch (err) {
      console.error("Failed to ensure list:", err);
      setError(`Failed to ensure configuration list: ${(err as Error).message}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, [getAppCatalogUrl, checkListExists, createList]);

  /**
   * Get a property value from the list
   */
  const getProperty = React.useCallback(async (key: string): Promise<IStorageProperty | undefined> => {
    try {
      const appCatalogUrl = await getAppCatalogUrl();
      if (!appCatalogUrl) {
        throw new Error("App Catalog URL not available");
      }

      await ensureList();

      const response = await context.spHttpClient.get(
        `${appCatalogUrl}/_api/web/lists/getbytitle('${LIST_TITLE}')/items?$filter=Title eq '${encodeURIComponent(key)}'&$select=Id,Title,Value,Description`,
        SPHttpClient.configurations.v1
      );

      if (!response.ok) {
        throw new Error(`Failed to get property: ${response.status}`);
      }

      const data = await response.json();
      const items = data.value;

      if (!items || items.length === 0) {
        return undefined;
      }

      return {
        Key: items[0].Title,
        Value: items[0].Value || "",
        Description: items[0].Description || ""
      };
    } catch (err) {
      console.error(`Failed to get property '${key}':`, err);
      return undefined;
    }
  }, [context, getAppCatalogUrl, ensureList]);

  /**
   * Set a property value in the list (creates or updates)
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

      // Check if item exists
      const existingResponse = await context.spHttpClient.get(
        `${appCatalogUrl}/_api/web/lists/getbytitle('${LIST_TITLE}')/items?$filter=Title eq '${encodeURIComponent(key)}'&$select=Id`,
        SPHttpClient.configurations.v1
      );

      if (!existingResponse.ok) {
        throw new Error(`Failed to check existing property: ${existingResponse.status}`);
      }

      const existingData = await existingResponse.json();
      const existingItems = existingData.value;

      if (existingItems && existingItems.length > 0) {
        // Update existing item
        const itemId = existingItems[0].Id;
        const updateBody = JSON.stringify({
          __metadata: { type: "SP.Data.SchemaExtensionsConfigListItem" },
          Value: value,
          Description: description || ""
        });

        const updateOptions: ISPHttpClientOptions = {
          headers: {
            "Content-Type": "application/json;odata=verbose",
            Accept: "application/json;odata=verbose",
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
          },
          body: updateBody
        };

        const updateResponse = await context.spHttpClient.post(
          `${appCatalogUrl}/_api/web/lists/getbytitle('${LIST_TITLE}')/items(${itemId})`,
          SPHttpClient.configurations.v1,
          updateOptions
        );

        if (!updateResponse.ok) {
          const errorData = await updateResponse.json();
          throw new Error(errorData?.error?.message?.value || `Failed to update property: ${updateResponse.status}`);
        }
      } else {
        // Create new item
        const createBody = JSON.stringify({
          __metadata: { type: "SP.Data.SchemaExtensionsConfigListItem" },
          Title: key,
          Value: value,
          Description: description || ""
        });

        const createOptions: ISPHttpClientOptions = {
          headers: {
            "Content-Type": "application/json;odata=verbose",
            Accept: "application/json;odata=verbose"
          },
          body: createBody
        };

        const createResponse = await context.spHttpClient.post(
          `${appCatalogUrl}/_api/web/lists/getbytitle('${LIST_TITLE}')/items`,
          SPHttpClient.configurations.v1,
          createOptions
        );

        if (!createResponse.ok) {
          const errorData = await createResponse.json();
          throw new Error(errorData?.error?.message?.value || `Failed to create property: ${createResponse.status}`);
        }
      }

      console.log(`Successfully set property '${key}'`);
    } catch (err) {
      console.error(`Failed to set property '${key}':`, err);
      setError(`Failed to set property: ${(err as Error).message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [context, getAppCatalogUrl, ensureList]);

  /**
   * Remove a property from the list
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

      // Find the item
      const response = await context.spHttpClient.get(
        `${appCatalogUrl}/_api/web/lists/getbytitle('${LIST_TITLE}')/items?$filter=Title eq '${encodeURIComponent(key)}'&$select=Id`,
        SPHttpClient.configurations.v1
      );

      if (!response.ok) {
        throw new Error(`Failed to find property: ${response.status}`);
      }

      const data = await response.json();
      const items = data.value;

      if (!items || items.length === 0) {
        console.log(`Property '${key}' not found, nothing to delete`);
        return;
      }

      // Delete the item
      const itemId = items[0].Id;
      const deleteOptions: ISPHttpClientOptions = {
        headers: {
          Accept: "application/json;odata=verbose",
          "IF-MATCH": "*",
          "X-HTTP-Method": "DELETE"
        }
      };

      const deleteResponse = await context.spHttpClient.post(
        `${appCatalogUrl}/_api/web/lists/getbytitle('${LIST_TITLE}')/items(${itemId})`,
        SPHttpClient.configurations.v1,
        deleteOptions
      );

      if (!deleteResponse.ok) {
        throw new Error(`Failed to delete property: ${deleteResponse.status}`);
      }

      console.log(`Successfully removed property '${key}'`);
    } catch (err) {
      console.error(`Failed to remove property '${key}':`, err);
      setError(`Failed to remove property: ${(err as Error).message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [context, getAppCatalogUrl, ensureList]);

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
