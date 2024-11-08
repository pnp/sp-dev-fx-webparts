import { useState } from 'react';

interface SampleDetails {
  key: string;
  text: string;
  path: string;
  url: string;
  shortDescription: string;
  author: string;
  authorPictureUrl: string;
  imageUrl: string;
}

interface UseSampleSelectionReturnType {
  selectedSampleDetails: SampleDetails | undefined;
  selectSample: (sample: SampleDetails) => void;
  resetSampleSelection: () => void;
}

const useSampleSelection = (): UseSampleSelectionReturnType => {
  const [selectedSampleDetails, setSelectedSampleDetails] = useState<SampleDetails | undefined>(undefined);

  const selectSample = (sample: SampleDetails): void => {
    setSelectedSampleDetails(sample);
  };

  const resetSampleSelection = (): void => {
    setSelectedSampleDetails(undefined);
  };

  return {
    selectedSampleDetails,
    selectSample,
    resetSampleSelection,
  };
};

export default useSampleSelection;