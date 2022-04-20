import * as React from "react";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { ServiceScope, Log, Text } from "@microsoft/sp-core-library";
import { Persona, PersonaSize, IPersonaProps, PersonaInitialsColor } from "@microsoft/office-ui-fabric-react-bundle";

export interface IPeopleCardProps {
    primaryText: string;
    secondaryText?: string;
    tertiaryText?: string;
    optionalText?: string;
    moreDetail?: HTMLElement | string;
    email: string;
    serviceScope: ServiceScope;
    class: string;
    size: PersonaSize;
    initialsColor?: PersonaInitialsColor;
    onCardOpenCallback?: Function; 
    onCardCloseCallback?: Function;   
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

    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            pictureUrl: null,
            personaCard: null
        };
    }

    public componentDidMount(): any {
        const size = this.getPersonaSize();
        const personaImgUrl = Text.format(PROFILE_IMAGE_URL, size, this.props.email);

        this.getImageBase64(personaImgUrl).then((url: string) => {
            this.getMd5HashForUrl(url).then((newHash)=>{
                Log.info(EXP_SOURCE, `${url} h- ${newHash}`);
                if (newHash !== DEFAULT_PERSONA_IMG_HASH) {
                    this.setState({ pictureUrl: "data:image/png;base64," + url });
                }
            });
        });

        this.loadSPComponentById(LIVE_PERSONA_COMPONENT_ID).then((sharedLibrary: any) => {
            const livePersonaCard: any = sharedLibrary.LivePersonaCard;
            this.setState({ personaCard: livePersonaCard });
        });
    }

    private getPersonaSize(){
        let size = 'M';
        if(this.props.size <= 3){
            size = 'S';
        }else if(this.props.size <= 6 && this.props.size > 5){
            size = 'M';
        }

        return size;
    }

    private getMoreDetailElement(){
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
    private defaultContactCard() {
        return React.createElement<IPersonaProps>(Persona, {
            primaryText: this.props.primaryText,
            secondaryText: this.props.secondaryText,
            tertiaryText: this.props.tertiaryText,
            optionalText: this.props.optionalText,
            imageUrl: this.state.pictureUrl,
            initialsColor: this.props.initialsColor ? this.props.initialsColor : "#808080",
            className: this.props.class,
            size: this.props.size,
            imageShouldFadeIn: false,
            imageShouldStartVisible: true
        }, this.getMoreDetailElement());
    }

    /**
     * Configure SPFx LivePersona card from SPFx component loader
     */
    private spfxLiverPersonaCard() {
        return React.createElement(this.state.personaCard, {
            className: 'people',
            clientScenario: "PeopleWebPart",
            disableHover: false,
            hostAppPersonaInfo: {
                PersonaType: "User"
            },
            serviceScope: this.props.serviceScope,
            upn: this.props.email,
            onCardOpen: () => {
                if(this.props.onCardOpenCallback){
                    this.props.onCardOpenCallback();
                }
            },
            onCardClose: () => {
                if(this.props.onCardCloseCallback){
                    this.props.onCardCloseCallback();
                }
            }
        }, this.defaultContactCard());
    }

    /**
     * Get MD5Hash for the image url to verify whether user has default image or custom image
     * @param url 
     */
    private getMd5HashForUrl(url: string) {
        return new Promise((resolve, reject) => {
            this.loadSPComponentById(MD5_MODULE_ID).then((library: any) => {
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

    private getImageBase64(pictureUrl: string) {
        return new Promise((resolve, reject) => {
            let image = new Image();
            image.addEventListener("load", () => {
                let tempCanvas = document.createElement("canvas");
                tempCanvas.width = image.width,
                    tempCanvas.height = image.height,
                    tempCanvas.getContext("2d").drawImage(image, 0, 0);
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

    /**
     * Load SPFx component by id, SPComponentLoader is used to load the SPFx components
     * @param componentId - componentId, guid of the component library
     */
    private loadSPComponentById(componentId: string) {
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
                    this.state.personaCard ? this.spfxLiverPersonaCard() : this.defaultContactCard()
                }
            </div>
        );
    }
}