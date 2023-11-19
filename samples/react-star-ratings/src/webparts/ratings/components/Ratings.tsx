import * as React from 'react';
import {
  MessageBar,
  MessageBarType,
  IRatingStyles,
  Rating,
  RatingSize,
  TooltipHost
} from '@fluentui/react';
import styles from './Ratings.module.scss';
import * as strings from 'RatingsWebPartStrings';
import { IRatingsProps } from './IRatingsProps';
import SPHttpClientService from '../services/SPHttpClientService';

interface IRatings {
  rating: number;
  count: number;
  average: number;
}

export const Ratings: React.FC<IRatingsProps> = (props: IRatingsProps) => {

  const {
    webPartContext,
    webPartProps
  } = props;

  const ratingStyles = React.useMemo(() => (): Partial<IRatingStyles> => ({
    root: {
      selectors: {
        '&:hover': {
          selectors: {
            '.ms-RatingStar-back': {
              color: webPartProps.inactiveColor,
            }
          }
        }
      }
    },
    ratingButton: {
      selectors: {
        '&:hover ~ .ms-Rating-button': {
          selectors: {
            '.ms-RatingStar-back': {
              color: webPartProps.inactiveColor,
            },
            '.ms-RatingStar-front': {
              color: webPartProps.inactiveColor,
            }
          }
        },
        '&:hover': {
          selectors: {
            '.ms-RatingStar-back': {
              color: webPartProps.inactiveColor,
            },
            '.ms-RatingStar-front': {
              color: webPartProps.inactiveColor,
            }
          }
        }
      }
    },
    ratingStarFront: {
      color: webPartProps.activeColor
    },
    ratingStarBack: {
      color: webPartProps.activeColor
    }
  }), [
    webPartProps.activeColor,
    webPartProps.inactiveColor
  ]);

  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>();
  const [value, setValue] = React.useState<IRatings>();

  const getRating = React.useCallback(async (): Promise<IRatings | undefined> => {
    if (!webPartContext.pageContext.list) {
      return;
    }
    if (!webPartContext.pageContext.listItem) {
      return;
    }
    const service = new SPHttpClientService(webPartContext);
    await service.ensureFeatureEnabled();
    const user = await service.getCurrentUser();
    const [average, count, rating] = await service.getRating(user.LoginName);
    return {
      rating: rating,
      count: count,
      average: average
    };
  }, [webPartContext]);

  const setRating = React.useCallback(async (rating: number): Promise<void> => {
    if (!webPartContext.pageContext.list) {
      return;
    }
    if (!webPartContext.pageContext.listItem) {
      return;
    }
    const service = new SPHttpClientService(webPartContext);
    await service.setRating(rating);
  }, [webPartContext]);

  const handleOnChange = React.useCallback(async (_, rating?: number) => {
    if (!rating) {
      return;
    }
    try {
      await setRating(rating);
      setValue(await getRating());
    } catch (error) {
      setError(error.toString());
      console.error(error);
    }
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const rating = await getRating();
        if (rating) {
          setValue(rating);
          setLoading(false);
        }
      } catch (error) {
        setError(error.toString());
        console.error(error);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {
          (() => {
            if (loading) {
              return null;
            }
            if (error) {
              return (
                <MessageBar messageBarType={MessageBarType.error}>
                  {error}
                </MessageBar>
              );
            }
            return value ? (
              <div className={styles.flex}>
                <div>{strings.RateThisPageLabel}: </div>
                <TooltipHost content={`${strings.YourRatingLabel}: ${value.rating}`}>
                  <Rating
                    allowZeroStars
                    rating={value.average}
                    size={RatingSize.Small}
                    styles={ratingStyles}
                    onChange={handleOnChange} />
                </TooltipHost>
                <div>{value.count}</div>
              </div>
            ) : null;
          })()
        }
      </div>
    </div>
  );

};

export default Ratings;
