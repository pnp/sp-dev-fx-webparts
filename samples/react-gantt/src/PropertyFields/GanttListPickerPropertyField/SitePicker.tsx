import * as React from "react";
import {
  Combobox,
  Option,
  Spinner,
  Text,
  MessageBar,
  MessageBarBody,
} from "@fluentui/react-components";
import { GlobeRegular } from "@fluentui/react-icons";
import { useGanttListPickerStyles } from "./useGanttListPickerStyles";
import type { SPListService, ISPSite } from "../../services/SPListService";
import * as strings from "GanttWebPartStrings";

export interface ISitePickerProps {
  contextSiteUrl: string;
  selectedSiteUrl: string;
  service: SPListService;
  onSiteChange: (siteUrl: string) => void;
}

const DEBOUNCE_MS = 400;
const CURRENT_SITE_KEY = "__current_site__";

export const SitePicker: React.FC<ISitePickerProps> = (props) => {
  const { contextSiteUrl, selectedSiteUrl, service, onSiteChange } = props;
  const { styles } = useGanttListPickerStyles();

  const [sites, setSites] = React.useState<ISPSite[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [inputValue, setInputValue] = React.useState("");

  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  // Derive current site name from URL
  const currentSiteLabel = React.useMemo(() => {
    try {
      const url = new URL(contextSiteUrl);
      const parts = url.pathname.split("/").filter(Boolean);
      return parts.length > 1 ? parts[parts.length - 1] : url.hostname;
    } catch {
      return contextSiteUrl;
    }
  }, [contextSiteUrl]);

  // Set initial display value
  React.useEffect(() => {
    if (!selectedSiteUrl || selectedSiteUrl === contextSiteUrl) {
      setInputValue(`${strings.CurrentSiteLabel} (${currentSiteLabel})`);
    } else {
      // Try to find the title from loaded sites
      const found = sites.find((s) => s.Url === selectedSiteUrl);
      setInputValue(found ? found.Title : selectedSiteUrl);
    }
  }, [selectedSiteUrl, contextSiteUrl, currentSiteLabel]); // eslint-disable-line react-hooks/exhaustive-deps

  const doSearch = React.useCallback(
    (query: string) => {
      setIsSearching(true);
      setError(undefined);
      service
        .searchSites(query)
        .then((results) => {
          setSites(results);
          setIsSearching(false);
        })
        .catch((err: Error) => {
          setError(err.message);
          setIsSearching(false);
        });
    },
    [service]
  );

  const handleInput = React.useCallback(
    (ev: React.FormEvent<HTMLInputElement>) => {
      const value = ev.currentTarget.value;
      setInputValue(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        doSearch(value);
      }, DEBOUNCE_MS);
    },
    [doSearch]
  );

  // Load initial sites when opened
  const handleOpenChange = React.useCallback(
    (_ev: unknown, data: { open: boolean }) => {
      if (data.open && sites.length === 0 && !isSearching) {
        doSearch("");
      }
    },
    [doSearch, sites.length, isSearching]
  );

  const handleOptionSelect = React.useCallback(
    (_ev: unknown, data: { optionValue?: string; optionText?: string }) => {
      if (data.optionValue === CURRENT_SITE_KEY) {
        onSiteChange(contextSiteUrl);
        setInputValue(
          `${strings.CurrentSiteLabel} (${currentSiteLabel})`
        );
      } else if (data.optionValue) {
        onSiteChange(data.optionValue);
        setInputValue(data.optionText || data.optionValue);
      }
    },
    [onSiteChange, contextSiteUrl, currentSiteLabel]
  );

  // Cleanup debounce on unmount
  React.useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div className={styles.section}>
      <Text className={styles.sectionTitle}>{strings.SelectSiteTitle}</Text>

      <Combobox
       
        placeholder={strings.SearchSitePlaceholder}
        value={inputValue}
        onInput={handleInput}
        onOpenChange={handleOpenChange}
        onOptionSelect={handleOptionSelect}
        selectedOptions={
          selectedSiteUrl && selectedSiteUrl !== contextSiteUrl
            ? [selectedSiteUrl]
            : [CURRENT_SITE_KEY]
        }
        style={{ width: "100%" }}
        listbox={{ style: { maxHeight: "220px" } }}
      >
        {/* Current site - always first */}
        <Option
          key={CURRENT_SITE_KEY}
          value={CURRENT_SITE_KEY}
          text={`${strings.CurrentSiteLabel} (${currentSiteLabel})`}
        >
          <GlobeRegular style={{ flexShrink: 0 }} />
          {strings.CurrentSiteLabel} ({currentSiteLabel})
        </Option>

        {/* Search results */}
        {sites
          .filter((s) => s.Url !== contextSiteUrl)
          .map((site) => (
            <Option key={site.Url} value={site.Url} text={site.Title}>
              <GlobeRegular style={{ flexShrink: 0 }} />
              {site.Title}
            </Option>
          ))}

        {/* Loading indicator */}
        {isSearching && (
          <Option key="__searching__" disabled value="" text="">
            <Spinner size="tiny" label={strings.SearchingSites} />
          </Option>
        )}
      </Combobox>

      {error && (
        <MessageBar intent="error">
          <MessageBarBody>{error}</MessageBarBody>
        </MessageBar>
      )}
    </div>
  );
};
