import type {
  HeftConfiguration,
  IHeftTaskSession,
  IHeftTaskPlugin,
  IHeftTaskRunHookOptions,
} from '@rushstack/heft';
import { FileSystem, JsonFile } from '@rushstack/node-core-library';
import * as semver from 'semver';
import * as path from 'path';

interface IVersionIncrementerPluginOptions {
  strategy?: 'major' | 'minor' | 'patch' | 'build';
  productionOnly?: boolean;
  updatePackageSolution?: boolean;
}

interface IPackageJson {
  version: string;
  [key: string]: any;
}

interface IPackageSolutionJson {
  solution: {
    version: string;
    [key: string]: any;
  };
  [key: string]: any;
}

const PLUGIN_NAME = 'version-incrementer-plugin';

export default class VersionIncrementerPlugin implements IHeftTaskPlugin<IVersionIncrementerPluginOptions> {
  public apply(
    taskSession: IHeftTaskSession,
    heftConfiguration: HeftConfiguration,
    pluginOptions?: IVersionIncrementerPluginOptions
  ): void {
    taskSession.hooks.run.tapPromise(PLUGIN_NAME, async (runOptions: IHeftTaskRunHookOptions) => {
      const logger = taskSession.logger;
      const projectRoot = heftConfiguration.buildFolderPath;

      // Default options
      const options: Required<IVersionIncrementerPluginOptions> = {
        strategy: pluginOptions?.strategy || 'patch',
        productionOnly: pluginOptions?.productionOnly !== false,
        updatePackageSolution: pluginOptions?.updatePackageSolution !== false,
      };

      // Check if this is a production build by checking parameters
      const isProductionBuild = (runOptions as any).production === true || taskSession.parameters.production;

      if (options.productionOnly && !isProductionBuild) {
        logger.terminal.writeVerboseLine(
          `[${PLUGIN_NAME}] Skipping version increment (not a production build)`
        );
        return;
      }

      logger.terminal.writeLine(`[${PLUGIN_NAME}] Starting version increment...`);

      try {
        // Read package.json
        const packageJsonPath = path.join(projectRoot, 'package.json');
        const packageJson: IPackageJson = await JsonFile.loadAsync(packageJsonPath);
        const currentVersion = packageJson.version;

        logger.terminal.writeLine(`[${PLUGIN_NAME}] Current version: ${currentVersion}`);

        // Calculate new version
        let newVersion: string;
        if (options.strategy === 'build') {
          // 'build' strategy: Only increment the 4th digit in package-solution.json
          // package.json stays the same
          newVersion = currentVersion;
          logger.terminal.writeLine(`[${PLUGIN_NAME}] Using 'build' strategy - package.json version unchanged`);
        } else {
          // Use semver for major, minor, patch
          const incrementedVersion = semver.inc(currentVersion, options.strategy);
          if (!incrementedVersion) {
            throw new Error(`Failed to increment version from ${currentVersion} using strategy: ${options.strategy}`);
          }
          newVersion = incrementedVersion;
          logger.terminal.writeLine(`[${PLUGIN_NAME}] New version: ${newVersion}`);
          
          // Update package.json
          packageJson.version = newVersion;
          await JsonFile.saveAsync(packageJson, packageJsonPath, {
            updateExistingFile: true,
          });
          logger.terminal.writeLine(`[${PLUGIN_NAME}] ✓ Updated: package.json`);
        }

        // Update package-solution.json if enabled
        if (options.updatePackageSolution) {
          const packageSolutionPath = path.join(projectRoot, 'config', 'package-solution.json');

          if (await FileSystem.existsAsync(packageSolutionPath)) {
            const packageSolutionJson: IPackageSolutionJson = await JsonFile.loadAsync(
              packageSolutionPath
            );

            const currentSolutionVersion = packageSolutionJson.solution.version;
            let solutionVersion: string;

            if (options.strategy === 'build') {
              // 'build' strategy: Increment only the 4th digit (revision)
              const parts = currentSolutionVersion.split('.');
              if (parts.length === 4) {
                const revision = parseInt(parts[3], 10) + 1;
                solutionVersion = `${parts[0]}.${parts[1]}.${parts[2]}.${revision}`;
              } else {
                // Fallback: add .1 if not 4 parts
                solutionVersion = `${currentSolutionVersion}.1`;
              }
            } else {
              // For major/minor/patch: Update first 3 digits, reset revision to 0
              const versionParts = newVersion.split('.');
              solutionVersion =
                versionParts.length >= 3
                  ? `${versionParts[0]}.${versionParts[1]}.${versionParts[2]}.0`
                  : `${newVersion}.0`;
            }

            packageSolutionJson.solution.version = solutionVersion;

            await JsonFile.saveAsync(packageSolutionJson, packageSolutionPath, {
              updateExistingFile: true,
            });
            logger.terminal.writeLine(
              `[${PLUGIN_NAME}] ✓ Updated: config/package-solution.json (${solutionVersion})`
            );
          } else {
            logger.terminal.writeWarningLine(
              `[${PLUGIN_NAME}] Warning: config/package-solution.json not found`
            );
          }
        }

        logger.terminal.writeLine(
          `[${PLUGIN_NAME}] Version increment completed successfully! 🎉`
        );
      } catch (error) {
        logger.terminal.writeErrorLine(
          `[${PLUGIN_NAME}] Error incrementing version: ${error}`
        );
        throw error;
      }
    });
  }
}
