# Troubleshooting

The samples listed in this repository were built by the community over the years. During that time, the SharePoint Framework has continued to evolve.

Due to this, some samples were built using an older version of SPFx, which may or may not be compatible with your current development environment/SharePoint environment.

We understand it can get frustrating to get some of these samples working, and we definitely want to make this process easier.

If you're experiencing issues with the samples, these tips may help you.

If you still can't get the samples to work after following these steps, feel free to [open an issue](#Openanissue).

## Check the README.md

Every sample comes with an associated `README.md` file, which gives you detailed instructions on how to get started.

### SharePoint Version
Look for a section called **Used SharePoint Framework Version**, which will tell you whether the sample will build successfully on your workstation or not.

For example, if you have SPFx 1.10.0 installed on your workstation, samples marked with the following version tag should work:

![1.10.0](https://img.shields.io/badge/version-1.10.0-green.svg)

...while samples running an older version of SPFx may not:

![1.4.0](https://img.shields.io/badge/version-1.4.0-orange.svg)

Conversely, if you plan on using a sample in a SharePoint 2019 environment, you'll want to make sure to use only samples that run on SPFx ![1.4.1](https://img.shields.io/badge/1.4.1-orange.svg) or lower; SharePoint 2016 Feature Pack 2 will only work with ![1.1.0](https://img.shields.io/badge/1.0.0-orange.svg).

You can find more information about SPFx compatibility on the [Tools and libraries compatibility](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/compatibility) page on the [SharePoint Framework documentation](https://docs.microsoft.com/en-us/sharepoint/dev/spfx).

### Minimal Path to Awesome

For the majority of samples, you can get started by using `npm install`, followed by `gulp serve`.

However, some samples require more detailed steps before you can get started.

Make sure to read the **Minimal Path to Awesome** section of the **README.md** file associated with each sample to make sure that you follow all the required steps.

## Use SPFx Doctor

If you have any doubts whether your environment is properly configured to run a sample, we recommend you use the **[Office 365 CLI SPFx Doctor](https://pnp.github.io/office365-cli/cmd/spfx/doctor/)** to analyze your environment and the project for compatibility issues.

To use it, follow these steps:
1. If you haven't done so already, install Office 365 CLI on your workstation by using the following command:
    ```bash
    npm i -g @pnp/office365-cli
    ```
1. Change your current directory to the the solution's root directory
1. Launch the Office 365 CLI:
    ```bash
    office365
    ```
1. Run the `spfx doctor` command on the solution:
    ```bash
    spfx doctor
    ```

You can also verify if your environment is properly configured to work with your version of SharePoint by specifying the environment you wish to target with `--env`, followed by either `sp2016`, `sp2019`, or `spo`:

```bash
spfx doctor --env sp2019
```

## Upgrade the sample

If the version of the sample you want to use is not compatible with your SharePoint or SPFx version, you can try upgrading the sample to meet your needs.

We recommend that you use the **[Office 365 CLI SPFx Project Upgrade](https://pnp.github.io/office365-cli/cmd/spfx/project/project-upgrade/)** to analyze the project and give you detailed upgrade steps.

To do so, follow these steps:
1. If you haven't done so already, install Office 365 CLI on your workstation by using the following command:
    ```bash
    npm i -g @pnp/office365-cli
    ```
1. (Optional) install the [CodeTour](https://aka.ms/codetour) Visual Studio Code extension
1. Change your current directory to the the solution's root directory
1. Launch the Office 365 CLI:
    ```bash
    office365
    ```
1. If you installed CodeTour, run the `spfx doctor` command on the solution:
    ```bash
    spfx project upgrade --output tour
    ```
1. If you didn't install CodeTour, you can use `json`, `text`, or `md` as the `--output` parameter. For example, to produce a text report, you would use:
    ```bash
    spfx project upgrade --output text --outputFile "upgrade.txt"
    ```
1. If you installed CodeTour, you can open the project and launch the **Project upgrade** tour from the **CodeTour** pane and follow the steps. When prompted to type commands, you can simply click on the commands to run them in your Visual Studio Code terminal.
1. If you used another type of `--output`, open the file that was produced by the project upgrade analysis and follow the steps manually.

Note that you can also specify which version you wish to target by specifying a `--toVersion` parameter. For more information, visit the [project upgrade](https://pnp.github.io/office365-cli/cmd/spfx/project/project-upgrade/) on the [Office 365 CLI](https://pnp.github.io/office365-cli) site.

> If you have upgraded an older sample to the most current version of SPFx, feel free to create a pull request and share with the rest of the community. Follow the [contribution guidance](https://github.com/pnp/sp-dev-fx-webparts/blob/master/.github/CONTRIBUTING.md) if you have any questions.

## Open an issue
<div id="openanissue></div>

If -- after ensuring that your environment is compatible with the sample -- you still have difficulties using the sample, [open an issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new/choose) on our repository.

To ensure that we can help you, make sure that you fill the issue template that is provided. We'll automatically reject issues that do not use the issue template.

Make sure to include the results from **SPFx doctor** in your issue so that we can help you accordingly.

Keep in mind that the samples repository is maintained by members of the community who volunteer their time to help. Please be courteous and respectful, no matter how frustrated you may be!

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/docs/troubleshooting" />