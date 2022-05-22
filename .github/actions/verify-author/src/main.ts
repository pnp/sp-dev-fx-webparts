import * as core from '@actions/core'
import { GitHubIssue } from './GitHubIssue'

async function run(): Promise<void> {
    try {
        const issue: string = core.getInput('issue')
        core.debug(`Got issue: ${issue}  ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

        const gitHubIssue: GitHubIssue  = JSON.parse(issue);
        core.debug(`Got issue body: ${gitHubIssue.body} ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

        const bodySections: Array<string> = gitHubIssue.body.split("### ");
        core.debug(`Got issue body lines: ${JSON.stringify(bodySections)} ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

        const bodyArray: { [key: string]: string } = {};
        bodySections.forEach(section => {
            // Split the section into header and content            
            const sectionParts: Array<string> = section.split("\n\n", 2);
            if (sectionParts.length === 2 && sectionParts[0] !== "") {
                bodyArray[sectionParts[0]] = sectionParts[1];
                core.debug(`Section Part: '${sectionParts[0]}': '${sectionParts[1]}'`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
            }
        });

        core.setOutput('authors', bodyArray['Author(s)']);
        if (bodyArray['Author(s)'].indexOf('@') > -1) {
            core.setOutput('valid-authors',bodyArray['Author(s)']);
        } else {
            core.setOutput('valid-authors',"");
        }
        
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
    }
}

run()