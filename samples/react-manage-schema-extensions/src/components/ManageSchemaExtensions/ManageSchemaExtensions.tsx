import * as React from "react";
import * as strings from "ManageSchemaExtensionsWebPartStrings";

import {
  ErrorType,
  useAppCatalog,
  useAppToast,
  useLogging,
  useSharePointPermission,
} from "@spteck/m365-hooks";
import {
  FluentProvider,
  IdPrefixProvider,
  Theme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  tokens,
} from "@fluentui/react-components";

import { AccessInformation } from "../AccessInformation";
import { EAppHostName } from "../../constants";
import { ErrorBoundary } from "react-error-boundary";
import { IManageSchemaExtensionsProps } from "./IManageSchemaExtensionsProps";
import { Provider as JotaiProvider, } from "jotai";
import { ManageSchemaExtensionsControl } from "./ManageSchemaExtensionsControl";
import { ShowError } from "@spteck/react-controls";
import { appGlobalStateAtom } from "../../atoms/appGlobalState";
import { createV9Theme } from "@fluentui/react-migration-v8-v9";
import { useHydrateAtoms } from "jotai/utils";

const HydrateAtoms: React.FC<{
  initialValues: Array<[atom: unknown, value: unknown]>;
  children: React.ReactNode;
}> = ({ initialValues, children }) => {
  useHydrateAtoms(initialValues as never);
  return <>{children}</>;
};

const MANAGED_WEB = "manageWeb";
const FULL_MASK = "fullMask";

export const ManageSchemaExtensions: React.FunctionComponent<
  IManageSchemaExtensionsProps
> = (props: React.PropsWithChildren<IManageSchemaExtensionsProps>) => {
  const { themeString, theme, hasTeamsContext, context, appHostName } = props;
  const { logError } = useLogging();
  const { ToasterProvider } = useAppToast();
  const { checkPermissionsWithObjectId } = useSharePointPermission(
    context.spHttpClient
  );
  const { getAppCatalogUrl } = useAppCatalog(context);
  const [isLoadingData, setIsLoadingData] = React.useState(true);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [userHasPermissions, setUserHasPermissions] =
    React.useState<boolean>(false);

  // Initialize global state atom with props
  const initialState = {
    ...props,
    isLoading: false,
    error: undefined,
  };
  // Compute theme based on context and provided theme
  const computedTheme = React.useMemo<Partial<Theme>>(() => {
    if (hasTeamsContext) {
      switch (themeString) {
        case "dark":
          return teamsDarkTheme;
        case "contrast":
          return teamsHighContrastTheme;
        default:
          return { ...teamsLightTheme };
      }
    }
    // If not in Teams context, use the provided theme 
    return createV9Theme(theme as never);
  }, [themeString, theme, hasTeamsContext]);
  // Fallback render function for ErrorBoundary
  const fallbackRender = ({ error }: { error: Error }): React.ReactNode => {
    // Use console.error as fallback if logError is not available
    if (logError && typeof logError === "function") {
      try {
        logError(
          "ManageSchemaExtensions",
          "Error boundary caught an error in ManageSchemaExtensions component",
          error,
          ErrorType.SYSTEM,
          {
            themeString,
            hasTeamsContext,
            errorMessage: error.message,
            errorStack: error.stack,
          }
        );
      } catch (loggingError) {
        console.error("Logging error:", loggingError);
        console.error("Original error:", error);
      }
    } else {
      console.error("Error boundary caught an error:", error);
    }

    return <ShowError message={error.message} />;
  };

  const loadInitialData = React.useCallback(async (): Promise<void> => {
    try {
      setIsLoadingData(true);
      setError(undefined);
      // Check if user has permissions to manage schema extensions
      const appCatalogUrl = await getAppCatalogUrl();
      if (!appCatalogUrl) {
        throw new Error(strings.AppCatalogNotFoundError);
      }
      // Check permissions for managing tenant properties in the app catalog
      const permissions = await checkPermissionsWithObjectId(
        appCatalogUrl,
        "site",
        ""
      );
      // If user doesn't have manageWeb or fullMask, they lack sufficient permissions
      setUserHasPermissions(
        permissions.includes(MANAGED_WEB) || permissions.includes(FULL_MASK)
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : strings.LoadInitialDataError;
      setError(errorMessage);
      logError('loadInitialData', "Error loading initial data:", JSON.stringify(error));
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  React.useEffect(() => { 
    loadInitialData().catch((error) =>
      logError("Failed to load initial data:", JSON.stringify(error))
    );
  }, [props]);

  const RenderContent = React.useCallback((): JSX.Element => {
    // If there was an error loading initial data, show error
    if (error) {
      return <ShowError message={error} />;
    }
    // If user lacks permissions, show access information
    if (!userHasPermissions) {
      return <AccessInformation />;
    }
    // User has permissions and no errors - render main control
    return <ManageSchemaExtensionsControl {...props} />;
  }, [error, userHasPermissions, props]);

  // Wait for context and initial data to load
  if (!context || isLoadingData) {
    return <></>;
  }

  return (
    <IdPrefixProvider value="manage-schema-extensions">
      <FluentProvider
        theme={computedTheme}
        applyStylesToPortals={true}   
        style={{
          backgroundColor:
            appHostName === EAppHostName.SharePoint
              ? "transparent"
              : tokens.colorNeutralBackground1,
          paddingLeft: tokens.spacingHorizontalXXL,
          paddingRight: tokens.spacingHorizontalXXL,
          height: "100%",
        }} 
      >
        <ErrorBoundary fallbackRender={fallbackRender}>
          <JotaiProvider>
            <HydrateAtoms initialValues={[[appGlobalStateAtom, initialState]]}>
              <RenderContent />
              <ToasterProvider />
            </HydrateAtoms>
          </JotaiProvider>
        </ErrorBoundary>
      </FluentProvider>
    </IdPrefixProvider>
  );
};

export default ManageSchemaExtensions;
