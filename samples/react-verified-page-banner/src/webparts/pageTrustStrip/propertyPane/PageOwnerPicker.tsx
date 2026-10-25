import * as React from "react";
import {
  Button,
  Combobox,
  Field,
  FluentProvider,
  IdPrefixProvider,
  MessageBar,
  MessageBarBody,
  Option,
  Spinner,
  Text,
  type OptionOnSelectData,
  type Theme
} from "@fluentui/react-components";
import type { IPersonOption } from "../services/PageTrustService";

export interface IPageOwnerPickerProps {
  instanceId: string;
  theme: Theme;
  disabled: boolean;
  disabledReason?: string;
  selected?: IPersonOption;
  feedback?: string;
  feedbackError?: string;
  onSearch: (query: string) => Promise<IPersonOption[]>;
  onSelect: (person: IPersonOption) => Promise<void>;
  onClear: () => Promise<void>;
}

function errorText(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}

function findPerson(people: IPersonOption[], loginName: string): IPersonOption | undefined {
  for (let index = 0; index < people.length; index++) {
    if (people[index].loginName === loginName) {
      return people[index];
    }
  }
  return undefined;
}

export function PageOwnerPicker(props: IPageOwnerPickerProps): React.ReactElement {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<IPersonOption[]>([]);
  const [searching, setSearching] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [pickerError, setPickerError] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2 || props.disabled) {
      setResults([]);
      setSearching(false);
      return undefined;
    }

    let cancelled = false;
    setSearching(true);
    const timer = window.setTimeout(() => {
      props.onSearch(trimmed).then((people: IPersonOption[]) => {
        if (!cancelled) {
          setResults(people);
          setSearching(false);
          setPickerError(undefined);
        }
      }).catch((error: unknown) => {
        if (!cancelled) {
          setResults([]);
          setSearching(false);
          setPickerError(errorText(error, "People search didn't work. Try again."));
        }
      });
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query, props.disabled, props.onSearch]);

  const onOptionSelect = (_event: React.SyntheticEvent, data: OptionOnSelectData): void => {
    if (!data.optionValue) {
      return;
    }
    const person = findPerson(results, data.optionValue);
    if (!person) {
      const message = "That person couldn't be selected. Search again and choose a result.";
      console.error("[PageTrustStrip] set page owner failed. HTTP none. " + message);
      setPickerError(message);
      return;
    }
    setSaving(true);
    setPickerError(undefined);
    props.onSelect(person).then(() => {
      setSaving(false);
      setQuery("");
      setResults([]);
    }).catch((error: unknown) => {
      setSaving(false);
      setPickerError(errorText(error, "The page owner couldn't be saved."));
    });
  };

  const onClear = (): void => {
    setSaving(true);
    setPickerError(undefined);
    props.onClear().then(() => {
      setSaving(false);
    }).catch((error: unknown) => {
      setSaving(false);
      setPickerError(errorText(error, "The page owner couldn't be cleared."));
    });
  };

  const hint = props.disabled
    ? props.disabledReason
    : "Type at least 2 characters. Choosing a person saves them on this page.";

  return (
    <IdPrefixProvider value={`page-trust-owner-${props.instanceId}-`}>
      <FluentProvider theme={props.theme}>
        <Field label="Page owner" hint={hint}>
          {props.selected && (
            <div>
              <Text weight="semibold">{props.selected.displayName}</Text>
              {props.selected.email && <Text> {props.selected.email}</Text>}
              <div>
                <Button
                  appearance="subtle"
                  disabled={props.disabled || saving}
                  onClick={onClear}
                  aria-label={`Remove ${props.selected.displayName} as page owner`}
                >
                  Remove page owner
                </Button>
              </div>
            </div>
          )}
          {!props.selected && (
            <Text size={200}>No owner is saved. The page author is shown until you pick someone.</Text>
          )}
          <Combobox
            aria-label="Search for a page owner"
            placeholder="Search people"
            freeform
            disabled={props.disabled || saving}
            value={query}
            selectedOptions={[]}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            onOptionSelect={onOptionSelect}
          >
            {results.map((person) => (
              <Option key={person.loginName} value={person.loginName} text={person.displayName}>
                {person.email ? `${person.displayName} (${person.email})` : person.displayName}
              </Option>
            ))}
          </Combobox>
          {searching && <Spinner size="tiny" label="Searching people" />}
          {!searching && query.trim().length >= 2 && results.length === 0 && !pickerError && (
            <Text size={200} role="status">No people found.</Text>
          )}
          {(pickerError || props.feedbackError) && (
            <MessageBar intent="error">
              <MessageBarBody>{pickerError || props.feedbackError}</MessageBarBody>
            </MessageBar>
          )}
          {props.feedback && !pickerError && !props.feedbackError && (
            <MessageBar intent="success">
              <MessageBarBody>{props.feedback}</MessageBarBody>
            </MessageBar>
          )}
        </Field>
      </FluentProvider>
    </IdPrefixProvider>
  );
}
