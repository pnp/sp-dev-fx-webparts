import * as React from 'react';
import {
  Menu,
  MenuItemCheckbox,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Toolbar,
  ToolbarButton,
  ToolbarDivider
} from '@fluentui/react-components';
import { ArrowSortRegular, FilterRegular } from '@fluentui/react-icons';
import * as strings from 'M365SearchHubWebPartStrings';
import { ContentKind, SortOrder } from '../models/ISearchModels';
import { format } from '../utils/format';

export interface ISearchFiltersProps {
  kinds: ContentKind[];
  sort: SortOrder;
  onKindsChange: (kinds: ContentKind[]) => void;
  onSortChange: (sort: SortOrder) => void;
}

const KINDS: { key: ContentKind; label: string }[] = [
  { key: 'document', label: strings.KindDocument },
  { key: 'page', label: strings.KindPage },
  { key: 'site', label: strings.KindSite },
  { key: 'listItem', label: strings.KindListItem }
];

const SORTS: { key: SortOrder; label: string }[] = [
  { key: 'relevance', label: strings.SortRelevance },
  { key: 'date', label: strings.SortDate }
];

/**
 * Refinement, as a toolbar rather than a form.
 *
 * Filters and sort used to sit on the page as four checkboxes and a dropdown,
 * which read as configuration to be filled in before anything could happen.
 * Behind menu buttons they read as what they are: things to reach for once
 * there are results worth narrowing.
 *
 * `MenuItemCheckbox` and `MenuItemRadio` carry the right roles and keyboard
 * behaviour on their own, so the group semantics that a `fieldset` was
 * providing come from the components instead of from markup.
 */
export const SearchFilters: React.FunctionComponent<ISearchFiltersProps> = (props) => {
  const { kinds, sort, onKindsChange, onSortChange } = props;

  // The button says how many filters are on, so the state is legible without
  // opening the menu.
  const filterLabel =
    kinds.length > 0 ? format(strings.FiltersActiveLabel, kinds.length) : strings.FiltersLabel;
  const sortLabel = SORTS.filter((option) => option.key === sort)[0].label;

  return (
    <Toolbar aria-label={strings.SearchToolsLabel} size="small">
      <Menu
        checkedValues={{ kind: kinds }}
        onCheckedValueChange={(_, data) => onKindsChange(data.checkedItems as ContentKind[])}
      >
        <MenuTrigger disableButtonEnhancement>
          <ToolbarButton icon={<FilterRegular />}>{filterLabel}</ToolbarButton>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            {KINDS.map((kind) => (
              <MenuItemCheckbox key={kind.key} name="kind" value={kind.key}>
                {kind.label}
              </MenuItemCheckbox>
            ))}
          </MenuList>
        </MenuPopover>
      </Menu>

      <ToolbarDivider />

      <Menu
        checkedValues={{ sort: [sort] }}
        onCheckedValueChange={(_, data) => onSortChange(data.checkedItems[0] as SortOrder)}
      >
        <MenuTrigger disableButtonEnhancement>
          <ToolbarButton icon={<ArrowSortRegular />}>
            {`${strings.SortLabel}: ${sortLabel}`}
          </ToolbarButton>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            {SORTS.map((option) => (
              <MenuItemRadio key={option.key} name="sort" value={option.key}>
                {option.label}
              </MenuItemRadio>
            ))}
          </MenuList>
        </MenuPopover>
      </Menu>
    </Toolbar>
  );
};
