# Smart Table of Contents SPFx Web Part v1.0

This package contains the core files for a no-framework SharePoint Framework web part that builds a Word-style nested table of contents from headings on a modern SharePoint page.

## Build Pattern

Create the SPFx project first, then replace the generated web part files with the files in this package.

Recommended generator choices:

- Solution name: smart-table-of-contents
- Component type: WebPart
- Web part name: SmartTableOfContents
- Framework: No JavaScript framework

## Commands

```powershell
mkdir C:\Scripts\SPFx\smart-table-of-contents
cd C:\Scripts\SPFx\smart-table-of-contents
yo @microsoft/sharepoint
```

After the project is created, copy these files into:

```text
src\webparts\smartTableOfContents\
```

Then build:

```powershell
npm install --verbose
heft clean --verbose
heft build --verbose
heft bundle --ship --verbose
heft package-solution --ship --verbose
```

If your generated project still uses gulp commands, use:

```powershell
gulp clean --verbose
gulp build --verbose
gulp bundle --ship --verbose
gulp package-solution --ship --verbose
```

The finished package will be under:

```text
sharepoint\solution\*.sppkg
```

Upload that .sppkg to the tenant App Catalog.
