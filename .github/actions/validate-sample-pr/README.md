# @pnp/validate-sample-pr

Does a first pass validation of pull requests to eliminate back and forth between authors and maintainers on PnP sample repositories.

## Usage

### Input

```yaml
 -  name: Run Validate SPFx Sample PR Action
    uses: ./.github/actions/validate-sample-pr
    with:
        # JSON pointer to the pull request event
        # Use ${{ toJson(github.event.pull_request) }}
        # Required
        pr: 

        # GitHub token
        # Required
        gh-token:

        # The path to the rules JSON file
        # Optional. Default is:  .github/validate-sample-pr-rules.json
        validationRuleFile:

        # Wether or not to post comments
        # Optional. Default is 'true'.
        postComment: 
```

### Outputs

Produces a message within the pull request with validation results. Message content is customizable via a handlebars template.

![Example of a validation message](image.png)

You can also choose to receive the results of the analysis via the `results` output.

### Configuration

The first thing to to is to create a `CONTRIBUTING.md` file (if you haven't done so yet) and list out the rules, with details on each rule. Make sure that each rule has a bookmark so it can be refered to within the sample validation rules `.json`.

#### Example
Here is the rules configuration for the sp-dev-fx-webparts repo:

```json
{
    "contributionsFolder": "samples",
    "templateLines": [
        "Sample PR validation for #{{prNumber}}",
        "---",
        "",
        "{{#if hasIssues}}",
        "## ⚠️ Validation status: warnings",
        "{{else}}",
        "## ✅ Validation status: success",
        "{{/if}}",
        "",
        "We automatically validate all pull requests against our [contribution guidance](https://github.com/pnp/sp-dev-fx-webparts/blob/main/CONTRIBUTING.md) to ensure that all samples provide a consistent experience to our community.",
        "",
        "In order to merge this PR in a timely manner, the following criteria must be met:",
        "",
        "Validation|Status",
        "---|---",
        "{{#each validationResults}}",
        "[{{this.rule}}]({{this.href}})|{{#if this.success}}✅ Succeeded{{else}}⚠️ Warning{{/if}}",
        "{{/each}}",
        "",
        "{{#if hasIssues}}",
        "@{{author}} please address the above issues and push new changes to this branch.",
        "For more information, see the [contribution guidance](https://github.com/pnp/sp-dev-fx-webparts/blob/main/CONTRIBUTING.md).",
        "{{/if}}"
    ],
    "limitToSingleFolder": {
        "rule": "Pull request affects only one folder",
        "href": "https://github.com/pnp/sp-dev-fx-webparts/blob/main/CONTRIBUTING.md#typos-issues-bugs-and-contributions",
        "order": 1
    },
    "requireVisitorStats": {
        "rule": "README.md contains visitor stat image",
        "href": "https://github.com/pnp/sp-dev-fx-webparts/blob/main/CONTRIBUTING.md#visitor-stats-image",
        "order": 4
    },
    "folderName": {
        "rule": "Sample folder name follows naming convention",
        "href": "https://github.com/pnp/sp-dev-fx-webparts/blob/main/CONTRIBUTING.md#sample-folder",
        "acceptedPrefixes": [
            "react-", 
            "angular-", 
            "handlebarsjs-", 
            "jquery-", 
            "js-", 
            "knockout-", 
            "vue-", 
            "vuejs-"
        ],
        "order": 2
    },
    "fileRules": [
        {
            "require": ".nvmrc",
            "rule": "Sample requires a .nvmrc file",
            "href": "https://github.com/pnp/sp-dev-fx-webparts/blob/main/CONTRIBUTING.md#nvmrc",
            "order": 6
        },
        {
            "require": "README.md",
            "rule": "Sample requires a README.md",
            "href": "https://github.com/pnp/sp-dev-fx-webparts/blob/main/CONTRIBUTING.md#readmemd",
            "order": 3
        },
        {
            "require": "assets/*.png",
            "rule": "Sample requires a screenshot .png in assets folder",
            "href": "https://github.com/pnp/sp-dev-fx-webparts/blob/main/CONTRIBUTING.md#assets",
            "order": 5
        }
    ]
}
```

You can place it in the `.github` folder and name it `validate-sample-pr-rules.json` or anywhere else in your repo and specify the path with the `validationRuleFile` parameter when calling the workflow action.

TODO: Provide schema and explain the JSON structure.

## Future considerations

- [ ] Accept an array of glob filters for `contributionsFolder`
- [x] Add `order` parameter to rules to control the order in which rules are listed.
- [x] Add ability to create "forbidden" files or folder based on a glob filter (e.g.: `**\node_modules`)
- [ ] Add deep-dive validation of `README.md` files
- [x] Add ability to pass result back instead of creating a message
- [x] Add ability to specify Success and Warning statuses for results table
- [x] Add ability to specify a different message structure -- possibly with handlebars.
- [ ] Add support for extensible IRuleValidator