import * as React from 'react';
import { PrimaryButton, MessageBarType } from '@fluentui/react';

interface IJsonResult {
  elmType: string;
  attributes: { [key: string]: string };
  style: { [key: string]: string };
  children: IJsonResult[];
}

interface ConvertButtonProps {
  svgContent: string;
  setJsonResult: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setMessageType: React.Dispatch<React.SetStateAction<MessageBarType>>;
  setIsConverted: React.Dispatch<React.SetStateAction<boolean>>;
  isConverted: boolean;
  className?: string;
  text: string;
}

const ConvertButton: React.FC<ConvertButtonProps> = ({ svgContent, setJsonResult, setMessage, setMessageType, setIsConverted, isConverted, className, text }) => {
  const convertSvgToJson = async (): Promise<void> => {
    if (!svgContent) {
      setMessage('Please provide SVG content before converting.');
      setMessageType(MessageBarType.error);
      return;
    }

    try {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
      const paths = Array.from(svgDoc.getElementsByTagName('path'));

      const viewBox = svgDoc.documentElement.getAttribute('viewBox') || '0 0 100 100';

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
            d: path.getAttribute('d') || ''
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
      setIsConverted(true);

      try {
        await navigator.clipboard.writeText(jsonString);
        setMessage('Converted to JSON and copied to clipboard!');
        setMessageType(MessageBarType.success);
      } catch (error) {
        setMessage('Failed to copy to clipboard.');
        setMessageType(MessageBarType.error);
      }
    } catch (error) {
      setMessage('Failed to convert SVG to JSON.');
      setMessageType(MessageBarType.error);
    }
  };

  return (
    <PrimaryButton
      text={text}
      onClick={convertSvgToJson}
      className={className}
      aria-label="Convert to JSON"
      disabled={isConverted} // Ensure button is not disabled initially
    />
  );
};

export default ConvertButton;