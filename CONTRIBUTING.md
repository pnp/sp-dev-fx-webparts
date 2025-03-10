# Contribution Guidance 

If you'd like to contribute to this repository, please read the following guidelines. Contributors are more than welcome to share their learnings with others in this centralized location.

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

Remember that this repository is maintained by community members who volunteer their time to help. Be courteous and patient.

## Question or Problem?

Please do not open GitHub issues for general support questions as the GitHub list should be used for feature requests and bug reports. This way we can more easily track actual issues or bugs from the code and keep the general discussion separate from the actual code.

If you have questions about how to use SharePoint Framework or any of the provided samples, please use the following locations.

* [SharePoint Developer Space](http://aka.ms/SPPnP-Community) at http://techcommunity.microsoft.com
* [SharePoint Stack Exchange](http://sharepoint.stackexchange.com/) with 'spfx' tag
* Use our [Discord channel](https://discord.gg/HeAgMk8Y)

## Typos, Issues, Bugs and contributions

Whenever you are submitting any changes to the SharePoint repositories, please follow these recommendations.

* Always fork the repository to your own account before making your modifications
* Do not combine multiple changes to one pull request. For example, submit any samples and documentation updates using separate PRs
* If your pull request shows merge conflicts, make sure to update your local main to be a mirror of what's in the main repo before making your modifications
* If you are submitting multiple samples, please create a specific PR for each of them
* If you are submitting typo or documentation fix, you can combine modifications to single PR where suitable

## Sample Naming and Structure Guidelines

When you submit a new sample, please follow these guidelines:

* Each sample must be placed in a folder under the `samples` folder
* Your sample folder must include the following content:
    - Your solution's source code
    - An `assets` folder, containing screenshots
    - A `README.md` file
    - An `.nvmrc` file
* You must only submit samples for which you have the rights to share. Make sure that you asked for permission from your employer and/or clients before committing the code to an open-source repository, because once you submit a pull request, the information is public and _cannot be removed_.
* If your sample is a SharePoint Framework Extensions, please consider adding it to the [sp-dev-fx-extensions](https://github.com/pnp/sp-dev-fx-extensions) repository instead
* If your sample is an Adaptive Card Extension (ACE), consider adding it to the [sp-dev-fx-aces](https://github.com/pnp/sp-dev-fx-aces) repository instead.

### Sample Folder

* When submitting a new sample solution, please name the sample solution folder accordingly
* Folder should start by identifying JS library used - like `react-`, `angular-`, `knockout-`
* If you are not using any specific JS library, please use `js-` as the prefix for your sample
* Do not use words such as `sample`, `webpart` or `wp` in the folder or sample name - these are samples for client-side web parts repository
* If your solution is demonstrating multiple technologies, please use functional terms as the name for the solution folder
* Do not use period/dot in the folder name of the provided sample

### Source Code

* For security reasons, we do not accept pull requests containing `.sppkg` files. We only accept source code files for applications. 
* Make sure to place the root of your solution's source code in sample folder

### README.md

* You will need to have a `README.md` file for your contribution, which is based on [the provided template](../main/templates/README-template.md) under the `samples` folder. Please copy this template to your project and update it accordingly. Your `README.md` must be named exactly `README.md` -- with capital letters -- as this is the information we use to make your sample public.
* You will need to have a screenshot picture of your sample in action in the `README.md` file ("pics or it didn't happen"). The preview image must be located in the `assets` folder in the root of your sample folder.
    * All screen shots must be located in the `assets` folder. Do not point to your own repository or any other external source

> **NOTE:** It is called a "web part", not a "webpart". "WebPart" relates to the class.

#### Visitor stats image

* The README template contains a specific tracking image at the end of the file with an `img` element pointing to `https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/YOUR-SOLUTION-NAME`. This is a transparent image which is used to track how many visits each sample receives in GitHub.
* Update the image `src` attribute according with the repository name and folder information. For example, if your sample is named `react-todo` in the `samples` folder, you should update the `src` attribute to `https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-todo`
  * Update the image `src` attribute according with the repository name and folder information.

#### Contributors

* Make sure to list yourself as a contributor by adding a bullet to the **Contributors** list.
  * You should only point to your GitHub profile. If you want to provide your social media, employer, etc., please do so in your GitHub profile so it stays up-to-date in the future.
  * We'll override your contributor link when we process the pull request, so save yourself the trouble.
* If you prefer to not use social media or disclose your name, we'll still accept your sample, but we'll assume that you don't want us to promote your contribution on social media.
* For multiple authors, please provide one line per author
  > If you want all authors to be eligible for a badge through the [Community Recognition Program](https://pnp.github.io/recognitionprogram/), make sure to add `Co-authored-by:` in your commit message. For more information, please refer to GitHub's instruction on [Creating a commit with multiple authors](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors)

### Assets

* To help people make sense of your sample, make sure to always include at least one screenshot of your solution in action. People are more likely to click on a sample if they can preview it before installing it.
* Please provide a high-quality screenshot
* If possible, use a resolution of **1920x1080**
* You can add as many screen shots as you'd like to help users understand your sample without having to download it and install it.
* You can include animated images (such as `.gif` files), but you must provide at least one static `.png` file
    * There is no need to include the steps where you find your web part and add it to a page. Just get to the good stuff!
* Screen shot images must be located in the `assets` folder. We cannot accept links to images located outside of the repository.

> **NOTE:** We will not process pull requests for new samples without a screen shot

### .nvmrc

Each version of SPFx supports only a limited number of Node.js versions. To help others use your sample, please provide a `.nvmrc` file in the root of your solution.

* Create a new file with the name `.nvmrc` (including the dot at the beginning of the file name).
* Open the .`nvmrc` file in a text editor and specify the desired Node.js version. The version should be in the format `vMajor.Minor.Patch`. For example, if you want to use Node.js version 14.17.0, simply write `v14.17.0` in the file. Make sure there are no leading or trailing spaces in the file.
* Save the .nvmrc file in the root directory of your project.

> To generate this file automatically, you can use the following command:
>
>  ```shell
>  node -v > .nvmrc
>  ```
>
> If you use Windows, your automatically-generated `.nvmrc` may include invisible characters that may cause issues. To be sure, you can run the following command in PowerShell once your `.nvmrc` file is generated:
> 
> ```powershell
> [string]::Join( "`n", (gc .nvmrc)) | sc .nvmrc 
> ```

## Submitting Pull Requests

> If you aren't familiar with how to contribute to open-source repositories using GitHub, or if you find the instructions on this page confusing, [sign up](https://forms.office.com/Pages/ResponsePage.aspx?id=KtIy2vgLW0SOgZbwvQuRaXDXyCl9DkBHq4A2OG7uLpdUREZVRDVYUUJLT1VNRDM4SjhGMlpUNzBORy4u) for one of our [Sharing is Caring](https://pnp.github.io/sharing-is-caring/#pnp-sic-events) events. It's completely free, and we'll guide you through the process.


Here's a high-level process for submitting new samples or updates to existing ones.

1. Sign the Contributor License Agreement (see below)
2. Fork this repository [pnp/sp-dev-fx-webparts](https://github.com/pnp/sp-dev-fx-webparts) to your GitHub account
3. Create a new branch from the `main` branch for your fork for the contribution
4. Include your changes to your branch
5. Commit your changes using descriptive commit message * These are used to track changes on the repositories for monthly communications
6. Create a pull request in your own fork and target the `main` branch
7. Fill up the provided PR template with the requested details

Before you submit your pull request consider the following guidelines:

* Search [GitHub](https://github.com/pnp/sp-dev-fx-webparts/pulls) for an open or closed Pull Request
  which relates to your submission. You don't want to duplicate effort.
* Make sure you have a link in your local cloned fork to the [pnp/sp-dev-fx-webparts](https://github.com/pnp/sp-dev-fx-webparts):

  ```shell
  # check if you have a remote pointing to the Microsoft repo:
  git remote -v

  # if you see a pair of remotes (fetch & pull) that point to https://github.com/pnp/sp-dev-fx-webparts, you're ok... otherwise you need to add one

  # add a new remote named "upstream" and point to the Microsoft repo
  git remote add upstream https://github.com/pnp/sp-dev-fx-webparts.git
  ```

* Make your changes in a new git branch:

  ```shell
  git checkout -b your-sample-name main
  ```

* Ensure your fork is updated and not behind the upstream **sp-dev-fx-webparts** repo. Refer to these resources for more information on syncing your repo:
  * [GitHub Help: Syncing a Fork](https://help.github.com/articles/syncing-a-fork/)
  * [Keep Your Forked Git Repo Updated with Changes from the Original Upstream Repo](http://www.andrewconnell.com/blog/keep-your-forked-git-repo-updated-with-changes-from-the-original-upstream-repo)
  * For a quick cheat sheet:

    ```shell
    # assuming you are in the folder of your locally cloned fork....
    git checkout main

    # assuming you have a remote named `upstream` pointing official **sp-dev-fx-webparts** repo
    git fetch upstream

    # update your local main to be a mirror of what's in the main repo
    git pull --rebase upstream main

    # switch to your branch where you are working, say "react-taxonomypicker"
    git checkout react-taxonomypicker

    # update your branch to update it's fork point to the current tip of main & put your changes on top of it
    git rebase main
    ```

* Push your branch to GitHub:

  ```shell
  git push origin react-taxonomypicker
  ```

## Merging your Existing GitHub Projects with this Repository

If the sample you wish to contribute is stored in your own GitHub repository, you can use the following steps to merge it with this repository:

* Fork the `sp-dev-fx-webparts` repository from GitHub
* Create a local git repository

    ```shell
    md sp-dev-fx-webparts
    cd sp-dev-fx-webparts
    git init
    ```

* Pull your forked copy of `sp-dev-fx-webparts` into your local repository

    ```shell
    git remote add origin https://github.com/yourgitaccount/sp-dev-fx-webparts.git
    git pull origin main
    ```

* Pull your other project from GitHub into the `samples` folder of your local copy of `sp-dev-fx-webparts`

    ```shell
    git subtree add --prefix=samples/projectname https://github.com/yourgitaccount/projectname.git main
    ```

* Push the changes up to your forked repository

    ```shell
    git push origin main
    ```

## Signing the CLA

Before we can accept your pull requests you will be asked to sign electronically Contributor License Agreement (CLA), which is a pre-requisite for any contributions all PnP repositories. This will be one-time process, so for any future contributions you will not be asked to re-sign anything. After the CLA has been signed, our PnP core team members will have a look at your submission for a final verification of the submission. Please do not delete your development branch until the submission has been closed.

You can find Microsoft CLA from the following address - https://cla.microsoft.com.

Thank you for your contribution.

> Sharing is caring.

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/CONTRIBUTING.md" />