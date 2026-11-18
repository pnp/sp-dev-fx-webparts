import * as React from 'react';
import {
  Badge,
  Caption1,
  FluentProvider,
  IdPrefixProvider,
  ProgressBar,
  Spinner,
  Tab,
  TabList,
  Title3,
  makeStyles,
  tokens,
  webLightTheme,
  type Theme
} from '@fluentui/react-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as strings from 'UpcStrings';
import type { IServices } from '../services/createServices';
import { shouldRetryQuery } from '../services/util/queryRetry';
import { ServicesProvider, useServices } from '../contexts/ServicesContext';
import { SettingsProvider } from '../contexts/SettingsContext';
import { WizardProvider, isDraftDirty, useWizard } from '../contexts/WizardContext';
import { OffboardProvider, isOffboardDirty, useOffboard } from '../contexts/OffboardContext';
import { useAppRoles } from '../hooks/useReferenceData';
import { AppToasterProvider } from './Shared/AppToaster';
import { AppErrorBoundary } from './Shared/AppErrorBoundary';
import { PreflightBar } from './Preflight/PreflightBar';
import { JobsList } from './Jobs/JobsList';
import { OnboardingWizard } from './Onboarding/OnboardingWizard';
import { OffboardingWizard } from './Offboarding/OffboardingWizard';

const TransferPanel = React.lazy(() =>
  import(/* webpackChunkName: 'upc-transfer' */ './Transfer/TransferPanel').then((m) => ({
    default: m.TransferPanel
  }))
);
const BulkImport = React.lazy(() =>
  import(/* webpackChunkName: 'upc-bulk' */ './Bulk/BulkImport').then((m) => ({ default: m.BulkImport }))
);
const BulkOffboard = React.lazy(() =>
  import(/* webpackChunkName: 'upc-bulk-offboard' */ './Bulk/BulkOffboard').then((m) => ({
    default: m.BulkOffboard
  }))
);
const BulkTransfer = React.lazy(() =>
  import(/* webpackChunkName: 'upc-bulk-transfer' */ './Bulk/BulkTransfer').then((m) => ({
    default: m.BulkTransfer
  }))
);
const TasksList = React.lazy(() =>
  import(/* webpackChunkName: 'upc-tasks' */ './Tasks/TasksList').then((m) => ({ default: m.TasksList }))
);
const CatalogsPanel = React.lazy(() =>
  import(/* webpackChunkName: 'upc-catalogs' */ './Catalogs/CatalogsPanel').then((m) => ({
    default: m.CatalogsPanel
  }))
);
const TemplatesList = React.lazy(() =>
  import(/* webpackChunkName: 'upc-templates' */ './Templates/TemplatesList').then((m) => ({ default: m.TemplatesList }))
);
const SettingsPanel = React.lazy(() =>
  import(/* webpackChunkName: 'upc-settings' */ './Settings/SettingsPanel').then((m) => ({ default: m.SettingsPanel }))
);
const RolesPanel = React.lazy(() =>
  import(/* webpackChunkName: 'upc-roles' */ './Roles/RolesPanel').then((m) => ({ default: m.RolesPanel }))
);
const AuditLogPanel = React.lazy(() =>
  import(/* webpackChunkName: 'upc-audit' */ './Audit/AuditLogPanel').then((m) => ({ default: m.AuditLogPanel }))
);

const useStyles = makeStyles({
  root: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalL,
    width: '100%',
    containerType: 'inline-size'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXS
  },
  headerCaption: {
    color: tokens.colorNeutralForeground3
  },
  tabs: {
    borderBottomWidth: tokens.strokeWidthThin,
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorNeutralStroke2
  },
  progressSlot: {
    minHeight: '2px'
  },
  draftBadge: {
    marginLeft: tokens.spacingHorizontalXS
  }
});

type ShellTab =
  | 'dashboard'
  | 'newUser'
  | 'offboard'
  | 'transfer'
  | 'bulk'
  | 'bulkOffboard'
  | 'bulkTransfer'
  | 'tasks'
  | 'templates'
  | 'catalogs'
  | 'settings'
  | 'roles'
  | 'audit';

const DraftBadge: React.FC<{ className: string }> = ({ className }) => (
  <Badge className={className} appearance="tint" color="brand" size="small">
    {strings.TabDraftBadge}
  </Badge>
);

const Shell: React.FC = () => {
  const styles = useStyles();
  const [tab, setTab] = React.useState<ShellTab>('dashboard');
  const [isTabPending, startTabTransition] = React.useTransition();
  const { state: wizardState } = useWizard();
  const { state: offboardState } = useOffboard();
  const roles = useAppRoles();
  const services = useServices();
  const onRenderError = React.useCallback(
    (error: Error, info: React.ErrorInfo) =>
      services.telemetry.trackError(error, { componentStack: info.componentStack, scope: 'render' }),
    [services]
  );

  const onboardDraft: boolean = isDraftDirty(wizardState);
  const offboardDraft: boolean = isOffboardDirty(offboardState);
  const canCreateJobs: boolean = roles.data?.permissions.has('createJobs') ?? false;
  const canManageTemplates: boolean = roles.data?.permissions.has('manageTemplates') ?? false;
  const canManageTasks: boolean = roles.data?.permissions.has('manageTasks') ?? false;
  const canManageSettings: boolean = roles.data?.permissions.has('manageSettings') ?? false;
  const canManageDelegations: boolean = roles.data?.permissions.has('manageDelegations') ?? false;
  const canViewAudit: boolean = roles.data?.permissions.has('viewAudit') ?? false;
  const switchTab = (next: ShellTab): void => {
    startTabTransition(() => setTab(next));
  };
  const goToDashboard = (): void => switchTab('dashboard');

  return (
    <div className={styles.root}>
      <PreflightBar />
      <header className={styles.header}>
        <Title3 as="h2" block>
          {strings.AppTitle}
        </Title3>
        <Caption1 block className={styles.headerCaption}>
          {strings.AppDescription}
        </Caption1>
      </header>
      <div className={styles.tabs}>
        <TabList selectedValue={tab} onTabSelect={(_, data) => switchTab(data.value as ShellTab)} aria-label={strings.AppTitle}>
          <Tab value="dashboard">{strings.TabDashboard}</Tab>
          {canCreateJobs ? (
            <Tab value="newUser">
              {strings.TabNewUser}
              {onboardDraft ? <DraftBadge className={styles.draftBadge} /> : undefined}
            </Tab>
          ) : undefined}
          {canCreateJobs ? (
            <Tab value="offboard">
              {strings.TabOffboard}
              {offboardDraft ? <DraftBadge className={styles.draftBadge} /> : undefined}
            </Tab>
          ) : undefined}
          {canCreateJobs ? <Tab value="transfer">{strings.TabTransfer}</Tab> : undefined}
          {canCreateJobs ? <Tab value="bulk">{strings.TabBulk}</Tab> : undefined}
          {canCreateJobs ? <Tab value="bulkOffboard">{strings.TabBulkOffboard}</Tab> : undefined}
          {canCreateJobs ? <Tab value="bulkTransfer">{strings.TabBulkTransfer}</Tab> : undefined}
          {canManageTasks ? <Tab value="tasks">{strings.TabTasks}</Tab> : undefined}
          {canManageTemplates ? <Tab value="templates">{strings.TabTemplates}</Tab> : undefined}
          {canManageTemplates ? <Tab value="catalogs">{strings.TabCatalogs}</Tab> : undefined}
          {canManageSettings ? <Tab value="settings">{strings.TabSettings}</Tab> : undefined}
          {canManageSettings || canManageDelegations ? <Tab value="roles">{strings.TabRoles}</Tab> : undefined}
          {canViewAudit ? <Tab value="audit">{strings.TabAudit}</Tab> : undefined}
        </TabList>
      </div>
      <div className={styles.progressSlot}>{isTabPending ? <ProgressBar aria-label={strings.LoadingLabel} /> : undefined}</div>
      <AppErrorBoundary onError={onRenderError}>
        {tab === 'dashboard' ? <JobsList onCreateNew={() => switchTab('newUser')} /> : undefined}
        {tab === 'newUser' && canCreateJobs ? <OnboardingWizard onSubmitted={goToDashboard} /> : undefined}
        {tab === 'offboard' && canCreateJobs ? <OffboardingWizard onSubmitted={goToDashboard} /> : undefined}
        {tab === 'transfer' && canCreateJobs ? (
          <React.Suspense fallback={<Spinner aria-label={strings.LoadingLabel} />}>
            <TransferPanel onSubmitted={goToDashboard} />
          </React.Suspense>
        ) : undefined}
        {tab === 'bulk' && canCreateJobs ? (
          <React.Suspense fallback={<Spinner aria-label={strings.LoadingLabel} />}>
            <BulkImport onSubmitted={goToDashboard} />
          </React.Suspense>
        ) : undefined}
        {tab === 'bulkOffboard' && canCreateJobs ? (
          <React.Suspense fallback={<Spinner aria-label={strings.LoadingLabel} />}>
            <BulkOffboard onSubmitted={goToDashboard} />
          </React.Suspense>
        ) : undefined}
        {tab === 'bulkTransfer' && canCreateJobs ? (
          <React.Suspense fallback={<Spinner aria-label={strings.LoadingLabel} />}>
            <BulkTransfer onSubmitted={goToDashboard} />
          </React.Suspense>
        ) : undefined}
        {tab === 'tasks' && canManageTasks ? (
          <React.Suspense fallback={<Spinner aria-label={strings.LoadingLabel} />}>
            <TasksList />
          </React.Suspense>
        ) : undefined}
        {tab === 'templates' && canManageTemplates ? (
          <React.Suspense fallback={<Spinner aria-label={strings.LoadingLabel} />}>
            <TemplatesList />
          </React.Suspense>
        ) : undefined}
        {tab === 'catalogs' && canManageTemplates ? (
          <React.Suspense fallback={<Spinner aria-label={strings.LoadingLabel} />}>
            <CatalogsPanel />
          </React.Suspense>
        ) : undefined}
        {tab === 'settings' && canManageSettings ? (
          <React.Suspense fallback={<Spinner aria-label={strings.LoadingLabel} />}>
            <SettingsPanel />
          </React.Suspense>
        ) : undefined}
        {tab === 'roles' && (canManageSettings || canManageDelegations) ? (
          <React.Suspense fallback={<Spinner aria-label={strings.LoadingLabel} />}>
            <RolesPanel />
          </React.Suspense>
        ) : undefined}
        {tab === 'audit' && canViewAudit ? (
          <React.Suspense fallback={<Spinner aria-label={strings.LoadingLabel} />}>
            <AuditLogPanel />
          </React.Suspense>
        ) : undefined}
      </AppErrorBoundary>
    </div>
  );
};

export interface IAppProps {
  services: IServices;
  theme?: Theme;
  dir?: 'ltr' | 'rtl';
  instanceId?: string;
}

export const App: React.FC<IAppProps> = ({ services, theme, dir, instanceId }) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: shouldRetryQuery,
            refetchOnWindowFocus: false,
            networkMode: 'always'
          },
          mutations: { networkMode: 'always' }
        }
      })
  );
  return (
    <IdPrefixProvider value={`upc-${instanceId ?? 'app'}-`}>
      <FluentProvider theme={theme ?? webLightTheme} dir={dir ?? 'ltr'}>
        <QueryClientProvider client={queryClient}>
          <ServicesProvider services={services}>
            <SettingsProvider>
              <AppToasterProvider>
                <WizardProvider>
                  <OffboardProvider>
                    <Shell />
                  </OffboardProvider>
                </WizardProvider>
              </AppToasterProvider>
            </SettingsProvider>
          </ServicesProvider>
        </QueryClientProvider>
        <div id="upc-dialog-root" />
      </FluentProvider>
    </IdPrefixProvider>
  );
};
