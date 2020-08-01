import * as React from 'react';
import { IPersonaCardProps } from './IPersonaCardProps';
import { IPersonaCardState } from './IPersonaCardState';
import {
  Log, Environment, EnvironmentType,
} from '@microsoft/sp-core-library';
import { SPComponentLoader } from '@microsoft/sp-loader';

import {
  Persona,
  IPersonaSharedProps,
} from 'office-ui-fabric-react';
import { ITheme } from '@uifabric/styling';
import { TemplateService } from '../../services/TemplateService/TemplateService';
import { isEmpty } from '@microsoft/sp-lodash-subset';

const LIVE_PERSONA_COMPONENT_ID: string = "914330ee-2df2-4f6e-a858-30c23a812408";

export class PersonaCard extends React.Component<IPersonaCardProps,IPersonaCardState> {
  private sharedLibrary: any;

  constructor(props: IPersonaCardProps) {
    super(props);

    this.state = {
      isComponentLoaded: false,
    };

    this.sharedLibrary = null;
  }

  /**
   *
   *
   * @memberof PersonaCard
   */
  public async componentDidMount() {
    if (Environment.type !== EnvironmentType.Local) {
      await this._loadSpfxSharedLibrary();
    }
  }

  private async _loadSpfxSharedLibrary() {

    if (!this.state.isComponentLoaded) {

        try {

            this.sharedLibrary = await SPComponentLoader.loadComponentById(LIVE_PERSONA_COMPONENT_ID);   

            this.setState({
                isComponentLoaded: true
            });

        } catch (error) {
           Log.error(`[LivePersona_Component]`, error, this.props.serviceScope);
        }
    }        
}

  private determinePersonaConfig(): IPersonaCardProps {
    let processedProps: IPersonaCardProps = this.props;

    if (this.props.fieldsConfiguration && this.props.item) {
        processedProps = TemplateService.processFieldsConfiguration<IPersonaCardProps>(this.props.fieldsConfiguration, this.props.item);
    }

    return processedProps;
  }

  /**
   *
   *
   * @private
   * @returns
   * @memberof PersonaCard
   */
  private _LivePersonaCard() {
    let processedProps: IPersonaCardProps = this.determinePersonaConfig();

    return React.createElement(
      this.sharedLibrary.LivePersonaCard,
      {
        className: 'livePersonaCard',
        clientScenario: "PeopleWebPart",
        disableHover: false,
        hostAppPersonaInfo: {
          PersonaType: "User"
        },
        serviceScope: this.props.serviceScope,
        upn: processedProps.upn,
        onCardOpen: () => {
          console.log('LivePersonaCard Open');
        },
        onCardClose: () => {
          console.log('LivePersonaCard Close');
        },
      },
      this._PersonaCard(processedProps)
    );
  }

  /**
   *
   *
   * @private
   * @returns {JSX.Element}
   * @memberof PersonaCard
   */
  private _PersonaCard(processedProps?: IPersonaCardProps): JSX.Element {

    if (isEmpty(processedProps)) {
      processedProps = this.determinePersonaConfig();
    }

    const persona: IPersonaSharedProps = {
      theme:this.props.themeVariant as ITheme,
      text: processedProps.text,
      secondaryText: processedProps.secondaryText,
      tertiaryText: processedProps.tertiaryText,
      optionalText: processedProps.optionalText
    };

    return <Persona {...persona} size={parseInt(this.props.personaSize)} />;
  }

  /**
   *
   *
   * @returns {React.ReactElement<IPersonaCardProps>}
   * @memberof PersonaCard
   */
  public render(): React.ReactElement<IPersonaCardProps> {
    return (
      <React.Fragment>
        {this.state.isComponentLoaded
          ? this._LivePersonaCard()
          : this._PersonaCard()}
      </React.Fragment>
    );
  }
}
