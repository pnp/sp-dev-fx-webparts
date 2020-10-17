import * as React from 'react';
import { IHelloTailwindCssProps } from './IHelloTailwindCssProps';
import { escape } from '@microsoft/sp-lodash-subset';
import './../../../tailwind.css';
import DocumentCard from './DocumentCard';
import HorizontalCard from './HorizontalCard';
import { Stack } from 'office-ui-fabric-react';

export default class HelloTailwindCss extends React.Component<IHelloTailwindCssProps, {}> {
  public render(): React.ReactElement<IHelloTailwindCssProps> {
    return (
      <Stack gap="20">
        <DocumentCard title="Revenue stream proposal fiscal year 2016 version02.pptx"
          documentImageUrl="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/document-preview.png"
          lastEditUserInfo={{
            profileImageUrl: "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png",
            line1: "Annie Lindqvist",
            line2: "Created a few minutes ago"
          }}
        />
        <HorizontalCard title="Can coffee make you a better developer?"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil."
          documentImageUrl="//tailwindcss.com/img/card-left.jpg"
          lastEditUserInfo={{
            profileImageUrl: "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png",
            line1: "Annie Lindqvist",
            line2: "Aug 18"
          }}
        /></Stack>
    );
  }
}
