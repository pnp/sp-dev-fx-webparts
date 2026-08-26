import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { RadioGroup, Radio, Avatar } from "@fluentui/react-components";
import {
  FluentUIProvider,
  StackV2,
  ItemPicker,
  IItemPickerOption,
} from "@spteck/react-controls-v2";
import { useSites } from "@spteck/m365-hooks";
import { IDataSourceComponentProps } from "../../models/IDataSourceProps";
import { ISelectedSite } from "../../models/ISelectedSite";
import { DataSourceMode } from "../../models/INewsFeedWebPartProps";
import * as strings from "NewsFeedWebPartStrings";

const DataSourceHost: React.FC<IDataSourceComponentProps> = ({
  spfxContext,
  dataSourceMode,
  selectedSites,
  theme,
  onChange,
}) => {
  const [mode, setMode] = useState<DataSourceMode>(dataSourceMode);
  const [currentSelected, setCurrentSelected] =
    useState<ISelectedSite[]>(selectedSites);

  const {
    sites: searchResults,
    isLoading: isSearching,
    searchSites,
  } = useSites(spfxContext);

  const handleModeChange = useCallback(
    (_: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
      const newMode = data.value as DataSourceMode;
      setMode(newMode);
      setCurrentSelected([]);
      onChange({ dataSourceMode: newMode, selectedSites: [] });
    },
    [onChange],
  );

  const siteToOption = useCallback(
    (site: {
      id: string;
      displayName: string;
      webUrl: string;
      isOrganizationalNewsSite?: boolean;
    }): IItemPickerOption => {
      let displayPath = site.webUrl;
      try {
        const pathname = new URL(site.webUrl).pathname;
        displayPath = pathname === "/" ? strings.RootSiteLabel : pathname;
      } catch {
        /* keep full url */
      }
      return {
        value: site.id,
        text: site.displayName,
        secondaryText: site.isOrganizationalNewsSite
          ? strings.OrgNewsSiteLabel
          : displayPath,
        media: (
          <Avatar
            name={site.displayName}
            color="colorful"
            idForColor={site.id}
            shape="square"
            size={32}
          />
        ),
      };
    },
    [],
  );

  const options = useMemo(
    () =>
      searchResults
        .filter((site) => {
          try {
            const url = new URL(site.webUrl);
            return (
              !url.hostname.includes("-my.sharepoint.com") &&
              !url.pathname.startsWith("/personal/")
            );
          } catch {
            return true;
          }
        })
        .map(siteToOption),
    [searchResults, siteToOption],
  );

  const selectedOptions = useMemo(
    () => currentSelected.map(siteToOption),
    [currentSelected, siteToOption],
  );

  const handleSearchChange = useCallback(
    (searchValue: string): void => {
      if (searchValue.trim()) searchSites(searchValue).catch(() => {});
    },
    [searchSites],
  );

  const handleSelectionChange = useCallback(
    (selected: IItemPickerOption[]): void => {
      const updated: ISelectedSite[] = selected.map((option) => ({
        id: option.value,
        displayName: option.text,
        webUrl:
          searchResults.find((site) => site.id === option.value)?.webUrl ??
          currentSelected.find((site) => site.id === option.value)?.webUrl ??
          "",
      }));
      setCurrentSelected(updated);
      onChange({ dataSourceMode: mode, selectedSites: updated });
    },
    [searchResults, currentSelected, mode, onChange],
  );

  return (
    <FluentUIProvider
      theme={theme}
      applicationName={"newfeed-property-pane"}
      applyStylesToPortals
    >
      <StackV2 direction="vertical" gap="m" paddingTop="s">
        <RadioGroup layout="vertical" value={mode} onChange={handleModeChange}>
          <Radio value="all" label={strings.DataSourceAllLabel} />
          <Radio value="org" label={strings.DataSourceOrgLabel} />
          <Radio value="selected" label={strings.DataSourceSelectedLabel} />
        </RadioGroup>

        {mode === "selected" && (
          <ItemPicker
            options={options}
            selectedOptions={selectedOptions}
            placeholder={strings.SiteSearchPlaceholder}
            disabled={isSearching}
            width="100%"
            onSearchChange={handleSearchChange}
            onSelectionChange={handleSelectionChange}
          />
        )}
      </StackV2>
    </FluentUIProvider>
  );
};

export default DataSourceHost;
