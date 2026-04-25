import * as React from 'react';
import { Stack, Text, DefaultButton } from '@fluentui/react';
import { IContract } from '../../../models/IContract';
import { CLASSIFICATION_TYPES } from '../../../constants';
import styles from './Classification.module.scss';

export interface IClassifySelectProps {
  contracts: IContract[];
  selectedFile: number;
  selectedType: string;
  onFileChange: (index: number) => void;
  onTypeChange: (type: string) => void;
  onClassify: () => void;
}

export const ClassifySelect: React.FC<IClassifySelectProps> = ({
    contracts, selectedFile, selectedType, onFileChange, onTypeChange, onClassify
}) => {
    return (
      <>
        <Stack className={styles.selectHeadingWrap}>
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
            <Text className={styles.selectHeading}>Document Classification</Text>
            <Text className={styles.aiBadge}>AI POWERED</Text>
          </Stack>
          <Text className={styles.selectSubheading}>
            AI-powered classification · Select document and classification type
          </Text>
        </Stack>

        <Stack className={styles.selectForm}>
          {/* Step 1: Select Document */}
          <Stack className={styles.selectStep}>
            <Text className={styles.stepLabel}>Step 1: Select Document</Text>
            <select
              value={selectedFile}
              onChange={e => onFileChange(Number(e.target.value))}
              className={styles.selectDropdown}
            >
              {contracts.map((c, i) => (
                <option key={i} value={i}>{c.name}</option>
              ))}
            </select>
          </Stack>

          {/* Step 2: Choose Classification Type */}
          <Stack className={styles.selectTypeStep}>
            <Text className={styles.stepLabel}>Step 2: Choose Classification Type</Text>
            {CLASSIFICATION_TYPES.map(type => {
              const isSelected = selectedType === type.value;
              return (
                <Stack
                  key={type.value}
                  onClick={() => onTypeChange(type.value)}
                  className={`${styles.typeCard} ${isSelected ? styles.typeCardSelected : ''}`}
                >
                  <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 12 }}>
                    <div className={`${styles.radioOuter} ${isSelected ? styles.radioSelected : ''}`}>
                      {isSelected && <div className={styles.radioInner} />}
                    </div>
                    <Stack>
                      <Text className={`${styles.typeTitle} ${isSelected ? styles.typeTitleSelected : ''}`}>
                        {type.label}
                      </Text>
                      <Text className={styles.typeDescription}>{type.description}</Text>
                    </Stack>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
          <DefaultButton onClick={onClassify} className={styles.classifyButton}>
            <Text className={styles.classifyButtonIcon}>⟳</Text>
            Classify Document
          </DefaultButton>
        </Stack>
      </>
    );
};
