import * as React from 'react';
import styles from './PersonaCard.module.scss';
import { IPersonaCardProps } from './IPersonaCardProps';
import { IPersonaCardState } from './IPersonaCardState';
import { Log } from '@microsoft/sp-core-library';
import { SPComponentLoader } from '@microsoft/sp-loader';

import {
  Avatar,
  Body1,
  Card,
  Subtitle1,
  Text,
} from '@fluentui/react-components';
import { Call16Filled, Location16Filled } from '@fluentui/react-icons';
import { LIVE_PERSONA_COMPONENT_ID, EXP_SOURCE } from '../../../../constants';

export class PersonaCard extends React.Component<
  IPersonaCardProps,
  IPersonaCardState
> {
  constructor(props: IPersonaCardProps) {
    super(props);

    this.state = { livePersonaCard: undefined, pictureUrl: undefined };
  }
  /**
   *
   *
   * @memberof PersonaCard
   */
  public async componentDidMount(): Promise<void> {
    const sharedLibrary = await this._loadSPComponentById(
      LIVE_PERSONA_COMPONENT_ID
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const livePersonaCard: any = sharedLibrary.LivePersonaCard;
    this.setState({ livePersonaCard: livePersonaCard });
  }

  /**
   *
   *
   * @private
   * @returns
   * @memberof PersonaCard
   */
  private _LivePersonaCard(): JSX.Element {
    return React.createElement(
      this.state.livePersonaCard,
      {
        serviceScope: this.props.context.serviceScope,
        legacyUpn: this.props.profileProperties.Email,
        onCardOpen: () => {
          console.log('LivePersonaCard Open');
        },
        onCardClose: () => {
          console.log('LivePersonaCard Close');
        },
      },
      this._PersonaCard()
    );
  }

  /**
   *
   *
   * @private
   * @returns {JSX.Element}
   * @memberof PersonaCard
   */
  private _PersonaCard(): JSX.Element {
    return (
      <Card className={styles.documentCard}>
        <Avatar
          name={this.props.profileProperties.DisplayName}
          image={{
            src: `${this.props.profileProperties.PictureUrl}`,
          }}
          size={120}
          shape="square"
        />
        <div className={styles.personaDetails}>
          <Subtitle1>{this.props.profileProperties.DisplayName}</Subtitle1>
          <Body1 className={styles.others} style={{ fontWeight: 600 }}>
            {this.props.profileProperties.Title}
          </Body1>
          <Text className={styles.others}>
            {this.props.profileProperties.Department}
          </Text>
          {this.props.profileProperties.WorkPhone ? (
            <div className={styles.others}>
              <Call16Filled style={{ fontSize: '12px' }} />
              <span style={{ marginLeft: 5, fontSize: '12px' }}>
                {' '}
                {this.props.profileProperties.WorkPhone}
              </span>
            </div>
          ) : (
            ''
          )}
          {this.props.profileProperties.Location ? (
            <div className={(styles.textOverflow, styles.others)}>
              <Location16Filled style={{ fontSize: '12px' }} />
              <span style={{ marginLeft: 5, fontSize: '12px' }}>
                {' '}
                {this.props.profileProperties.Location}
              </span>
            </div>
          ) : (
            ''
          )}
        </div>
      </Card>
    );
  }
  /**
   * Load SPFx component by id, SPComponentLoader is used to load the SPFx components
   * @param componentId - componentId, guid of the component library
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async _loadSPComponentById(componentId: string): Promise<any> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const component: any = await SPComponentLoader.loadComponentById(
        componentId
      );
      return component;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      Log.error(EXP_SOURCE, err);
      throw err;
    }
  }

  /**
   *
   *
   * @returns {React.ReactElement<IPersonaCardProps>}
   * @memberof PersonaCard
   */
  public render(): React.ReactElement<IPersonaCardProps> {
    return (
      <div className={styles.personaContainer}>
        {this.state.livePersonaCard
          ? this._LivePersonaCard()
          : this._PersonaCard()}
      </div>
    );
  }
}
