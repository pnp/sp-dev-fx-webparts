import { Stack, Label, CompactPeoplePicker, IPersonaProps, IBasePickerSuggestionsProps } from "@fluentui/react";
import * as React from "react";
import useFileContributors from "../hooks/useFileContributors";
import { IVersion } from "../models/IVersion";

export interface IPeoplePickerProps {
  versions?: IVersion[];
  onContributorSelected: (user: IPersonaProps) => void;
}

export const PeoplePicker: React.FunctionComponent<IPeoplePickerProps> = (props: React.PropsWithChildren<IPeoplePickerProps>) => {
  const [filteredContributor, setFilteredContributor] = React.useState<IPersonaProps>();
  const contributors = useFileContributors(filteredContributor, props.versions);

  const suggestionProps: IBasePickerSuggestionsProps = {
    suggestionsHeaderText: 'Suggested People',
    mostRecentlyUsedHeaderText: 'Filter by Contacts',
    noResultsFoundText: 'No results found',
    loadingText: 'Loading',
    showRemoveButtons: true,
    suggestionsAvailableAlertText: 'People Picker Suggestions available',
    suggestionsContainerAriaLabel: 'Filter by contacts',
  };

  return <>
    <Stack styles={{ root: { flexGrow: 1 } }}>
      <Label title='User'>Author / Editor</Label>
      <CompactPeoplePicker
        onResolveSuggestions={function (filter: string, selectedItems?: IPersonaProps[]): IPersonaProps[] | PromiseLike<IPersonaProps[]> {
          setFilteredContributor(selectedItems[0]);
          props.onContributorSelected(selectedItems[0]);
          return contributors;
        }}
        onChange={(items: IPersonaProps[]) => {
          setFilteredContributor(undefined);
          props.onContributorSelected(undefined);
        }}
        getTextFromItem={(persona: IPersonaProps): string => {
          return persona.text as string;
        }}
        itemLimit={1}
        pickerSuggestionsProps={suggestionProps}
        className={'ms-PeoplePicker'}
        resolveDelay={300}
        key={'normal'} />
    </Stack>
  </>
}