import * as React from 'react';
import { IDocumentCardExampleWebPartProps } from '../IDocumentCardExampleWebPartProps';

import {
  DocumentCard,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardActivity,
  IDocumentCardPreviewProps
} from 'office-ui-fabric-react/lib/DocumentCard';

require('set-webpack-public-path!');

export interface IDocumentCardExampleProps extends IDocumentCardExampleWebPartProps {
}

export default class DocumentCardExample extends React.Component<IDocumentCardExampleProps, {}> {
  public render(): JSX.Element {
    const previewProps: IDocumentCardPreviewProps = {
      previewImages: [
        {
          previewImageSrc: require('document-preview.png'),
          iconSrc: require('icon-ppt.png'),
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        }
      ]
    };

    return (
      <DocumentCard onClickHref='http://bing.com'>
        <DocumentCardPreview { ...previewProps } />
        <DocumentCardTitle title='Revenue stream proposal fiscal year 2016 version02.pptx'/>
        <DocumentCardActivity
          activity='Created Feb 23, 2016'
          people={
            [
              { name: 'Kat Larrson', profileImageSrc: require('avatar-kat.png') }
            ]
          }
          />
      </DocumentCard>
    );
  }
}
