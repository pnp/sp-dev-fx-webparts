import { useState } from 'react';
import { spfi, SPFx } from '@pnp/sp';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

interface UseSaveFeedbackResult {
  saveFeedback: (sampleName: string, rating: number, feedback: string, linkToSample: string) => Promise<void>;
  feedbackSaved: boolean;
  error: string | undefined;
}

const useSaveFeedback = (context: WebPartContext): UseSaveFeedbackResult => {
  const [feedbackSaved, setFeedbackSaved] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const saveFeedback = async (sampleName: string, rating: number, feedback: string, linkToSample: string): Promise<void> => {
    try {
      const sp = spfi("https://hscluise.sharepoint.com/sites/Tech").using(SPFx(context));
      await sp.web.lists.getByTitle('Listformatting-Feedback').items.add({
        Title: sampleName, 
        Rating: rating,
        Feedback: feedback,
        Link: {
          Url: linkToSample,
          Description: sampleName
        } 
      });
      setFeedbackSaved(true);
      setError(undefined);
    } catch (err) {
      setError(err.message);
      setFeedbackSaved(false);
    }
  };

  return { saveFeedback, feedbackSaved, error };
};

export default useSaveFeedback;