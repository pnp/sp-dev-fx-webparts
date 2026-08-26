import { ITheme } from '@fluentui/react/lib/Styling';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { resolveThemeColors } from './useThemeColors';

/** Stands in for the theme Fluent has loaded when no section variant applies. */
const siteTheme = {
  semanticColors: {
    bodyText: '#323130',
    bodySubtext: '#605e5c',
    bodyBackground: '#ffffff',
    bodyStandoutBackground: '#faf9f8',
    bodyDivider: '#edebe9'
  },
  palette: { themePrimary: '#0078d4' }
} as ITheme;

/** A section with a dark background, as SharePoint hands it to the web part. */
const darkVariant = {
  semanticColors: {
    bodyText: '#ffffff',
    bodySubtext: '#c8c8c8',
    bodyBackground: '#1f1f1f',
    bodyStandoutBackground: '#282828',
    bodyDivider: '#4a4a4a'
  },
  palette: { themePrimary: '#2899f5' }
} as IReadonlyTheme;

describe('resolveThemeColors', () => {
  it('falls back to the loaded theme when the section sets no variant', () => {
    expect(resolveThemeColors(undefined, siteTheme)).toEqual({
      bodyText: '#323130',
      bodySubtext: '#605e5c',
      bodyBackground: '#ffffff',
      bodyStandoutBackground: '#faf9f8',
      bodyDivider: '#edebe9',
      accent: '#0078d4'
    });
  });

  it('takes every colour from the section variant when there is one', () => {
    expect(resolveThemeColors(darkVariant, siteTheme)).toEqual({
      bodyText: '#ffffff',
      bodySubtext: '#c8c8c8',
      bodyBackground: '#1f1f1f',
      bodyStandoutBackground: '#282828',
      bodyDivider: '#4a4a4a',
      accent: '#2899f5'
    });
  });

  it('never returns the light body text over the dark variant background', () => {
    const colors = resolveThemeColors(darkVariant, siteTheme);

    expect(colors.bodyText).not.toEqual(siteTheme.semanticColors.bodyText);
    expect(colors.bodyBackground).not.toEqual(siteTheme.semanticColors.bodyBackground);
  });

  it('fills the gaps from the loaded theme when the variant is partial', () => {
    const partial = { semanticColors: { bodyBackground: '#1f1f1f' } } as IReadonlyTheme;
    const colors = resolveThemeColors(partial, siteTheme);

    expect(colors.bodyBackground).toEqual('#1f1f1f');
    expect(colors.bodyText).toEqual(siteTheme.semanticColors.bodyText);
    expect(colors.accent).toEqual(siteTheme.palette.themePrimary);
  });

  it('ignores a variant that carries no colours at all', () => {
    expect(resolveThemeColors({} as IReadonlyTheme, siteTheme)).toEqual(
      resolveThemeColors(undefined, siteTheme)
    );
  });
});
