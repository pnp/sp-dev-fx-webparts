import * as React from 'react';
import { Stack, TooltipHost, Slider, Dropdown, IDropdownOption, TextField, Toggle, Label, ColorPicker, IColor, MessageBar, MessageBarType, IStackTokens, Separator } from '@fluentui/react';
import { QRDotType, QRCornerSquareType, QRCornerDotType, IQRStyleOptions, IQRFrameOptions } from '../types/QRStyleTypes';
import * as strings from 'QrCodeWebPartStrings';

const stackTokens: IStackTokens = { childrenGap: 15 };

export interface IQRStyleControlsProps {
  qrSize: number;
  errorLevel: 'L' | 'M' | 'Q' | 'H';
  logoUrl: string;
  includeMargin: boolean;
  foregroundColor: string;
  backgroundColor: string;
  onSizeChange: (value: number) => void;
  onErrorLevelChange: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => void;
  onLogoUrlChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
  onIncludeMarginChange: (ev: React.MouseEvent<HTMLElement>, checked?: boolean) => void;
  onForegroundColorChange: (_ev: React.SyntheticEvent<HTMLElement>, color: IColor) => void;
  onBackgroundColorChange: (_ev: React.SyntheticEvent<HTMLElement>, color: IColor) => void;
  styleOptions: IQRStyleOptions;
  frameOptions: IQRFrameOptions;
  onStyleOptionsChange: (options: IQRStyleOptions) => void;
  onFrameOptionsChange: (options: IQRFrameOptions) => void;
}

export const QRStyleControls: React.FunctionComponent<IQRStyleControlsProps> = (props) => {
  const {
    qrSize,
    errorLevel,
    logoUrl,
    includeMargin,
    foregroundColor,
    backgroundColor,
    onSizeChange,
    onErrorLevelChange,
    onLogoUrlChange,
    onIncludeMarginChange,
    onForegroundColorChange,
    onBackgroundColorChange,
    styleOptions,
    frameOptions,
    onStyleOptionsChange,
    onFrameOptionsChange
  } = props;

  const errorLevelOptions: IDropdownOption[] = [
    { key: 'L', text: strings.ErrorCorrectionLow },
    { key: 'M', text: strings.ErrorCorrectionMedium },
    { key: 'Q', text: strings.ErrorCorrectionQuartile },
    { key: 'H', text: strings.ErrorCorrectionHigh }
  ];

  const _getRelativeLuminance = (color: string): number => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    const rsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const bsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
  };

  const _renderContrastWarning = (): JSX.Element | null => {
    const fgLum = _getRelativeLuminance(foregroundColor);
    const bgLum = _getRelativeLuminance(backgroundColor);
    const ratio = (Math.max(fgLum, bgLum) + 0.05) / (Math.min(fgLum, bgLum) + 0.05);

    if (ratio < 3) {
      return (
        <MessageBar messageBarType={MessageBarType.severeWarning}>
          {strings.ContrastError.replace('{0}', ratio.toFixed(2))}
        </MessageBar>
      );
    }
    if (ratio < 4.5) {
      return (
        <MessageBar messageBarType={MessageBarType.warning}>
          {strings.ContrastWarning.replace('{0}', ratio.toFixed(2))}
        </MessageBar>
      );
    }
    return (
      <MessageBar messageBarType={MessageBarType.success}>
        {strings.ContrastSuccess.replace('{0}', ratio.toFixed(2))}
      </MessageBar>
    );
  };

  return (
    <Stack tokens={stackTokens}>
      <TooltipHost content={strings.SizeHelpLabel}>
        <Slider
          label={strings.SizeLabel.replace('{0}', qrSize.toString())}
          min={128}
          max={512}
          step={32}
          value={qrSize}
          onChange={onSizeChange}
          showValue={false}
        />
      </TooltipHost>

      <TooltipHost content={strings.ErrorCorrectionHelpLabel}>
        <Dropdown
          label={strings.ErrorCorrectionLabel}
          selectedKey={errorLevel}
          options={errorLevelOptions}
          onChange={onErrorLevelChange}
        />
      </TooltipHost>

      <TooltipHost content={strings.LogoUrlHelpLabel}>
        <TextField
          label={strings.LogoUrlLabel}
          value={logoUrl}
          onChange={onLogoUrlChange}
          placeholder={strings.LogoUrlPlaceholder}
        />
      </TooltipHost>

      <TooltipHost content={strings.IncludeMarginHelpLabel}>
        <Toggle
          label={strings.IncludeMarginLabel}
          checked={includeMargin}
          onChange={onIncludeMarginChange}
        />
      </TooltipHost>

      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <Stack styles={{ root: { flex: 1 } }}>
          <Label>{strings.ForegroundColorLabel}</Label>
          <ColorPicker
            color={foregroundColor}
            onChange={onForegroundColorChange}
            alphaType="none"
            showPreview={true}
            styles={{ root: { maxWidth: 300 } }}
          />
        </Stack>
        <Stack styles={{ root: { flex: 1 } }}>
          <Label>{strings.BackgroundColorLabel}</Label>
          <ColorPicker
            color={backgroundColor}
            onChange={onBackgroundColorChange}
            alphaType="none"
            showPreview={true}
            styles={{ root: { maxWidth: 300 } }}
          />
        </Stack>
      </Stack>

      {_renderContrastWarning()}

      <Separator>{strings.AdvancedStylingTitle}</Separator>

      <TooltipHost content={strings.DotPatternHelpLabel}>
        <Dropdown
          label={strings.DotPatternLabel}
          selectedKey={styleOptions.dotType}
          options={[
            { key: QRDotType.Square, text: strings.PatternSquare },
            { key: QRDotType.Rounded, text: strings.PatternRounded },
            { key: QRDotType.Dots, text: strings.PatternDots },
            { key: QRDotType.ExtraRounded, text: strings.PatternExtraRounded }
          ]}
          onChange={(_, option) => onStyleOptionsChange({ ...styleOptions, dotType: option?.key as QRDotType })}
        />
      </TooltipHost>

      <TooltipHost content={strings.CornerSquareStyleHelpLabel}>
        <Dropdown
          label={strings.CornerSquareStyleLabel}
          selectedKey={styleOptions.cornerSquareType}
          options={[
            { key: QRCornerSquareType.Square, text: strings.PatternSquare },
            { key: QRCornerSquareType.Rounded, text: strings.PatternRounded },
            { key: QRCornerSquareType.ExtraRounded, text: strings.PatternExtraRounded },
            { key: QRCornerSquareType.Dot, text: strings.PatternDot }
          ]}
          onChange={(_, option) => onStyleOptionsChange({ ...styleOptions, cornerSquareType: option?.key as QRCornerSquareType })}
        />
      </TooltipHost>

      <TooltipHost content={strings.CornerDotStyleHelpLabel}>
        <Dropdown
          label={strings.CornerDotStyleLabel}
          selectedKey={styleOptions.cornerDotType}
          options={[
            { key: QRCornerDotType.Square, text: strings.PatternSquare },
            { key: QRCornerDotType.Dot, text: strings.PatternDot }
          ]}
          onChange={(_, option) => onStyleOptionsChange({ ...styleOptions, cornerDotType: option?.key as QRCornerDotType })}
        />
      </TooltipHost>

      <Separator>{strings.FrameOptionsTitle}</Separator>

      <Toggle
        label={strings.EnableFrameLabel}
        checked={frameOptions.enabled}
        onChange={(_, checked) => onFrameOptionsChange({ ...frameOptions, enabled: !!checked })}
      />

      {frameOptions.enabled && (
        <>
          <Dropdown
            label={strings.FrameStyleLabel}
            selectedKey={frameOptions.style}
            options={[
              { key: 'simple', text: strings.FrameStyleSimple },
              { key: 'rounded', text: strings.PatternRounded },
              { key: 'badge', text: strings.FrameStyleBadge }
            ]}
            onChange={(_, option) => onFrameOptionsChange({ ...frameOptions, style: option?.key as 'none' | 'simple' | 'rounded' | 'badge' })}
          />

          <TextField
            label={strings.FrameTextLabel}
            value={frameOptions.text || ''}
            onChange={(_, value) => onFrameOptionsChange({ ...frameOptions, text: value })}
            placeholder={strings.FrameTextPlaceholder}
          />
        </>
      )}
    </Stack>
  );
};
