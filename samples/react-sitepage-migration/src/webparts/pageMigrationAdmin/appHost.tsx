import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { PageMigrationAdmin } from './components/PageMigrationAdmin';
import { IPageMigrationAdminProps } from './components/IPageMigrationAdminProps';
import { GraphDiscoveryService } from '../../services/graph/GraphDiscoveryService';
import { Logger } from '../../services/logging/Logger';
import { AssetMigrationService } from '../../services/migration/AssetMigrationService';
import { PageMigrationOrchestrator } from '../../services/migration/PageMigrationOrchestrator';
import { PageNormalizationService } from '../../services/migration/PageNormalizationService';
import { PageTransformService } from '../../services/migration/PageTransformService';
import { ReportExportService } from '../../services/reporting/ReportExportService';
import { SharePointReportStorageService } from '../../services/reporting/SharePointReportStorageService';
import { SharePointPageService } from '../../services/sharepoint/SharePointPageService';
import { PageMigrationServices } from '../../hooks/usePageMigrationViewModel';
import { CompatibilityOverride } from '../../models/CompatibilityOverride';
import { ConflictMode } from '../../models/OperationalTypes';

export interface AppRenderOptions {
  readonly themeVariant?: IReadonlyTheme;
  readonly storageScope: string;
  readonly defaultPublishOnComplete: boolean;
  readonly defaultConflictMode: ConflictMode;
  readonly persistReports: boolean;
  readonly includePageTemplates: boolean;
  readonly reportStorageSiteUrl: string;
  readonly auditListName: string;
  readonly logListName: string;
}

export interface MigrationApp {
  render(domElement: HTMLElement, options: AppRenderOptions): void;
  setCompatibilityOverrides(overrides: ReadonlyArray<CompatibilityOverride>): void;
  cancelActiveRun(): void;
  provisionReportingLists(options: {
    readonly siteUrl: string;
    readonly auditListName: string;
    readonly logListName: string;
  }): Promise<void>;
  dispose(domElement: HTMLElement): void;
}

const buildServices = (
  context: WebPartContext,
  logger: Logger,
  compatibilityOverrides: ReadonlyArray<CompatibilityOverride>
): PageMigrationServices => {
  const sharePointPageService = new SharePointPageService(context, logger);
  const pageNormalizationService = new PageNormalizationService(compatibilityOverrides);
  const reportExportService = new ReportExportService();

  return {
    graphDiscoveryService: new GraphDiscoveryService(context, logger),
    sharePointPageService,
    pageNormalizationService,
    pageMigrationOrchestrator: new PageMigrationOrchestrator(
      sharePointPageService,
      pageNormalizationService,
      new AssetMigrationService(sharePointPageService, logger),
      new PageTransformService(),
      logger
    ),
    reportExportService,
    reportStorageService: new SharePointReportStorageService(
      sharePointPageService,
      reportExportService,
      logger
    ),
    logger
  };
};

export const createApp = (
  context: WebPartContext,
  logger: Logger,
  initialOverrides: ReadonlyArray<CompatibilityOverride>
): MigrationApp => {
  let services = buildServices(context, logger, initialOverrides);

  return {
    render(domElement: HTMLElement, options: AppRenderOptions): void {
      const element = React.createElement<IPageMigrationAdminProps>(PageMigrationAdmin, {
        services,
        ...options
      });
      ReactDom.render(element, domElement);
    },

    setCompatibilityOverrides(overrides: ReadonlyArray<CompatibilityOverride>): void {
      services.pageMigrationOrchestrator.cancelActiveRun();
      services = buildServices(context, logger, overrides);
    },

    cancelActiveRun(): void {
      services.pageMigrationOrchestrator.cancelActiveRun();
    },

    async provisionReportingLists(options): Promise<void> {
      await services.reportStorageService.provisionLists(
        options.siteUrl,
        options.auditListName,
        options.logListName
      );
    },

    dispose(domElement: HTMLElement): void {
      services.pageMigrationOrchestrator.cancelActiveRun();
      ReactDom.unmountComponentAtNode(domElement);
    }
  };
};
