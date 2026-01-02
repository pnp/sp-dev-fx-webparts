---
title: Getting Started
type: "article"
description: Learn how to use the SharePoint Framework web parts and extensions and how to troubleshoot issues.
nometa: true
---


## Table of Contents

- [Table of Contents](#table-of-contents)
- [Where the samples live](#where-the-samples-live)
- [Using the samples](#using-the-samples)
  - [1) Clone the repository](#1-clone-the-repository)
  - [2) Go to the sample folder](#2-go-to-the-sample-folder)
  - [3) Use a compatible Node.js version (recommended)](#3-use-a-compatible-nodejs-version-recommended)
  - [4) Install dependencies](#4-install-dependencies)
  - [5) Run the sample](#5-run-the-sample)
- [Troubleshooting](#troubleshooting)
  - [1) Read the sample’s README.md](#1-read-the-samples-readmemd)
    - [Compatibility and supported environments](#compatibility-and-supported-environments)
    - [“Minimal Path to Awesome”](#minimal-path-to-awesome)
  - [2) Use SPFx Doctor (CLI for Microsoft 365)](#2-use-spfx-doctor-cli-for-microsoft-365)
  - [3) Open an issue](#3-open-an-issue)
- [What about pre-built solutions?](#what-about-pre-built-solutions)



These samples are created and maintained by the Microsoft 365 & Power Platform Community. They demonstrate common patterns and techniques for building **SharePoint Framework (SPFx)** client-side **web parts** and **extensions**.

If you prefer a walkthrough, watch the getting-started video:

[![Preview of getting started on consuming SharePoint development community sample solutions](http://img.youtube.com/vi/EH5voQlRd-4/0.jpg)](http://www.youtube.com/watch?v=EH5voQlRd-4 "Getting Started Using SPFx Samples")

## Where the samples live

The samples are stored in two GitHub repositories:

- Web parts: <https://github.com/pnp/sp-dev-fx-webparts>  
- Extensions: <https://github.com/pnp/sp-dev-fx-extensions>

Each sample lives in its own folder and includes a `README.md` explaining what it does, its requirements, and how to run it.

## Using the samples

At a high level you will:

1) clone the repository,  
2) choose a sample,  
3) make sure your Node.js / SPFx versions are compatible,  
4) install dependencies,  
5) start the dev server.

### 1) Clone the repository

Clone the repository that contains the sample you want:

```shell
git clone https://github.com/pnp/sp-dev-fx-webparts.git
```

or

```shell
git clone https://github.com/pnp/sp-dev-fx-extensions.git
```

Then change into the repo folder:

```shell
cd sp-dev-fx-webparts
```

or

```shell
cd sp-dev-fx-extensions
```

### 2) Go to the sample folder

Samples are under the `samples` directory. Navigate to the specific sample you want:

```shell
cd samples
cd sample-folder-name
```

(Replace `sample-folder-name` with the actual folder name of the sample.)

### 3) Use a compatible Node.js version (recommended)

SPFx versions require specific Node.js versions. To avoid constantly uninstalling/reinstalling Node, use a version manager:

- **NVS** (often preferred on Windows): <https://github.com/jasongin/nvs>  
- **NVM**: <https://github.com/nvm-sh/nvm>

Run the following command:

If using NVS:

```shell
nvs use
```

If using NVM:

```shell
nvm use
```

After switching Node versions, verify you’re using the expected version:

```shell
node -v
```

If you don’t use a version manager, consult the **SPFx Compatibility Matrix** to ensure your Node.js version matches the sample’s SPFx version:
<https://aka.ms/spfx-matrix>

### 4) Install dependencies

From the sample’s root folder, install packages:

```shell
npm install
```

### 5) Run the sample

Most SPFx samples are started with:

```shell
gulp serve
```

Some newer SPFx solutions may use Heft-based commands (depending on how the project is configured):

```shell
heft start
```

After starting, follow the console output to open the SharePoint Workbench or the hosted workbench and preview the web part/extension.

## Troubleshooting

These samples have been contributed over many years, across many SPFx and SharePoint versions. That means some samples target older toolchains and may not work in a modern environment without adjustments.

If you run into issues, try the steps below before opening an issue.

### 1) Read the sample’s README.md

Every sample includes a `README.md` with the most accurate, sample-specific setup instructions.

#### Compatibility and supported environments

Look for a **Compatibility** section (or similar) describing:

- the **SPFx version** the sample targets,
- whether it’s intended for **SharePoint Online** or an on-prem version,
- any special requirements (Node.js version, extra tooling, etc.).

Many samples include an SPFx version badge, for example:

![1.12.1](https://img.shields.io/badge/SPFx-1.12.1-green.svg)

If your environment targets a specific SharePoint version (for example, SharePoint Online vs. SharePoint Server), confirm the sample’s SPFx version is supported for that target. When in doubt, use Microsoft’s compatibility documentation:

- Tools and libraries compatibility: <https://learn.microsoft.com/sharepoint/dev/spfx/compatibility>  
- SPFx documentation hub: <https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview>

#### “Minimal Path to Awesome”

Most samples can be started with:

- `npm install`
- `gulp serve`

…but some require additional steps (extra certificates, environment variables, API keys, tenant configuration, or other prerequisites). Always follow the sample’s **Minimal Path to Awesome** section.

### 2) Use SPFx Doctor (CLI for Microsoft 365)

If you’re unsure whether your environment matches the sample’s requirements, run **SPFx Doctor** from the CLI for Microsoft 365:

<https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor>

Install the CLI (if you don’t already have it):

```shell
npm install -g @pnp/cli-microsoft365
```

From the sample’s solution root, run:

```shell
m365 spfx doctor
```

To check against a specific target environment, use `--env`:

```shell
m365 spfx doctor --env spo
```

or:

```shell
m365 spfx doctor --env sp2019
```

(or `sp2016` if that’s your target).

### 3) Open an issue

If you’ve confirmed the sample and your environment are compatible and it still won’t work, open an issue:

<https://github.com/pnp/sp-dev-fx-webparts/issues/new/choose>

Please fill out the provided issue template. Issues that do not use the template may be closed without investigation.

Include the output from **SPFx Doctor** (`m365 spfx doctor`) so maintainers can help you faster.

These repositories are maintained by community volunteers—please keep it courteous and constructive, even if you’re frustrated.

## What about pre-built solutions?

These samples are provided for educational purposes. They are not distributed as pre-built, deployable packages.

You’re welcome to build and deploy them in your own environment, but always follow your organization’s security policies and engineering guidelines.

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/docs/gettingstarted" />
