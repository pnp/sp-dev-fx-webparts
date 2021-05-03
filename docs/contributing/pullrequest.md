---
title: Submitting a pull request
template: article.html
---

## Submitting Pull Requests

Here's a high level process for submitting new samples or updates to existing ones.

1. Sign the Contributor License Agreement (see below)
1. Fork the [SharePoint/sp-dev-fx-webparts](https://github.com/SharePoint/sp-dev-fx-webparts) repository to your GitHub account
1. Create a new branch off of the `master` branch for your fork for the contribution
1. Include your changes to your branch
1. Commit your changes using descriptive commit message * These are used to track changes on the repositories for monthly communications
1. Create a pull request in your own fork and target `dev` branch
1. Fill up the provided PR template with the requested details

Before you submit your pull request consider the following guidelines:

* Search [GitHub](https://github.com/SharePoint/sp-dev-fx-webparts/pulls) for an open or closed Pull Request
  that relates to your submission. You don't want to duplicate effort.
* Make sure you have a link in your local cloned fork to the [SharePoint/sp-dev-fx-webparts](https://github.com/SharePoint/sp-dev-fx-webparts):

```shell
  # check if you have a remote pointing to the Microsoft repo:
  git remote -v

  # if you see a pair of remotes (fetch & pull) that point to https://github.com/SharePoint/sp-dev-fx-webparts, you're ok... otherwise you need to add one

  # add a new remote named "upstream" and point to the Microsoft repo
  
  git remote add upstream https://github.com/SharePoint/sp-dev-fx-webparts.git
```

* Make your changes in a new git branch:

  ```shell
  git checkout -b react-taxonomypicker master
  ```

* Ensure your fork is updated and not behind the upstream **sp-dev-fx-webparts** repo. Refer to these resources for more information on syncing your repo:
  * [GitHub Help: Syncing a Fork](https://help.github.com/articles/syncing-a-fork/)
  * [Keep Your Forked Git Repo Updated with Changes from the Original Upstream Repo](http://www.andrewconnell.com/blog/keep-your-forked-git-repo-updated-with-changes-from-the-original-upstream-repo)
  * For a quick cheat sheet:

```shell
    # assuming you are in the folder of your locally cloned fork....
    git checkout master

    # assuming you have a remote named `upstream` pointing official **sp-dev-fx-webparts** repo
    git fetch upstream

    # update your local master to be a mirror of what's in the main repo
    git pull --rebase upstream master

    # switch to your branch where you are working, say "react-taxonomypicker"
    git checkout react-taxonomypicker

    # update your branch to update it's fork point to the current tip of master & put your changes on top of it
    git rebase master
```

* Push your branch to GitHub:

```shell
  git push origin react-taxonomypicker
```

## Merging your Existing Github Projects with the Samples Repository

If the sample you wish to contribute is stored in your own Github repository, you can use the following steps to merge it with the samples repository:

* Fork the `sp-dev-fx-webparts` repository from GitHub
* Create a local git repository

```shell
    md sp-dev-fx-webparts
    cd sp-dev-fx-webparts
    git init
```

* Pull your forked copy of sp-dev-fx-webparts into your local repository

```shell
    git remote add origin https://github.com/yourgitaccount/sp-dev-fx-webparts.git
    git pull origin dev
```

* Pull your other project from github into the samples folder of your local copy of sp-dev-fx-webparts

```shell
    git subtree add --prefix=samples/projectname https://github.com/yourgitaccount/projectname.git master
```

* Push the changes up to your forked repository

```shell
    git push origin dev
```

## Signing the CLA

Before we can accept your pull requests you will be asked to sign electronically Contributor License Agreement (CLA), which is prerequisite for any contributions to PnP repository. This will be one time process, so for any future contributions you will not be asked to re-sign anything. After the CLA has been signed, our PnP core team members will have a look on your submission for final verification of the submission. Please do not delete your development branch until the submission has been closed.

You can find Microsoft CLA from the following address - https://cla.microsoft.com. 

Thank you for your contribution.

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/docs/contributing/pullrequest" />