import * as React from 'react';

import {
  MgtTemplateProps,
} from '@microsoft/mgt-react/dist/es6/MgtTemplateProps';

import { RenderFileCard } from './RenderFileCard';

export const FileTemplate: React.FunctionComponent<MgtTemplateProps> = (props: React.PropsWithChildren<MgtTemplateProps>) => {
  const { file } = props.dataContext;
    return <RenderFileCard file={file} />;
};