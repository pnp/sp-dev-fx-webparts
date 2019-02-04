# PropertyPaneFilePicker

Mimics the out-the-box SharePoint file picker, but provides customizable features.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)

and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased/TODO]

- Improve support for files (vs. images)
- OneDrive lists should have a chevron on headers
- Site file picker: list browsing should support tile view.
- Little sev 3 bug when selecting folders in OneDrive where it quickly marks the file in the same 
  ordinal position as the folder as selected before folder is loaded.
- Test for mobile devices (and fix issues)
- Test for accessibility
- Fix other inconsistencies

## [1.0.0] - 2019-01-27

### Added

- PropertyPaneFilePicker: control to allow browsing from a property pane
- LinkFilePickerTab: allows users to enter a file by URL. Option to allow only files within same domain.
- RecentFilesTab: allows users to select a file from their recent files in SharePoint.
- SiteFilePickerTab: allows users to find files from within the current site.
- UploadFilePickerTab: allows users to upload a file.
- WebSearch: allows users to search Bing for files.
- OneDriveTab: allows users to select files from their OneDrive.
- Tile doesn't show hover border in recent files
- Add ability to enter bing API and store in tenant store
- Add ratio selector

### Changed

- No changes

### Deprecated

- Nothing deprecated

### Removed

- Nothing removed

### Fixed

- Nothing fixed

### Security

- No vulnerabilities fixed
