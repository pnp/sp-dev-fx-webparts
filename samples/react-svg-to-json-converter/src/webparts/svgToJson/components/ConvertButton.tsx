import * as React from 'react';
import { PrimaryButton, MessageBarType } from '@fluentui/react';
import styles from './SvgToJson.module.scss';

interface IJsonResult {
  elmType: string;
  attributes: { [key: string]: string };
  style: { [key: string]: string };
  children: IJsonResult[];
}

interface ConvertButtonProps {
  isConverted: boolean;
  svgContent: string;
  setJsonResult: (json: string) => void;
  setMessage: (message: string | null) => void;
  setMessageType: (type: MessageBarType) => void;
  setIsConverted: (isConverted: boolean) => void;
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

    const viewBox = svgDoc.documentElement.getAttribute('viewBox') || '0 0 100 100'; // Fallback value for viewBox

    const result: IJsonResult = {
      elmType: "div",
      attributes: {},
      style: {},
      children: [
        {
          elmType: "svg",
          attributes: {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: viewBox,
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
          d: path.getAttribute('d') || '' // Ensure d attribute is a string
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

  return (
    <PrimaryButton
      text="Convert to JSON"
      onClick={convertSvgToJson}
      className={styles.button}
      aria-label="Convert to JSON"
    />
  );
};

export default ConvertButton;