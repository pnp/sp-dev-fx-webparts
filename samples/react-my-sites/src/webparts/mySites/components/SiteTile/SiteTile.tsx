import * as React from "react";
import { getUserPhoto } from "../../../../Utils/Utils";
import { ISiteTileProps } from "./ISiteTileProps";
import { ISiteTileState } from "./ISiteTileState";
import { escape } from "@microsoft/sp-lodash-subset";
import { ITitleData } from "../../../../Entities/ITitleData";
import strings from "MySitesWebPartStrings";
import styles from './SiteTile.module.scss';
import { useUserSites } from '../../../../Hooks/useUserSites';
import {
  mergeStyleSets,
  IDocumentCardStyles,
  DocumentCardTitle,
  DocumentCardPreview,
  DocumentCardDetails,
  DocumentCardActivity,
  ImageFit,
  Label,
  Icon,
  IIconStyles,
  DocumentCard,
  DocumentCardType,
  FontSizes,
  IDocumentCardActivityStyles,
  IDocumentCardActivityStyleProps,
  FontIcon,
  ImageIcon,
  css,
  TooltipHost,
} from "office-ui-fabric-react";


const _siteLogoSP: string =
    "https://static2.sharepointonline.com/files/fabric-cdn-prod_20200430.002/assets/brand-icons/product/svg/sharepoint_48x1.svg";

const _siteLogoOndrive: string =
    "https://static2.sharepointonline.com/files/fabric-cdn-prod_20200430.002/assets/brand-icons/product/svg/onedrive_48x1.svg";

const _teamsLogo:string = "https://static2.sharepointonline.com/files/fabric-cdn-prod_20200430.002/assets/brand-icons/product/svg/teams_48x1.svg";

export const SiteTile: React.FunctionComponent<ISiteTileProps> = (
  props: ISiteTileProps
) => {
  const [state, setState] = React.useState<ISiteTileState>({
    hasTeam: false,
    tileData: {} as ITitleData,
  });

  const { checkGroupHasTeam } = useUserSites();
  // Global Compoment Styles
  const stylesTile = mergeStyleSets({
    imageContainer: {
      display: "flex",
      width: 104,
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      fontSize:  props.themeVariant ? props.themeVariant.fonts.superLarge.fontSize: 24,
      color: props.themeVariant ? props.themeVariant.palette.themePrimary: '',
      backgroundColor: props.themeVariant ? props.themeVariant.palette.neutralLighterAlt: '',
    },
    webPartTile: {
      paddingLeft: 30,
      paddingTop: 20,
    },
    titleContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "start",
    },
   imageClass: {
      marginTop: 8,
      fontSize: 20,
      height: 20,
      width: 20,
      marginRight: 7,
      color: props.themeVariant ? props.themeVariant.palette.themePrimary: '',
   }
  });

  const documentCardStyles: Partial<IDocumentCardStyles> = {
    root: {
      maxWidth: "100%",
      maxHeight: 106,
      marginTop: 10,
      marginLeft: 7,
      marginRight: 7,
    },
  };

  const groupIconStyles: Partial<IIconStyles> = {
    root: {
      fontSize: 20,
      color: props.themeVariant ? props.themeVariant.palette.themePrimary: 'white',
      marginTop: 8,
      marginRight: 16,
    },
  };

  const DocumentCardActivityStyles: Partial<IDocumentCardActivityStyles> = {
    root: { paddingBottom: 0 },
  };

  const DocumentCardDetailsStyles: Partial<IDocumentCardActivityStyles> = {
    root: { justifyContent: "flex-start" },

  };


  let _activityUserEmail: string = "N/A";
  let _activityUser: string = "N/A";
  let _activityDate: string = "N/A";
  let _activityMessage: string = "No Information";
  let _userPhoto: string = undefined;

  const {
    SiteLogo,
    Title,
    GroupId,
    LastModifiedTime,
    ModifiedById,
    SiteGroup,
    OriginalPath,
    CreatedBy,
    Created,

  } = props.site;

  // Use Effect on Mounting
  React.useEffect(() => {
    (async () => {
      if (ModifiedById) {
        const _modifiedBySplit = ModifiedById.split("|");
        _activityUserEmail = _modifiedBySplit[0].trim();
        _activityUser = _modifiedBySplit[1].trim();
        _activityDate = new Date(LastModifiedTime).toLocaleString();
        _activityMessage = `${strings.ChangedOnLabel}${_activityDate}`;
        try {
          if (_activityUserEmail) {
            console.log(_activityUserEmail);
            _userPhoto = await getUserPhoto(_activityUserEmail);
          }
        } catch (error) {
          console.log(error);
        }
        //  _userPhoto =  `/_layouts/15/userphoto.aspx?size=M&accountname=${_activityUserEmail}`;
      } else {
        _activityUserEmail = undefined;
        _activityUser = CreatedBy;
        _activityDate = new Date(Created).toLocaleString();
        _activityMessage = `${strings.CreatedOnLabel}${_activityDate}`;
        _userPhoto = undefined;
      }

      // If is a group check if has a team
      let _hasTeam:boolean = false;
      if (GroupId){
        _hasTeam = await checkGroupHasTeam(GroupId, props.msGraphClient);
      }
      // Update State
      setState({
        hasTeam: _hasTeam,
        tileData: {
          activityDate: _activityDate,
          activityUser: _activityUser,
          activityMessage: _activityMessage,
          activityUserEmail: _activityUserEmail,
          userPhoto: _userPhoto
        }
      });
    })();
  }, []);

  // destrectur TileData Activity
  const {
    activityDate,
    activityMessage,
    activityUser,
    activityUserEmail,
    userPhoto,
  } = state.tileData;

  const { hasTeam } = state;
  // Render Component
  return (
    <>
      <DocumentCard
        styles={documentCardStyles}
        type={DocumentCardType.compact}
        onClickHref={OriginalPath}
      >
        {props.site.SiteLogo ? (
          <DocumentCardPreview
            className={stylesTile.imageContainer}
            previewImages={[
              {
                previewImageSrc: SiteLogo,
                width: 104,
                height: 104,
                imageFit: ImageFit.cover,
              },
            ]}
          ></DocumentCardPreview>
        ) : (
          <DocumentCardPreview
            className={stylesTile.imageContainer}
            previewImages={[
              {
                previewImageSrc:
                  SiteGroup == "OneDrive" ? _siteLogoOndrive : _siteLogoSP,
                width: 68,
                height: 68,
                imageFit: ImageFit.cover,
              },
            ]}
          ></DocumentCardPreview>
        )}
        <DocumentCardDetails styles={DocumentCardDetailsStyles}>
          <div className={stylesTile.titleContainer}>
            <DocumentCardTitle title={Title} shouldTruncate styles={{root:{flexGrow:2}}}></DocumentCardTitle>
            {GroupId && hasTeam && (
              <ImageIcon
              title="Group has a Team"
              imageProps={{
                src: _teamsLogo,
                className: stylesTile.imageClass,
              }}
            />

            )}
            {GroupId && (
              <Icon
                styles={groupIconStyles}
                iconName="Group"
                title="Office 365 Group"
              ></Icon>
            )}

            {SiteGroup == "OneDrive" && (
              <Icon
                styles={groupIconStyles}
                iconName="onedrive"
                title="User OneDrive"
              ></Icon>
            )}
            {SiteGroup == "SharePoint" && !GroupId && (
              <Icon
                styles={groupIconStyles}
                iconName="SharepointAppIcon16"
                title="SharePoint Site"
              ></Icon>
            )}
          </div>
          <TooltipHost content={activityMessage} calloutProps={{gapSpace:5}}>
          <DocumentCardActivity
            styles={DocumentCardActivityStyles}
            activity={activityMessage}
            people={[{ name: activityUser, profileImageSrc: userPhoto }]}
          />
          </TooltipHost>
        </DocumentCardDetails>
      </DocumentCard>
    </>
  );
};
