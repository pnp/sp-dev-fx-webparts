import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { toFluentTheme, webLightTheme } from './toFluentTheme';

/**
 * A site theme in the shape SharePoint hands over.
 *
 * `effects` is here because a real `IReadonlyTheme` always carries it and
 * `createV9Theme` reads it. The fixture matches the platform rather than the
 * platform being made to tolerate a thinner fixture.
 */
const siteTheme = (isInverted: boolean): IReadonlyTheme =>
  ({
    isInverted,
    palette: {
      themePrimary: '#3b65c5',
      neutralPrimary: isInverted ? '#ffffff' : '#323130',
      white: isInverted ? '#1f1f1f' : '#ffffff'
    },
    semanticColors: {
      bodyText: isInverted ? '#ffffff' : '#323130',
      bodyBackground: isInverted ? '#1f1f1f' : '#ffffff'
    },
    effects: {
      elevation4: '0 1.6px 3.6px 0 rgba(0,0,0,.132)',
      elevation8: '0 3.2px 7.2px 0 rgba(0,0,0,.132)',
      elevation16: '0 6.4px 14.4px 0 rgba(0,0,0,.132)',
      elevation64: '0 25.6px 57.6px 0 rgba(0,0,0,.22)',
      roundedCorner2: '2px',
      roundedCorner4: '4px',
      roundedCorner6: '6px'
    }
  }) as unknown as IReadonlyTheme;

/** Rough brightness of a #rrggbb token, enough to tell dark from light. */
const brightness = (hex: string): number => {
  const value = hex.replace('#', '').slice(0, 6);
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16));
  return (r + g + b) / 3;
};

describe('toFluentTheme', () => {
  it('falls back to the light base when the host offers no theme', () => {
    expect(toFluentTheme(undefined)).toBe(webLightTheme);
  });

  it('carries the site brand colour through rather than keeping Fluent\'s', () => {
    expect(toFluentTheme(siteTheme(false)).colorBrandBackground).not.toEqual(
      webLightTheme.colorBrandBackground
    );
  });

  /*
   * These are the tokens the base actually decides.
   *
   * The neutral tokens come from the site's own palette and are identical
   * whichever base is used, so asserting on them proves nothing about this
   * module: an earlier version of these tests did exactly that and passed
   * happily with `isInverted` ignored altogether.
   *
   * The status palette is different. 172 of the 459 tokens change with the
   * base, and they are the ones MessageBar paints its error, warning and
   * information states with. Start a dark site from the light base and
   * `colorPaletteRedBackground1` comes out near-white, which is a white box on
   * a dark page, in the exact place this web part reports a failed search.
   */
  describe('status palette, which is what the base decides', () => {
    it('gives an inverted site a dark error surface', () => {
      const dark = toFluentTheme(siteTheme(true));

      expect(brightness(dark.colorPaletteRedBackground1)).toBeLessThan(96);
    });

    it('gives a light site a light error surface', () => {
      const light = toFluentTheme(siteTheme(false));

      expect(brightness(light.colorPaletteRedBackground1)).toBeGreaterThan(160);
    });

    it('never paints the same error surface for a light and a dark site', () => {
      expect(toFluentTheme(siteTheme(true)).colorPaletteRedBackground1).not.toEqual(
        toFluentTheme(siteTheme(false)).colorPaletteRedBackground1
      );
    });

    it('applies the same to the warning surface the permission state uses', () => {
      const dark = toFluentTheme(siteTheme(true));
      const light = toFluentTheme(siteTheme(false));

      expect(dark.colorPaletteYellowBackground1).not.toEqual(light.colorPaletteYellowBackground1);
      expect(brightness(dark.colorPaletteYellowBackground1)).toBeLessThan(
        brightness(light.colorPaletteYellowBackground1)
      );
    });

    it('keeps error text readable on the surface behind it, both ways round', () => {
      [true, false].forEach((isInverted) => {
        const theme = toFluentTheme(siteTheme(isInverted));
        const gap = Math.abs(
          brightness(theme.colorPaletteRedForeground1) -
            brightness(theme.colorPaletteRedBackground1)
        );

        expect(gap).toBeGreaterThan(60);
      });
    });
  });
});
