import { ValidationResult } from './ValidationResult';
import * as core from '@actions/core';
import * as github from '@actions/github';
import * as fs from 'fs';
import * as path from 'path';
import { getInput } from "@actions/core";
import { ValidationRules } from './ValidationRules';
import { minimatch } from 'minimatch';
import handlebars from 'handlebars';

async function run() {
    try {
        const token = getInput("gh-token");
        if (!token) {
            core.setFailed('GITHUB_TOKEN is not set');
            return;
        }

        core.info('Got token');
        const octokit = github.getOctokit(token);
        core.info('Got oktokit');

        const { context } = github;
        const pr = context.payload.pull_request;
        if (!pr) {
            core.setFailed('This action only runs on pull requests.');
            return;
        }
        core.info('Got PR');
        const { owner, repo } = context.repo;
        const prNumber = pr.number;

        // Get the account name of the author of the PR
        const author = pr.user.login;
        core.info(`PR author: ${author}`);

        // Check for specific tag
        const { data: labels } = await octokit.rest.issues.listLabelsOnIssue({
            owner,
            repo,
            issue_number: prNumber,
        });
        core.info('Got labels');


        const skipValidation = labels.some(label => label.name === 'skip-validation');
        if (skipValidation) {
            core.info('Skipping validation due to "skip-validatation" tag.');
            return;
        }

        // Read inputs
        const validationRulesFile = core.getInput('validationRulesFile');

        // Post comments?
        const postComments = core.getInput('postComment') === 'true';

        // Read validation rules from JSON file
        const validationRules: ValidationRules = JSON.parse(fs.readFileSync(validationRulesFile, 'utf8'));
        if (!validationRules) {
            core.setFailed('Validation rules not found.');
            return;
        }
        core.info('Got rules');

        const samplesFolder = validationRules.contributionsFolder || 'samples';
        const affectsOnlyOneFolder = validationRules.limitToSingleFolder || undefined;
        const sampleFolderNameRule = validationRules.folderName;
        const acceptedPrefix = sampleFolderNameRule?.acceptedPrefixes || [];
        const requireVisitorStats = validationRules.requireVisitorStats || false;


        // const sourceRepo = pr!.head.repo.full_name;
        // const baseRepo = pr!.base.repo.full_name;

        // Get list of files changed in the PR
        const { data: files } = await octokit.rest.pulls
            .listFiles({
                owner: context.repo.owner,
                repo: context.repo.repo,
                pull_number: prNumber,
            });

        core.info('Got files');

        core.info(`PR #${prNumber} has ${files.length} files changed.`);
        for (const file of files) {
            core.info(`- ${file.filename}`);
        }

        // Filter to files under "samples/"
        const sampleFiles = files.map(f => f.filename).filter(f => f.startsWith(`${samplesFolder}/`));
        core.info(`Changed ${sampleFiles.length} files under the "${samplesFolder}" folder.`);

        // Determine the sample folders (considering full path structure)
        const sampleFolders = new Set<string>();
        sampleFiles.forEach(include => {
            const relativePath = path.relative(samplesFolder, include);
            const parts = relativePath.split(path.sep);
            if (parts.length > 0) {
                sampleFolders.add(parts[0]);
            }
        });
        core.info(`Affected sample folders: ${Array.from(sampleFolders).join(', ')}`);

        // Build validation messages
        const validationResults = new Array<ValidationResult>();
        // Verify that only one folder is affected
        if (affectsOnlyOneFolder) {
            // Check if there are any files outside the "samples/" folder
            const filesOutsideSamples = files.map(f => f.filename).filter(f => !f.startsWith(`${samplesFolder}/`));
            if (filesOutsideSamples.length > 0) {
                core.info(`Contains files outside the "${samplesFolder}" folder.`);
            }
            const onlyOneFolder = sampleFolders.size === 1 && filesOutsideSamples.length === 0;
            validationResults.push({
                success: onlyOneFolder,
                rule: affectsOnlyOneFolder.rule,
                href: affectsOnlyOneFolder.href,
                order: affectsOnlyOneFolder.order,
            });
        }

        // Verify the sample folder name
        const sampleName = Array.from(sampleFolders)[0];
        const samplePath = path.join(samplesFolder, sampleName);
        core.info(`Sample folder: ${samplePath}`);

        if (sampleFolderNameRule) {
            // Make sure the sample is named correctly
            const isValidSampleName = acceptedPrefix.some(prefix => sampleName.startsWith(prefix));
            validationResults.push({
                success: isValidSampleName,
                rule: sampleFolderNameRule.rule,
                href: sampleFolderNameRule.href,
                order: sampleFolderNameRule.order,
            });

            core.info(`Sample name is valid: ${isValidSampleName}`);
        }

        // Validate README.md content
        if (requireVisitorStats) {
            const readmeFile = sampleFiles.find(f => f === path.join(samplesFolder, sampleName, 'README.md'));
            const hasReadme = readmeFile !== undefined;
            var hasImageTracker = false;
            core.info(`README.md exists: ${hasReadme}`);
            if (hasReadme) {

                try {
                    const readmeContent = await getFileContent(octokit, owner, repo, readmeFile, pr.head.sha);
                    if (readmeContent) {
                        core.info(`README.md content: ${readmeContent}`);
                        const lines = readmeContent.split('\n');
                        hasImageTracker = lines.some(line => line.trim().startsWith('<img src="https://m365-visitor-stats.azurewebsites.net/'));
                        core.info(`Visitor stats image in README.md: ${hasImageTracker}`);

                        validationResults.push({
                            success: hasImageTracker,
                            rule: requireVisitorStats.rule,
                            href: requireVisitorStats.href,
                            order: requireVisitorStats.order,
                        });
                    } else {
                        core.warning(`Can't read README.md content.`);
                    }
                } catch (error) {
                    core.warning(`Error reading README.md: ${error}`);

                }
            }
        }

        // Validate files based on rules
        if (validationRules.fileRules) {
            for (const { require, forbid, rule, href, order } of validationRules.fileRules) {
                const pattern = require || forbid;
                const isExclude = !!forbid;
                if (!pattern) {
                    core.warning(`Invalid rule: ${rule}`);
                    continue;
                }
                const fullPath = path.join(samplesFolder, sampleName, pattern);
                const fileExists = sampleFiles.some(f => minimatch(f, fullPath));
                const isValid = isExclude ? !fileExists : fileExists;
                core.info(`${rule} exists: ${fileExists} valid: ${isValid}`);
                validationResults.push({
                    success: isValid,
                    rule,
                    href,
                    order
                });
            }
        }

        // Set hasIssues based on validationMessage items
        const hasIssues = validationResults.some(message => !message.success);

        const templateSource = validationRules.templateLines.join('\n');
        const template = handlebars.compile(templateSource);

        const data = {
            validationResults,
            hasIssues,
            prNumber,
            author
        };

        const message = template(data);

        if (postComments) {
            try {
                // Post a comment to the PR with the results
                await octokit.rest.issues.createComment({
                    ...context.repo,
                    issue_number: prNumber,
                    body: message,
                });
            } catch (error) {
                core.warning(`Error posting comment: ${error}`);
            }
        }
        core.setOutput('result', message);
        core.info('Validation completed and result output set.');

    } catch (error: any) {
        core.setFailed(error.message);
    }
}

async function getFileContent(octokit: any, owner: string, repo: string, path: string, ref: string): Promise<string | null> {
    try {
        const { data } = await octokit.rest.repos.getContent({
            owner,
            repo,
            path,
            ref,
        });

        if (data && 'content' in data) {
            const content = Buffer.from(data.content, 'base64').toString('utf8');
            return content;
        }
    } catch (error) {
        core.error(`Error fetching content from ${path}: ${error}`);
    }
    return null;
}

run();
