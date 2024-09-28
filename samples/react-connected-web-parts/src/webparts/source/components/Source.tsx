import * as React from 'react';
import styles from './Source.module.scss';
import type { ISourceProps } from './ISourceProps';
import { DatePicker, Dropdown, TextField, Toggle } from '@fluentui/react';
import * as strings from 'SourceWebPartStrings';
import { ISourceState } from './ISourceState';
import { IPreferences } from '../../../common/Preferences';

export default class Source extends React.Component<ISourceProps, ISourceState> {
  constructor(props: ISourceProps) {
    super(props);
    
    this.state = {
      preferences: {}
    };
  }

  public render(): React.ReactElement<ISourceProps> {
    const {
      onFirstNameChanged,
      onLastNameChanged
    } = this.props;

    return (
      <section className={styles.source}>
        <div className={styles.welcome}>
          <h2>{strings.Title}</h2>
        </div>
        <div>
          <TextField label={strings.FirstName} onChange={(ev, newValue) => onFirstNameChanged(newValue)} />
          <TextField label={strings.LastName} onChange={(ev, newValue) => onLastNameChanged(newValue)} />
        </div>
        <div>
          <Dropdown 
            label={strings.Color}
            options={[
              { key: strings.Red.toLowerCase(), text: strings.Red },
              { key: strings.Green.toLowerCase(), text: strings.Green },
              { key: strings.Blue.toLowerCase(), text: strings.Blue }
            ]}
            onChange={(ev, option) => this._onColorChanged(option?.text)}
          />
          <DatePicker label={strings.Date} onSelectDate={(date) => this._onDateChanged(date)} />
          <Toggle label={strings.Like} onChange={(e, checked) => this._onLikeChanged(checked)} />
        </div>
      </section>
    );
  }

  private _onColorChanged = (color: string | undefined): void => {
    const { preferences } = this.state;

    preferences!.color = color;
    this._updatePreferences(preferences!);
  }

  private _onDateChanged = (date: Date | null | undefined): void => {
    const { preferences } = this.state;

    preferences!.date = date;
    this._updatePreferences(preferences!);
  }

  private _onLikeChanged = (like: boolean | undefined): void => {
    const { preferences } = this.state;
    
    preferences!.like = like;
    this._updatePreferences(preferences!);
  }

  /*
  Method to update the preferences in the state and to call the dynamic data source manager to update the value
  */
  private _updatePreferences = (preferences: IPreferences): void => {
    this.setState({
      preferences
    });
    this.props.onPreferencesChanged(preferences); 
  }
}

