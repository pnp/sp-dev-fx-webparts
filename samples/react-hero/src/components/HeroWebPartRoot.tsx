import * as React from "react";
import { Provider as JotaiProvider } from "jotai";
import {
  FluentUIProvider,
  UniversalProvider,
  Hero,
  IHeroRotation,
  LocalizationProvider,
} from "@spteck/react-controls-v2";
import { IHeroWebPartRootProps } from "../models/IHeroWebPartRootProps";
import { PlaceHolder } from "./PlaceHolder/PlaceHolder";
import strings from 'HeroWebPartStrings';

const HeroContent: React.FC<IHeroWebPartRootProps> = (props) => {
  const {
    items,
    layout,
    height,
    borderRadius,
    mosaicOverflowMode,
    rotationEnabled,
    rotationMode,
    rotationIntervalMs,
    onConfigure,
  } = props;

  const rotation: IHeroRotation | undefined = rotationEnabled
    ? { mode: rotationMode, intervalMs: rotationIntervalMs }
    : undefined;

  if (!items || items.length === 0) {
    return (
      <PlaceHolder
        title={strings.EmptyStateTitleLabel}
        description={strings.EmptyStateDescriptionLabel}
        buttonLabel={strings.EmptyStateConfigureAriaLabel}
        onConfigure={onConfigure}
        height={height}
      />
    );
  }

  return (
    <Hero
      items={items}
      layout={layout}
      height={height}
      borderRadius={borderRadius}
      mosaicOverflowMode={mosaicOverflowMode}
      rotation={rotation}
    />
  );
};

export const HeroWebPartRoot: React.FC<IHeroWebPartRootProps> = (props) => (
  <JotaiProvider>
    <FluentUIProvider
      theme={props.theme}
      applicationName="hero-webpart"
      targetDocument={document}
    >
      <UniversalProvider context={props.context}>
        <LocalizationProvider
          locale={props.context?.pageContext?.cultureInfo?.currentUICultureName}
        >
          <HeroContent {...props} />
        </LocalizationProvider>
      </UniversalProvider>
    </FluentUIProvider>
  </JotaiProvider>
);

HeroWebPartRoot.displayName = "HeroWebPartRoot";
