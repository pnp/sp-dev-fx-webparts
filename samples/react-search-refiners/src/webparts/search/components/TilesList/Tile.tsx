import * as React from "react";
import ITileProps from "./ITileProps";
import {
    DocumentCard,
    DocumentCardActions,
    DocumentCardActivity,
    DocumentCardLocation,
    DocumentCardPreview,
    DocumentCardTitle,
    IDocumentCardPreviewProps
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import * as moment from "moment";
import { isEmpty } from '@microsoft/sp-lodash-subset';
import "../SearchWebPart.scss";

const PREVIEW_IMAGE_WIDTH: number = 204;
const PREVIEW_IMAGE_HEIGHT: number = 111;

export default class Tile extends React.Component<ITileProps, null> {

    public render() {

        const item = this.props.item;

        let previewSrc = "";
        if (!isEmpty(item.SiteLogo)) previewSrc = item.SiteLogo;
        else if (!isEmpty(item.PreviewUrl)) previewSrc = item.PreviewUrl;
        else if (!isEmpty(item.PictureThumbnailURL)) previewSrc = item.PictureThumbnailURL;
        else if (!isEmpty(item.ServerRedirectedPreviewURL)) previewSrc = item.ServerRedirectedPreviewURL;

        let iconSrc = this.props.showFileIcon ? item.iconSrc : "";

        let previewProps: IDocumentCardPreviewProps = {
            previewImages: [
                {
                    url: item.ServerRedirectedURL ? item.ServerRedirectedURL : item.Path,
                    previewImageSrc: previewSrc,
                    iconSrc: iconSrc,
                    imageFit: ImageFit.cover,
                    height: PREVIEW_IMAGE_HEIGHT,
                }
            ],
        };

        return (
            <DocumentCard onClickHref={item.ServerRedirectedURL ? item.ServerRedirectedURL : item.Path} className="searchWp__resultCard">
                <div className="searchWp__tile__iconContainer" style={{ "height": PREVIEW_IMAGE_HEIGHT }}>
                    <DocumentCardPreview { ...previewProps } />
                </div>
                <DocumentCardTitle title={item.Title} shouldTruncate={false} />
                <div className="searchWp__tile__footer" hidden={!this.props.showCreatedDate}>
                    <span>{moment(item.Created).isValid() ? moment(item.Created).format("L") : null}</span>
                </div>
            </DocumentCard>
        );
    }
}
