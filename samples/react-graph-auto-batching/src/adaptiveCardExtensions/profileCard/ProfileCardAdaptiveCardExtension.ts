import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { ProfileCardPropertyPane } from './ProfileCardPropertyPane';
import { BatchGraphClient } from '../../dal/http/BatchGraphClient';
import { SPFxHttpClient } from '../../dal/http/SPFxHttpClient';
import { IHttpClient } from '../../dal/http/IHttpClient';
import { StringUtilities } from '../../utils/StringUtilities';

export interface IProfileCardAdaptiveCardExtensionProps {
  title: string;
  description: string;
  iconProperty: string;
  userId: string;
}

export interface IProfileCardAdaptiveCardExtensionState {
  user: any;
  userPresence: any;
  photo: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'ProfileCard_CARD_VIEW';

export default class ProfileCardAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IProfileCardAdaptiveCardExtensionProps,
  IProfileCardAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: ProfileCardPropertyPane | undefined;
  private httpClient: IHttpClient;
  public async onInit(): Promise<void> {
    let client = await this.context.aadHttpClientFactory.getClient('https://graph.microsoft.com');
    this.httpClient = new BatchGraphClient(new SPFxHttpClient(client));
    let userQuery = this.properties.userId ? `/users/${this.properties.userId}` : "/me";
    const [userInfoRequest, userPhotoRequest, presenceInfo] = await Promise.all([this.httpClient.get(userQuery),
      this.httpClient.get(userQuery+ "/photo/$value"),
      this.httpClient.get(userQuery+ "/presence")]);
      const [userResult, photo, presence] = await Promise.all([userInfoRequest.json(), userPhotoRequest.text(),presenceInfo.json()]);

    this.state = {
      user: userResult,
      userPresence: presence.availability,
      photo: `data:image/png;base64,${photo.replace("\"","").replace("\"","")}`
    };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());

    return Promise.resolve();
  }

  public get title(): string {
    return this.state?.user?.displayName || ""; 
  }

  protected get iconProperty(): string {
    return this.properties.iconProperty || require('./assets/SharePointLogo.svg');
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'ProfileCard-property-pane'*/
      './ProfileCardPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.ProfileCardPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane!.getPropertyPaneConfiguration();
  }
}
