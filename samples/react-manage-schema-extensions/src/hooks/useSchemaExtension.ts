/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";

import {
  ISchemaExtension,
  ISchemaExtensionCreateRequest,
} from "../models/ISchemaExtension";
import { useAppCatalog, useLogging } from "@spteck/m365-hooks";

import { BaseComponentContext } from "@microsoft/sp-component-base";
import { ISchemaTenantProperty } from "../models/ISchemaTeantProperty";
import { MSGraphClientV3 } from "@microsoft/sp-http";

export interface IUseSchemaExtensionProps {
  context: BaseComponentContext;
}

export interface IUseSchemaExtensionResult {
  createSchemaExtension: (
    schemaExtension: ISchemaExtensionCreateRequest
  ) => Promise<ISchemaExtension>;
  getSchemaExtensions: () => Promise<ISchemaExtension[]>;
  getSchemaExtension: (id: string) => Promise<ISchemaExtension>;
  updateSchemaExtension: (
    id: string,
    schemaExtension: Partial<ISchemaExtension>
  ) => Promise<ISchemaExtension>;
  deleteSchemaExtension: (id: string) => Promise<void>;
  // New methods for tenant properties
  getCreatedSchemaIds: () => Promise<ISchemaTenantProperty[]>;
  saveSchemaIdToTenantProperty: (schemaId: string) => Promise<void>;
  removeSchemaIdFromTenantProperty: (schemaId: string) => Promise<void>;
}

const TENANT_PROPERTY_KEY = "ManageSchemaExtensionsCreatedSchemaIds";

export const useSchemaExtension = ({
  context,
}: IUseSchemaExtensionProps): IUseSchemaExtensionResult => {
  // Create Graph client function
  const getGraphClient =
    React.useCallback(async (): Promise<MSGraphClientV3> => {
      if (!context) {
        throw new Error("Context not available");
      }
      return await context.msGraphClientFactory.getClient("3");
    }, [context]);

  // Initialize app catalog hook for tenant properties management
  const { getTenantProperty, updateTenantProperty, getAppCatalogUrl } =
    useAppCatalog(context);

  // Initialize logging hook
  const { logError, logWarning, logInfo } = useLogging();

  // Helper function to handle Graph API errors

  const handleGraphError = React.useCallback(
    (
      error: unknown,
      operation: string,
      additionalContext?: Record<string, unknown>
    ): Error => {
      const graphError = error as Error & { code?: string; status?: number };
      logError(`Graph API Error in ${operation}:`, JSON.stringify(error));
      return new Error(
        graphError.code === "Forbidden"
          ? "You don't have permission to perform this operation"
          : graphError.message || `Failed to ${operation.toLowerCase()}`
      );
    },
    []
  );

  // Get created schema extension IDs from SharePoint tenant properties
  const getCreatedSchemaIds = React.useCallback(async (): Promise<
    ISchemaTenantProperty[]
  > => {
    try {
      const appCatalogUrl = await getAppCatalogUrl();
      if (!appCatalogUrl) {
        throw new Error("App catalog URL not available");
      }
      const property = await getTenantProperty(TENANT_PROPERTY_KEY);
      if (!property?.Value) {
        return [];
      }
      try {
        return JSON.parse(property.Value) || [];
      } catch (parseError) {
        logWarning(
          "getCreatedSchemaIds",
          "Failed to parse stored schema IDs, returning empty array:",
          JSON.stringify(parseError)
        );
        return [];
      }
    } catch (error) {
      logError(
        "getCreatedSchemaIds",
        "Failed to get created schema IDs from tenant properties:",
        JSON.stringify(error)
      );
      return [];
    }
  }, [getAppCatalogUrl, getTenantProperty]);

  // Save schema extension ID to SharePoint tenant properties
  const saveSchemaIdToTenantProperty = React.useCallback(
    async (schemaId: string): Promise<void> => {
      try {
        const appCatalogUrl = await getAppCatalogUrl();
        if (!appCatalogUrl) {
          throw new Error("App catalog URL not available");
        }

        logInfo(
          "saveSchemaIdToTenantProperty",
          `Saving schema extension ID ${schemaId} to SharePoint tenant properties`,
          { schemaId }
        );

        // Get current list of schema IDs
        const currentSchemaIds: ISchemaTenantProperty[] =
          await getCreatedSchemaIds();

        // Add the new schema ID if it doesn't already exist
        if (currentSchemaIds.some((item) => item.schemaId === schemaId)) {
          logInfo(
            "saveSchemaIdToTenantProperty",
            `Schema ID ${schemaId} already exists in tenant properties`,
            { schemaId }
          );
          return;
        }

        const updatedSchemaIds = [...currentSchemaIds, { schemaId: schemaId }];
        const schemaIdsJson = JSON.stringify(updatedSchemaIds);

        await updateTenantProperty(TENANT_PROPERTY_KEY, schemaIdsJson);

        logInfo(
          "saveSchemaIdToTenantProperty",
          `Saved schema ID ${schemaId} to tenant properties`,
          { schemaId }
        );
      } catch (error) {
        logError(
          "saveSchemaIdToTenantProperty",
          "Failed to save schema ID to tenant properties:",
          JSON.stringify(error)
        );

        throw new Error(
          "Unable to save schema ID to SharePoint tenant properties. App catalog access may be required."
        );
      }
    },
    [getCreatedSchemaIds]
  );

  /**
   * Remove a schema extension ID from SharePoint tenant properties
   */
  const removeSchemaIdFromTenantProperty = React.useCallback(
    async (schemaId: string): Promise<void> => {
      try {
        const appCatalogUrl = await getAppCatalogUrl();
        if (!appCatalogUrl) {
          throw new Error("App catalog URL not available");
        }

        logInfo(
          "removeSchemaIdFromTenantProperty",
          `Removing schema extension ID ${schemaId} from SharePoint tenant properties`
        );

        // Get current list of schema IDs
        const currentSchemaIds: ISchemaTenantProperty[] =
          await getCreatedSchemaIds();

        // Remove the ID
        const updatedSchemaIds = currentSchemaIds.filter(
          (id) => id.schemaId !== schemaId
        );
        if (updatedSchemaIds.length === currentSchemaIds.length) {
          logInfo(
            "removeSchemaIdFromTenantProperty",
            `Schema ID ${schemaId} was not found in tenant properties`
          );
          return;
        }
        if (updatedSchemaIds.length === 0) {
          // Remove the entire property by setting empty value
          await updateTenantProperty(TENANT_PROPERTY_KEY, "");
          logInfo(
            "removeSchemaIdFromTenantProperty",
            `Removed tenant property entirely as no schema IDs remain`
          );
        } else {
          // Update the property with remaining IDs
          const schemaIdsJson = JSON.stringify(updatedSchemaIds);
          await updateTenantProperty(TENANT_PROPERTY_KEY, schemaIdsJson);
          logInfo(
            "removeSchemaIdFromTenantProperty",
            `Updated tenant properties, removed schema ID ${schemaId}`
          );
        }
      } catch (error) {
        logError(
          "removeSchemaIdFromTenantProperty",
          "Failed to remove schema extension ID from tenant properties:",
          JSON.stringify(error)
        );

        throw new Error(
          "Unable to remove schema ID from SharePoint tenant properties."
        );
      }
    },
    [getCreatedSchemaIds]
  );

  /**
   * Create a new schema extension and save its ID to tenant properties
   */
  const createSchemaExtension = React.useCallback(
    async (
      schemaExtension: ISchemaExtensionCreateRequest
    ): Promise<ISchemaExtension> => {
      try {
        const client = await getGraphClient();
        const response = await client
          .api("/schemaExtensions")
          .post(schemaExtension);

        const createdSchema = response as ISchemaExtension;

        // Save the schema ID to tenant properties for future retrieval
        if (createdSchema.id) {
          await saveSchemaIdToTenantProperty(createdSchema.id);
        }
        return createdSchema;
      } catch (error) {
        throw handleGraphError(error, "create schema extension", {
          schemaExtensionId: schemaExtension.id,
          targetTypes: schemaExtension.targetTypes,
          propertiesCount: schemaExtension.properties.length,
        });
      }
    },
    [getGraphClient, handleGraphError, saveSchemaIdToTenantProperty]
  );

  // Get created schema extensions using tenant properties approach
  
  const getSchemaExtensions = React.useCallback(async (): Promise<
    ISchemaExtension[]
  > => {
    try {
      const storedIds = await getCreatedSchemaIds();
      if (storedIds.length === 0) {
        logInfo(
          "getSchemaExtensions",
          "No schema extension IDs found in tenant properties"
        );
        return [];
      }
      logInfo(
        "getSchemaExtensions",
        "Found schema extension IDs in tenant properties:",
        { storedIds: JSON.stringify(storedIds) }
      );
      // Fetch each schema extension by ID
      const client = await getGraphClient();
      const schemaExtensions: ISchemaExtension[] = [];
      for (const schema of storedIds) {
        try {
          const response = await client
            .api(`/schemaExtensions/${schema.schemaId}`)
            .get();

          schemaExtensions.push(response as ISchemaExtension);
        } catch (error) {
          logWarning(
            "getSchemaExtensions",
            `Failed to get schema extension ${schema.schemaId}:`,
            JSON.stringify(error)
          );
        }
      }
      logInfo("getSchemaExtensions", "Retrieved schema extensions:", {
        schemaExtensions,
      });
      return schemaExtensions;
    } catch (error) {
      logError(
        "getSchemaExtensions",
        "Failed to get schema extensions from storage:",
        JSON.stringify(error)
      );

      throw handleGraphError(error, "get schema extensions from storage");
    }
  }, [getGraphClient, handleGraphError]);

  // Get a specific schema extension by ID

  const getSchemaExtension = React.useCallback(
    async (id: string): Promise<ISchemaExtension> => {
      try {
        const client = await getGraphClient();
        const response = await client.api(`/schemaExtensions/${id}`).get();
        return response as ISchemaExtension;
      } catch (error) {
        throw handleGraphError(error, "get schema extension", {
          schemaExtensionId: id,
        });
      }
    },
    [getGraphClient, handleGraphError]
  );

  // Update a schema extension

  const updateSchemaExtension = React.useCallback(
    async (
      id: string,
      schemaExtension: Partial<ISchemaExtension>
    ): Promise<ISchemaExtension> => {
      try {
        const client = await getGraphClient();
        const response = await client
          .api(`/schemaExtensions/${id}`)
          .patch(schemaExtension);
        return response as ISchemaExtension;
      } catch (error) {
        throw handleGraphError(error, "update schema extension", {
          schemaExtensionId: id,
        });
      }
    },
    [getGraphClient, handleGraphError]
  );

  // Delete a schema extension and remove its ID from tenant properties
  const deleteSchemaExtension = React.useCallback(
    async (id: string): Promise<void> => {
      try {
        const client = await getGraphClient();
        await client.api(`/schemaExtensions/${id}`).delete();
        // Remove the schema ID from tenant properties
        await removeSchemaIdFromTenantProperty(id);
      } catch (error) {
        throw handleGraphError(error, "delete schema extension", {
          schemaExtensionId: id,
        });
      }
    },
    [getGraphClient, handleGraphError, removeSchemaIdFromTenantProperty]
  );

  return {
    createSchemaExtension,
    getSchemaExtensions,
    getSchemaExtension,
    updateSchemaExtension,
    deleteSchemaExtension,
    getCreatedSchemaIds,
    saveSchemaIdToTenantProperty,
    removeSchemaIdFromTenantProperty,
  };
};
