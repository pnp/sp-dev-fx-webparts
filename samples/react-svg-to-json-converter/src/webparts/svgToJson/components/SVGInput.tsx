import * as React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react';

interface SVGInputProps {
  svgFiles: IDropdownOption[];
  onChange: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => void;
}

const SVGInput: React.FC<SVGInputProps> = ({ svgFiles, onChange }) => {
  return (
    <Dropdown
      placeholder="Select an SVG file"
      options={svgFiles}
      onChange={onChange}
    />
  );
};

export default SVGInput;