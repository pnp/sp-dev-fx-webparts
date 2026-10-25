import * as React from "react";
import {
  Button,
  Field,
  FluentProvider,
  IdPrefixProvider,
  MessageBar,
  MessageBarBody,
  Text,
  type Theme
} from "@fluentui/react-components";
import { visitorFlagEnabledText, visitorFlagExplanation, visitorFlagStopHint, visitorFlagStopLabel } from "../logic/visitorAccess";
import { productName } from "../logic/productName";

export interface IVisitorFlagPaneProps {
  instanceId: string;
  theme: Theme;
  canManage: boolean;
  listReady: boolean;
  placedOnPage: boolean;
  visitorsCanFlag: boolean;
  feedbackError?: string;
  feedbackSuccess?: string;
  onAllow: () => Promise<void>;
  onStop: () => Promise<void>;
}

function errorText(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}

function disabledReason(props: IVisitorFlagPaneProps): string | undefined {
  if (!props.placedOnPage) {
    return "Add this web part to a site page before letting visitors flag pages.";
  }
  if (!props.listReady) {
    return `Set up ${productName} before letting visitors flag pages.`;
  }
  if (!props.canManage) {
    return "You need to manage this site before visitors can be allowed to flag pages.";
  }
  return undefined;
}

export function VisitorFlagPane(props: IVisitorFlagPaneProps): React.ReactElement {
  const [busy, setBusy] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | undefined>(undefined);
  const mounted = React.useRef(true);
  const reason = disabledReason(props);
  const shownError = props.feedbackError || localError;
  const justEnabled = !!props.feedbackSuccess && props.feedbackSuccess.indexOf("can now flag") >= 0 && !shownError;
  const enabled = props.visitorsCanFlag || justEnabled;

  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const run = (action: () => Promise<void>, logLabel: string, fallback: string): void => {
    setBusy(true);
    setLocalError(undefined);
    action().then(() => {
      if (mounted.current) {
        setBusy(false);
      }
    }).catch((error: unknown) => {
      console.error(`[PageTrustStrip] ${logLabel} failed.`, error);
      if (mounted.current) {
        setBusy(false);
        setLocalError(errorText(error, fallback));
      }
    });
  };

  return (
    <IdPrefixProvider value={`page-trust-visitors-${props.instanceId}-`}>
      <FluentProvider theme={props.theme}>
        <Field label="Visitor flagging" hint={reason || "This changes the Page Review Requests list only."}>
          {enabled ? (
            <Text weight="semibold">{visitorFlagEnabledText}</Text>
          ) : (
            <Text size={200}>{visitorFlagExplanation}</Text>
          )}
          {enabled && !reason && (
            <Text size={200}>{visitorFlagStopHint}</Text>
          )}
          {!enabled && !reason && (
            <div>
              <Button appearance="primary" disabled={busy} onClick={() => run(props.onAllow, "let visitors flag pages", "Visitors couldn't be allowed to flag pages.")}>
                {busy ? "Updating list permissions" : "Let visitors flag pages"}
              </Button>
            </div>
          )}
          {enabled && !reason && (
            <div>
              <Button appearance="secondary" disabled={busy} onClick={() => run(props.onStop, "stop visitor flagging", "Visitor flagging couldn't be turned off.")}>
                {busy ? "Updating list permissions" : visitorFlagStopLabel}
              </Button>
            </div>
          )}
          {props.feedbackSuccess && !shownError && (
            <MessageBar intent="success">
              <MessageBarBody>{props.feedbackSuccess}</MessageBarBody>
            </MessageBar>
          )}
          {shownError && (
            <MessageBar intent="error">
              <MessageBarBody>{shownError}</MessageBarBody>
            </MessageBar>
          )}
        </Field>
      </FluentProvider>
    </IdPrefixProvider>
  );
}
