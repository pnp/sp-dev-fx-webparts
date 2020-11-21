import React from "react";
import ReactDOM from "react-dom";
import { ISportsHighlightProps, ISportsHighlights } from "./IReactSpFxProps";
import SportsVideo from "./SportsVideo";
import ReactMarkdownWithHtml from "react-markdown/with-html";
import { FilmstripLayout } from './filmstripLayout/index';
import  styles from './filmstripLayout/FilmstripLayout.module.scss';

import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardDetails,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  DocumentCardLocation,
  DocumentCardType,
} from "office-ui-fabric-react/lib/DocumentCard";

import { ImageFit } from "office-ui-fabric-react/lib/Image";
export interface IDialogState
{
  isDialogOpen: boolean;
}
export default class SportVideoListFilmStripView extends React.Component<
  ISportsHighlights,
  IDialogState
> {
  constructor(props: ISportsHighlights, state: IDialogState) {
    super(props);
    this.state = {
      isDialogOpen: false,
    };
  }
  openDialog = (video: ISportsHighlightProps) => {
    console.log("I awas clicked:" + video.title);
    this.setState({ isDialogOpen: true });
  };
  handleClose = () => this.setState({ isDialogOpen: false });

  public render(): React.ReactElement<ISportsHighlights> {
    const videos = this.props.highLights;

    return (
      <div>
        <div className={styles.filmStrip}>
          <FilmstripLayout
            ariaLabel={
              "Sample filmstrip layout web part, showing sample items., Use right and left arrow keys to navigate between cards in the film strip."
            }
          >
            {this.props.highLights.map((video: ISportsHighlightProps, i) => {
              let videoDate = new Date(video.date.toString());
              const previewProps: IDocumentCardPreviewProps = {
                previewImages: [
                  {
                    previewImageSrc: video.thumbnail,
                    imageFit: ImageFit.cover,
                    height: 130,
                  },
                ],
              };

              return (
                <div
                  key={i}
                  data-is-focusable={true}
                  role="listitem"
                  aria-label={video.title}
                >
                  <DocumentCard
                    type={DocumentCardType.normal}
                    onClick={(ev: React.SyntheticEvent<HTMLElement>) =>
                      this.openDialog(video)
                    }
                  >
                    {/* <DocumentCardPreview {...previewProps} /> */}
                    <DocumentCardDetails>
                      {/* <DocumentCardTitle
                        title={video.title}
                        shouldTruncate={false}
                      /> */}
                      <div
                        id={"video" + video.title}
                        dangerouslySetInnerHTML={{
                          __html: video.embed,
                        }}
                        style={{ width: 268, padding: "2px" }}
                        title={"click to play " + video.title}
                      />
                      <DocumentCardActivity
                        activity={
                          videoDate.toLocaleString()
                        }
                        people={[
                          {
                            name: video.competition.name,
                            profileImageSrc: video.thumbnail,
                          },
                        ]}
                      />
                    </DocumentCardDetails>
                  </DocumentCard>
                </div>
              );
            })}
          </FilmstripLayout>
        </div>
      </div>
    );
  }
}
