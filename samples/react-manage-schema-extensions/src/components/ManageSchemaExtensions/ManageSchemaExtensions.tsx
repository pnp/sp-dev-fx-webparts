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
import { ManageSchemaExtensionsControl } from "./ManageSchemaExtensionsControl";
import { Provider } from "jotai";
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

  const initialState = {
    ...props,
    isLoading: false,
    error: undefined,
  };

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
    return createV9Theme(theme as never);
  }, [themeString, theme, hasTeamsContext]);

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

  React.useEffect(() => {
    const loadInitialData = async (): Promise<void> => {
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
        // If user has only ManageWeb or FullMask, they lack sufficient permissions
        if (
          permissions.includes("ManageWeb") ||
          permissions.includes("FullMask")
        ) {
          setUserHasPermissions(false);
        } else {
          setUserHasPermissions(true);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : strings.LoadInitialDataError;
        setError(errorMessage);
        logError("Error loading initial data:", JSON.stringify(err));
      } finally {
        setIsLoadingData(false);
      }
    };
    loadInitialData().catch((err) =>
      logError("Failed to load initial data:", JSON.stringify(err))
    );
  }, [context]);

  const RenderContent = React.useCallback((): JSX.Element => {
    if (error) {
      return <ShowError message={error} />;
    }
    if (!userHasPermissions) {
      return <AccessInformation />;
    }
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
          <Provider>
            <HydrateAtoms initialValues={[[appGlobalStateAtom, initialState]]}>
              <RenderContent />
              <ToasterProvider />
            </HydrateAtoms>
          </Provider>
        </ErrorBoundary>
      </FluentProvider>
    </IdPrefixProvider>
  );
};

export default ManageSchemaExtensions;
