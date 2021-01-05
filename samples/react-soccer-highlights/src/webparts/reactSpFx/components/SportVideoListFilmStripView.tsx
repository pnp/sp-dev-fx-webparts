import React from "react";
import { ISportsHighlightProps, ISportsHighlights } from "./IReactSpFxProps";
import { FilmstripLayout } from './filmstripLayout/index';
import  styles from './filmstripLayout/FilmstripLayout.module.scss';

import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardDetails,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
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
  
  public render(): React.ReactElement<ISportsHighlights> {
    const videos = this.props.highLights;
    console.log("Video Highlights", videos);

    return (
      <div>
        <div className={styles.filmStrip}>
          <FilmstripLayout
            ariaLabel={
              "Soccer highlights web part, showing soccer highlights. Use right and left arrow keys to navigate between cards in the film strip."
            }
          >
            {videos.map((video: ISportsHighlightProps, i) => {
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
                    onClickHref={video.url}
                  >
                                <DocumentCardPreview {...previewProps} />
                    <DocumentCardDetails>
                    <DocumentCardTitle
                title={video.side1.name+ ' vs ' + video.side2.name}
                shouldTruncate={true}
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
