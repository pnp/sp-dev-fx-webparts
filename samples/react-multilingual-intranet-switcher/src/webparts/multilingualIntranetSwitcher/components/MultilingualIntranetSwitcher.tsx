import * as React from 'react';
import { FluentProvider, MessageBar, MessageBarBody, Select, Text, webLightTheme } from '@fluentui/react-components';
import { ILocaleConfiguration, INavigationItem } from '../models/NavigationModels';
import { parseConfiguration } from '../utils/configurationParser';
import { getBrowserLocales, selectInitialLocale } from '../utils/locale';
import { getSafeSameTenantUrl } from '../utils/urlSafety';
import { getSwitcherViewState, SwitcherViewState } from '../utils/viewState';
import * as strings from 'MultilingualIntranetSwitcherWebPartStrings';
import { IMultilingualIntranetSwitcherProps } from './IMultilingualIntranetSwitcherProps';
import styles from './MultilingualIntranetSwitcher.module.scss';

export { getSwitcherViewState, SwitcherViewState } from '../utils/viewState';

const MultilingualIntranetSwitcher: React.FC<IMultilingualIntranetSwitcherProps> = (props: IMultilingualIntranetSwitcherProps) => {
  const [retry, setRetry] = React.useState<number>(0);
  const result = React.useMemo(() => parseConfiguration(props.configurationJson), [props.configurationJson, retry]);
  const configuration = result.configuration;
  const tenantOrigin = React.useMemo(() => {
    const absoluteUrl: string = props.context.pageContext.web.absoluteUrl;
    try {
      return new URL(absoluteUrl).origin;
    } catch (_) {
      return '';
    }
  }, [props.context]);
  const [selectedLocale, setSelectedLocale] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (configuration) {
      setSelectedLocale(selectInitialLocale(configuration.locales, configuration.defaultLocale, getBrowserLocales(typeof navigator === 'undefined' ? undefined : navigator)));
    }
  }, [configuration]);

  if (!configuration) {
    return (
      <FluentProvider theme={webLightTheme}>
        <div className={styles.root} role="region" aria-label={props.title || strings.ErrorTitle}>
          <MessageBar intent="error" role="alert">
            <MessageBarBody>{strings.ErrorTitle}: {result.error}</MessageBarBody>
            <button type="button" onClick={() => setRetry((value: number) => value + 1)}>{strings.Retry}</button>
          </MessageBar>
        </div>
      </FluentProvider>
    );
  }

  const selectedIndex: number = configuration.locales.map((item: ILocaleConfiguration) => item.code).indexOf(selectedLocale || '');
  const locale: ILocaleConfiguration = selectedIndex >= 0 ? configuration.locales[selectedIndex] : configuration.locales[0];
  const safeItems: Array<INavigationItem & { safeUrl: string }> = locale.items.reduce<Array<INavigationItem & { safeUrl: string }>>((items, item) => {
    const safeUrl: string | undefined = getSafeSameTenantUrl(item.url, tenantOrigin);
    if (safeUrl) {
      items.push({ ...item, safeUrl });
    }
    return items;
  }, []);
  const viewState: SwitcherViewState = getSwitcherViewState(true, safeItems.length > 0);

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.root} role="region" aria-label={props.title || strings.SelectLanguageLabel}>
        <div className={styles.container}>
          <div className={styles.headingRow}>
            <Text as="h2" size={500} weight="semibold">{props.title}</Text>
            <Select
              className={styles.languageSelect}
              aria-label={strings.SelectLanguageLabel}
              value={locale.code}
              onChange={(_, data) => setSelectedLocale(data.value)}>
              {configuration.locales.map((item: ILocaleConfiguration) => <option key={item.code} value={item.code}>{item.displayName}</option>)}
            </Select>
          </div>
          <div className={styles.status} aria-live="polite">
            {viewState === 'empty' ? <><Text weight="semibold">{strings.EmptyTitle}</Text><Text block>{safeItems.length ? strings.EmptyDescription : strings.NoSafeLinks}</Text></> : null}
          </div>
          {viewState === 'ready' ? (
            <nav aria-label={`${locale.displayName} navigation`}>
              <ul className={styles.links}>
                {safeItems.map((item) => <li key={item.id}><a className={styles.link} href={item.safeUrl}><span className={styles.label}>{item.label}</span>{item.description ? <span className={styles.description}>{item.description}</span> : null}</a></li>)}
              </ul>
            </nav>
          ) : null}
        </div>
      </div>
    </FluentProvider>
  );
};

export default MultilingualIntranetSwitcher;
