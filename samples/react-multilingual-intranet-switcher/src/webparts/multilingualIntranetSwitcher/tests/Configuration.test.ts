/// <reference types="mocha" />

import { assert } from 'chai';
import { CONFIG_LIMITS, parseConfiguration } from '../utils/configurationParser';
import { selectInitialLocale } from '../utils/locale';
import { getSafeSameTenantUrl } from '../utils/urlSafety';

const valid = (locales: any[] = [{ code: 'en-US', displayName: 'English', items: [] }]): string => JSON.stringify({ defaultLocale: 'en-US', locales });

describe('multilingual intranet configuration', () => {
  it('selects exact browser locale, then language, then configured default', () => {
    const locales: any[] = [{ code: 'en-US', displayName: 'English', items: [] }, { code: 'fr-FR', displayName: 'Français', items: [] }];
    assert.equal(selectInitialLocale(locales, 'en-US', ['fr-FR']), 'fr-FR');
    assert.equal(selectInitialLocale(locales, 'en-US', ['fr-CA']), 'fr-FR');
    assert.equal(selectInitialLocale(locales, 'en-US', ['de-DE']), 'en-US');
  });

  it('rejects malformed JSON and invalid root values', () => {
    assert.isDefined(parseConfiguration('{').error);
    assert.isDefined(parseConfiguration('[]').error);
    assert.isDefined(parseConfiguration('').error);
  });

  it('rejects duplicate and invalid locales', () => {
    assert.match(parseConfiguration(valid([{ code: 'en-US', displayName: 'English', items: [] }, { code: 'en_us', displayName: 'Duplicate', items: [] }])).error as string, /Duplicate locale/);
    assert.isDefined(parseConfiguration(valid([{ code: 'not a locale', displayName: 'Nope', items: [] }])).error);
    assert.isDefined(parseConfiguration(JSON.stringify({ defaultLocale: 'de-DE', locales: [{ code: 'en-US', displayName: 'English', items: [] }] })).error);
  });

  it('enforces locale, item, and JSON bounds', () => {
    const tooManyLocales: any[] = Array.from({ length: CONFIG_LIMITS.maxLocales + 1 }, (_, index: number) => ({ code: `x${index}`, displayName: 'x', items: [] }));
    assert.isDefined(parseConfiguration(valid(tooManyLocales)).error);
    const tooManyItems: any[] = Array.from({ length: CONFIG_LIMITS.maxItemsPerLocale + 1 }, (_, index: number) => ({ id: `${index}`, label: 'x', url: '/' }));
    assert.isDefined(parseConfiguration(valid([{ code: 'en-US', displayName: 'English', items: tooManyItems }])).error);
    assert.isDefined(parseConfiguration(new Array(CONFIG_LIMITS.maxJsonCharacters + 2).join(' ')).error);
  });

  it('accepts same-tenant links and rejects unsafe or external URLs', () => {
    const tenant: string = 'https://contoso.sharepoint.com';
    assert.equal(getSafeSameTenantUrl('/sites/intranet/home.aspx', tenant), 'https://contoso.sharepoint.com/sites/intranet/home.aspx');
    assert.equal(getSafeSameTenantUrl('https://contoso.sharepoint.com/sites/intranet', tenant), 'https://contoso.sharepoint.com/sites/intranet');
    assert.isUndefined(getSafeSameTenantUrl('https://evil.example/path', tenant));
    assert.isUndefined(getSafeSameTenantUrl('javascript:alert(1)', tenant));
    assert.isUndefined(getSafeSameTenantUrl('//evil.example/path', tenant));
  });
});
