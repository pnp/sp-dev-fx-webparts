import * as React from 'react';

import { IAnalysisDialogContentProps } from './IAnalysisDialogContentProps';
import { IAnalysisDialogContentState } from './IAnalysisDialogContentState';

import styles from './AnalysisDialogContent.module.scss';
import { css } from "@uifabric/utilities/lib/css";

// Used for localized text
import * as strings from 'ProfilePhotoEditorWebPartStrings';
import { Text } from '@microsoft/sp-core-library';

// Used to determine if we should be making real calls to APIs or just mock calls
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';

// Stuff we use for the dialog
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import {
  MessageBar,
  MessageBarType
} from 'office-ui-fabric-react';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';


// Stuff we use for analysis results
import { IAnalysisService, AnalysisService, MockAnalysisService } from '../../../../services/AnalysisServices';
import { AnalyzeImageInStreamResponse, ImageTag } from '@azure/cognitiveservices-computervision/esm/models';
import AnalysisChecklist from '../AnalysisChecklist/AnalysisChecklist';

// This is used if you use the graph client to update pictures
import { MSGraphClient } from '@microsoft/sp-http';

export class AnalysisDialogContent extends
  React.Component<IAnalysisDialogContentProps, IAnalysisDialogContentState> {

  constructor(props: IAnalysisDialogContentProps) {
    super(props);
    this.state = {
      isAnalyzing: true,
      analysis: undefined,
      isValid: false,
      isSubmitted: false
    };
  }

  /**
   * When the dialog is loaded, perform the analysis
   */
  public async componentDidMount() {
    if (this.state.isAnalyzing) {
      const { azureKey, azureEndpoint, photoRequirements } = this.props;

      // Get the analysis service
      let service: IAnalysisService = undefined;

      if (Environment.type === EnvironmentType.Local || Environment.type === EnvironmentType.Test) {
        //Running on Unit test environment or local workbench
        service = new MockAnalysisService(azureKey, azureEndpoint);
      } else if (Environment.type === EnvironmentType.SharePoint) {
        //Modern SharePoint page
        service = new AnalysisService(azureKey, azureEndpoint);
      }

      // Perform the analysis
      const analysis: AnalyzeImageInStreamResponse = await service.AnalyzeImage(this.props.imageUrl);

      // Evaluate analysis against requirements

      // Is this a portrait?
      const isPortrait: boolean = analysis && analysis.categories && analysis.categories.filter(c => c.name === "people_portrait").length > 0;

      // If the portrait valid?
      const isPortraitValid: boolean = photoRequirements.requirePortrait ? isPortrait : true;

      // is there only one person in the photo?
      const onlyOnePersonValid: boolean = analysis.faces.length === 1;

      // Is this a clipart?
      const isClipartValid: boolean = photoRequirements.allowClipart ? true : analysis.imageType.clipArtType === 0;

      // Is this a line drawing?
      const isLinedrawingValid: boolean = photoRequirements.allowLinedrawing ? true : analysis.imageType.lineDrawingType === 0;

      // Are we looking at naughty pictures?
      const isAdultValid: boolean = photoRequirements.allowAdult ? true : !analysis.adult.isAdultContent;
      const isRacyValid: boolean = photoRequirements.allowRacy ? true : !analysis.adult.isRacyContent;
      const isGoryValid: boolean = photoRequirements.allowGory ? true : !analysis.adult.isGoryContent;

      // Verify against all forbidden keywords
      let invalidKeywords: string[] = [];
      if (photoRequirements.forbiddenKeywords && photoRequirements.forbiddenKeywords.length > 0) {
        photoRequirements.forbiddenKeywords.forEach((keyword: string) => {
          if (analysis.tags.filter((tag: ImageTag) => {
            return keyword.toLowerCase() === tag.name;
          }).length > 0) {
            invalidKeywords.push(keyword);
          }
        });
      }

      // Did we find forbidden keywords
      const keywordsValid: boolean = invalidKeywords.length < 1;

      // Look for celebrities
      let celebName: string = undefined;
      const categories = analysis && analysis.categories && analysis.categories.filter(c => c.detail !== undefined && c.detail.celebrities !== undefined);
      if (categories && categories.length > 0) {
        // Get the first celebrity
        celebName = categories[0] && categories[0].detail && categories[0].detail.celebrities[0] && categories[0].detail.celebrities[0].name;
      }

      // Photo is valid if it meets all requirements
      const isValid: boolean = isPortraitValid
        && onlyOnePersonValid
        && isClipartValid
        && isLinedrawingValid
        && isAdultValid
        && isRacyValid
        && isGoryValid
        && keywordsValid;

      // Set the state so we can refresh the status
      this.setState({
        isAnalyzing: false,
        analysis,
        isValid,
        isPortrait,
        isPortraitValid,
        onlyOnePersonValid,
        isClipartValid,
        isLinedrawingValid,
        isAdultValid,
        isRacyValid,
        isGoryValid,
        keywordsValid,
        invalidKeywords,
        celebrity: celebName
      });
    }

  }

  public render(): JSX.Element {

    const { analysis,
      isAnalyzing,
      isValid,
      isPortrait,
      isPortraitValid,
      isAdultValid,
      isRacyValid,
      isGoryValid,
      isClipartValid,
      isLinedrawingValid,
      onlyOnePersonValid,
      invalidKeywords,
      keywordsValid,
      celebrity } = this.state;

    if (analysis !== undefined) {
      console.log("Analysis", analysis);
    }

    return (
      <Panel
        className={styles.analysisDialog}
        isOpen={true}
        onDismiss={(ev?: React.SyntheticEvent<HTMLElement, Event>) => this.onDismiss(ev)}
        isLightDismiss={true}
        onRenderFooterContent={this.onRenderFooterContent}
      >
        <h1 className={styles.panelHeader}>{strings.PanelTitle}</h1>
        <Image
          className={styles.thumbnailImg}
          imageFit={ImageFit.centerContain}
          src={this.props.imageUrl}
        />
        {isAnalyzing &&
          <div className={styles.diode}>
            <div className={styles.laser}></div>
          </div>
        }

        {isAnalyzing &&
          <ProgressIndicator label={strings.AnalyzingLabel} />
        }

        <div className={styles.analysisOutcome}>
          <div className={styles.section}>
            <Label><strong>{strings.DescriptionLabel}</strong></Label>
            {isAnalyzing ? <Shimmer /> : analysis.description && analysis.description.captions && analysis.description.captions.length > 0 && <span>{analysis.description.captions[0].text}</span>}
          </div>

          <div className={styles.section}><Label><strong>{strings.EstimatedAgeLabel}</strong></Label>
            {isAnalyzing ? <Shimmer width="10%" /> : analysis.faces.length > 0 && <span>{analysis.faces[0].age}</span>}
          </div>

          <div className={styles.section}><Label><strong>{strings.GenderLabel}</strong></Label>
            {isAnalyzing ? <Shimmer width="20%" /> : analysis.faces.length > 0 && <span>{analysis.faces[0].gender}</span>}
          </div>
        </div>

        {!isAnalyzing &&
          <div className={styles.iconContainer} ><Icon iconName={isValid ? "CheckMark" : "StatusCircleErrorX"} className={css(styles.icon, isValid ? styles.iconGood : styles.iconBad)} /></div>
        }

        {!isAnalyzing && celebrity !== undefined &&
          <div><p>{Text.format(strings.YouLookLikeACelebrity, celebrity)}</p></div>
        }


        {!isAnalyzing && isValid &&
          <div>{strings.AnalysisGoodLabel}</div>
        }

        {!isAnalyzing && !isValid &&
          <div>{strings.AnalysisBadLabel}</div>
        }

        {!isAnalyzing &&
          <div className={styles.section}>
            <ul className={styles.analysisChecklist}>
              <AnalysisChecklist title={strings.PortraitLabel} value={isPortrait ? strings.YesLabel : strings.NoLabel} isValid={isPortraitValid} />
              <AnalysisChecklist title={strings.NumberOfFacesDetectedLabel} value={`${analysis.faces.length}`} isValid={onlyOnePersonValid} />
              <AnalysisChecklist title={strings.ClipartLabel} value={analysis.imageType.clipArtType > 0 ? strings.YesLabel : strings.NoLabel} isValid={isClipartValid} />
              <AnalysisChecklist title={strings.LineDrawingLabel} value={analysis.imageType.lineDrawingType > 0 ? strings.YesLabel : strings.NoLabel} isValid={isLinedrawingValid} />
              <AnalysisChecklist title={strings.RacyLabel} value={analysis.adult.isRacyContent ? strings.YesLabel : strings.NoLabel} isValid={isRacyValid} />
              <AnalysisChecklist title={strings.AdultLabel} value={analysis.adult.isAdultContent ? strings.YesLabel : strings.NoLabel} isValid={isAdultValid} />
              <AnalysisChecklist title={strings.GoryLabel} value={analysis.adult.isGoryContent ? strings.YesLabel : strings.NoLabel} isValid={isGoryValid} />
              <AnalysisChecklist title={strings.ForbiddenKeywordsLabel} value={keywordsValid ? strings.NoKeywords : invalidKeywords.join(', ')} isValid={keywordsValid} />
            </ul>
          </div>
        }

        {!isAnalyzing && isValid &&
          <div>{strings.PanelInstructionsLabel}<strong>{strings.UpdateButtonLabel}</strong>.</div>
        }

        {this.state.isSubmitted &&
          <MessageBar
            messageBarType={MessageBarType.success}
            isMultiline={false}
          >
            {strings.SuccessMessage}
          </MessageBar>
        }

      </Panel>
    );
  }


  private onRenderFooterContent = (): JSX.Element => {
    return (
      <div>
        <PrimaryButton onClick={(_ev) => this.onUpdateProfilePhoto()} style={{ marginRight: '8px' }} disabled={this.state.isValid !== true}>
          {strings.UpdateButtonLabel}
        </PrimaryButton>
        <DefaultButton onClick={(_ev) => this.onDismiss()}>{strings.CancelButtonLabel}</DefaultButton>
      </div>
    );
  }

  private onUpdateProfilePhoto = async (_ev?: React.SyntheticEvent<HTMLElement, Event>) => {
    // Get image array buffer
    const profileBlob: Blob = this.props.blob;

    // Submit using the approach you want
    this.updateProfilePicUsingGraph(profileBlob);
    //this.updateProfilePicUsingPnP(profileBlob);
  }

  // private async updateProfilePicUsingPnP(blob: Blob) {
  //   pnpSetup({
  //     spfxContext: this.props.context
  //   });

  //   console.log("Update profile pic using PnP", blob);
  //   const response = await sp.profiles.setMyProfilePic(blob);
  //   console.log("Profile property Updated", response);
  //   this.setState({
  //     isSubmitted: true
  //   });
  // }

  // Update photo using Graph.
  // See https://docs.microsoft.com/en-us/graph/api/profilephoto-update?view=graph-rest-1.0&tabs=http
  private async updateProfilePicUsingGraph(blob: Blob) {
    this.props.context.msGraphClientFactory
      .getClient().then((client: MSGraphClient) => {
        client
          .api("me/photo/$value")
          .version("v1.0").header("Content-Type", blob.type).put(blob, (error, _res) => {
            if (error) {
              console.log("Error updating profile", error);
            } else {
              console.log("Profile property Updated");
              this.setState({
                isSubmitted: true
              });
            }
          });
      });
  }

  private onDismiss = (_ev?: React.SyntheticEvent<HTMLElement, Event>) => {
    this.props.onDismiss();
  }
}
