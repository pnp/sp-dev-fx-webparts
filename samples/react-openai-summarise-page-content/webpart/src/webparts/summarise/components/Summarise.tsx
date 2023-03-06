import * as React from 'react';
import { ISummariseProps } from './ISummariseProps';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { summariseStyles, loadingSpinnerStyles } from './styles';
import { isEmpty } from '@microsoft/sp-lodash-subset';
import { useAzureFunctions, useSharePointRest, useMicrosoftGraph } from '../../../hooks';
import { SUMMARY_COLUMN_NAME, SITE_PAGES_LIBRARY_NAME } from '../../../constants/constants';

const Summarise: React.FC<ISummariseProps> = (props) => {

  const [loading, setLoading] = React.useState<boolean>(true);
  const [sentences, setSentences] = React.useState<{ language: string, content: string }[]>([]);

  const { aadHttpClientFactory, msGraphClientFactory, spHttpClient, siteId, pageId, siteUrl, pageItemId } = props;
  const { getSummaryUsingOpenAI, updatePagePnPPowerShell } = useAzureFunctions(aadHttpClientFactory);
  const { callMicrosoftGraphAPI } = useMicrosoftGraph(msGraphClientFactory);
  const { getItem } = useSharePointRest(spHttpClient, siteUrl);

  const covertSummaryToSentences = (summary: string[]): void => {

    // if summary is empty, return
    if (isEmpty(summary)) return;

    // if summary is not empty, return the summary by splitting it into sentences
    const sentences: { language: string, content: string }[] = [];
    summary.forEach((sentence: string) => {

      // if the sentence does not contain a language, then the language is empty
      if (sentence.indexOf(':') === -1) {
        sentences.push({
          language: '',
          content: `${sentence}.`
        });
        return;
      }

      // split the sentence into language and content
      // each sentence is in the format language: content
      const splitSentence = sentence.split(':');
      sentences.push({
        language: `${splitSentence[0]}: `,
        content: `${splitSentence[1]}.`
      });
    });
    setSentences(sentences);
  };

  const cleanPageContent = (pageContent: string): string => {

    //remove html tags from the content
    pageContent = pageContent.replace(/<[^>]*>?/gm, '');

    //replace " with '
    pageContent = pageContent.replace(/"/g, "'");

    // remove all unicode characters
    pageContent = pageContent.replace(/[^\x00-\x7F]/g, "");

    return pageContent;
  };

  const getPageContentUsingGraphAPI = async (): Promise<string> => {

    // get the page content from the Microsoft Graph API
    const response = await callMicrosoftGraphAPI(
      "get",
      `/sites/${siteId}/pages/${pageId}`,
      "beta",
      null,
      ["id", "title"],
      ["webparts($filter=(isof('microsoft.graph.textWebPart')))"],
      null
    );
    return response?.webParts?.map((webPart: any) => webPart.innerHtml)?.join(' ') || '';
  };

  const getSummaryFromPage = async (): Promise<string[]> => {

    // get the summary from the page
    const page = await getItem(SITE_PAGES_LIBRARY_NAME, pageItemId, [SUMMARY_COLUMN_NAME]);

    // if page is empty, return
    if (page === undefined) {
      return [];
    }

    let summary: string[] = null;

    // if summary is not empty, return the summary by splitting it into sentences
    if (!isEmpty(page) && !isEmpty(page[SUMMARY_COLUMN_NAME])) {
      summary = page[SUMMARY_COLUMN_NAME]?.split('.')?.filter((sentence: string) => sentence !== '') || [];
    }

    // wait for 1 second before returning the summary to show the loading spinner
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return summary;
  };

  const getSummaryFromAPI = async (): Promise<string[]> => {

    let pageContent = await getPageContentUsingGraphAPI();

    // if page content is empty, return
    if (isEmpty(pageContent)) {
      return [];
    }

    // clean the page content
    pageContent = cleanPageContent(pageContent);

    // get summary from OpenAI
    const summary = await getSummaryUsingOpenAI(pageContent);

    // if summary is empty, return
    if (isEmpty(summary)) {
      return [];
    }

    // return the summary by splitting it into sentences
    return summary.split('.')?.filter((sentence: string) => sentence !== '') || [];
  };

  const executeSummaryTasksAndUpdatePage = async (): Promise<void> => {
    let summary: string[] = await getSummaryFromPage();
    if (summary === null) {
      summary = await getSummaryFromAPI();

      if (!isEmpty(summary)) {
        // update the page with the summary
        updatePagePnPPowerShell(siteUrl, pageItemId, SUMMARY_COLUMN_NAME, summary.join('.'));
      }
    }
    covertSummaryToSentences(summary);
  };

  React.useEffect(() => {
    executeSummaryTasksAndUpdatePage()
      .then(
        () => setLoading(false)
      )
      .catch(
        (error) => {
          console.log("error", error);
          setSentences([]);
          setLoading(false);
        }
      );
  }, []);

  return (

    <div className={summariseStyles.mainContainer}>
      <div className={summariseStyles.titleContainer}>
        <FontIcon className={summariseStyles.icon} iconName="AlignLeft" />
        <span className={summariseStyles.title}>Summary</span>
      </div>
      {loading ? (
        <Spinner size={SpinnerSize.large} label="Loading summary..." styles={loadingSpinnerStyles} />
      ) : isEmpty(sentences) ? (
        <p className={summariseStyles.description}>No summary available</p>
      ) : (
        sentences.map((sentence, index) => (
          <p className={summariseStyles.descriptionContainer} key={index}>
            <span className={`${summariseStyles.description}`}><span className={summariseStyles.language}>{sentence.language}</span>{sentence.content}</span>
          </p>
        ))
      )}
    </div>

  );
}

export default Summarise;