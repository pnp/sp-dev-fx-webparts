/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from 'react';

import {
  IBasePickerSuggestionsProps,
  ICalloutContentStyleProps,
  IInputProps,
  IPickerItemProps,
  ISuggestionItemProps,
  ITag,
  Label,
  TagPicker,
} from 'office-ui-fabric-react';
import { useRecoilState } from 'recoil';

import { useAirports } from '../../hooks/useAirports';
import { IAirport } from '../../models/IAirport';
import { globalState } from '../../recoil/atoms';
import { Airport } from './Airport';
import { SelectedAirport } from './SelectedAirport';
import { useSelectAirportStyles } from './useSelectAirportStyles';

export interface ITagExtended extends ITag {
  airportData: IAirport;
}

export const SelectAirportPicker: React.FunctionComponent = () => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [appState, setAppState] = useRecoilState(globalState);
  const { searchAirportsByText } = useAirports();
  const [selectedAirport, setSelectedAirports] = React.useState<ITag[]>([]);
  const { controlStyles, selecteAirportPickerStyles } = useSelectAirportStyles();

  const inputProps: IInputProps = React.useMemo(() => {
    return {
      placeholder: "Select an airport",
    };
  }, []);

  const pickerSuggestionsProps: IBasePickerSuggestionsProps = React.useMemo(() => {
    return {
      suggestionsHeaderText: "Suggested AirPorts",
      noResultsFoundText: "No AirPort found",
    };
  }, []);

  const listContainsTagList = React.useCallback((tag: ITag, tagList?: ITag[]) => {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.some((compareTag) => compareTag.key === tag.key);
  }, []);

  const loadMenuItems = React.useCallback(
    async (text: string) => {
      const airports = await searchAirportsByText(text);
      const newPickerItems: ITag[] = [];

      for (const airport of airports) {
        const city = airport?.municipality ? `${airport?.municipality},` : "";
        const item: ITagExtended = {
          key: airport?.iata_code,
          name: `${city} ${airport?.name}`,
          airportData: airport,
        };
        newPickerItems.push(item);
      }
      return newPickerItems;
    },
    [searchAirportsByText]
  );

  const getTextFromItem = React.useCallback((item: ITag) => {
    return item.name;
  }, []);

  const onItemSelected = React.useCallback((item: ITag): ITag | null => {
    setSelectedAirports([item]);
    return item;
  }, []);

  const filterSuggestedTags = React.useCallback(
    async (filterText: string, tagList: ITag[]): Promise<ITag[]> => {
      if (filterText.length < 2) {
        return [];
      }
      const pickerItems = await loadMenuItems(filterText);
      return filterText ? pickerItems.filter((tag) => !listContainsTagList(tag, tagList)) : [];
    },
    [loadMenuItems]
  );

  const onRenderSuggestionsItem = React.useCallback(
    (props:ITagExtended, itemProps: ISuggestionItemProps<ITagExtended>) => {
      const { airportData } = props;
      return (
        <div className={controlStyles.pickerItemStyles}>
          <Airport
            airport={airportData}

          />
        </div>
      );
    },
    [appState]
  );
  const onRenderItem = React.useCallback(
    (props: IPickerItemProps<ITag>) => {
      const airport = {} as IAirport;
      airport.iata_code = props.item.key as string;
      airport.name = props.item.name;

      return (
        <div style={{ width: "100%" }}>
          <SelectedAirport
            airport={airport}
            onRemove={(airport) => {
              setSelectedAirports([]);
              setAppState({ ...appState,  selectedAirPort: undefined });
            }}
          />
        </div>
      );
    },
    [appState]
  );

  const pickerCalloutPropsStyles = (props: ICalloutContentStyleProps) => {
    return { root: { width: divRef?.current?.offsetWidth } };
  };

  const onPickerChange = React.useCallback((items: ITag[]) => {
    setAppState({ ...appState, selectedAirPort: (items[0] as ITagExtended)?.airportData });
  }, [appState]);

  return (
    <div>

      <div ref={divRef} className={controlStyles.searchContainerStyles}>
        <Label>Airport</Label>
        <TagPicker

          selectedItems={selectedAirport}
          styles={selecteAirportPickerStyles}
          resolveDelay={500}
          pickerCalloutProps={{ styles: pickerCalloutPropsStyles }}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={onRenderSuggestionsItem}
          onResolveSuggestions={filterSuggestedTags}
          getTextFromItem={getTextFromItem}
          pickerSuggestionsProps={pickerSuggestionsProps}
          onItemSelected={onItemSelected}
          onChange={onPickerChange}
          itemLimit={1}
          inputProps={{
            ...inputProps,
            id: "picker1",
          }}
        />
      </div>

    </div>
  );
};
