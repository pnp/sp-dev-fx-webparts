import * as React from "react";
import {
  Badge,
  Button,
  FluentProvider,
  IdPrefixProvider,
  MessageBar,
  MessageBarBody,
  Spinner,
  makeStyles,
  tokens
} from "@fluentui/react-components";
import {
  Checkmark16Regular,
  CheckmarkCircle16Filled,
  Flag16Regular,
  Warning16Filled
} from "@fluentui/react-icons";
import type { IPageTrustStripProps } from "./IPageTrustStripProps";
import { productName } from "../logic/productName";
import type { TrustStatus } from "../logic/trustStatus";
import { openRequestBadgeLabel, shouldShowOpenRequestBadge } from "../logic/openRequests";
import { FlagDialog } from "./FlagDialog";

const useStyles = makeStyles({
  root: {
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalS,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    borderTopWidth: tokens.strokeWidthThin,
    borderRightWidth: tokens.strokeWidthThin,
    borderBottomWidth: tokens.strokeWidthThin,
    borderLeftWidth: tokens.strokeWidthThin,
    borderTopStyle: "solid",
    borderRightStyle: "solid",
    borderBottomStyle: "solid",
    borderLeftStyle: "solid",
    borderTopColor: tokens.colorNeutralStroke1,
    borderRightColor: tokens.colorNeutralStroke1,
    borderBottomColor: tokens.colorNeutralStroke1,
    borderLeftColor: tokens.colorNeutralStroke1,
    borderRadius: tokens.borderRadiusMedium
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalS
  },
  facts: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalXS,
    margin: 0,
    minWidth: 0,
    flexGrow: 1
  },
  fact: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: tokens.spacingHorizontalXS,
    margin: 0,
    minWidth: 0
  },
  term: {
    margin: 0,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground2
  },
  detail: {
    margin: 0,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1
  },
  fallback: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground2
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS
  },
  heading: {
    margin: 0,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    fontWeight: tokens.fontWeightSemibold
  },
  copy: {
    margin: 0,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    maxWidth: "70ch"
  },
  live: {
    margin: 0,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200
  },
  liveHidden: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: 0,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    border: 0
  },
  openRequests: {
    display: "inline-flex",
    alignItems: "center",
    color: tokens.colorBrandForegroundLink,
    textDecorationLine: "underline",
    textDecorationColor: tokens.colorBrandForegroundLink,
    borderRadius: tokens.borderRadiusMedium,
    cursor: "pointer",
    ":focus-visible": {
      outlineStyle: "solid",
      outlineWidth: tokens.strokeWidthThick,
      outlineColor: tokens.colorStrokeFocus2
    }
  },
  duplicate: {
    margin: 0,
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground1,
    borderRadius: tokens.borderRadiusMedium,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300
  }
});

function errorText(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}

function statusLabel(status: TrustStatus): string {
  if (status === "current") {
    return "Current";
  }
  if (status === "stale") {
    return "Out of date";
  }
  return "Not confirmed";
}

function pageTrustPrefix(instanceId: string | undefined): string {
  const source = instanceId && instanceId.trim() ? instanceId.trim() : "webpart";
  const safe = source.replace(/[^A-Za-z0-9_-]/g, "");
  return `page-trust-${safe || "webpart"}-`;
}

export function PageTrustStrip(props: IPageTrustStripProps): React.ReactElement {
  const direction = typeof document !== "undefined" && document.documentElement && document.documentElement.dir === "rtl"
    ? "rtl"
    : "ltr";
  // IdPrefixProvider has to wrap FluentProvider so generated ids stay unique on the page.
  // useStyles runs in the child, where the provider's theme tokens exist.
  return (
    <IdPrefixProvider value={pageTrustPrefix(props.instanceId)}>
      <FluentProvider theme={props.theme} dir={direction} style={{ width: "100%" }}>
        <PageTrustStripView {...props} />
      </FluentProvider>
    </IdPrefixProvider>
  );
}

function PageTrustStripView(props: IPageTrustStripProps): React.ReactElement {
  const styles = useStyles();
  const [confirmBusy, setConfirmBusy] = React.useState(false);
  const [setupBusy, setSetupBusy] = React.useState(false);
  const [flagBusy, setFlagBusy] = React.useState(false);
  const [flagOpen, setFlagOpen] = React.useState(props.initialFlagOpen === true);
  const [flagNote, setFlagNote] = React.useState("");
  const [flagError, setFlagError] = React.useState<string | undefined>(undefined);
  const [actionError, setActionError] = React.useState<string | undefined>(undefined);
  const [liveMessage, setLiveMessage] = React.useState("");

  const onConfirm = (): void => {
    setConfirmBusy(true);
    setActionError(undefined);
    props.onConfirm().then(() => {
      setConfirmBusy(false);
      setLiveMessage("Marked as confirmed today.");
    }).catch((error: unknown) => {
      setConfirmBusy(false);
      setActionError(errorText(error, "The confirmation couldn't be saved."));
    });
  };

  const onSetup = (): void => {
    setSetupBusy(true);
    setActionError(undefined);
    props.onSetup().then(() => {
      setSetupBusy(false);
      setLiveMessage(`${productName} is set up.`);
    }).catch((error: unknown) => {
      setSetupBusy(false);
      setActionError(errorText(error, `${productName} couldn't be set up.`));
    });
  };

  const onSubmitFlag = (): void => {
    setFlagBusy(true);
    setFlagError(undefined);
    props.onSubmitFlag(flagNote).then(() => {
      setFlagBusy(false);
      setFlagOpen(false);
      setFlagNote("");
      setLiveMessage("Review request submitted.");
    }).catch((error: unknown) => {
      setFlagBusy(false);
      setFlagError(errorText(error, "The review request couldn't be saved."));
    });
  };

  const showStatus = props.placedOnPage && props.columnsReady && props.status !== "unavailable";
  const showSetup = props.placedOnPage && (!props.columnsReady || !props.listReady);
  const status = props.status === "unavailable" ? "unconfirmed" : props.status;
  const openCount = props.openRequestCount;
  const showOpenRequests = shouldShowOpenRequestBadge(
    props.canSeeOpenRequests === true,
    openCount,
    props.openRequestsUrl
  );
  const openLabel = showOpenRequests && typeof openCount === "number" ? openRequestBadgeLabel(openCount) : undefined;

  let body: React.ReactElement;
  if (props.loading) {
    body = <Spinner size="small" label={`Loading ${productName}`} />;
  } else if (!props.placedOnPage) {
    body = (
      <>
        <h2 className={styles.heading}>{productName}</h2>
        <p className={styles.copy}>
          {props.loadError
            ? `${productName} couldn't read this page. Try again. The banner shows the owner and review status on a modern site page.`
            : "Add this web part to the top of a modern SharePoint page to show the page owner and when the page was last confirmed."}
        </p>
      </>
    );
  } else if (!props.columnsReady) {
    body = (
      <>
        <h2 className={styles.heading}>{productName} isn&apos;t set up yet</h2>
        <p className={styles.copy}>
          {props.columnProblem
            ? props.columnProblem
            : "Setup adds a Page Owner column and a Last Confirmed column on the Site Pages library, and a Page Review Requests list on this site. It does not send email or change permissions. Letting visitors flag pages is in the web part properties."}
        </p>
        {props.canManageWeb ? (
          <div className={styles.actions}>
            <Button appearance="primary" onClick={onSetup} disabled={setupBusy}>
              {setupBusy ? "Setting up" : `Set up ${productName}`}
            </Button>
          </div>
        ) : (
          <p className={styles.copy}>
            A site owner needs to open this page and choose Set up {productName}.
          </p>
        )}
      </>
    );
  } else {
    body = (
      <>
        <div className={styles.row}>
          <Badge
            appearance="filled"
            color={status === "current" ? "success" : "warning"}
            icon={status === "current" ? <CheckmarkCircle16Filled /> : <Warning16Filled />}
          >
            {statusLabel(status)}
          </Badge>
          <dl className={styles.facts}>
            <div className={styles.fact}>
              <dt className={styles.term}>Page owner</dt>
              <dd className={styles.detail}>
                {props.ownerName || "Unknown"}
                {props.ownerIsAuthorFallback && (
                  <span className={styles.fallback}> Author (no owner set)</span>
                )}
              </dd>
            </div>
            <div className={styles.fact}>
              <dt className={styles.term}>Last confirmed</dt>
              <dd className={styles.detail}>{props.lastConfirmedText || "Not confirmed yet"}</dd>
            </div>
          </dl>
          <div className={styles.actions}>
            {props.canConfirm && (
              <Button
                appearance="primary"
                icon={<Checkmark16Regular />}
                onClick={onConfirm}
                disabled={confirmBusy}
              >
                {confirmBusy ? "Saving" : "Confirm still current"}
              </Button>
            )}
            <Button
              appearance="secondary"
              icon={<Flag16Regular />}
              onClick={() => {
                setFlagError(undefined);
                setFlagOpen(true);
              }}
              disabled={!props.listReady}
              aria-describedby={props.listReady ? undefined : `page-trust-${props.instanceId}-flag-note`}
            >
              This looks out of date
            </Button>
            {openLabel && props.openRequestsUrl && (
              <a className={styles.openRequests} href={props.openRequestsUrl}>
                <Badge appearance="tint" color="informative">
                  {openLabel}
                </Badge>
              </a>
            )}
          </div>
        </div>
        <p className={styles.copy}>
          {props.reviewDueText
            ? `Review every ${props.reviewPeriodDays} days. Due ${props.reviewDueText}.`
            : `Review every ${props.reviewPeriodDays} days.`}
        </p>
        {showSetup && (
          <p className={styles.copy} id={`page-trust-${props.instanceId}-flag-note`}>
            {props.canManageWeb
              ? "People can't flag this page until setup is finished."
              : `People can't flag this page yet. A site owner needs to finish ${productName} setup.`}
          </p>
        )}
        {showSetup && props.canManageWeb && (
          <div className={styles.actions}>
            <Button appearance="primary" onClick={onSetup} disabled={setupBusy}>
              {setupBusy ? "Setting up" : `Set up ${productName}`}
            </Button>
          </div>
        )}
      </>
    );
  }

  return (
    <IdPrefixProvider value={`page-trust-${props.instanceId}-`}>
      <FluentProvider theme={props.theme}>
        <section className={styles.root} aria-label={productName} aria-busy={props.loading}>
          {props.loadError && (
            <MessageBar intent="error">
              <MessageBarBody>
                {props.loadError}{" "}
                <Button appearance="transparent" onClick={props.onRetry}>Try again</Button>
              </MessageBarBody>
            </MessageBar>
          )}
          {actionError && (
            <MessageBar intent="error">
              <MessageBarBody>{actionError}</MessageBarBody>
            </MessageBar>
          )}
          {props.duplicateNote && (
            <p className={styles.duplicate} role="status">{props.duplicateNote}</p>
          )}
          {body}
          <p className={liveMessage ? styles.live : styles.liveHidden} role="status" aria-live="polite">{liveMessage}</p>
          {showStatus && (
            <FlagDialog
              open={flagOpen}
              busy={flagBusy}
              error={flagError}
              note={flagNote}
              onNoteChange={setFlagNote}
              onDismiss={() => {
                if (!flagBusy) {
                  setFlagOpen(false);
                  setFlagError(undefined);
                }
              }}
              onSubmit={onSubmitFlag}
            />
          )}
        </section>
      </FluentProvider>
    </IdPrefixProvider>
  );
}
