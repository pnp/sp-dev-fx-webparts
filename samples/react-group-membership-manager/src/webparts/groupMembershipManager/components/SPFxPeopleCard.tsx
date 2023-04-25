/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { ServiceScope, Log, Text } from "@microsoft/sp-core-library";
import { Persona, PersonaSize, IPersonaProps, PersonaInitialsColor } from "office-ui-fabric-react";

export interface IPeopleCardProps {
    primaryText: string;
    secondaryText?: string;
    tertiaryText?: string;
    optionalText?: string;
    moreDetail?: HTMLElement | string;
    email: string;
    serviceScope: ServiceScope;
    class?: string;
    size: PersonaSize;
    initialsColor?: PersonaInitialsColor;
}

export interface IPeopleCardState {
    pictureUrl: string;
    personaCard: any;
}

const EXP_SOURCE: string = "SPFxPeopleCardComponent";

const MD5_MODULE_ID: string = "8494e7d7-6b99-47b2-a741-59873e42f16f";
const LIVE_PERSONA_COMPONENT_ID: string = "914330ee-2df2-4f6e-a858-30c23a812408";
const DEFAULT_PERSONA_IMG_HASH: string = "7ad602295f8386b7615b582d87bcc294";
const PROFILE_IMAGE_URL: string = '/_layouts/15/userphoto.aspx?size={0}&accountname={1}';

export default class SPFxPeopleCard extends React.PureComponent<IPeopleCardProps, IPeopleCardState>{
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    state: IPeopleCardState = { personaCard: null, pictureUrl: null };

    public componentDidMount(): any {
        const size: string = this._getPersonaSize();
        const personaImgUrl: string = Text.format(PROFILE_IMAGE_URL, size, this.props.email);

        this._getImageBase64(personaImgUrl).then((url: string) => {
            this._getMd5HashForUrl(url).then((newHash)=>{
                Log.info(EXP_SOURCE, `${url} h- ${newHash}`);
                if (newHash !== DEFAULT_PERSONA_IMG_HASH) {
                    this.setState({ pictureUrl: "data:image/png;base64," + url });
                }
            }).catch(console.error);
        }).catch(console.error);

        this._loadSPComponentById(LIVE_PERSONA_COMPONENT_ID).then((sharedLibrary: any) => {
            const livePersonaCard: any = sharedLibrary.LivePersonaCard;
            this.setState({ personaCard: livePersonaCard });
        }).catch(console.error);
    }

    private _getPersonaSize(): string {
        let size: string = 'M';
        if(this.props.size <= 3){
            size = 'S';
        }else if(this.props.size <= 6 && this.props.size > 5){
            size = 'M';
        }

        return size;
    }

    private _getMoreDetailElement(): React.ReactElement{
        if(React.isValidElement(this.props.moreDetail)){
            return React.createElement('div',
            { 
                className: 'more-persona-details' 
            }, this.props.moreDetail);
        }else{
            return React.createElement('div',
            { 
                className: 'more-persona-details',
                dangerouslySetInnerHTML: { __html: this.props.moreDetail} 
            });
        }
    }

    /**
     * Display default OfficeUIFabric Persona card if SPFx LivePersonaCard not loaded
     */
    private _defaultContactCard(): React.ReactElement {
        return React.createElement<IPersonaProps>(Persona, {
            text: this.props.primaryText,
            secondaryText: this.props.secondaryText,
            tertiaryText: this.props.tertiaryText,
            optionalText: this.props.optionalText,
            imageUrl: this.state.pictureUrl,
            initialsColor: this.props.initialsColor ? this.props.initialsColor : "#808080",
            className: this.props.class,
            size: this.props.size,
            imageShouldFadeIn: false,
            imageShouldStartVisible: true
        }, this._getMoreDetailElement());
    }

    /**
     * Configure SPFx LivePersona card from SPFx component loader
     */
    private _spfxLiverPersonaCard(): React.ReactElement {
        return React.createElement(this.state.personaCard, {
            className: 'people',
            clientScenario: "PeopleWebPart",
            disableHover: false,
            hostAppPersonaInfo: {
                PersonaType: "User"
            },
            serviceScope: this.props.serviceScope,
            upn: this.props.email
        }, this._defaultContactCard());
    }

    /**
     * Get MD5Hash for the image url to verify whether user has default image or custom image
     * @param url 
     */
    private _getMd5HashForUrl(url: string): Promise<string|any> {
        return new Promise((resolve, reject) => {
            this._loadSPComponentById(MD5_MODULE_ID).then((library: any) => {
                const md5Hash: any = library.Md5Hash;
                if (md5Hash) {
                    const convertedHash: any = md5Hash(url);
                    resolve(convertedHash);
                }
            }).catch((error) => {
                Log.error(EXP_SOURCE, error, this.props.serviceScope);
                resolve(url);
            });
        });
    }

    private _getImageBase64(pictureUrl: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const image: HTMLImageElement = new Image();
            image.addEventListener("load", () => {
                const tempCanvas: HTMLCanvasElement = document.createElement("canvas");
                tempCanvas.width = image.width;
                tempCanvas.height = image.height;
                tempCanvas.getContext("2d").drawImage(image, 0, 0);
                let base64Str: string;
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

    /**
     * Load SPFx component by id, SPComponentLoader is used to load the SPFx components
     * @param componentId - componentId, guid of the component library
     */
    private _loadSPComponentById(componentId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            SPComponentLoader.loadComponentById(componentId).then((component: any) => {
                resolve(component);
            }).catch((error) => {
                Log.error(EXP_SOURCE, error, this.props.serviceScope);
            });
        });
    }

    public render(): JSX.Element {
        return (
            <div className={this.props.class}>
                {
                    this.state.personaCard ? this._spfxLiverPersonaCard() : this._defaultContactCard()
                }
            </div>
        );
    }
}