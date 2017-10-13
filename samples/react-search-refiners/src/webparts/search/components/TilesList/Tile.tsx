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
import "../SearchWebPart.scss";

const PREVIEW_IMAGE_WIDTH: number = 204;
const PREVIEW_IMAGE_HEIGHT: number = 111;

export default class Tile extends React.Component<ITileProps, null> {

    public render() {

        const item = this.props.item;
                    
        let previewProps: IDocumentCardPreviewProps = {
            previewImages: [
                {
                    url: item.ServerRedirectedURL ? item.ServerRedirectedURL : item.Path,
                    previewImageSrc: item.ServerRedirectedPreviewURL,
                    iconSrc: item.iconSrc,
                    imageFit: ImageFit.cover,
                    height: PREVIEW_IMAGE_HEIGHT,
                }
            ],
        };  
                        
        return (
            <DocumentCard onClickHref={ item.ServerRedirectedURL ? item.ServerRedirectedURL : item.Path } className="searchWp__resultCard">
                <div className="searchWp__tile__iconContainer" style={{ "height": PREVIEW_IMAGE_HEIGHT }}>
                    <DocumentCardPreview { ...previewProps } />
                </div>
                <DocumentCardTitle title={ item.Title } shouldTruncate={ false } />
                <div className="searchWp__tile__footer">
                    <span>{ moment(item.Created).isValid() ? moment(item.Created).format("L"): null }</span>                                       
                </div>          
            </DocumentCard>
        );
    }
}
