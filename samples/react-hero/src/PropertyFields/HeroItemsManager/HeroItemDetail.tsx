import * as React from "react";
import {
  Textarea,
  Switch,
  Slider,
  RadioGroup,
  Radio,
  Divider,
  type SwitchOnChangeData,
  type SliderOnChangeData,
  type RadioGroupOnChangeData,
  tokens,
} from "@fluentui/react-components";
import {
  IHeroItem,
  HeroTextPosition,
  HeroMediaType,
  InputField,
  DropdownField,
  TypographyControl,
  StackV2,
} from "@spteck/react-controls-v2";
import { useHeroItemDetailStyles } from "./useHeroItemDetailStyles";
import {
  isStreamingUrl,
  normalizeVideoSrc,
  getStreamingEmbedUrl,
  isSharePointSharingLink,
} from "../../utils/useUtils";
import { TEXT_POSITION_OPTIONS, EMediaType } from "../../constants/constants";
import { IHeroItemDetailProps } from "../../models/IHeroItemDetailProps";
import strings from 'HeroWebPartStrings';

export const HeroItemDetail: React.FC<IHeroItemDetailProps> = ({
  item,
  onChange,
  resolveUrl,
}) => {
  const styles = useHeroItemDetailStyles();

  // Always-fresh ref so every handler always spreads the latest item,
  // even inside memoised useCallbacks with stable deps.
  const itemRef = React.useRef(item);
  itemRef.current = item;

  const update = React.useCallback(
    (partial: Partial<IHeroItem>): void => {
      onChange({ ...itemRef.current, ...partial });
    },
    [onChange],
  );

  const [urlResolving, setUrlResolving] = React.useState(false);
  const [titleEnabled, setTitleEnabled] = React.useState(() => !!item.title);

  const [srcInputValue, setSrcInputValue] = React.useState(item.src || "");

  // Sync titleEnabled AND srcInputValue when switching between items
  React.useEffect(() => {
    setTitleEnabled(!!item.title);
    setSrcInputValue(item.src || "");
  }, [item.id]);

  // On mount (or item switch): normalise YouTube variants and ensure all
  // streaming platform items (YouTube, Vimeo) use the plain-iframe path.
  React.useEffect(() => {
    if (item.mediaType !== EMediaType.Video || !item.src) return;
    const normalised = normalizeVideoSrc(item.src);
    const needsStreamingFix =
      isStreamingUrl(normalised) &&
      (item.autoPlay !== true || item.videoControls !== false);
    if (normalised !== item.src || needsStreamingFix) {
      onChange({
        ...item,
        src: normalised,
        autoPlay: true,
        videoControls: false,
      });
    }
  }, [item.id]); // run once per item, not on every render

  const resolveSharePointSrc = React.useCallback(
    async (raw: string): Promise<void> => {
      update({ src: raw });
      setUrlResolving(true);
      try {
        const resolved = await resolveUrl!(raw);
        update({ src: resolved });
        setSrcInputValue(resolved);
      } finally {
        setUrlResolving(false);
      }
    },
    [update, resolveUrl],
  );

  const handleSrcChange = React.useCallback(
    async (val: unknown): Promise<void> => {
      const raw = String(val);
      // Always update local display state first so the field never snaps back
      setSrcInputValue(raw);
      // Auto-resolve SharePoint sharing links for image fields
      if (
        resolveUrl &&
        itemRef.current.mediaType === EMediaType.Image &&
        isSharePointSharingLink(raw)
      ) {
        await resolveSharePointSrc(raw);
        return;
      }
      // Video URL handling — only normalise when the raw value is a
      // well-formed absolute URL (starts with http:// or https://).
      // Skipping normalisation for partial/in-progress edits prevents
      // the URL field from fighting the user's deletions.
      const isAbsolute = /^https?:\/\//i.test(raw);
      const src =
        itemRef.current.mediaType === EMediaType.Video && isAbsolute
          ? normalizeVideoSrc(raw)
          : raw;
      if (
        itemRef.current.mediaType === EMediaType.Video &&
        isStreamingUrl(src)
      ) {
        update({ src, autoPlay: true, videoControls: false });
      } else {
        update({ src });
      }
    },
    [update, resolveUrl, resolveSharePointSrc],
  );

  const handleMediaTypeChange = React.useCallback(
    (
      _: React.FormEvent<HTMLDivElement>,
      data: RadioGroupOnChangeData,
    ): void => {
      update({ mediaType: data.value as HeroMediaType });
    },
    [update],
  );

  const handleAltChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      update({ alt: e.target.value });
    },
    [update],
  );

  const handleTitleToggle = React.useCallback(
    (
      _: React.ChangeEvent<HTMLInputElement>,
      data: SwitchOnChangeData,
    ): void => {
      setTitleEnabled(data.checked);
      update({
        title: data.checked
          ? itemRef.current.title || strings.DefaultTileTitle
          : "",
      });
    },
    [update],
  );

  const handleTitleChange = React.useCallback(
    (val: unknown): void => {
      update({ title: String(val) });
    },
    [update],
  );

  const handleDescriptionChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      update({ description: e.target.value });
    },
    [update],
  );

  const handleCtaToggle = React.useCallback(
    (
      _: React.ChangeEvent<HTMLInputElement>,
      data: SwitchOnChangeData,
    ): void => {
      update({
        callToActionLabel: data.checked ? strings.DefaultCtaLabel : "",
      });
    },
    [update],
  );

  const handleCtaLabelChange = React.useCallback(
    (val: unknown): void => {
      update({ callToActionLabel: String(val) });
    },
    [update],
  );

  const handleCtaUrlChange = React.useCallback(
    (val: unknown): void => {
      update({ callToActionUrl: String(val) });
    },
    [update],
  );

  const handleTextPositionChange = React.useCallback(
    (val: unknown): void => {
      update({ textPosition: val as HeroTextPosition });
    },
    [update],
  );

  const handleOverlayOpacityChange = React.useCallback(
    (
      _: React.ChangeEvent<HTMLInputElement>,
      data: SliderOnChangeData,
    ): void => {
      update({ overlayOpacity: data.value });
    },
    [update],
  );

  const handleAutoPlayToggle = React.useCallback(
    (
      _: React.ChangeEvent<HTMLInputElement>,
      data: SwitchOnChangeData,
    ): void => {
      update({ autoPlay: data.checked });
    },
    [update],
  );

  const handleLoopToggle = React.useCallback(
    (
      _: React.ChangeEvent<HTMLInputElement>,
      data: SwitchOnChangeData,
    ): void => {
      update({ loop: data.checked });
    },
    [update],
  );

  const handleVideoControlsToggle = React.useCallback(
    (
      _: React.ChangeEvent<HTMLInputElement>,
      data: SwitchOnChangeData,
    ): void => {
      update({ videoControls: data.checked });
    },
    [update],
  );

  const showCTA = !!item.callToActionLabel;
  const isStreaming =
    item.mediaType === EMediaType.Video && isStreamingUrl(item.src || "");
  const streamingEmbed =
    item.mediaType === EMediaType.Video
      ? getStreamingEmbedUrl(item.src || "")
      : undefined;

  return (
    <StackV2 direction="vertical" gap="l" padding="m" className={styles.root}>
      {/* Media type */}
      <StackV2 direction="vertical" gap="xs">
        <TypographyControl
          fontSize="m"
          fontWeight="bold"
          className={styles.sectionTitle}
        >
          {strings.BackgroundMediaLabel}
        </TypographyControl>
        <RadioGroup value={item.mediaType} onChange={handleMediaTypeChange}>
          <Radio value={EMediaType.Image} label={strings.MediaTypeImageLabel} />
          <Radio value={EMediaType.Video} label={strings.MediaTypeVideoLabel} />
        </RadioGroup>
      </StackV2>

      {/* Source URL */}
      <StackV2 direction="vertical" gap="xs">
        {item.src && item.mediaType === EMediaType.Image && (
          <StackV2 className={styles.imagePreview}>
            <img className={styles.imagePreviewImg} src={item.src} alt="" />
          </StackV2>
        )}
        {/* Streaming preview */}
        {streamingEmbed && (
          <StackV2 className={styles.imagePreview}>
            <iframe
              className={styles.videoPreviewIframe}
              src={streamingEmbed}
              title={strings.VideoPreviewLabel}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </StackV2>
        )}
        {/* Direct file preview */}
        {item.src && item.mediaType === EMediaType.Video && !isStreaming && (
          <StackV2 className={styles.imagePreview}>
            <video
              className={styles.imagePreviewImg}
              src={item.src}
              muted
              preload="metadata"
              controls
            />
          </StackV2>
        )}
        <InputField
          label={
            item.mediaType === EMediaType.Video
              ? strings.VideoUrlLabel
              : strings.ImageUrlLabel
          }
          placeholder={
            item.mediaType === EMediaType.Video
              ? strings.VideoUrlPlaceholder
              : strings.ImageUrlPlaceholder
          }
          message={
            urlResolving
              ? strings.UrlResolvingMessage
              : !srcInputValue.trim()
                ? strings.MediaUrlRequiredMessage
                : undefined
          }
          messageType={
            urlResolving ? "info" : !srcInputValue.trim() ? "error" : undefined
          }
          readOnly={urlResolving}
          value={srcInputValue}
          onChange={handleSrcChange}
        />
      </StackV2>

      {/* Accessibility */}
      <StackV2 direction="vertical" gap="xs">
        <TypographyControl
          fontSize="m"
          fontWeight="semibold"
          className={styles.sectionTitle}
        >
          {strings.AccessibilityGroupLabel}
        </TypographyControl>
        <StackV2 direction="vertical" gap="xs">
          <TypographyControl as="span">
            {strings.AltTextLabel}
          </TypographyControl>
          <Textarea
            id={`alt-${item.id}`}
            placeholder={strings.AltTextPlaceholder}
            value={item.alt || ""}
            resize="vertical"
            onChange={handleAltChange}
          />
        </StackV2>
      </StackV2>

      <Divider />

      {/* Title */}
      <StackV2 direction="vertical" gap="xs">
        <StackV2
          direction="horizontal"
          justifyContent="space-between"
          alignItems="center"
          className={styles.toggleRow}
        >
          <TypographyControl as="span">{strings.HeaderLabel}</TypographyControl>
          <Switch checked={titleEnabled} onChange={handleTitleToggle} />
        </StackV2>
        {titleEnabled && (
          <InputField
            label={strings.HeaderTextLabel}
            placeholder={strings.HeaderTextPlaceholder}
            value={item.title || ""}
            onChange={handleTitleChange}
          />
        )}
      </StackV2>

      {/* Description */}
      <StackV2 direction="vertical" gap="xs">
        <TypographyControl as="span">
          {strings.DescriptionLabel}
        </TypographyControl>
        <Textarea
          id={`desc-${item.id}`}
          placeholder={strings.DescriptionPlaceholder}
          value={item.description || ""}
          resize="vertical"
          onChange={handleDescriptionChange}
        />
      </StackV2>

      <Divider />

      {/* Call to action */}
      <StackV2 direction="vertical" gap="xs">
        <StackV2
          direction="horizontal"
          justifyContent="space-between"
          alignItems="center"
          className={styles.toggleRow}
        >
          <TypographyControl as="span">
            {strings.ShowCtaLabel}
          </TypographyControl>
          <Switch checked={showCTA} onChange={handleCtaToggle} />
        </StackV2>
        {showCTA && (
          <StackV2 direction="vertical" gap="xs">
            <InputField
              label={strings.CtaTextLabel}
              placeholder={strings.DefaultCtaLabel}
              value={item.callToActionLabel || ""}
              onChange={handleCtaLabelChange}
            />
            <InputField
              label={strings.CtaLinkLabel}
              placeholder={strings.CtaLinkPlaceholder}
              value={item.callToActionUrl || ""}
              onChange={handleCtaUrlChange}
            />
          </StackV2>
        )}
      </StackV2>

      <Divider />

      {/* Text position */}
      <DropdownField
        label={strings.TextPositionLabel}
        options={TEXT_POSITION_OPTIONS}
        value={item.textPosition || "bottom-left"}
        onChange={handleTextPositionChange}
      />

      {/* Overlay opacity */}
      <StackV2 direction="vertical" gap="xs">
        <TypographyControl as="span">
          {strings.OverlayOpacityLabel}
        </TypographyControl>
        <StackV2
          direction="horizontal"
          alignItems="center"
          gap="s"
          className={styles.rangeRow}
        >
          <Slider
            min={0}
            max={1}
            step={0.05}
            value={item.overlayOpacity ?? 0.45}
            onChange={handleOverlayOpacityChange}
            style={{ flex: 1 }}
          />
          <TypographyControl as="span" className={styles.rangeValue}>
            {Math.round((item.overlayOpacity ?? 0.45) * 100)}%
          </TypographyControl>
        </StackV2>
      </StackV2>

      {/* Video options */}
      {item.mediaType === EMediaType.Video && (
        <>
          <Divider />
          <StackV2 direction="vertical" gap="xs">
            <TypographyControl
              as="span"
              fontWeight="semibold"
              className={styles.sectionTitle}
            >
              {strings.VideoOptionsLabel}
            </TypographyControl>
            {isStreaming && (
              <StackV2
                direction="vertical"
                gap="xs"
                padding="m"
                background={tokens.colorNeutralBackground3}
                paddingTop="6px"
                paddingBottom="8px"
                style={{
                  borderRadius: "4px",
                  borderLeft: `3px solid  ${tokens.colorBrandForeground1}`,
                }}
              >
                <TypographyControl as="span" fontSize="xs">
                  {strings.StreamingNoticeLabel}
                </TypographyControl>
              </StackV2>
            )}
            <StackV2
              direction="vertical"
              gap="xs"
              className={styles.videoOptionsGroup}
            >
              {!isStreaming && (
                <StackV2
                  direction="horizontal"
                  justifyContent="space-between"
                  alignItems="center"
                  className={styles.toggleRow}
                >
                  <TypographyControl as="span">
                    {strings.AutoplayLabel}
                  </TypographyControl>
                  <Switch
                    checked={!!item.autoPlay}
                    onChange={handleAutoPlayToggle}
                  />
                </StackV2>
              )}
              <StackV2
                direction="horizontal"
                justifyContent="space-between"
                alignItems="center"
                className={styles.toggleRow}
              >
                <TypographyControl as="span">
                  {strings.LoopLabel}
                </TypographyControl>
                <Switch checked={!!item.loop} onChange={handleLoopToggle} />
              </StackV2>
              {!isStreaming && (
                <StackV2
                  direction="horizontal"
                  justifyContent="space-between"
                  alignItems="center"
                  className={styles.toggleRow}
                >
                  <TypographyControl as="span">
                    {strings.ShowVideoControlsLabel}
                  </TypographyControl>
                  <Switch
                    checked={item.videoControls !== false}
                    onChange={handleVideoControlsToggle}
                  />
                </StackV2>
              )}
            </StackV2>
          </StackV2>
        </>
      )}
    </StackV2>
  );
};

HeroItemDetail.displayName = "HeroItemDetail";
