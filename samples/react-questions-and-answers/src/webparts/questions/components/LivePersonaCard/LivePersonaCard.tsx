import * as React from 'react';
import styles from './LivePersonaCard.module.scss';
import { SPComponentLoader } from "@microsoft/sp-loader";
import { Log, Text } from "@microsoft/sp-core-library";
import { Persona, IPersonaProps, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { ILivePersonaCardProps, ILivePersonaCardState } from './LivePersonaCard.types';

// Used to call LivePersonaCard
const EXP_SOURCE: string = "PnPLivePersonaCard";
const LIVE_PERSONA_COMPONENT_ID: string = "914330ee-2df2-4f6e-a858-30c23a812408";

// Used to generate default persona card
const DEFAULT_PERSONA_IMG_HASH: string = "7ad602295f8386b7615b582d87bcc294";
const MD5_MODULE_ID: string = "8494e7d7-6b99-47b2-a741-59873e42f16f";
const PROFILE_IMAGE_URL: string = '/_layouts/15/userphoto.aspx?size={0}&accountname={1}';

/*
This was pulled directly from the following rejected Pull Request by Hugo Bernier, with the author's expressed permission
https://github.com/pnp/sp-dev-fx-controls-react/pull/353/commits/16595698c49efd1e236cf5159a6c8ddc275e49de?file-filters%5B%5D=.ts&file-filters%5B%5D=.tsx#diff-7b59c134b6c83b922ade946400924f9e42d8d609c2328073917078ccee236905R4
*/

/*
The idea for this control originated from a StackExchange post from Heinrich Ulbricht
https://sharepoint.stackexchange.com/questions/259908/how-to-display-the-sharepoint-live-persona-card/259930#259930

The research on how to use SPComponent loader to load the persona card was done by Anil Lakhagoudar
https://social.technet.microsoft.com/wiki/contents/articles/52249.sharepoint-online-live-persona-card-in-custom-webpart.aspx

The basis for this code is from Denis Molodstov
https://github.com/Zerg00s/LivePersonaCard

This first version is intended to quickly fill a gap. Our intent is to leverage
FieldUserRenderer and avoid duplicate code wherever possible
*/

/**
 * Attaches a Office 365 live persona card to any element
 */
export class LivePersonaCard extends React.Component<ILivePersonaCardProps, ILivePersonaCardState> {
  constructor(props: ILivePersonaCardProps) {
    super(props);

    this.state = {
      hasChildren: React.Children.count(this.props.children) > 0,
      pictureUrl: '',
      profileCard: null
    };
  }

  public componentDidMount(): any {
    if (!this.state.hasChildren && (!this.props.personaProps ||!this.props.personaProps.imageUrl)) {
      const size = this._getPersonaSize();
      const personaImgUrl = Text.format(PROFILE_IMAGE_URL, size, this.props.user.email);

      this._getImageBase64(personaImgUrl).then((url: string) => {
        this._getMd5HashForUrl(url).then((newHash) => {
          Log.info(EXP_SOURCE, `${url} h- ${newHash}`);
          if (newHash !== DEFAULT_PERSONA_IMG_HASH) {
            this.setState({ pictureUrl: "data:image/png;base64," + url });
          }
        });
      });
    }

    this._loadSPComponentById(LIVE_PERSONA_COMPONENT_ID).then((sharedLibrary: any) => {
      const liveProfileCard: any = sharedLibrary.LivePersonaCard;
      this.setState({ profileCard: liveProfileCard });
    });
  }

  public render(): React.ReactElement<ILivePersonaCardProps> {
    return (
      <div className={this.props.className}>
        {
          this.state.profileCard ? this._renderOffice365PersonaCard() : this._renderChildren()
        }
      </div>
    );
  }

  private _renderChildren() {
    if (this.state.hasChildren) {
      return this.props.children;
    } else {
      return this._renderFallbackContactCard();
    }
  }

  private _renderOffice365PersonaCard() {
    const { profileCard } = this.state;
    const { serviceScope, user } = this.props;

    const userPrincipalName: string | undefined = user.email ? user.email : user.loginName;

    return React.createElement(profileCard, {
      className: styles.livePersonaCard,
      clientScenario: "PeopleWebPart",
      disableHover: false,
      hostAppPersonaInfo: {
        PersonaType: "User"
      },
      serviceScope: serviceScope,
      upn: userPrincipalName,
      onCardOpen: () => {
        if (this.props.onCardOpenCallback) {
          this.props.onCardOpenCallback();
        }
      },
      onCardClose: () => {
        if (this.props.onCardCloseCallback) {
          this.props.onCardCloseCallback();
        }
      }
    }, this._renderChildren());
  }


  /**
  * Load SPFx component by id, SPComponentLoader is used to load the SPFx components
  * @param componentId - componentId, guid of the component library
  */
  private _loadSPComponentById(componentId: string) {
    return new Promise((resolve, reject) => {
      SPComponentLoader.loadComponentById(componentId).then((component: any) => {
        resolve(component);
      }).catch((error) => {
        Log.error(EXP_SOURCE, error, this.props.serviceScope);
      });
    });
  }

  private _renderFallbackContactCard() {
    const { user, personaProps } = this.props;
    const props: IPersonaProps = {
      text: personaProps && personaProps.text ? personaProps.text : user.displayName,
      imageUrl: personaProps && personaProps.imageUrl ? personaProps.imageUrl : this.state.pictureUrl
    };
    return <Persona {...personaProps } {... props} />;
  }

  private _getPersonaSize(): string {
    const size: PersonaSize = this.props.personaProps && this.props.personaProps.size ? this.props.personaProps.size : PersonaSize.size48;
    let thumbnailSize: string = 'M';
    if (size <= 3) {
      thumbnailSize = 'S';
    } else if (size <= 6 && size > 5) {
      thumbnailSize = 'M';
    }

    return thumbnailSize;
  }

   /**
  * Get MD5Hash for the image url to verify whether user has default image or custom image
  * @param url
  */
 private _getMd5HashForUrl(url: string) {
  return new Promise((resolve, _reject) => {
    this._loadSPComponentById(MD5_MODULE_ID).then((library: any) => {
      const md5Hash = library.Md5Hash;
      if (md5Hash) {
        const convertedHash = md5Hash(url);
        resolve(convertedHash);
      }
    }).catch((error) => {
      Log.error(EXP_SOURCE, error, this.props.serviceScope);
      resolve(url);
    });
  });
}

private _getImageBase64(pictureUrl: string) {
  return new Promise((resolve, _reject) => {
    let image = new Image();
    image.addEventListener("load", () => {
      let tempCanvas = document.createElement("canvas");
      tempCanvas.width = image.width,
        tempCanvas.height = image.height;
        let ctx = tempCanvas.getContext("2d");
      if (ctx !== null) {
        ctx.drawImage(image, 0, 0);
      }
      let base64Str;
      try {
        base64Str = tempCanvas.toDataURL("image/png");
      } catch (e) {
        return "";
      }
      base64Str = base64Str.replace(/^data:image\/png;base64,/, "");
      resolve(base64Str);
    });
    image.src = pictureUrl;
  });
}


}
