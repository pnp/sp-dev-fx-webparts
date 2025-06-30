import * as React from "react";
//import { WebPartContext } from "@microsoft/sp-webpart-base";
import { RecoilRoot } from "recoil";
import { MantineProvider } from "@mantine/core";
import Induction from "./Induction";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IContainerProps {
  title: string;
  description: string;
  listUrl: string;
  azureFunctionUrl: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext
}

const brandColors: any = [
  '#ffebe8',
  '#fdd4d2',
  '#f9a6a1',
  '#f6756d',
  '#f44c41',
  '#f23425',
  '#f32617',
  '#d81a0d',
  '#c11308',
  '#a90403'
];



export const Container: React.FC<IContainerProps> = (props) => {
  return (
    <MantineProvider
      theme={{        
        colorScheme: 'light',
        primaryColor: 'red',
        colors: {
          red: brandColors,
          // blue: brandColors,
        },
        shadows: {
          md: '1px 1px 3px rgba(0, 0, 0, .25)',
          xl: '5px 5px 3px rgba(0, 0, 0, .25)',
        },
        headings: { fontFamily: "Segoe UI" ,  sizes: {
          h1: { fontSize: '2rem' },
        }},
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <RecoilRoot>
        {/* <Divider my="xs" label="Preference" labelPosition="center" /> */}
        <Induction {...props} />
      </RecoilRoot>
    </MantineProvider>
  );
};