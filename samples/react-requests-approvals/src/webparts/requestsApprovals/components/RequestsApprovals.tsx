import * as React from "react";
import {
  Button,
  MessageBar,
  MessageBarBody,
  Spinner,
  Text,
  makeStyles
} from "@fluentui/react-components";

import type { IRequestsApprovalsProps } from "./IRequestsApprovalsProps";
import type { IRequestsApprovalsState } from "./IRequestsApprovalsState";
import RequestDetails from "./RequestDetails";

const useStyles = makeStyles({
  root: { display: "grid", gap: "16px" },
  content: {
    display: "grid",
    gap: "16px",
    gridTemplateColumns: "minmax(200px, 0.8fr) minmax(280px, 1.6fr)",
    alignItems: "start"
  },
  list: { listStyleType: "none", padding: 0, margin: 0, display: "grid", gap: "4px" },
  requestButton: { justifyContent: "flex-start", textAlign: "left", width: "100%" },
  status: { position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 },
  errorContent: { display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" },
  empty: { display: "grid", gap: "8px" },
  loading: { display: "flex", alignItems: "center", gap: "8px" }
});

function errorMessage(error: unknown): string {
  return error instanceof Error && error.message ? error.message : "Something went wrong. Please try again.";
}

export const RequestsApprovals: React.FC<IRequestsApprovalsProps> = ({ service, title }) => {
  const styles = useStyles();
  const [state, setState] = React.useState<IRequestsApprovalsState>({
    requests: [],
    selectedRequest: undefined,
    isLoading: true,
    isSaving: false,
    error: undefined,
    statusMessage: "Loading pending requests."
  });

  const loadRequests = React.useCallback(async (): Promise<boolean> => {
    setState(previous => ({
      ...previous,
      isLoading: true,
      error: undefined,
      statusMessage: "Loading pending requests."
    }));

    try {
      const requests = await service.getPendingRequests();
      setState(previous => ({
        ...previous,
        requests,
        selectedRequest: previous.selectedRequest
          ? requests.find(item => item.id === previous.selectedRequest?.id) || undefined
          : undefined,
        statusMessage: `${requests.length} pending request${requests.length === 1 ? "" : "s"} loaded.`
      }));
      return true;
    } catch (error) {
      setState(previous => ({
        ...previous,
        error: errorMessage(error),
        statusMessage: "Unable to load pending requests."
      }));
      return false;
    } finally {
      setState(previous => ({ ...previous, isLoading: false }));
    }
  }, [service]);

  React.useEffect(() => {
    loadRequests().catch(() => undefined);
  }, [loadRequests]);

  const decide = async (action: () => Promise<void>, successMessage: string): Promise<void> => {
    if (!state.selectedRequest || state.isSaving) {
      return;
    }

    setState(previous => ({
      ...previous,
      isSaving: true,
      error: undefined,
      statusMessage: "Saving decision."
    }));

    try {
      await action();
      const refreshed = await loadRequests();
      setState(previous => ({
        ...previous,
        statusMessage: refreshed ? successMessage : "Decision saved, but the request list could not be refreshed."
      }));
    } catch (error) {
      setState(previous => ({
        ...previous,
        error: errorMessage(error),
        statusMessage: "Unable to save the decision."
      }));
      throw error;
    } finally {
      setState(previous => ({ ...previous, isSaving: false }));
    }
  };

  const approve = async (): Promise<void> => {
    const request = state.selectedRequest;
    if (request) {
      await decide(() => service.approveRequest(request), "Request approved.");
    }
  };

  const reject = async (comment: string): Promise<void> => {
    const request = state.selectedRequest;
    if (request) {
      await decide(() => service.rejectRequest(request, comment), "Request rejected.");
    }
  };

  return (
    <main className={styles.root} aria-busy={state.isLoading}>
      <Text as="h1" weight="semibold">{title}</Text>
      <div className={styles.status} aria-live="polite" aria-atomic="true">{state.statusMessage}</div>

      {state.error && (
        <div role="alert" aria-live="assertive">
          <MessageBar intent="error">
            <MessageBarBody>
              <div className={styles.errorContent}>
                <Text>{state.error}</Text>
                <Button
                  onClick={() => {
                    loadRequests().catch(() => undefined);
                  }}
                  disabled={state.isLoading || state.isSaving}
                >
                  Retry
                </Button>
              </div>
            </MessageBarBody>
          </MessageBar>
        </div>
      )}

      {state.isLoading && state.requests.length === 0 && (
        <div className={styles.loading} role="status">
          <Spinner aria-label="Loading pending requests" />
          <Text>Loading pending requests…</Text>
        </div>
      )}

      {!state.isLoading && !state.error && state.requests.length === 0 && (
        <div className={styles.empty} role="status">
          <Text>No pending requests are assigned to you.</Text>
          <Button
            onClick={() => {
              loadRequests().catch(() => undefined);
            }}
          >
            Refresh
          </Button>
        </div>
      )}

      {state.requests.length > 0 && (
        <div className={styles.content}>
          <nav aria-label="Pending requests">
            <ul className={styles.list}>
              {state.requests.map(request => {
                const label = request.title || `Request ${request.id}`;
                const selected = state.selectedRequest?.id === request.id;
                return (
                  <li key={request.id}>
                    <Button
                      className={styles.requestButton}
                      appearance={selected ? "primary" : "subtle"}
                      onClick={() => setState(previous => ({ ...previous, selectedRequest: request }))}
                      aria-pressed={selected}
                      aria-label={`Select ${label}`}
                    >
                      {label}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </nav>
          <RequestDetails
            request={state.selectedRequest}
            isSaving={state.isSaving}
            onApprove={approve}
            onReject={reject}
          />
        </div>
      )}
    </main>
  );
};

export default RequestsApprovals;
