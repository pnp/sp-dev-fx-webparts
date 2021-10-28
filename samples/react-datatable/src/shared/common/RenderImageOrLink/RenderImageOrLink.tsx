import * as React from 'react';
import * as strings from 'ReactDatatableWebPartStrings';
import { isImageUrl, isNullOrUndefined } from '../../../shared/utilities/utilities';
import { Link } from '@material-ui/core';
import { Image, IImageProps, ImageFit } from 'office-ui-fabric-react/lib/Image';
import styles from '../ExportListItemsToCSV/ExportListItemsToCSV.module.scss';

interface IImageOrLinkProps {
    url: string;
    description: string;
}

export function RenderImageOrLink(props: IImageOrLinkProps) {

    const [isImage, setIsImage] = React.useState<boolean>();
    let { url, description } = props;

    React.useEffect(() => {
        isImageUrl(url).then(response => {
            setIsImage(response);
        });
    }, [props]);

    return <>
        {
            !isNullOrUndefined(isImage) && (
                isImage ? (
                    <Image
                        src={url}
                        alt={description}
                        height={50}
                        width={50}
                        onClick={() => window.location.href =  url }
                        imageFit={ImageFit.cover}
                    />
                ) :
                    (
                        <Link href={url} target="_blank">{description}</Link>
                    )
            )
        }
    </>;

}
