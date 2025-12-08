/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import * as strings from "ManageSchemaExtensionsWebPartStrings";

import {
  IGraphApplication,
  IGraphApplicationResults,
} from "../models/IGraphApplication";
import {
  ISchemaExtension,
  ISchemaExtensionCreateRequest,
} from "../models/ISchemaExtension";
import { useAppCatalog, useLogging } from "@spteck/m365-hooks";

import { BaseComponentContext } from "@microsoft/sp-component-base";
import { IAppValidationResult } from "../models/IAppValidationResult";
import { IGraphError } from "../models/IGraphError";
import { ISchemaTenantProperty } from "../models/ISchemaTeantProperty";
import { MSGraphClientV3 } from "@microsoft/sp-http";
import { useUtils } from "../utils/useUtils";

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
  // App validation method
  validateAppIdAndOwnership: (appId: string) => Promise<IAppValidationResult>;
}

const TENANT_PROPERTY_KEY = "ManageSchemaExtensionsCreatedSchemaIds";

export const useSchemaExtension = ({
  context,
}: IUseSchemaExtensionProps): IUseSchemaExtensionResult => {
  // Create Graph client
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

  // Initialize utils hook for retry functionality
  const { retryWithExponentialBackoff } = useUtils();

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
      let schemaIds: ISchemaTenantProperty[] = [];
      // Read the tenant property with retries (exponential backoff)
      await retryWithExponentialBackoff(
        async () => {
          const property = await getTenantProperty(TENANT_PROPERTY_KEY);
          if (!property?.Value) {
            schemaIds = [];
          }
          try {
            schemaIds = JSON.parse(property.Value) || [];
          } catch (parseError) {
            logWarning(
              "getCreatedSchemaIds",
              "Failed to parse stored schema IDs, returning empty array:",
              JSON.stringify(parseError)
            );
            schemaIds = [];
          }
        },
        3,
        1000,
        "getCreatedSchemaIdsd"
      );
      return schemaIds;
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

        await retryWithExponentialBackoff(
          async () => {
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

            const updatedSchemaIds = [
              ...currentSchemaIds,
              { schemaId: schemaId },
            ];
            const schemaIdsJson = JSON.stringify(updatedSchemaIds);

            await updateTenantProperty(TENANT_PROPERTY_KEY, schemaIdsJson);

            // Verify the save was successful
            const verifiedIds = await getCreatedSchemaIds();
            const wasSaved = verifiedIds.some(
              (item) => item.schemaId === schemaId
            );

            if (!wasSaved) {
              throw new Error(
                `Failed to verify schema ID ${schemaId} was saved to tenant properties`
              );
            }

            logInfo(
              "saveSchemaIdToTenantProperty",
              `Saved and verified schema ID ${schemaId} to tenant properties`,
              { schemaId }
            );
          },
          3,
          1000,
          `saveSchemaIdToTenantProperty for ${schemaId}`
        );

        logInfo(
          "saveSchemaIdToTenantProperty",
          `Successfully completed saving schema ID ${schemaId} to tenant properties`,
          { schemaId }
        );
      } catch (error) {
        logError(
          "saveSchemaIdToTenantProperty",
          "Failed to save schema ID to tenant properties after retries:",
          JSON.stringify(error)
        );

        throw new Error(
          "Unable to save schema ID to SharePoint tenant properties. App catalog access may be required."
        );
      }
    },
    [
      getCreatedSchemaIds,
      getAppCatalogUrl,
      updateTenantProperty,
      logInfo,
      logError,
      retryWithExponentialBackoff,
    ]
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

        await retryWithExponentialBackoff(
          async () => {
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
          },
          3,
          1000,
          `removeSchemaIdFromTenantProperty for ${schemaId}`
        );
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
    [
      getCreatedSchemaIds,
      getAppCatalogUrl,
      updateTenantProperty,
      logInfo,
      logError,
      retryWithExponentialBackoff,
    ]
  );

  /**
   * Create a new schema extension and save its ID to tenant properties
   */
  const createSchemaExtension = React.useCallback(
    async (
      schemaExtension: ISchemaExtensionCreateRequest
    ): Promise<ISchemaExtension> => {
      try {
        return await retryWithExponentialBackoff(
          async () => {
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
          },
          3,
          1000,
          `createSchemaExtension ${schemaExtension.id}`
        );
      } catch (error) {
        throw handleGraphError(error, "create schema extension", {
          schemaExtensionId: schemaExtension.id,
          targetTypes: schemaExtension.targetTypes,
          propertiesCount: schemaExtension.properties.length,
        });
      }
    },
    [
      getGraphClient,
      handleGraphError,
      saveSchemaIdToTenantProperty,
      retryWithExponentialBackoff,
    ]
  );

  // Get created schema extensions using tenant properties approach
  const getSchemaExtensions = React.useCallback(async (): Promise<
    ISchemaExtension[]
  > => {
    try {
      const storedIds = await getCreatedSchemaIds();
      if (!storedIds.length) {
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
      const schemaPromises = storedIds.map((schema) =>
        client.api(`/schemaExtensions/${schema.schemaId}`).get()
      );

      // Wait for all fetches to complete
      const results = await Promise.allSettled(schemaPromises);

      // Extract only successful results and log failures
      const schemaExtensions = results.reduce<ISchemaExtension[]>(
        (acc, result, index) => {
          if (result.status === "fulfilled") {
            acc.push(result.value as ISchemaExtension);
          } else {
            logWarning(
              "getSchemaExtensions",
              `Failed to fetch schema extension ${storedIds[index].schemaId}:`,
              JSON.stringify(result.reason)
            );
          }
          return acc;
        },
        []
      );

      logInfo("getSchemaExtensions", "Retrieved schema extensions:", {
        successCount: schemaExtensions.length,
        totalAttempted: storedIds.length,
        failedCount: storedIds.length - schemaExtensions.length,
      });

      return schemaExtensions;
    } catch (error) {
      logError(
        "getSchemaExtensions",
        "Failed to get schema extensions from storage:",
        JSON.stringify(error)
      );

      throw handleGraphError(
        error,
        "Failed to get schema extensions from storage"
      );
    }
  }, [getGraphClient, handleGraphError]);

  // Get a specific schema extension by ID

  const getSchemaExtension = React.useCallback(
    async (id: string): Promise<ISchemaExtension> => {
      try {
        return await retryWithExponentialBackoff(
          async () => {
            const client = await getGraphClient();
            const response = await client.api(`/schemaExtensions/${id}`).get();
            return response as ISchemaExtension;
          },
          3,
          1000,
          `getSchemaExtension ${id}`
        );
      } catch (error) {
        throw handleGraphError(error, "get schema extension", {
          schemaExtensionId: id,
        });
      }
    },
    [getGraphClient, handleGraphError, retryWithExponentialBackoff]
  );

  // Update a schema extension

  const updateSchemaExtension = React.useCallback(
    async (
      id: string,
      schemaExtension: Partial<ISchemaExtension>
    ): Promise<ISchemaExtension> => {
      try {
        return await retryWithExponentialBackoff(
          async () => {
            const client = await getGraphClient();
            const response = await client
              .api(`/schemaExtensions/${id}`)
              .patch(schemaExtension);
            return response as ISchemaExtension;
          },
          3,
          1000,
          `updateSchemaExtension ${id}`
        );
      } catch (error) {
        throw handleGraphError(error, "update schema extension", {
          schemaExtensionId: id,
        });
      }
    },
    [getGraphClient, handleGraphError, retryWithExponentialBackoff]
  );

  // Delete a schema extension and remove its ID from tenant properties
  const deleteSchemaExtension = React.useCallback(
    async (id: string): Promise<void> => {
      try {
        await retryWithExponentialBackoff(
          async () => {
            const client = await getGraphClient();
            await client.api(`/schemaExtensions/${id}`).delete();
            // Remove the schema ID from tenant properties
            await removeSchemaIdFromTenantProperty(id);
          },
          3,
          1000,
          `deleteSchemaExtension ${id}`
        );
      } catch (error) {
        throw handleGraphError(error, "delete schema extension", {
          schemaExtensionId: id,
        });
      }
    },
    [
      getGraphClient,
      handleGraphError,
      removeSchemaIdFromTenantProperty,
      retryWithExponentialBackoff,
    ]
  );

  // Validate if an app ID exists in Entra ID

  const validateAppIdAndOwnership = React.useCallback(
    async (appId: string): Promise<IAppValidationResult> => {
      try {
        if (!appId || !appId.trim()) {
          return {
            exists: false,

            error: strings.AppIdRequiredError,
          };
        }

        // Validate GUID format
        const guidRegex =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!guidRegex.test(appId.trim())) {
          return {
            exists: false,
            error: strings.AppIdInvalidFormatError,
          };
        }

        return await retryWithExponentialBackoff(
          async () => {
            const client = await getGraphClient();
            logInfo(
              "validateAppIdAndOwnership",
              `Validating if app ID ${appId} exists`
            );

            // Check if the application exists in Entra ID
            let application: IGraphApplication;
            try {
              const applicationResults = (await client
                .api(`/applications/`)
                .select("id,displayName,appId")
                .filter(`appId eq '${appId}'`)
                .get()) as IGraphApplicationResults;

              application = applicationResults.value?.[0];

              if (!application || !application.appId) {
                logWarning(
                  "validateAppIdAndOwnership",
                  `Application with ID ${appId} not found in Entra ID`
                );
                return {
                  exists: false,
                  error: strings.AppIdNotFoundError,
                };
              } else {
                logInfo(
                  "validateAppIdAndOwnership",
                  `Application found: ${application.displayName}`,
                  { appId, displayName: application.displayName }
                );
                return { exists: true, displayName: application.displayName };
              }
            } catch (appError: unknown) {
              const graphError = appError as IGraphError;
              // Check if it's a 404 (not found) or 403 (forbidden)
              if (
                graphError.code === "Request_ResourceNotFound" ||
                graphError.status === 404
              ) {
                logWarning(
                  "validateAppIdAndOwnership",
                  `Application with ID ${appId} not found in Entra ID`
                );
                return {
                  exists: false,
                  error: strings.AppIdNotFoundError,
                };
              } else if (
                graphError.code === "Forbidden" ||
                graphError.status === 403
              ) {
                logWarning(
                  "validateAppIdAndOwnership",
                  `Access denied when checking application ${appId}. User may not have permission to read applications.`
                );
                return {
                  exists: false,
                  error: strings.AppIdAccessDeniedError,
                };
              } else {
                throw appError;
              }
            }
          },
          3,
          1000,
          `validateAppIdAndOwnership ${appId}`
        );
      } catch (error) {
        logError(
          "validateAppIdAndOwnership",
          `Failed to validate app ID ${appId}:`,
          JSON.stringify(error)
        );

        return {
          exists: false,
          displayName: undefined,
          error: strings.AppIdValidationError,
        };
      }
    },
    [
      getGraphClient,
      context,
      logInfo,
      logWarning,
      logError,
      retryWithExponentialBackoff,
    ]
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
    validateAppIdAndOwnership,
  };
};
