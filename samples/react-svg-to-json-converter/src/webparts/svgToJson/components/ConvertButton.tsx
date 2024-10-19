import * as React from 'react';
import { PrimaryButton, MessageBarType } from '@fluentui/react';
import styles from './SvgToJson.module.scss';

interface IJsonResult {
  elmType: string;
  attributes: { [key: string]: string | null };
  style: { [key: string]: string };
  children: IJsonResult[];
}

interface ConvertButtonProps {
  isConverted: boolean;
  svgContent: string;
  setJsonResult: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setMessageType: React.Dispatch<React.SetStateAction<MessageBarType>>;
  setIsConverted: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConvertButton: React.FC<ConvertButtonProps> = ({ isConverted, svgContent, setJsonResult, setMessage, setMessageType, setIsConverted }) => {
  const convertSvgToJson = async (): Promise<void> => {
    if (!svgContent) {
      setMessage('No SVG content to convert.');
      setMessageType(MessageBarType.error);
      return;
    }

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
    const paths = Array.from(svgDoc.getElementsByTagName('path'));

    const result: IJsonResult = {
      elmType: "div",
      attributes: {},
      style: {},
      children: [
        {
          elmType: "svg",
          attributes: {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: svgDoc.documentElement.getAttribute('viewBox'),
            style: "max-width: 48px; max-height: 48px;"
          },
          style: {
            width: "100%",
            height: "100%",
            maxWidth: "48px",
            maxHeight: "48px"
          },
          children: []
        }
      ]
    };

    paths.forEach((path: SVGPathElement) => {
      const pathObj: IJsonResult = {
        elmType: "path",
        attributes: {
          d: path.getAttribute('d')
        },
        style: {
          fill: path.getAttribute('fill') || "#000000"
        },
        children: []
      };
      result.children[0].children.push(pathObj);
    });

    const jsonString = JSON.stringify(result, null, 2);
    setJsonResult(jsonString);
    setMessage(null);
    setIsConverted(true); // Set conversion state to true

    // Copy JSON result to clipboard
    try {
      await navigator.clipboard.writeText(jsonString);
      setMessage('Converted to JSON and copied to clipboard!');
      setMessageType(MessageBarType.success);
    } catch (error) {
      setMessage('Failed to copy to clipboard.');
      setMessageType(MessageBarType.error);
    }
  };

  if (isConverted) {
    return null;
  }

  return (
    <PrimaryButton
      text="Convert and copy to clipboard"
      onClick={convertSvgToJson}
      className={styles.button}
      disabled={!svgContent}
      styles={{
        root: {
          backgroundColor: svgContent ? 'var(--primary-color) !important' : 'lightgrey !important',
          borderColor: svgContent ? 'var(--primary-color) !important' : 'lightgrey !important',
          color: svgContent ? 'white !important' : 'grey !important',
          visibility: isConverted ? 'hidden' : 'visible', // Maintain the button's space in the layout
        },
      }}
    />
  );
};

export default ConvertButton;