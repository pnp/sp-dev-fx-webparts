import * as core from '@actions/core';
import * as github from '@actions/github';
import * as fs from 'fs';
import * as path from 'path';
import { MessageTemplate, ValidationRules } from './ValidationRules';
import { minimatch } from 'minimatch';
import { getEventListeners } from 'events';

async function run() {
    try {
        const token = process.env.GITHUB_TOKEN;
        if (!token) {
            core.setFailed('GITHUB_TOKEN is not set');
            return;
        }
        const octokit = github.getOctokit(token);
        const { context } = github;
        const pr = context.payload.pull_request;
        if (!pr) {
            core.setFailed('This action only runs on pull requests.');
            return;
        }
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

        const skipValidation = labels.some(label => label.name === 'skip-validation');
        if (skipValidation) {
            core.info('Skipping validation due to "skip-validatation" tag.');
            return;
        }

        // Get list of files changed in the PR
        const { data: files } = await octokit.rest.pulls.listFiles({
            owner,
            repo,
            pull_number: prNumber,
        });

        // Read inputs
        const validationRulesFile = core.getInput('validationRulesFile');

        // Read validation rules from JSON file
        const validationRules: ValidationRules = JSON.parse(fs.readFileSync(validationRulesFile, 'utf8'));
        if (!validationRules) {
            core.setFailed('Validation rules not found.');
            return;
        }
        const samplesFolder = validationRules.contributionsFolder || 'samples';
        const affectsOnlyOneFolder = validationRules.limitToSingleFolder || false;
        const sampleFolderNameRule = validationRules.folderName;
        const acceptedPrefix = sampleFolderNameRule?.acceptedPrefixes || [];
        const messageTemplate = validationRules.messageTemplate;
        const requireVisitorStats = validationRules.requireVisitorStats || false;
        messageTemplate.validationSuccessSummary = messageTemplate.validationSuccessSummary || '## ✅ Validation status: success\n';
        messageTemplate.validationWarningSummary = messageTemplate.validationWarningSummary || '## ⚠️ Validation status: warnings\n';
        messageTemplate.ruleStatusSuccess = messageTemplate.ruleStatusSuccess || '✅ Succeeded';
        messageTemplate.ruleStatusWarning = messageTemplate.ruleStatusWarning || '⚠️ Warning';

        // Compose a message based on criteria results
        let message = '';
        let validationMessages = '';
        let hasIssues = false;

        core.info(`PR #${prNumber} has ${files.length} files changed.`);
        for (const file of files) {
            core.info(`- ${file.filename}`);
        }

        // Filter to files under "samples/"
        const sampleFiles = files.map(f => f.filename).filter(f => f.startsWith(`${samplesFolder}/`));
        core.info(`Changed ${sampleFiles.length} files under the "${samplesFolder}" folder.`);

        // Determine the sample folders (considering full path structure)
        const sampleFolders = new Set<string>();
        sampleFiles.forEach(filePath => {
            const relativePath = path.relative(samplesFolder, filePath);
            const parts = relativePath.split(path.sep);
            if (parts.length > 0) {
                sampleFolders.add(parts[0]);
            }
        });
        core.info(`Affected sample folders: ${Array.from(sampleFolders).join(', ')}`);

        // Verify that only one folder is affected
        if (affectsOnlyOneFolder) {
            // Check if there are any files outside the "samples/" folder
            const filesOutsideSamples = files.map(f => f.filename).filter(f => !f.startsWith(`${samplesFolder}/`));
            if (filesOutsideSamples.length > 0) {
                core.info(`Contains files outside the "${samplesFolder}" folder.`);
            }
            const onlyOneFolder = sampleFolders.size === 1 && filesOutsideSamples.length === 0;
            validationMessages += successStatus(`[${affectsOnlyOneFolder.ruleText}](${affectsOnlyOneFolder.ruleLink})`, onlyOneFolder, messageTemplate);
            if (!onlyOneFolder) {
                hasIssues = true;
            }
        }

        // Verify the sample folder name
        const sampleName = Array.from(sampleFolders)[0];
        const samplePath = path.join(samplesFolder, sampleName);
        core.info(`Sample folder: ${samplePath}`);

        if (sampleFolderNameRule) {
            // Make sure the sample is named correctly
            const isValidSampleName = acceptedPrefix.some(prefix => sampleName.startsWith(prefix));
            validationMessages += successStatus(`[${sampleFolderNameRule.ruleText}](${sampleFolderNameRule.ruleLink})`, isValidSampleName, messageTemplate);
            if (!isValidSampleName) {
                hasIssues = true;
            }
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

                        if (!hasImageTracker) {
                            hasIssues = true;
                        }
                        validationMessages += successStatus(`[${requireVisitorStats.ruleText}](${requireVisitorStats.ruleLink})`, hasImageTracker, messageTemplate);
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
            for (const { filePath, ruleText, ruleLink } of validationRules.fileRules) {
                const fullPath = path.join(samplesFolder, sampleName, filePath);
                const fileExists = sampleFiles.some(f => minimatch(f, fullPath));
                core.info(`${ruleText} exists: ${fileExists}`);
                validationMessages += successStatus(`[${ruleText}](${ruleLink})`, fileExists, messageTemplate);
                if (!fileExists) {
                    hasIssues = true;
                }
            }
        }

        // Replace {prNumber} in the message template title
        message += messageTemplate.title.replace('{prNumber}', prNumber.toString());
        message += `---\n`;
        if (messageTemplate.intro) {
            message += messageTemplate.intro ;  
        }

        core.info(`Validation issues: ${hasIssues}`);


        if (hasIssues) {
            message += messageTemplate.validationWarningSummary;
        } else {
            message += messageTemplate.validationSuccessSummary;
        }

        if (messageTemplate.issueSummary) {
        message += messageTemplate.issueSummary;
        }

        message += '\nValidation|Status\n';
        message += '---|---\n';
        message += validationMessages;
       
        if (hasIssues) {
            message += messageTemplate.warningMessage.replace('{author}', author);
        }

        core.info(message);

        // Post a comment to the PR with the results
        // await octokit.rest.issues.createComment({
        //     ...context.repo,
        //     issue_number: prNumber,
        //     body: message,
        // });
        core.info('Validation completed.');

    } catch (error: any) {
        core.setFailed(error.message);
    }
}

function successStatus(message: string, hasSuccess: boolean, messageTemplate: MessageTemplate): string {
    return `|${message}|${hasSuccess ? messageTemplate.ruleStatusSuccess : messageTemplate.ruleStatusWarning}|\n`;
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
