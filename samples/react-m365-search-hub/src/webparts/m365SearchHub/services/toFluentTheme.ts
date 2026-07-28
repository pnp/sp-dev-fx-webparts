import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { Theme, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import { createV9Theme } from '@fluentui/react-migration-v8-v9';

/**
 * Bridges the host theme onto Fluent v9.
 *
 * SharePoint hands out a v8 theme; Fluent v9 has a palette of its own. The
 * bridge from one to the other is `createV9Theme`, which needs a base to fill
 * in whatever the site does not specify, and that base has to match the
 * brightness of the site or half the palette comes out of the wrong end.
 *
 * Kept out of the web part class so the one decision here — which base to start
 * from — can be tested. Everything else is Fluent's.
 */
export function toFluentTheme(variant: IReadonlyTheme | undefined): Theme {
  const base = variant && variant.isInverted ? webDarkTheme : webLightTheme;
  return variant ? createV9Theme(variant as never, base) : base;
}

export { webDarkTheme, webLightTheme };
