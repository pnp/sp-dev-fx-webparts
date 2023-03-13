/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import * as adaptiveCards from 'adaptivecards';
import * as adaptativeCardTemplating from 'adaptivecards-templating';
import * as markdownit from 'markdown-it/lib';

import { isEmpty } from '@microsoft/sp-lodash-subset';

const onProcessMarkdownHandler =  (md:any, result: { outputHtml: string; didProcess: boolean; }) => {
    // Don't stop parsing if there is invalid Markdown
    try {
        result.outputHtml = new markdownit().render(md);
        result.didProcess = true;
    }
    catch (error) {
        console.error("Error parsing Markdown", error);
        result.didProcess = false;
    }
};
export const useAdaptiveCardsUtils = () => {

  const createAdaptiveCard = React.useCallback((adaptiveCardData, card) => {
    const adaptiveCardToRender = new adaptiveCards.AdaptiveCard();
    adaptiveCardToRender.version = new adaptiveCards.Version(1, 3);
    adaptiveCards.AdaptiveCard.onProcessMarkdown = onProcessMarkdownHandler;
    if (isEmpty(adaptiveCardData)) return undefined;
    const template = new adaptativeCardTemplating.Template(card);
    const cardPayload = template.expand({
      $root: { ...adaptiveCardData },
    });
    // Parse the card payloa
    adaptiveCardToRender.parse(cardPayload);
    const adpativeCard = adaptiveCardToRender.toJSON();
    // save on global state
    return adpativeCard;
  }, []);

    return { createAdaptiveCard: createAdaptiveCard };
};
