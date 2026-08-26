import * as React from 'react';
import {
  FluentProvider,
  IdPrefixProvider,
  MessageBar,
  MessageBarBody,
  Rating,
  RatingOnChangeEventData,
  Tooltip,
  webLightTheme
} from '@fluentui/react-components';
import styles from './Ratings.module.scss';
import * as strings from 'RatingsWebPartStrings';
import { IRatingsProps } from './IRatingsProps';
import SPHttpClientService from '../services/SPHttpClientService';
import { WebPartTitle } from '@pnp/spfx-controls-react';

interface IRatings {
  rating: number;
  count: number;
  average: number;
}

export const Ratings: React.FC<IRatingsProps> = (props: IRatingsProps) => {

  const {
    context,
    color,
    displayMode,
    size,
    title,
    onUpdateTitle
  } = props;

  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>();
  const [value, setValue] = React.useState<IRatings>();

  const getRating = React.useCallback(async (): Promise<IRatings | undefined> => {
    const { list, listItem } = context.pageContext;
    if (list === undefined) {
      return;
    }
    if (listItem === undefined) {
      return;
    }
    const service = new SPHttpClientService(context);
    await service.ensureFeatureEnabled();
    const user = await service.getCurrentUser();
    const [average, count, rating] = await service.getRating(user.LoginName);
    return {
      rating: rating,
      count: count,
      average: average
    };
  }, [context]);

  const setRating = React.useCallback(async (rating: number): Promise<void> => {
    const { list, listItem } = context.pageContext;
    if (list === undefined) {
      return;
    }
    if (listItem === undefined) {
      return;
    }
    const service = new SPHttpClientService(context);
    await service.setRating(rating);
  }, [context]);

  const handleOnChange = React.useCallback(async (_, data?: RatingOnChangeEventData) => {
    if (data === undefined) {
      return;
    }
    const { value } = data;
    try {
      await setRating(value);
      setValue(await getRating());
    } catch (error) {
      setError(error.toString());
      console.error(error);
    }
  }, [getRating, setRating]);

  React.useEffect(() => {
    (async () => {
      const rating = await getRating();
      try {
        if (rating) {
          setValue(rating);
          setLoading(false);
        }
      } catch (error) {
        setError(error.toString());
        console.error(error);
      }
    })().catch((error) => console.error(error));
  }, [getRating]);

  return (
    <div className={styles.root}>
      <WebPartTitle
        displayMode={displayMode}
        title={title}
        updateProperty={onUpdateTitle} />
      <IdPrefixProvider value="react-star-ratings">
        <FluentProvider theme={webLightTheme}>
          <div className={styles.container}>
            {
              (() => {
                if (loading) {
                  return null;
                }
                if (error) {
                  return (
                    <MessageBar intent="error">
                      <MessageBarBody>
                        {error}
                      </MessageBarBody>
                    </MessageBar>
                  );
                }
                return value ? (
                  <div className={styles.flex}>
                    <div>{strings.RateThisPageLabel}: </div>
                    <Tooltip
                      content={`${strings.YourRatingLabel}: ${value.rating}`}
                      relationship="label">
                      <Rating
                        color={color}
                        size={size}
                        value={value.average}
                        onChange={handleOnChange} />
                    </Tooltip>
                    <div>{value.count}</div>
                  </div>
                ) : null;
              })()
            }
          </div>
        </FluentProvider>
      </IdPrefixProvider>
    </div>
  );

};

export default Ratings;
