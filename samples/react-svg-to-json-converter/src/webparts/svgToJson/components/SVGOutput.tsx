import * as React from 'react';
import styles from './SvgToJson.module.scss';

interface SVGOutputProps {
  svgContent: string;
}

const SVGOutput: React.FC<SVGOutputProps> = ({ svgContent }) => {
  return (
    <div>
      {svgContent && (
        <div className={styles.svgPreview}>
          <div
            className={styles.svgContent}
            dangerouslySetInnerHTML={{ __html: svgContent }}
            style={{ width: '100%', height: '100%', maxWidth: '48px', maxHeight: '48px', objectFit: 'contain' }}
          />
        </div>
      )}
    </div>
  );
};

export default SVGOutput;