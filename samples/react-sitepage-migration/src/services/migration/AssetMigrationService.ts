import { AssetReference } from '../../models/NormalizedPage';
import { AssetCopyResult } from '../../models/MigrationReport';
import { MigrationContext } from '../../models/OperationalTypes';
import { MigrationCancellationToken } from '../../utilities/CancellationToken';
import { ConcurrencyLimiter } from '../../utilities/ConcurrencyLimiter';
import { toMessage } from '../../utilities/ErrorSerialization';
import { OperationCancelledError } from '../../utilities/RetryHelper';
import {
  sanitizeFileName,
  sanitizeFolderName,
  toAbsoluteUrl,
  toDecodedServerRelativePath,
  toServerRelativePath
} from '../../utilities/UrlUtilities';
import { Logger } from '../logging/Logger';
import { ISharePointPageService } from '../sharepoint/ISharePointPageService';

const ASSET_CONCURRENCY = 3;

const sha256Hex = async (value: string | ArrayBuffer): Promise<string> => {
  const data = typeof value === 'string' ? new TextEncoder().encode(value) : new Uint8Array(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

export const buildAssetFolderName = async (pageName: string): Promise<string> => {
  const stem = pageName.replace(/\.aspx$/i, '');
  const sanitized = sanitizeFolderName(stem);
  const digest = await sha256Hex(stem.toLowerCase());
  return `${sanitized}-${digest.slice(0, 6)}`;
};

export class AssetMigrationService {
  private readonly _sharePointPageService: ISharePointPageService;
  private readonly _logger: Logger;

  public constructor(sharePointPageService: ISharePointPageService, logger: Logger) {
    this._sharePointPageService = sharePointPageService;
    this._logger = logger;
  }

  public async migrateAssets(
    context: MigrationContext,
    pageName: string,
    assets: ReadonlyArray<AssetReference>,
    cancellationToken?: MigrationCancellationToken
  ): Promise<ReadonlyArray<AssetCopyResult>> {
    if (assets.length === 0) {
      return [];
    }

    const targetSiteUrl = context.targetSite.webUrl;
    const sourceOrigin = new URL(context.sourceSite.webUrl).origin;

    if (context.dryRun) {
      const plannedFolder = toServerRelativePath(
        targetSiteUrl, 'SiteAssets', 'SitePages', await buildAssetFolderName(pageName)
      );
      return Promise.all(assets.map(async (asset) => ({
        sourceUrl: asset.absoluteSourceUrl,
        targetUrl: toAbsoluteUrl(
          targetSiteUrl, `${plannedFolder}/${await this.resolveTargetFileName(context, asset)}`
        ),
        fileName: asset.fileName,
        status: 'Planned',
        message: 'Dry run: the file would be copied to the destination.'
      } satisfies AssetCopyResult)));
    }

    let folderPath: string;
    try {
      folderPath = await this._sharePointPageService.ensureMigrationAssetFolder(
        targetSiteUrl,
        await buildAssetFolderName(pageName)
      );
    } catch (error) {
      this._logger.error('Could not prepare the asset folder; the page will be migrated without its assets.', {
        targetSiteUrl,
        pageName,
        error
      });
      const message = toMessage(error, 'Could not prepare the target asset folder.');
      return assets.map((asset) => ({
        sourceUrl: asset.absoluteSourceUrl,
        fileName: asset.fileName,
        status: 'Failed',
        message
      } satisfies AssetCopyResult));
    }

    const limiter = new ConcurrencyLimiter(ASSET_CONCURRENCY);

    return limiter.map(assets, async (asset) => {
      try {
        cancellationToken?.throwIfCancelled();
        return await this.migrateAsset(context, asset, folderPath, sourceOrigin);
      } catch (error) {
        if (error instanceof OperationCancelledError) {
          throw error;
        }

        this._logger.error('Asset migration failed.', { asset: asset.absoluteSourceUrl, error });
        return {
          sourceUrl: asset.absoluteSourceUrl,
          fileName: asset.fileName,
          status: 'Failed',
          message: toMessage(error, 'Unknown asset migration error.')
        } satisfies AssetCopyResult;
      }
    });
  }

  private async migrateAsset(
    context: MigrationContext,
    asset: AssetReference,
    folderPath: string,
    sourceOrigin: string
  ): Promise<AssetCopyResult> {
    const targetSiteUrl = context.targetSite.webUrl;
    const targetFileName = await this.resolveTargetFileName(context, asset);
    const targetServerRelativePath = `${folderPath}/${targetFileName}`;
    const targetUrl = toAbsoluteUrl(targetSiteUrl, targetServerRelativePath);

    const [existingFile, sourceFile] = await Promise.all([
      this._sharePointPageService.tryGetFileInfo(targetSiteUrl, targetServerRelativePath),
      this._sharePointPageService.tryGetFileInfo(
        context.sourceSite.webUrl,
        toDecodedServerRelativePath(asset.absoluteSourceUrl)
      )
    ]);
    const exists = !!existingFile;

    if (exists) {
      if (context.overwriteMode === 'Fail') {
        throw new Error(`Target asset already exists: ${targetServerRelativePath}`);
      }

      if (context.overwriteMode === 'Skip' || context.overwriteMode === 'Rename') {
        return {
          sourceUrl: asset.absoluteSourceUrl,
          targetUrl,
          fileName: targetFileName,
          status: 'Reused',
          message: context.overwriteMode === 'Skip'
            ? 'Existing target asset preserved because conflict mode is Skip.'
            : 'Identical asset already present in the target site.',
          sourceUniqueId: sourceFile?.UniqueId,
          targetUniqueId: existingFile?.UniqueId
        };
      }
    }

    const content = await this._sharePointPageService.downloadBinary(asset.absoluteSourceUrl, sourceOrigin);
    const uploaded = await this._sharePointPageService.uploadAsset(
      targetSiteUrl,
      folderPath,
      targetFileName,
      content,
      exists && context.overwriteMode === 'Replace'
    );

    return {
      sourceUrl: asset.absoluteSourceUrl,
      targetUrl: uploaded.url,
      fileName: targetFileName,
      status: exists ? 'Replaced' : 'Copied',
      sourceUniqueId: sourceFile?.UniqueId,
      targetUniqueId: uploaded.uniqueId
    };
  }

  private async resolveTargetFileName(context: MigrationContext, asset: AssetReference): Promise<string> {
    const safeName = sanitizeFileName(asset.fileName);
    if (context.overwriteMode !== 'Rename') {
      return safeName;
    }

    const digest = await sha256Hex(asset.absoluteSourceUrl.toLowerCase());
    return `${digest.slice(0, 12)}-${safeName}`;
  }
}
