import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { Theme } from '@fluentui/react-components';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IUnifiedCalendar } from '@spteck/m365-hooks';
import { SPFxHostType } from './SPFxHostType';

export interface ISelectCalendarChangePayload {
  selectedCalendars: IUnifiedCalendar[];
}

export interface ISelectCalendarComponentProps {
  spfxContext: BaseComponentContext;
  selectedCalendars: IUnifiedCalendar[];
  theme: Theme;
  hostType: SPFxHostType;
  onChange: (payload: ISelectCalendarChangePayload) => void;
}

export interface ISelectCalendarInternalProps
  extends IPropertyPaneCustomFieldProps,
    ISelectCalendarComponentProps {}
