declare interface IHeroWebPartStrings {
  // ── Property pane ──────────────────────────────────────────────────────
  PropertyPaneDescription: string;
  LayoutGroupName: string;
  LayoutLabel: string;
  TilesGroupName: string;
  HeightLabel: string;
  BorderRadiusLabel: string;
  MosaicOverflowLabel: string;
  RotationEnabledLabel: string;
  RotationModeLabel: string;
  RotationIntervalLabel: string;

  // ── HeroItemDetail ─────────────────────────────────────────────────────
  BackgroundMediaLabel: string;
  MediaTypeImageLabel: string;
  MediaTypeVideoLabel: string;
  ImageUrlLabel: string;
  VideoUrlLabel: string;
  MediaUrlPlaceholder: string;
  ImageUrlPlaceholder: string;
  VideoUrlPlaceholder: string;
  MediaUrlRequiredMessage: string;
  UrlResolvingMessage: string;
  VideoPreviewLabel: string;
  AccessibilityGroupLabel: string;
  AltTextLabel: string;
  AltTextPlaceholder: string;
  HeaderLabel: string;
  HeaderTextLabel: string;
  HeaderTextPlaceholder: string;
  DefaultTileTitle: string;
  DescriptionLabel: string;
  DescriptionPlaceholder: string;
  ShowCtaLabel: string;
  DefaultCtaLabel: string;
  CtaTextLabel: string;
  CtaLinkLabel: string;
  CtaLinkPlaceholder: string;
  TextPositionLabel: string;
  OverlayOpacityLabel: string;
  VideoOptionsLabel: string;
  StreamingNoticeLabel: string;
  AutoplayLabel: string;
  LoopLabel: string;
  ShowVideoControlsLabel: string;

  // ── HeroItemRow ────────────────────────────────────────────────────────
  MoveUpLabel: string;
  MoveDownLabel: string;
  DeleteLabel: string;
  DragToReorderLabel: string;
  CollapseLabel: string;
  ExpandLabel: string;

  // ── HeroItemsManagerHost ───────────────────────────────────────────────
  AddTileLabel: string;

  // ── Empty state ────────────────────────────────────────────────────────
  EmptyStateTitleLabel: string;
  EmptyStateDescriptionLabel: string;
  EmptyStateConfigureAriaLabel: string;

  // ── Rotation ───────────────────────────────────────────────────────────
  RotationModeIntervalOption: string;
  RotationModeRefreshOption: string;

  // ── BorderRadius ───────────────────────────────────────────────────────
  BorderRadiusNoneOption: string;
  BorderRadiusSmallOption: string;
  BorderRadiusMediumOption: string;
  BorderRadiusLargeOption: string;
  BorderRadiusXLargeOption: string;
  BorderRadiusCircularOption: string;

  // ── MosaicOverflow ─────────────────────────────────────────────────────
  MosaicOverflowMarqueeOption: string;
  MosaicOverflowScrollOption: string;

  // ── Environment messages ───────────────────────────────────────────────
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;
}

declare module 'HeroWebPartStrings' {
  const strings: IHeroWebPartStrings;
  export = strings;
}
