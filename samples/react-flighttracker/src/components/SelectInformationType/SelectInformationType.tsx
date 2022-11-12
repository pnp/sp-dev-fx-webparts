/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react';

import * as strings from 'FlightTrackerWebPartStrings';
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption,
  IDropdownProps,
} from 'office-ui-fabric-react/lib/Dropdown';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { useRecoilState } from 'recoil';

import { EInformationType } from '../../constants/EInformationType';
import { EInformationTypesIcons } from '../../constants/EInformationTypesIcons';
import { globalState } from '../../recoil/atoms';
import { useSelectInformationStyles } from './useSelectInformationStyles';

export interface ISelectInformationTypeProps {}

export const SelectInformationType: React.FunctionComponent<ISelectInformationTypeProps> = (
  props: React.PropsWithChildren<ISelectInformationTypeProps>
) => {
  const [appState, setAppState] = useRecoilState(globalState);
  const {  dropdownStyles, controlStyles } = useSelectInformationStyles();
  const options: IDropdownOption[] = React.useMemo(() => {
    return [
      { key: "Header", text: "Options", itemType: DropdownMenuItemType.Header },
      { key: "Departures", text: "Departures", data: { icon: EInformationTypesIcons.DEPARTURES } },
      { key: "divider_2", text: "-", itemType: DropdownMenuItemType.Divider },
      { key: "Arrivals", text: "Arrivals", data: { icon: EInformationTypesIcons.ARRIVALS } },
    ];
  }, []);

  const getImages = React.useCallback((image: string): string => {
    switch (image) {
      case EInformationTypesIcons.DEPARTURES:
        return "departuresSVG";
      case EInformationTypesIcons.ARRIVALS:
        return "arrivalsSVG";
      default:
        return "";
    }
  }, []);

  const onRenderOption = React.useCallback(
    (option: IDropdownOption): JSX.Element => {
      return (
        <Stack horizontal horizontalAlign="start" verticalAlign="center" tokens={{ childrenGap: 10 }}>
          {option.data && option.data.icon && (
            <FontIcon iconName={getImages(option.data.icon)} className={controlStyles.iconStyles} />
          )}
          <span>{option.text}</span>
        </Stack>
      );
    },
    [getImages, controlStyles.iconStyles]
  );

  const onRenderTitle = React.useCallback(
    (options: IDropdownOption[]): JSX.Element => {
      const option = options[0];
      return (
        <Stack horizontal horizontalAlign="start" verticalAlign="center" tokens={{ childrenGap: 10 }}>
          {option.data && option.data.icon && ( <FontIcon iconName={getImages(option.data.icon)} className={controlStyles.iconStyles} />)}
          <span>{option.text}</span>
        </Stack>
      );
    },
    [getImages, controlStyles.iconStyles]
  );

  const onRenderPlaceholder = React.useCallback((props: IDropdownProps): JSX.Element => {
    return (
      <Stack horizontal horizontalAlign="start" verticalAlign="center" tokens={{ childrenGap: 10 }}>
        <span>{props.placeholder}</span>
      </Stack>
    );
  }, []);

  return (
    <>
      <Dropdown
        placeholder={strings.SelectInformationType}
        label={strings.InformationTypeLabel}
        onRenderPlaceholder={onRenderPlaceholder}
        onRenderTitle={onRenderTitle}
        onRenderOption={onRenderOption}
        styles={dropdownStyles}
        options={options}
        onChange={(event, option) =>
          setAppState({ ...appState,  selectedInformationType: option.key as EInformationType })
        }
        selectedKey={appState.selectedInformationType}
      />
    </>
  );
};
