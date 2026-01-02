# Changelog

All notable changes to PiCanvas will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.0] - 2026-01-02

### Changed
- Upgraded to SPFx 1.22.0 and RushStack Heft toolchain
- Replaced Gulp/fast-serve with Heft build-watch and webpack patches
- Updated TypeScript pipeline to match the SPFx 1.22 rig

### Fixed
- Updated jQuery import for esModuleInterop compatibility
- Normalized workbench manifest path to `/temp/build/manifests.js`

## [2.2.0] - 2024-12-15

### Added
- Permission-based tab visibility (restrict tabs to Owners, Members, Visitors, or custom groups)
- Placeholder option for permission-restricted tabs (show disabled tab with lock icon)
- Template system for saving and sharing tab configurations
- 6 built-in templates (Dashboard, Documentation, Team Site, etc.)
- Guest user support via Site Collection App Catalog deployment
- Tab dividers with gradient separators
- Colored glow effect option for active tabs

### Changed
- Complete property pane redesign with tabs-first organization
- Improved theme detection (3-tier: manual > SharePoint state > luminance)
- Better responsive behavior for vertical tabs

### Fixed
- Permission filtering not working on initial render
- 406 errors when checking permissions
- Await data before render for permission checks

## [2.1.0] - 2024-12-10

### Added
- Vertical tab orientation (left/right positioning)
- Responsive stacking for vertical tabs on mobile (<768px)
- 25+ CSS custom properties for deep customization
- Shadow options (none, subtle, medium, strong)
- Transition toggle for animations

### Changed
- Modernized codebase from Mark Rackley's original
- Updated to SPFx 1.21.1
- TypeScript strict mode enabled

## [2.0.0] - 2024-12-01

### Added
- Initial modernized release
- 4 tab styles: Default, Pills, Underline, Boxed
- 4 tab alignments: Left, Center, Right, Stretch
- Theme-aware styling (light/dark mode support)
- Web parts as tab labels
- Section grouping support
- Up to 20 configurable tabs

### Changed
- Complete rewrite based on Mark Rackley's "Modern Hillbilly Tabs"
- Modern TypeScript architecture
- Service-based design pattern

---

## Attribution

PiCanvas is a modernized version of [Modern Hillbilly Tabs](https://github.com/mrackley/Modern_Hillbilly_Tabs) by Mark Rackley (2021).
